/**
 * Build-time prerendering of the public pages.
 *
 * After `vite build`, this opens each route in headless Chrome, waits for data and fonts, and saves the
 * rendered HTML as dist/<route>.html (Cloudflare serves /about from about.html without a redirect).
 * Visitors and crawlers then get real content in the first response; React replaces it when it starts.
 *
 * Skips itself (build still succeeds) when Chrome is not available. Set CHROME_PATH to point at Chrome,
 * or SKIP_PRERENDER=1 to turn it off.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import http from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";

const DIST = path.resolve(process.argv[2] || "dist");
const ROUTES = ["/", "/about", "/services", "/programs", "/products", "/contact", "/privacy", "/terms"];

if (process.env.SKIP_PRERENDER === "1") {
  console.log("prerender: skipped (SKIP_PRERENDER=1)");
  process.exit(0);
}
const chromePath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].find((p) => p && existsSync(p));
if (!chromePath || typeof WebSocket === "undefined") {
  console.warn("prerender: skipped (needs Chrome and Node 22+). The site still works; pages render in the browser.");
  process.exit(0);
}

const template = readFileSync(path.join(DIST, "index.html"), "utf8");
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".json": "application/json" };

// Static server for dist/ with SPA fallback to the untouched template.
const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  const file = path.join(DIST, url);
  if (url !== "/" && file.startsWith(DIST) && existsSync(file) && !file.endsWith(".html")) {
    res.setHeader("Content-Type", TYPES[path.extname(file)] || "application/octet-stream");
    return res.end(readFileSync(file));
  }
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(template);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const profile = mkdtempSync(path.join(tmpdir(), "prerender-"));
const port = 9400 + Math.floor(Math.random() * 400);
// This throwaway browser only loads our own build and API, so it skips CORS: the API only allows
// the real site origins, not the temporary 127.0.0.1 server used here.
const chrome = spawn(chromePath, ["--headless=new", `--remote-debugging-port=${port}`, "--no-first-run", "--no-default-browser-check", "--disable-web-security", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 80 && !ws; i++) {
  try {
    const page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page");
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch { /* not up yet */ }
  if (!ws) await sleep(250);
}
if (!ws) { console.warn("prerender: skipped (Chrome did not start)"); cleanup(0); }
if (ws.readyState !== 1) await new Promise((r) => ws.addEventListener("open", r));

