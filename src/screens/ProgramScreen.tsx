import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import placeholderIcon from "../assets/placeholder.svg";
import { Badge } from "../components/common-components/Badge";
import PageWrapper from "../components/common-components/PageWrapper";
import { getPrograms } from "../service/apiService";
import { useAppStore } from "../store/appStore";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };
const del = (i: number) => ({ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const });

const ProgramsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setProgramDetails = useAppStore((s) => s.setProgramDetails);
  const programs = useAppStore((s) => s.programDetails);
  const setActiveProgramId = useAppStore((s) => s.setActiveProgramId);
  const id = useAppStore((s) => s.activeProgramId) ?? programs[0]?.id ?? 1;
  const otherPrograms = programs;
  const sel = id ? programs.find((p) => Number(p.id) === Number(id)) : null;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const r = await getPrograms();
        if (r.success && Array.isArray(r.data)) setProgramDetails(r.data);
        else setError("Failed to load programs");
      } catch { setError("Error fetching programs"); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return (
    <div className="pg-skeleton-page">
      {/* Skeleton hero */}
      <div className="pg-skeleton-hero">
        <div className="pg-skeleton-bar" style={{ width: "6rem", height: "0.625rem", marginBottom: "1rem" }} />
        <div className="pg-skeleton-bar" style={{ width: "16rem", height: "1.5rem", marginBottom: "0.75rem" }} />
        <div className="pg-skeleton-bar" style={{ width: "20rem", height: "0.75rem" }} />
      </div>
      {/* Skeleton detail */}
      <div className="pg-skeleton-detail">
        <div className="pg-skeleton-img" />
        <div className="pg-skeleton-content">
          <div className="pg-skeleton-bar" style={{ width: "70%", height: "1.25rem", marginBottom: "1rem" }} />
          <div className="pg-skeleton-bar" style={{ width: "100%", height: "0.625rem", marginBottom: "0.5rem" }} />
          <div className="pg-skeleton-bar" style={{ width: "90%", height: "0.625rem", marginBottom: "0.5rem" }} />
          <div className="pg-skeleton-bar" style={{ width: "60%", height: "0.625rem" }} />
        </div>
      </div>
      <style>{`
        .pg-skeleton-page { min-height: 100vh; }
        .pg-skeleton-hero { padding: 4rem 2.5rem 3rem; background: #1a0e05; }
        .pg-skeleton-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 3rem 2.5rem; }
        .pg-skeleton-img { aspect-ratio: 16/10; border-radius: 0.75rem; background: #f0ebe4; animation: pg-pulse 1.5s ease-in-out infinite; }
        .pg-skeleton-content { display: flex; flex-direction: column; justify-content: center; }
        .pg-skeleton-bar { border-radius: 0.375rem; animation: pg-pulse 1.5s ease-in-out infinite; }
        .pg-skeleton-hero .pg-skeleton-bar { background: rgba(255,255,255,0.08); }
        .pg-skeleton-detail .pg-skeleton-bar { background: #f0ebe4; }
        @keyframes pg-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          .pg-skeleton-detail { grid-template-columns: 1fr; }
          .pg-skeleton-hero { padding: 3rem 1.5rem 2.5rem; }
          .pg-skeleton-detail { padding: 2rem 1.5rem; }
        }
      `}</style>
    </div>
  );
  if (error) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#ef4444" }}>{error}</div>;

  const pick = (pid: number) => { setActiveProgramId(pid); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <PageWrapper title={sel ? sel.title : "Our Programs"} description="Explore Damarika's educational programs — archaeology workshops, field training sessions, seminars on Tamil Nadu heritage, and e-certificate courses." keywords="archaeology programs, archaeology workshops Tamil Nadu, field training, seminars, e-certificate course, archaeological awareness" path="/programs" jsonLd={{ "@context": "https://schema.org", "@type": "ItemList", "name": "Damarika Programs", "url": "https://www.damarika.in/programs", "numberOfItems": programs.length }}>

      {/* ===== HERO ===== */}
      <section className="pg-hero">
        <div className="pg-hero-overlay" />
        <div className="section-container" style={{ position: "relative", zIndex: 1, maxWidth: "42rem" }}>
          <m.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="pg-label" style={{ color: "#cd853f" }}>
            Learn & Grow
          </m.p>
          <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="pg-hero-title">
            Our <span style={{ color: "#cd853f" }}>Programs</span>
          </m.h1>
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="pg-hero-desc">
            Explore our educational programs and workshops designed to promote archaeological awareness
          </m.p>
        </div>
      </section>

      {/* ===== SELECTED PROGRAM DETAIL ===== */}
      {sel && (
        <section className="pg-detail-section">
          <div className="section-container">
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="pg-detail">
              {/* Image */}
              <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="pg-detail-left">
                <div className="pg-detail-img">
                  <img loading="lazy" src={sel.image || placeholderIcon} alt={sel.title} />
                </div>
                {/* Meta under image */}
                <div className="pg-meta-grid">
                  {sel.date && (
                    <div className="pg-meta-item">
                      <CalendarTodayIcon sx={{ fontSize: "1rem", color: "#8b4513" }} />
                      <div>
                        <span className="pg-meta-label">Date</span>
                        <span className="pg-meta-value">{new Date(sel.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                  {sel.duration && (
                    <div className="pg-meta-item">
                      <AccessTimeIcon sx={{ fontSize: "1rem", color: "#8b4513" }} />
                      <div>
                        <span className="pg-meta-label">Duration</span>
                        <span className="pg-meta-value">{sel?.sessions || 0} sessions ({sel.duration} hrs)</span>
                      </div>
                    </div>
                  )}
                  {sel.location && (
                    <div className="pg-meta-item">
                      <LocationOnIcon sx={{ fontSize: "1rem", color: "#8b4513" }} />
                      <div>
                        <span className="pg-meta-label">Location</span>
                        <span className="pg-meta-value">{sel.location}</span>
                      </div>
                    </div>
                  )}
                  {sel.participants && (
                    <div className="pg-meta-item">
                      <GroupIcon sx={{ fontSize: "1rem", color: "#8b4513" }} />
                      <div>
                        <span className="pg-meta-label">Participants</span>
                        <span className="pg-meta-value">Limited to {sel.participants}</span>
                      </div>
                    </div>
                  )}
                </div>
              </m.div>

              {/* Content */}
              <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="pg-detail-right">
                <div className="pg-detail-badges">
                  {sel.isFeatured && <Badge sx={{ background: "#cd853f", color: "#1a0e05", fontWeight: 700, fontSize: "0.625rem" }}>Featured</Badge>}
                </div>
                <h2 className="pg-detail-title">{sel.title}</h2>
                <p className="pg-detail-desc">{sel.description}</p>

                {sel.modules && sel.modules.trim() && (
                  <div className="pg-modules">
                    <h4 className="pg-modules-heading">Program Modules</h4>
                    <div className="pg-modules-list">
                      {sel.modules.split("\n").filter(Boolean).map((mod, i) => (
                        <m.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }} className="pg-module">
                          <span className="pg-module-num">{String(i + 1).padStart(2, "0")}</span>
                          <span className="pg-module-text">{mod}</span>
                        </m.div>
                      ))}
                    </div>
                  </div>
                )}

                {sel.link && sel.link !== "," && (
                  <m.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => window.open(sel.link, "_blank")} className="pg-btn-gold">
                    Register Now <ArrowOutwardIcon style={{ fontSize: "0.9375rem" }} />
                  </m.button>
                )}
              </m.div>
            </m.div>
          </div>
        </section>
      )}

      {/* ===== OTHER PROGRAMS ===== */}
      <section className="pg-section-cream">
        <div className="section-container">
          <m.div {...fadeUp} transition={{ duration: 0.5 }} className="pg-section-header">
            <p className="pg-label">Explore More</p>
            <h2 className="pg-heading">{sel ? "Other Programs" : "All Programs"}</h2>
            <p className="pg-sub">Join our upcoming workshops and seminars</p>
          </m.div>
          <div className="pg-grid">
            {otherPrograms.map((p, i) => (
              <m.div key={p.id} {...fadeUp} transition={del(i)}>
                <div className="pg-card group" onClick={() => pick(p.id)}>
                  <div className="pg-card-img">
                    <img loading="lazy" src={p.image || placeholderIcon} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="pg-card-overlay">
                      <span className="pg-card-date">
                        <CalendarTodayIcon style={{ width: "0.6875rem", height: "0.6875rem" }} />
                        {p.date ? new Date(p.date).toLocaleDateString() : "TBD"}
                      </span>
                      {p.location && (
                        <span className="pg-card-loc">
                          <LocationOnIcon style={{ width: "0.6875rem", height: "0.6875rem" }} />
                          {p.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="pg-card-body">
                    <h3 className="pg-card-title">{p.title}</h3>
                    <p className="pg-card-desc">{p.description}</p>
                    <span className="pg-card-link">
                      View Details <ArrowForwardIcon style={{ fontSize: "0.875rem" }} />
                    </span>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .pg-loader { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; gap: 0.75rem; }
        .pg-spinner { width: 2rem; height: 2rem; border-radius: 50%; border: 2px solid #f0ebe4; border-top-color: #8b4513; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .pg-loader p { font-size: 0.8125rem; color: rgba(139,69,19,0.4); }

        /* Hero */
        .pg-hero { position: relative; background: #0f0906; overflow: hidden; padding: 4.5rem 0 4rem; }
        .pg-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,9,6,0.92) 0%, rgba(61,30,8,0.8) 50%, rgba(139,69,19,0.55) 100%); }
        .pg-hero-title { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .pg-hero-desc { font-size: clamp(0.8125rem, 2vw, 0.9375rem); color: rgba(255,255,255,0.5); max-width: 32rem; line-height: 1.75; }

        /* Detail section */
        .pg-detail-section { padding: 3.5rem 0; background: #fff; }
        .pg-detail { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2.5rem; align-items: start; }
        .pg-detail-left {}
        .pg-detail-right {}

        .pg-detail-img { border-radius: 0.75rem; overflow: hidden; aspect-ratio: 16/10; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .pg-detail-img img { width: 100%; height: 100%; object-fit: cover; }

        .pg-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; margin-top: 1rem; }
        .pg-meta-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 0.75rem; background: #faf8f5; border-radius: 0.5rem; border: 1px solid #f0ebe4; }
        .pg-meta-label { display: block; font-size: 0.5625rem; text-transform: uppercase; letter-spacing: 0.1em; color: #8b7355; font-weight: 600; font-family: 'DM Sans', sans-serif; }
        .pg-meta-value { display: block; font-size: 0.8125rem; font-weight: 600; color: #1a0e05; }

        .pg-detail-badges { margin-bottom: 0.75rem; }
        .pg-detail-title { font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 700; color: #1a0e05; line-height: 1.2; margin-bottom: 1rem; }
        .pg-detail-desc { font-size: 0.9375rem; color: #52525b; line-height: 1.8; margin-bottom: 1.5rem; white-space: pre-line; }

        /* Modules */
        .pg-modules { margin-bottom: 1.75rem; padding: 1.25rem; background: #faf8f5; border-radius: 0.75rem; border: 1px solid #f0ebe4; }
        .pg-modules-heading { font-weight: 700; font-size: 0.875rem; color: #1a0e05; margin-bottom: 0.75rem; }
        .pg-modules-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .pg-module { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(240,235,228,0.6); }
        .pg-module:last-child { border-bottom: none; }
        .pg-module-num { font-size: 0.6875rem; font-weight: 700; color: #cd853f; font-family: 'DM Sans', sans-serif; flex-shrink: 0; min-width: 1.25rem; }
        .pg-module-text { font-size: 0.8125rem; color: #52525b; line-height: 1.55; }

        .pg-btn-gold { display: inline-flex; align-items: center; gap: 0.375rem; background: #cd853f; color: #1a0e05; font-weight: 700; padding: 0.75rem 2rem; font-size: 0.8125rem; font-family: 'DM Sans', sans-serif; border-radius: 2rem; border: none; cursor: pointer; }

        /* Shared */
        .pg-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #b08968; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .pg-section-cream { padding: 3.5rem 0; background: #faf8f5; }
        .pg-section-header { text-align: center; margin-bottom: 2.5rem; }
        .pg-heading { font-size: clamp(1.375rem, 3.5vw, 2.125rem); font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .pg-sub { font-size: 0.875rem; color: #8b7355; max-width: 26rem; margin: 0 auto; }

        /* Cards */
        .pg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .pg-card { border-radius: 0.75rem; overflow: hidden; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); background: #fff; border: 1px solid #f0ebe4; height: 100%; display: flex; flex-direction: column; }
        .pg-card:hover { box-shadow: 0 12px 32px rgba(109,58,31,0.1); transform: translateY(-4px); }
        .pg-card-img { height: 11rem; overflow: hidden; position: relative; flex-shrink: 0; }
        .pg-card-overlay { position: absolute; bottom: 0; left: 0; right: 0; display: flex; gap: 0.625rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
        .pg-card-date, .pg-card-loc { display: flex; align-items: center; gap: 0.25rem; color: rgba(255,255,255,0.85); font-size: 0.625rem; font-family: 'DM Sans', sans-serif; font-weight: 500; }
        .pg-card-body { padding: 1rem; display: flex; flex-direction: column; flex: 1; }
        .pg-card-title { font-size: 0.9375rem; font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .pg-card-desc { font-size: 0.8125rem; color: #71717a; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.75rem; flex: 1; }
        .pg-card-link { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 600; color: #6d3a1f; font-family: 'DM Sans', sans-serif; transition: gap 0.2s; }
        .pg-card:hover .pg-card-link { gap: 0.5rem; }

        /* Mobile */
        @media (max-width: 1024px) {
          .pg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .pg-hero { padding: 3.5rem 0 3rem; }
          .pg-detail-section { padding: 2.5rem 0; }
          .pg-detail { grid-template-columns: 1fr; gap: 1.5rem; }
          .pg-detail-img { aspect-ratio: 16/9; }
          .pg-section-cream { padding: 2.75rem 0; }
          .pg-section-header { margin-bottom: 1.75rem; }
          .pg-grid { grid-template-columns: repeat(2, 1fr); }
          .pg-card-img { height: 9rem; }
        }
        @media (max-width: 560px) {
          .pg-hero { padding: 3rem 0 2.5rem; }
          .pg-meta-grid { grid-template-columns: 1fr; }
          .pg-grid { grid-template-columns: 1fr; }
          .pg-card-img { height: 10rem; }
        }
      `}</style>
    </PageWrapper>
  );
};

export default ProgramsPage;
