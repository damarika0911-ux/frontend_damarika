import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Card, CardContent, CardFooter } from "../components/common-components/Card";
import { ActionButton as Button } from "../components/common-components/Button";
import { Badge } from "../components/common-components/Badge";
import PageWrapper from "../components/common-components/PageWrapper";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import placeholderIcon from "../assets/placeholder.svg";
import { useAppStore } from "../store/appStore";
import { InlineSkeleton } from "./Loader";
import { getProducts } from "../service/apiService";
import toolsIcon from "../assets/tools.jpeg";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };
const delay = (i: number) => ({ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const });

const ProductsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setProductDetails = useAppStore((s) => s.setProductDetails);
  const products = useAppStore((s) => s.productDetails);

  useEffect(() => {
    (async () => {
      try { setLoading(true); const r = await getProducts(); if (r.success) setProductDetails(r.data); else setError("Failed"); } catch { setError("Error"); } finally { setLoading(false); }
    })();
  }, []);

  return (
    <PageWrapper title="Archaeological Tools" description="Shop handmade arts and professional-grade archaeological tools — excavation equipment, soil analysis tools, preservation kits, and miniature tools for fieldwork." keywords="archaeological tools, excavation equipment, archaeology supplies, handmade arts, field tools, preservation tools" path="/products" jsonLd={{ "@context": "https://schema.org", "@type": "CollectionPage", "name": "Damarika Archaeological Tools", "url": "https://www.damarika.in/products" }}>

      {/* Hero */}
      <section className="pd-hero">
        <div className="pd-hero-overlay" />
        <div className="section-container pd-hero-content">
          <m.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="pd-label" style={{ color: "#cd853f" }}>
            Shop & Equip
          </m.p>
          <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="pd-hero-title">
            Archaeological <span style={{ color: "#cd853f" }}>Tools & Equipment</span>
          </m.h1>
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="pd-hero-desc">
            Handmade arts and professional-grade excavation tools for students and archaeologists.
          </m.p>
        </div>
      </section>

      {/* Tools Description */}
      <section className="pd-section-white">
        <div className="section-container">
          <div className="pd-info-grid">
            <m.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="pd-label">Professional Grade</p>
              <h2 className="pd-heading">Excavation Tools and Supplies</h2>
              <p className="pd-body">We offer high-quality excavation tools and equipment, including soil analysis tools, preservation tools for ancient artifacts, specialized fieldwork and research kits, and miniature tools.</p>
              <p className="pd-body">All our products are carefully selected to meet professional standards and are suitable for both students and experienced archaeologists.</p>
            </m.div>
            <m.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} style={{ position: "relative" }}>
              <div className="pd-info-img"><img loading="lazy" src={toolsIcon} alt="Archaeological Tools" /></div>
              <div className="pd-accent" />
            </m.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pd-section-cream">
        <div className="section-container">
          <m.div {...fadeUp} transition={{ duration: 0.5 }} className="pd-section-header">
            <p className="pd-label">Shop Now</p>
            <h2 className="pd-heading">Featured Products</h2>
            <p className="pd-sub">Our most popular archaeological tools</p>
          </m.div>

          {loading ? (
            <InlineSkeleton cards={4} cols={4} />
          ) : error ? (
            <p style={{ textAlign: "center", color: "#ef4444" }}>{error}</p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#8b7355" }}>No products available at the moment.</p>
          ) : (
            <div className="pd-grid">
              {products.map((p, i) => (
                <m.div key={p.title} {...fadeUp} transition={delay(i)}>
                  <Card className="h-full flex flex-col group overflow-hidden pd-card">
                    <div className="pd-card-img">
                      <img loading="lazy" src={p?.image || placeholderIcon} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      {p.badge && <Badge sx={{ background: "#6d3a1f", position: "absolute", top: "0.5rem", right: "0.5rem", fontSize: "0.625rem" }}>{p.badge}</Badge>}
                    </div>
                    <CardContent sx={{ padding: "1rem", flex: 1 }}>
                      <h3 className="pd-card-title">{p.title}</h3>
                      <p className="pd-card-desc">{p.description}</p>
                      <p className="pd-card-price">₹{p.price}</p>
                    </CardContent>
                    <CardFooter style={{ padding: "0 1rem 1rem" }}>
                      <Button className="w-full" variant="outlined"
                        style={{ background: "#6d3a1f", color: "#fff", fontWeight: 600, fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", padding: "0.5rem 0.75rem", borderRadius: "2rem" }}
                        onClick={() => p?.link && window.open(p?.link, "_blank")}>
                        <ShoppingCartOutlinedIcon sx={{ height: "0.875rem", width: "0.875rem", marginRight: "0.375rem" }} />
                        Chat & Order
                      </Button>
                    </CardFooter>
                  </Card>
                </m.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .pd-hero { position: relative; background: #0f0906; overflow: hidden; padding: 5rem 0 4.5rem; }
        .pd-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,9,6,0.92) 0%, rgba(61,30,8,0.8) 50%, rgba(139,69,19,0.55) 100%); }
        .pd-hero-content { position: relative; z-index: 1; max-width: 42rem; }
        .pd-hero-title { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .pd-hero-desc { font-size: clamp(0.8125rem, 2vw, 0.9375rem); color: rgba(255,255,255,0.5); max-width: 32rem; line-height: 1.75; }

        .pd-section-white { padding: 4rem 0; background: #fff; }
        .pd-section-cream { padding: 4rem 0; background: #faf8f5; }
        .pd-section-header { text-align: center; margin-bottom: 2.5rem; }
        .pd-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #b08968; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .pd-heading { font-size: clamp(1.375rem, 3.5vw, 2.125rem); font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .pd-sub { font-size: 0.875rem; color: #8b7355; max-width: 26rem; margin: 0 auto; }
        .pd-body { font-size: 0.9375rem; color: #52525b; line-height: 1.75; margin-bottom: 0.625rem; }

        .pd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .pd-info-img { border-radius: 0.75rem; overflow: hidden; aspect-ratio: 4/3; }
        .pd-info-img img { width: 100%; height: 100%; object-fit: cover; }
        .pd-accent { position: absolute; bottom: -0.5rem; right: -0.5rem; width: 4rem; height: 4rem; border-radius: 0.75rem; background: #cd853f; opacity: 0.12; z-index: -1; }

        .pd-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .pd-card { border: 1px solid #f0ebe4; border-radius: 0.75rem; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .pd-card:hover { box-shadow: 0 8px 24px rgba(109,58,31,0.08); transform: translateY(-3px); }
        .pd-card-img { height: 11rem; overflow: hidden; position: relative; }
        .pd-card-title { font-weight: 700; font-size: 0.875rem; margin-bottom: 0.25rem; color: #1a0e05; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .pd-card-desc { font-size: 0.75rem; color: #71717a; margin-bottom: 0.5rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pd-card-price { font-weight: 700; font-size: 1rem; color: #6d3a1f; font-family: 'DM Sans', sans-serif; }

        @media (max-width: 1024px) { .pd-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .pd-hero { padding: 3.5rem 0 3rem; }
          .pd-section-white, .pd-section-cream { padding: 2.75rem 0; }
          .pd-section-header { margin-bottom: 1.75rem; }
          .pd-info-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .pd-info-img { aspect-ratio: 16/9; }
          .pd-accent { display: none; }
          .pd-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) { .pd-hero { padding: 3rem 0 2.5rem; } .pd-grid { grid-template-columns: 1fr; } }
      `}</style>
    </PageWrapper>
  );
};

export default ProductsPage;
