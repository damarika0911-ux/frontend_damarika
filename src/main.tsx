import { createRoot } from "react-dom/client";
import App, { preloadPage } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion } from "framer-motion";
import ErrorBoundary from "./error/ErrorBoundary.tsx";
import { QueryClientProvider, dehydrate, hydrate } from "@tanstack/react-query";
import { queryClient } from "./service/queryClient";
import { warmUpApi } from "./service/apiService";

import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "./index.css";
import "./App.css";
import "./theme/theme.css";
import { ThemeModeProvider } from "./theme/ThemeMode";
import { initConsent } from "./utils/consent";
import "./utils/imageFallback";

const lazyAnimationFeatures = () =>
  import("./utils/framer.ts").then((res) => res.default);

// Start waking the backend while React renders; data requests share this check.
// Screens handle request failures, so startup itself must not reject unhandled.
void warmUpApi().catch(() => {});
initConsent();

// After a new deploy, an already-open tab may request old code files that no longer exist.
// Reload once to pick up the new version instead of showing an error (guarded against reload loops).
window.addEventListener("vite:preloadError", (event) => {
  const key = "chunk-reload-at";
  let last = 0;
  try { last = Number(sessionStorage.getItem(key) || 0); } catch { /* storage blocked */ }
  if (Date.now() - last > 60_000) {
    event.preventDefault();
    try { sessionStorage.setItem(key, String(Date.now())); } catch { /* storage blocked */ }
    window.location.reload();
  }
});

const rootEl = document.getElementById("root")!;

// Used by scripts/prerender.mjs to embed the data a page was rendered with (public API data only).
(window as unknown as { __damarikaDehydrate?: () => unknown }).__damarikaDehydrate = () => dehydrate(queryClient);

// A prerendered page carries its API data as a JSON data block (not a script, so CSP is unaffected).
// Loading it before the first render means React shows the same content instead of loading skeletons.
const prerendered = rootEl.hasChildNodes();
try {
  const data = document.getElementById("__prerender-data")?.textContent;
  if (data) hydrate(queryClient, JSON.parse(data));
} catch { /* ignore: data will be fetched */ }

async function start() {
  if (prerendered) {
    await preloadPage(window.location.pathname).catch(() => {});
    const html = document.documentElement;
    html.classList.add("pr-takeover");
    const end = () => { html.classList.remove("pr-takeover"); window.removeEventListener("scroll", end); };
    window.addEventListener("scroll", end, { once: true, passive: true });
    setTimeout(end, 4000);
  }
  createRoot(rootEl).render(
  <QueryClientProvider client={queryClient}>
    <ThemeModeProvider>
    <BrowserRouter>
      <LazyMotion strict features={lazyAnimationFeatures}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </LazyMotion>
    </BrowserRouter>
    </ThemeModeProvider>
  </QueryClientProvider>
  );
}
void start();
