# Damarika frontend

API data uses TanStack Query with native `fetch`. Programs, products, team members,
sites, and districts have shared query keys. Successful data stays fresh for five
minutes and unused data stays in memory for thirty minutes. Route navigation reuses
the cache; stale data refreshes in the background on remount or reconnect. This cache
does not persist across full page reloads. Window focus does not trigger a refetch.
Read requests retry once on transient errors; contact submissions never auto-retry.
Zustand keeps only the selected program ID, not a second copy of API data.

Lists are paginated: programs, products and team load 10 at a time (`VITE_PAGE_SIZE`)
and the next page loads automatically when the visitor scrolls near the end of the list
(a "Load more" button is the keyboard/no-JS-observer fallback). Reads use GET with
`?limit=&offset=` (and `?q=` for search), so browsers can cache them and no CORS preflight is
needed. The map asks for all sites/districts in one page.

At startup the app pings `GET /health` to wake a sleeping Render instance. Data requests no
longer wait for it; they run in parallel and allow up to 90 seconds until the API has answered
once (cold start), then 15 seconds. After 14 minutes without API activity the longer timeout
applies again.

Run readiness checks with Node.js 22.18+ or 23.6+:
`node --test tests/*.test.mjs`. Build with `npm run build`.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
