import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
