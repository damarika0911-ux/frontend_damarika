/** Skeleton loader — used as Suspense fallback and inline loading state */

const shimmer = `@keyframes sk-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }`;

const Bar = ({ w = "100%", h = "0.75rem", mb = "0" }: { w?: string; h?: string; mb?: string }) => (
  <div style={{ width: w, height: h, borderRadius: "0.375rem", background: "#f0ebe4", animation: "sk-pulse 1.4s ease-in-out infinite", marginBottom: mb }} />
);

const DarkBar = ({ w = "100%", h = "0.75rem", mb = "0" }: { w?: string; h?: string; mb?: string }) => (
  <div style={{ width: w, height: h, borderRadius: "0.375rem", background: "rgba(255,255,255,0.07)", animation: "sk-pulse 1.4s ease-in-out infinite", marginBottom: mb }} />
);

const ImgBlock = ({ ratio = "16/10" }: { ratio?: string }) => (
  <div style={{ aspectRatio: ratio, borderRadius: "0.75rem", background: "#f0ebe4", animation: "sk-pulse 1.4s ease-in-out infinite" }} />
);

/** Full page skeleton — used in App.tsx Suspense */
const Loader = () => (
  <div style={{ minHeight: "100vh" }}>
    {/* Hero skeleton */}
    <div style={{ background: "#1a0e05", padding: "4.5rem 2.5rem 3.5rem" }}>
      <DarkBar w="5rem" h="0.5rem" mb="1.25rem" />
      <DarkBar w="min(22rem, 60%)" h="1.75rem" mb="0.875rem" />
      <DarkBar w="min(18rem, 50%)" h="0.75rem" mb="0.5rem" />
      <DarkBar w="min(14rem, 40%)" h="0.75rem" />
    </div>
    {/* Content skeleton */}
    <div style={{ padding: "3rem 2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
      <ImgBlock ratio="4/3" />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.5rem" }}>
        <Bar w="4rem" h="0.5rem" mb="0.375rem" />
        <Bar w="70%" h="1.25rem" mb="0.5rem" />
        <Bar w="100%" h="0.625rem" />
        <Bar w="95%" h="0.625rem" />
        <Bar w="80%" h="0.625rem" />
      </div>
    </div>
    {/* Cards skeleton */}
    <div style={{ padding: "2rem 2.5rem", background: "#faf8f5" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Bar w="5rem" h="0.5rem" mb="0.5rem" />
        <Bar w="12rem" h="1.125rem" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ borderRadius: "0.75rem", border: "1px solid #f0ebe4", overflow: "hidden" }}>
            <div style={{ height: "10rem", background: "#f0ebe4", animation: "sk-pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
            <div style={{ padding: "1rem" }}>
              <Bar w="75%" h="0.875rem" mb="0.5rem" />
              <Bar w="100%" h="0.5rem" mb="0.375rem" />
              <Bar w="85%" h="0.5rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{shimmer}
      {`@media (max-width: 768px) {
        .sk-grid-2 { grid-template-columns: 1fr !important; }
      }`}
    </style>
  </div>
);

/** Inline skeleton — for use inside screens when data is loading */
export const InlineSkeleton = ({ cards = 3, cols = 3 }: { cards?: number; cols?: number }) => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "1.25rem" }} className="sk-inline-grid">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} style={{ borderRadius: "0.75rem", border: "1px solid #f0ebe4", overflow: "hidden" }}>
          <div style={{ height: "10rem", background: "#f0ebe4", animation: "sk-pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.12}s` }} />
          <div style={{ padding: "1rem" }}>
            <Bar w="75%" h="0.875rem" mb="0.5rem" />
            <Bar w="100%" h="0.5rem" mb="0.375rem" />
            <Bar w="70%" h="0.5rem" />
          </div>
        </div>
      ))}
    </div>
    <style>{shimmer}
      {`@media (max-width: 768px) { .sk-inline-grid { grid-template-columns: 1fr !important; } }`}
    </style>
  </>
);

export default Loader;
