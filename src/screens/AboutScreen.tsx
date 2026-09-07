import { m } from "framer-motion";
import placeholderIcon from "../assets/placeholder.svg";
import PageWrapper from "../components/common-components/PageWrapper";
import { useLocalStore, type SocialLink } from "../store/localStore";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};
const delay = (i: number) => ({
  duration: 0.5,
  delay: i * 0.1,
  ease: "easeOut" as const,
});

const socialIconMap: Record<string, string> = {
  Facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  "X (Twitter)": "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  YouTube: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z",
  WhatsApp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  Telegram: "M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  Website: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
};

const getSocialIcon = (platform: string) => {
  const path = socialIconMap[platform];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d={path} />
    </svg>
  );
};

const missionPoints = [
  "To create awareness about Archaeology, Heritage Management and Museums",
  "To conduct seminars, lectures and workshops related to archaeology",
  "To ensure job opportunities for degree holders of archaeology",
  "To provide archaeological tools for professionals and students",
];

const values = [
  {
    title: "Knowledge Sharing",
    desc: "Providing resources and training to future archaeologists.",
    icon: "01",
  },
  {
    title: "Integrity",
    desc: "Committed to preserving the history and integrity of ancient sites.",
    icon: "02",
  },
  {
    title: "Innovation",
    desc: "Using modern methods to protect and study the past.",
    icon: "03",
  },
];

