declare global {
  interface Window {
    env: unknown;
  }
}

const excludedVars = ["DEV", "PROD", "SSR"];
const ViteVariables: Record<string, string> = {};
Object.keys(import.meta.env).forEach((key) => {
  if (!excludedVars.includes(key)) {
    ViteVariables[key] = import.meta.env[key];
  }
});

export const env: { [key: string]: string } = {
  ...ViteVariables,
  ...(window.env || {}),
};
