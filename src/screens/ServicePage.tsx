import { m } from "framer-motion";
import PageWrapper from "../components/common-components/PageWrapper";
import { Book as BookIcon, Place as MapPinIcon, DesignServices as ToolIcon, People as UsersIcon, AccountBalance as BuildingIcon, History as HistoryIcon } from "@mui/icons-material";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };
const delay = (i: number) => ({ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const });

const services = [
  { title: "Archaeological Tours", description: "Guide tours to significant archaeological sites across Tamil Nadu.", icon: MapPinIcon, features: ["Visit to Keeladi excavation site", "Exploration of Gangaikonda Cholapuram", "Tours of Mahabalipuram monuments", "Visit to Adichanallur site", "Customized academic field trips"] },
  { title: "Student Programs", description: "Specialized programs for archaeology students and researchers.", icon: UsersIcon, features: ["Dissertation guidance", "Research methodology training", "Field documentation techniques", "Academic paper writing support", "Career guidance in archaeology"] },
  { title: "Educational Workshops", description: "Comprehensive workshops on various aspects of archaeology.", icon: BookIcon, features: ["Introduction to Archaeology", "Archaeological Excavation Methods", "Temple Architecture", "Introduction to Epigraphy", "Bilingual sessions (Tamil & English)"] },
  { title: "Historical Research", description: "Supporting research on Tamil Nadu's rich historical heritage.", icon: HistoryIcon, features: ["Maritime history research", "Ancient trade route studies", "Cultural heritage documentation", "Archaeological data analysis", "Publication of research findings"] },
  { title: "Heritage Conservation", description: "Preservation and conservation of historical monuments.", icon: BuildingIcon, features: ["Monument conservation awareness", "Documentation of heritage sites", "Community engagement programs", "Traditional conservation techniques", "Heritage management training"] },
  { title: "Archaeological Tools", description: "High-quality tools and equipment for fieldwork and research.", icon: ToolIcon, features: ["Excavation tools and supplies", "Soil analysis equipment", "Preservation tools for artifacts", "Specialized fieldwork kits", "Miniature tools for detailed work"] },
];

const ServicesPage = () => {
  return (
    <PageWrapper title="Our Services" description="Comprehensive archaeological services — guided tours, student programs, educational workshops, historical research, heritage conservation, and professional tools." keywords="archaeology services, archaeological tours Tamil Nadu, student programs, heritage conservation, excavation workshops, Keeladi tours" path="/services" jsonLd={{ "@context": "https://schema.org", "@type": "Service", "name": "Damarika Archaeological Services", "provider": { "@type": "Organization", "name": "Damarika" }, "areaServed": "Tamil Nadu, India", "url": "https://www.damarika.in/services" }}>

      {/* ===== HERO ===== */}
      <section className="sv-hero">
        <div className="sv-hero-overlay" />
        <div className="section-container sv-hero-content">
          <m.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="sv-hero-label">
            What We Do
          </m.p>
          <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="sv-hero-title">
            Comprehensive <span style={{ color: "#cd853f" }}>Archaeological Services</span>
          </m.h1>
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="sv-hero-desc">
            From educational workshops to heritage conservation — we offer everything you need to explore and protect Tamil Nadu's rich archaeological heritage.
          </m.p>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="sv-section-white">
        <div className="section-container">
          <m.div {...fadeUp} transition={{ duration: 0.5 }} className="sv-section-header">
            <p className="sv-label">Explore Our Offerings</p>
            <h2 className="sv-heading">Our Services</h2>
          </m.div>
          <div className="sv-grid">
            {services.map((service, i) => (
              <m.div key={service.title} {...fadeUp} transition={delay(i)}>
                <div className="sv-card">
                  <div className="sv-card-icon">
                    <service.icon style={{ fontSize: "1.375rem", color: "#8b4513" }} />
                  </div>
                  <h3 className="sv-card-title">{service.title}</h3>
                  <p className="sv-card-desc">{service.description}</p>
                  <ul className="sv-feature-list">
                    {service.features.map((f, j) => (
                      <li key={j} className="sv-feature-item">
                        <span className="sv-dot" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA removed — footer has one */}

      {/* ===== CSS ===== */}
      <style>{`
        /* Hero */
        .sv-hero { position: relative; background: #0f0906; overflow: hidden; padding: 5rem 0 4.5rem; }
        .sv-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,9,6,0.92) 0%, rgba(61,30,8,0.8) 50%, rgba(139,69,19,0.55) 100%); }
        .sv-hero-content { position: relative; z-index: 1; max-width: 42rem; }
        .sv-hero-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #cd853f; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 1rem; }
        .sv-hero-title { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .sv-hero-desc { font-size: clamp(0.8125rem, 2vw, 0.9375rem); color: rgba(255,255,255,0.5); max-width: 32rem; line-height: 1.75; }

        /* Sections */
        .sv-section-white { padding: 4rem 0; background: #fff; }
        .sv-section-header { text-align: center; margin-bottom: 2.5rem; }
        .sv-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #b08968; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .sv-heading { font-size: clamp(1.375rem, 3.5vw, 2.125rem); font-weight: 700; color: #1a0e05; }

        /* Grid */
        .sv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }

        /* Card */
        .sv-card { background: #fff; border-radius: 0.75rem; padding: 1.5rem 1.25rem; border: 1px solid #f0ebe4; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); height: 100%; }
        .sv-card:hover { box-shadow: 0 8px 24px rgba(109,58,31,0.08); border-color: rgba(109,58,31,0.12); transform: translateY(-3px); }
        .sv-card-icon { width: 2.75rem; height: 2.75rem; border-radius: 0.75rem; background: linear-gradient(135deg, rgba(205,133,63,0.12), rgba(109,58,31,0.08)); display: flex; align-items: center; justify-content: center; margin-bottom: 0.875rem; }
        .sv-card-title { font-size: 0.9375rem; font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .sv-card-desc { font-size: 0.8125rem; color: #71717a; line-height: 1.55; margin-bottom: 0.875rem; }
        .sv-feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4375rem; }
        .sv-feature-item { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8125rem; color: #52525b; }
        .sv-dot { width: 0.3125rem; height: 0.3125rem; border-radius: 50%; background: #b08968; margin-top: 0.45rem; flex-shrink: 0; }

        /* Mobile */
        @media (max-width: 1024px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .sv-hero { padding: 3.5rem 0 3rem; }
          .sv-section-white { padding: 2.75rem 0; }
          .sv-section-header { margin-bottom: 1.75rem; }
          .sv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .sv-hero { padding: 3rem 0 2.5rem; }
          .sv-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageWrapper>
  );
};

export default ServicesPage;
