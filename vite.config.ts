import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "check-cloudflare-routing",
      apply: "build",
      writeBundle(options) {
        const redirects = readFileSync(resolve(options.dir || "dist", "_redirects"), "utf8");
        const hasRules = redirects.split(/\r?\n/).some((line) => {
          const value = line.trim();
          return value && !value.startsWith("#");
        });
        if (hasRules) {
          this.error("Unexpected rules in dist/_redirects. Use the SPA fallback in wrangler.jsonc.");
        }
        console.log("Cloudflare routing check passed: no custom redirect rules; using native SPA fallback.");
      },
    },
  ],
  build: {
    target: "es2020",
    cssMinify: "lightningcss",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-mui": ["@mui/material", "@mui/icons-material"],
          "vendor-motion": ["framer-motion"],
          "vendor-utils": ["axios", "zustand"],
        },
      },
    },
  },
  server: {
    open: true,
  },
});
