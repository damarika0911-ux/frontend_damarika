import { useEffect, useState } from "react";

type ProgressiveImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Hero images can opt into early browser fetching; all others remain lazy. */
  priority?: boolean;
};

/** Keeps card dimensions stable and gives each remote image its own loading state. */
export function ProgressiveImage({ className, priority = false, src, alt = "", onLoad, onError, ...props }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [src]);

  return (
    <span className={`progressive-image ${loaded ? "is-loaded" : ""}`} aria-busy={!loaded}>
      {!loaded && <span className="progressive-image__loader" aria-label="Loading image" />}
      <img
        {...props}
        src={src}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={(event) => { setLoaded(true); onLoad?.(event); }}
        onError={(event) => { setLoaded(true); onError?.(event); }}
      />
    </span>
  );
}
