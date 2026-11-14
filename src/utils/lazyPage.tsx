import { lazy, type ComponentType } from "react";

type Page = ComponentType & { preload: () => Promise<void> };

/**
 * Like React.lazy, but can be loaded ahead of time. Once preloaded, it renders synchronously
 * (no Suspense fallback), so a prerendered page is replaced by identical content without a loading flash.
 */
export function lazyPage(factory: () => Promise<{ default: ComponentType }>): Page {
  let Loaded: ComponentType | null = null;
  let promise: Promise<void> | null = null;
  const preload = () => (promise ??= factory().then((m) => { Loaded = m.default; }));
  const Lazy = lazy(() => preload().then(() => ({ default: Loaded! })));
  const Render = () => (Loaded ? <Loaded /> : <Lazy />);
  return Object.assign(Render, { preload });
}
