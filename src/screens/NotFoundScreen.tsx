import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFoundScreen() {
  return (
    <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", background: "var(--page)", padding: "4rem 0" }}>
      <Helmet>
        <title>Page not found | Damarika</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="section-container" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--label)", margin: "0 0 0.5rem" }}>
          Error 404
        </p>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 700, color: "var(--heading)", margin: "0 0 0.75rem" }}>
          This page has not been excavated yet
        </h1>
        <p style={{ color: "var(--muted)", margin: "0 auto 1.5rem", maxWidth: "28rem" }}>
          The link may be broken or the page may have moved. Try the home page or search with Ctrl+K.
        </p>
        <Link
          to="/"
          style={{ display: "inline-flex", background: "var(--brand)", color: "#fff", padding: "0.625rem 1.5rem", borderRadius: "2rem", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
