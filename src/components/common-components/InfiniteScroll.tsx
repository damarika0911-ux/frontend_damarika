import { useEffect, useRef } from "react";

/**
 * Put this after a list. When it scrolls within `rootMargin` of the viewport it asks for the
 * next page. A visible "Load more" button stays as a fallback (keyboard users, very tall screens,
 * browsers without IntersectionObserver), and an end-of-list message shows when everything is loaded.
 */
export default function InfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  error,
  loadedCount,
  total,
  noun = "items",
  rootMargin = "600px",
}: {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  error?: string | null;
  loadedCount: number;
  total?: number;
  noun?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(onLoadMore);
  callback.current = onLoadMore;

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasMore || loading || error || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) callback.current();
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
    // Re-observe after each page so a still-visible sentinel triggers the next load.
  }, [hasMore, loading, error, rootMargin, loadedCount]);

  if (!loadedCount) return null;

  return (
    <div ref={ref} className="inf-scroll" aria-live="polite">
      {loading && (
        <p className="inf-status">
          <span className="inf-spinner" aria-hidden="true" /> Loading more {noun}…
        </p>
      )}
      {error && !loading && (
        <p className="inf-status inf-error">
          Couldn't load more {noun}.{" "}
          <button type="button" className="inf-btn" onClick={onLoadMore}>Try again</button>
        </p>
      )}
      {hasMore && !loading && !error && (
        <button type="button" className="inf-btn" onClick={onLoadMore}>
          Load more {noun}{total ? ` (${loadedCount} of ${total})` : ""}
        </button>
      )}
      {!hasMore && !loading && total !== undefined && total > 0 && (
        <p className="inf-status inf-end">You've seen all {total} {noun}.</p>
      )}
      <style>{`
        .inf-scroll { display: flex; justify-content: center; padding: 2rem 0 0.5rem; min-height: 4rem; }
        .inf-status { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--muted); margin: 0; }
        .inf-error { color: var(--danger); }
        .inf-end { font-style: italic; }
        .inf-btn { background: transparent; color: var(--brand-text); border: 1.5px solid var(--border); padding: 0.5rem 1.25rem; border-radius: 2rem; font-weight: 600; font-size: 0.8125rem; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .inf-btn:hover { border-color: var(--brand-text); }
        .inf-spinner { width: 1rem; height: 1rem; border-radius: 50%; border: 2px solid var(--border); border-top-color: var(--brand-text); animation: inf-spin 0.7s linear infinite; }
        @keyframes inf-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