let id = 0;
const pending = new Map();
let inflight = 0;
const errors = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === "Network.requestWillBeSent") inflight++;
  if (m.method === "Network.loadingFinished" || m.method === "Network.loadingFailed") inflight = Math.max(0, inflight - 1);
  if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.exception?.description?.slice(0, 200));
});
const send = (method, params = {}) => new Promise((resolve) => {
  const i = ++id;
  pending.set(i, resolve);
  ws.send(JSON.stringify({ id: i, method, params }));
  setTimeout(() => { if (pending.has(i)) { pending.delete(i); resolve({}); } }, 30000);
});
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send("Page.enable");
await send("Network.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "light" }, { name: "prefers-reduced-motion", value: "reduce" }] });

// Collects the rendered page. Runs in the browser.
const SNAPSHOT = `(() => {
  const root = document.getElementById("root").cloneNode(true);
  // Never bake in per-visitor UI.
  root.querySelectorAll(".scroll-progress, [role=status][aria-busy]").forEach((n) => n.remove());
  // Animation start states (opacity 0 / offsets) would hide content until JS runs: drop them.
  root.querySelectorAll("[style]").forEach((n) => {
    n.style.removeProperty("opacity");
    n.style.removeProperty("transform");
    n.style.removeProperty("will-change");
    if (!n.getAttribute("style")) n.removeAttribute("style");
  });
  // MUI/emotion inserts its CSS with insertRule in production, so the <style> tags are empty: copy the live rules.
  const emotionCss = [...document.head.querySelectorAll("style[data-emotion]")]
    .map((s) => { try { return [...s.sheet.cssRules].map((r) => r.cssText).join(""); } catch { return s.textContent || ""; } })
    .join("");
  const helmet = [...document.head.querySelectorAll("[data-react-helmet]")].filter((n) => n.tagName !== "TITLE").map((n) => n.outerHTML).join("");
  const title = document.createElement("title");
  title.textContent = document.title; // react-helmet sets document.title directly
  const head = title.outerHTML + (emotionCss ? "<style data-prerendered>" + emotionCss + "</style>" : "") + helmet;
  // API data the page was rendered with, so the app starts with it (no loading skeletons, no layout shift).
  let data = "";
  try { data = JSON.stringify(window.__damarikaDehydrate?.() ?? null).replace(/</g, "\\\\u003c"); } catch {}
  // The hero background is the largest paint on several pages: fetch it first.
  const bg = document.querySelector(".hero-bg, .ab-hero-bg");
  const bgUrl = bg ? (getComputedStyle(bg).backgroundImage.match(/url\\("?([^")]+)"?\\)/) || [])[1] : "";
  const preload = bgUrl ? '<link rel="preload" as="image" fetchpriority="high" media="(min-width: 769px)" href="' + new URL(bgUrl).pathname + '">' : "";
  return { root: root.innerHTML, head: preload + head, data };
})()`;

async function waitForIdle() {
  const start = Date.now();
  let quietSince = Date.now();
  while (Date.now() - start < 30000) {
    if (inflight > 0) quietSince = Date.now();
    if (Date.now() - quietSince > 1200) break;
    await sleep(100);
  }
  await evaluate("document.fonts.ready.then(() => true)");
}

// Remove template tags that react-helmet sets per page, so each page has exactly one of each.
const stripHeadDefaults = (html) =>
  html
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta\s+(name|property)="(description|keywords|og:[a-z:_]+|twitter:[a-z:_]+)"[^>]*>/g, "");

let written = 0;
for (const route of ROUTES) {
  inflight = 0;
  await send("Page.navigate", { url: base + route });
  await sleep(500);
  await waitForIdle();
  // Scroll through once so lazy sections (map, infinite lists) render, then back to the top.
  await evaluate(`(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } scrollTo(0, 0); })()`);
  await waitForIdle();
  // Let react-helmet flush its head updates (it applies them on the next animation frame).
  await evaluate("new Promise((r) => requestAnimationFrame(() => setTimeout(r, 300)))");
  await evaluate(`new Promise((r) => { const t0 = Date.now(); (function check() {
    if (document.querySelector('link[rel=canonical][data-react-helmet]') || Date.now() - t0 > 8000) return r(true);
    setTimeout(check, 100); })(); })`);
  // Never bake an error or a half-loaded page into static HTML.
  const problem = await evaluate(`(() => { const a = document.querySelector('[role=alert]'); if (a && a.textContent.trim()) return a.textContent.trim().slice(0, 120); if (document.querySelector('.pg-skeleton-page, .progressive-image__loader + img:not([src])')) return 'still loading'; return ''; })()`);
  if (problem) { console.warn(`prerender: ${route} skipped (${problem}); it will render in the browser`); continue; }
  const snap = await evaluate(SNAPSHOT);
  if (!snap?.root || snap.root.length < 500) { console.warn(`prerender: ${route} looked empty, left as client-rendered`); continue; }
  const html = stripHeadDefaults(template)
    .replace("</head>", `${snap.head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${snap.root}</div>` + (snap.data && snap.data !== "null" ? `<script type="application/json" id="__prerender-data">${snap.data}</script>` : ""));
  const out = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  writeFileSync(path.join(DIST, out), html);
  written++;
  console.log(`prerender: ${route} -> ${out} (${Math.round(html.length / 1024)} KB)`);
}
if (errors.length) console.warn("prerender: page errors seen:\n  " + errors.join("\n  "));
console.log(`prerender: ${written}/${ROUTES.length} pages written`);
cleanup(0);

function cleanup(code) {
  try { ws?.close(); } catch { /* ignore */ }
  chrome.kill();
  server.close();
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch { /* Chrome may still hold files */ } process.exit(code); }, 500);
}
