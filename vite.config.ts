import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

/** Image host for program/product/team photos (Supabase Storage). */
const IMAGE_ORIGIN = "https://kofayxfcfyvzyapgipip.supabase.co";

/**
 * Faster first paint:
 * - inline the (small) site CSS into index.html so no stylesheet request blocks rendering;
 * - preconnect to the API and image hosts so their TLS handshakes start while JS downloads.
 */
function firstPaint(apiHost: string): Plugin {
  return {
    name: "first-paint",
    apply: "build",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const origins = new Set<string>();
        try { origins.add(new URL(apiHost).origin); } catch { /* relative API host */ }
        origins.add(IMAGE_ORIGIN);
        const preconnect = [...origins].map((o) => `<link rel="preconnect" href="${o}" crossorigin />`).join("\n  ");
        html = html.replace("</title>", `</title>\n  ${preconnect}`);

        for (const [fileName, chunk] of Object.entries(ctx.bundle ?? {})) {
          if (chunk.type !== "asset" || !fileName.endsWith(".css")) continue;
          const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`);
          if (!tag.test(html)) continue;
          html = html.replace(tag, () => `<style>${String(chunk.source)}</style>`);
          // Keep the file too: lazy chunks preload it by URL. It is then already in the page, so this costs nothing.
        }
        return html;
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const apiHost = env.VITE_DAMARIKA_API_HOST || "https://api.damarika.in/api/v2";
  return {
    plugins: [
      react(),
      tailwindcss(),
      firstPaint(apiHost),
      {
        name: "check-cloudflare-routing",
        apply: "build",
        writeBundle(options) {
          // React routes use the native SPA fallback in wrangler.jsonc. A _redirects file with real rules
          // (e.g. a catch-all to /index.html) makes Cloudflare loop, so fail on that. A comments-only file is
          // harmless; it can be left behind by a CI build cache, so just remove it.
          const redirects = resolve(options.dir || "dist", "_redirects");
          if (existsSync(redirects)) {
            const rules = readFileSync(redirects, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
            if (rules.length) {
              this.error(`_redirects contains rules (${rules[0]}). Remove them: routing uses the SPA fallback in wrangler.jsonc.`);
            }
            rmSync(redirects);
            console.log("Removed a leftover comments-only _redirects file.");
          }

          // Every executable inline <script> in index.html must be allowed by its hash in _headers (CSP),
          // otherwise browsers silently block it in production.
          const dir = options.dir || "dist";
        // Every asset that index.html or a JS chunk can request must exist, or that part of the site breaks
        // at runtime (the server would answer with the HTML page instead).
        {
          const assetsDir = resolve(dir, "assets");
          const present = new Set(readdirSync(assetsDir));
          const missing = new Set<string>();
          for (const f of [...present].filter((n) => n.endsWith(".js")).map((n) => resolve(assetsDir, n)).concat(resolve(dir, "index.html"))) {
            for (const m of readFileSync(f, "utf8").matchAll(/assets\/([A-Za-z0-9_.-]+\.(?:js|css|woff2?|webp|svg|png|jpe?g))/g)) {
              if (!present.has(m[1])) missing.add(m[1]);
            }
          }
          if (missing.size) this.error(`Build output references missing files: ${[...missing].join(", ")}`);
          console.log("Asset check passed: every referenced file exists.");
        }
          const html = readFileSync(resolve(dir, "index.html"), "utf8");
          const headers = readFileSync(resolve(dir, "_headers"), "utf8");
          for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
            const attrs = m[1] || "";
            if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs)) continue;
            const hash = `'sha256-${createHash("sha256").update(m[2]).digest("base64")}'`;
            if (!headers.includes(hash)) {
              this.error(`An inline script in index.html is not allowed by the CSP. Add ${hash} to script-src in public/_headers.`);
            }
          }
          console.log("CSP check passed: inline scripts match public/_headers.");
        },
      },
    ],
    build: {
      target: "es2020",
      cssMinify: "lightningcss",
      sourcemap: false,
      rollupOptions: {
        output: {
          // "-r2" gives every file a new URL. Browsers that cached an HTML page as a CSS/JS file during the
          // 14 Nov broken deploy (1-year cache) then fetch fresh files instead of reusing the bad copy.
          entryFileNames: "assets/[name]-[hash]-r2.js",
          chunkFileNames: "assets/[name]-[hash]-r2.js",
          assetFileNames: "assets/[name]-[hash]-r2[extname]",
          // MUI is left out on purpose so Rollup can split it per page (e.g. the search dialog loads only when opened).
          manualChunks: {
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-utils": ["@tanstack/react-query", "zustand"],
          },
        },
      },
    },
    server: {
      open: true,
    },
  };
});
