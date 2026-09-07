import { m } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, children }: PageHeroProps) => {
  return (
    <section style={{ padding: "3.5rem 0 3rem", background: "#faf8f5" }}>
      <div className="section-container">
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center" }}
        >
          <h1
           
            style={{
              fontSize: "clamp(1.625rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#3d1e08",
              lineHeight: 1.2,
              marginBottom: "0.625rem",
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#8b7355", lineHeight: 1.65, maxWidth: "28rem", margin: "0 auto" }}>
            {subtitle}
          </p>
          {children}
        </m.div>
      </div>
    </section>
  );
};

export default PageHero;