const AboutPage = () => {
  const teamMembers = useLocalStore((s) => s.peopleData);

  return (
    <PageWrapper
      title="About Us"
      description="Learn about Damarika — founded by archaeology students from Tamil University, Thanjavur. Our mission is to promote heritage awareness through education and fieldwork."
      keywords="damarika about, archaeology team, Tamil Nadu heritage, Tamil University Thanjavur"
      path="/about"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Damarika",
        url: "https://www.damarika.in/about",
      }}
    >
      {/* ===== HERO ===== */}
      <section className="ab-hero">
        <div className="ab-hero-bg" />
        <div className="ab-hero-overlay" />
        <div className="section-container ab-hero-content">
          <m.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="ab-hero-label"
          >
            About Damarika
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="ab-hero-title"
          >
            We Bring the <span style={{ color: "#cd853f" }}>Past to Life</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="ab-hero-desc"
          >
            'DAMARIKA' — a Greek word which denotes Tamil Nadu in the book of
            "Periplus of Ethreyan Sea". Three archaeology students with a
            mission to promote heritage awareness.
          </m.p>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="ab-section-white">
        <div className="section-container">
          <div className="ab-mission-grid">
            <m.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="ab-label">Our Purpose</p>
              <h2 className="ab-heading">Our Mission</h2>
              <p className="ab-body">
                The primary purpose is to promote awareness and understanding of
                archaeology, heritage management and museums through seminars,
                lectures, and workshops.
              </p>
              <p className="ab-body" style={{ marginBottom: "1.25rem" }}>
                It also aims to support fostering self-employment opportunities
                and providing guidance for those interested in pursuing studies
                in archaeology.
              </p>
              <ul className="ab-list">
                {missionPoints.map((item, i) => (
                  <m.li
                    key={i}
                    {...fadeUp}
                    transition={delay(i)}
                    className="ab-list-item"
                  >
                    <span className="ab-dot" />
                    <span>{item}</span>
                  </m.li>
                ))}
              </ul>
            </m.div>
            <m.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ position: "relative" }}
            >
              <div className="ab-mission-img">
                <img
                  loading="lazy"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ak%202%20copy.png-8Z6GPuxt9GTiHJe6wrC4iK5IYTmx2y.jpeg"
                  alt="Damarika Team"
                />
              </div>
              <div className="ab-accent" />
            </m.div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="ab-section-cream">
        <div className="section-container">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="ab-section-header"
          >
            <p className="ab-label">What Drives Us</p>
            <h2 className="ab-heading">Our Values</h2>
          </m.div>
          <div className="ab-values-grid">
            {values.map((v, i) => (
              <m.div key={v.title} {...fadeUp} transition={delay(i)}>
                <div className="ab-value-card">
                  <div className="ab-value-num">{v.icon}</div>
                  <h3 className="ab-value-title">{v.title}</h3>
                  <p className="ab-value-desc">{v.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="ab-section-white">
        <div className="section-container">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="ab-section-header"
          >
            <p className="ab-label">Meet the Team</p>
            <h2 className="ab-heading">Our Team</h2>
            <p className="ab-sub">
              Three archaeology students who made this possible with the help of
              our department head Mr. V. Selvakumar.
            </p>
          </m.div>
          <div className="ab-team-grid">
            {teamMembers.length > 0 &&
              teamMembers.map((member, i) => (
                <m.div key={member.name} {...fadeUp} transition={delay(i)}>
                  <div className="ab-team-card group">
                    <div className="ab-team-img">
                      <img
                        loading="lazy"
                        src={member.image || placeholderIcon}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.6]"
                      />
                    </div>
                    {/* Bottom info - always visible, expands on hover */}
                    <div className="ab-team-bottom">
                      <h3 className="ab-team-name">{member.name}</h3>
                      <p className="ab-team-role">{member.title}</p>
                      <div className="ab-team-desc-wrap">
                        <p className="ab-team-desc">{member.description}</p>
                        {/* Contact info */}
                        <div className="ab-team-contact">
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="ab-team-contact-link">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                              </svg>
                              <span>{member.email}</span>
                            </a>
                          )}
                          {member.mobile && (
                            <a href={`tel:${member.mobile}`} className="ab-team-contact-link">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                              </svg>
                              <span>{member.mobile}</span>
                            </a>
                          )}
                        </div>
                        {/* Social links */}
                        {member.social_links && member.social_links.length > 0 && (
                          <div className="ab-team-socials">
                            {member.social_links.map((link: SocialLink, idx: number) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ab-team-social-icon"
                                title={link.platform}
                              >
                                {getSocialIcon(link.platform) || <span>{link.platform[0]}</span>}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </m.div>
              ))}
          </div>
        </div>
      </section>

      {/* ===== CSS ===== */}
      <style>{`
        /* Hero */
        .ab-hero { position: relative; display: flex; align-items: center; background: #0f0906; overflow: hidden; padding: 5rem 0 4.5rem; }
        .ab-hero-bg { position: absolute; inset: 0; background: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ak%201%20copy.png-Lpd2UAw8bQ6bt4PTMxlHo3mOc95Kbw.jpeg') center/cover; opacity: 0.2; }
        .ab-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,9,6,0.92) 0%, rgba(61,30,8,0.75) 50%, rgba(139,69,19,0.5) 100%); }
        .ab-hero-content { position: relative; z-index: 1; max-width: 40rem; }
        .ab-hero-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #cd853f; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 1rem; }
        .ab-hero-title { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .ab-hero-desc { font-size: clamp(0.8125rem, 2vw, 0.9375rem); color: rgba(255,255,255,0.5); max-width: 32rem; line-height: 1.75; }

        /* Sections */
        .ab-section-white { padding: 4rem 0; background: #fff; }
        .ab-section-cream { padding: 4rem 0; background: #faf8f5; }
        .ab-section-header { text-align: center; margin-bottom: 2.5rem; }
        .ab-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #b08968; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .ab-heading { font-size: clamp(1.375rem, 3.5vw, 2.125rem); font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .ab-sub { font-size: 0.875rem; color: #8b7355; max-width: 26rem; margin: 0 auto; }
        .ab-body { font-size: 0.9375rem; color: #52525b; line-height: 1.8; margin-bottom: 0.625rem; }

        /* Mission */
        .ab-mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .ab-mission-img { border-radius: 0.75rem; overflow: hidden; aspect-ratio: 4/3; }
        .ab-mission-img img { width: 100%; height: 100%; object-fit: cover; }
        .ab-accent { position: absolute; bottom: -0.5rem; right: -0.5rem; width: 4rem; height: 4rem; border-radius: 0.75rem; background: #cd853f; opacity: 0.12; z-index: -1; }
        .ab-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.625rem; }
        .ab-list-item { display: flex; align-items: flex-start; gap: 0.625rem; font-size: 0.8125rem; color: #52525b; }
        .ab-dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; background: #b08968; margin-top: 0.5rem; flex-shrink: 0; }

        /* Values */
        .ab-values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .ab-value-card { background: #fff; border-radius: 0.75rem; padding: 1.75rem 1.25rem; text-align: center; border: 1px solid #f0ebe4; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); height: 100%; }
        .ab-value-card:hover { box-shadow: 0 8px 24px rgba(109,58,31,0.08); transform: translateY(-3px); border-color: rgba(109,58,31,0.12); }
        .ab-value-num { width: 2.25rem; height: 2.25rem; border-radius: 50%; background: linear-gradient(135deg, rgba(205,133,63,0.15), rgba(109,58,31,0.08)); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; font-size: 0.75rem; font-weight: 700; color: #8b4513; font-family: 'DM Sans', sans-serif; }
        .ab-value-title { font-size: 0.9375rem; font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .ab-value-desc { font-size: 0.8125rem; color: #71717a; line-height: 1.55; }

        /* Team */
        .ab-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .ab-team-card { border-radius: 0.75rem; overflow: hidden; position: relative; cursor: pointer; transition: box-shadow 0.4s, transform 0.4s; }
        .ab-team-card:hover { box-shadow: 0 16px 40px rgba(109,58,31,0.15); transform: translateY(-6px); }
        .ab-team-img { aspect-ratio: 3/4; overflow: hidden; }

        /* Bottom bar - sits at bottom, expands on hover */
        .ab-team-bottom { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem 1.25rem; text-align: center; z-index: 2; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 60%, transparent 100%); transition: padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s; }
        .ab-team-card:hover .ab-team-bottom { padding: 2rem 1.25rem 1.25rem; background: linear-gradient(to top, rgba(26,14,5,0.95) 0%, rgba(26,14,5,0.85) 50%, rgba(26,14,5,0.6) 80%, transparent 100%); }

        .ab-team-name { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.125rem; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .ab-team-card:hover .ab-team-name { transform: translateY(-0.25rem); }

        .ab-team-role { font-size: 0.6875rem; color: #cd853f; font-weight: 600; font-family: 'DM Sans', sans-serif; letter-spacing: 0.03em; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .ab-team-card:hover .ab-team-role { transform: translateY(-0.25rem); }

        /* Description - hidden by default, slides in on hover */
        .ab-team-desc-wrap { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease 0.1s, margin 0.4s; margin-top: 0; }
        .ab-team-card:hover .ab-team-desc-wrap { max-height: 10rem; opacity: 1; margin-top: 0.625rem; }
        .ab-team-desc { font-size: 0.8125rem; color: rgba(255,255,255,0.75); line-height: 1.6; }

        /* Contact info */
        .ab-team-contact { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.5rem; }
        .ab-team-contact-link { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; color: rgba(255,255,255,0.65); text-decoration: none; transition: color 0.2s; }
        .ab-team-contact-link:hover { color: #cd853f; }

        /* Social links */
        .ab-team-socials { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
        .ab-team-social-icon { display: flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 50%; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); text-decoration: none; transition: all 0.2s; font-size: 0.6875rem; font-weight: 600; }
        .ab-team-social-icon:hover { background: #cd853f; color: #fff; transform: scale(1.15); }

        /* Mobile */
        @media (max-width: 768px) {
          .ab-hero { padding: 3.5rem 0 3rem; }
          .ab-section-white, .ab-section-cream { padding: 2.75rem 0; }
          .ab-section-header { margin-bottom: 1.75rem; }
          .ab-mission-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .ab-mission-img { aspect-ratio: 16/9; }
          .ab-accent { display: none; }
          .ab-values-grid { grid-template-columns: repeat(3, 1fr); }
          .ab-team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ab-hero { padding: 3rem 0 2.5rem; }
          .ab-values-grid { grid-template-columns: 1fr; }
          .ab-team-grid { grid-template-columns: 1fr; }
          .ab-team-img { aspect-ratio: 4/5; }
        }
      `}</style>
    </PageWrapper>
  );
};

export default AboutPage;
