import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import BuildIcon from "@mui/icons-material/Build";
import GroupIcon from "@mui/icons-material/Group";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneIcon from "@mui/icons-material/Phone";
import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholderIcon from "../assets/placeholder.svg";
import wallpaper from "../assets/walpaper.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/common-components/Card";
import PageWrapper from "../components/common-components/PageWrapper";
import { TamilnaduMap } from "../components/tamilnadu-map/TamilnaduSvg";
import { getPeopleData, getPrograms } from "../service/apiService";
import { useAppStore } from "../store/appStore";
import { InlineSkeleton } from "./Loader";
import { useLocalStore } from "../store/localStore";

const services = [
  {
    title: "Archaeological Training",
    description:
      "Expert-led training programs in archaeology and heritage management",
    icon: MenuBookIcon,
  },
  {
    title: "Field Workshops",
    description:
      "Hands-on experience at archaeological sites across Tamil Nadu",
    icon: LocationOnIcon,
  },
  {
    title: "Tools & Equipment",
    description:
      "High-quality archaeological tools and supplies for professionals",
    icon: BuildIcon,
  },
  {
    title: "Student Programs",
    description:
      "Specialized programs for archaeology students and researchers",
    icon: GroupIcon,
  },
];

const contactInfo = [
  {
    label: "damarika0911@gmail.com",
    href: "mailto:damarika0911@gmail.com",
    icon: MailIcon,
  },
  { label: "+91 7418859886", href: "tel:+917418859886", icon: PhoneIcon },
  {
    label: "@teamdamarika",
    href: "https://www.instagram.com/teamdamarika?igsh=czl4OHM3Zmd4OWdk",
    icon: InstagramIcon,
  },
];

const stats = [
  { target: 45, suffix: "+", label: "Programs Conducted" },
  { target: 1000, suffix: "+", label: "Students Trained" },
  { target: 37, suffix: "", label: "Districts Mapped" },
];

const CountUp = ({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, interval);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

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

const HomeScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setProgramDetails = useAppStore((s) => s.setProgramDetails);
  const programs = useAppStore((s) => s.programDetails);
  const setPeopleData = useLocalStore((s) => s.setPeopleData);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const r = await getPrograms();
        if (r.success) setProgramDetails(r.data);
        else setError("Failed");
      } catch {
        setError("Error fetching programs");
      } finally {
        setLoading(false);
      }
    })();
    (async () => {
      try {
        const r = await getPeopleData();
        if (r.success) setPeopleData(r.data);
      } catch {}
    })();
  }, []);

  const displayPrograms = programs.slice(0, 3);
  const go = (r: string) => navigate(`/${r}`);

  return (
    <PageWrapper
      title="Home"
      description="Damarika promotes awareness of archaeology, heritage management and museums in Tamil Nadu through workshops, seminars, field training, and archaeological tools."
      keywords="damarika, archaeology, Tamil Nadu, heritage, workshops, seminars, excavation tools, Keeladi, Thanjavur"
      path="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Damarika - Home",
        description: "Your gateway to the world of archaeology",
        url: "https://www.damarika.in",
      }}
    >
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />
        <div className="hero-overlay" />

        <div className="section-container hero-content">
          <m.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-label"
          >
            Welcome to Damarika
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-title"
          >
            Your Gateway to the{" "}
            <span style={{ color: "#cd853f" }}>World of Archaeology</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-desc"
          >
            Creating a positive society, sensitive to history and heritage.
            Explore Tamil Nadu's rich archaeological treasures with us.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="hero-buttons"
          >
            <m.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go("programs")}
              className="btn-primary"
            >
              Discover Our Programs{" "}
              <ArrowOutwardIcon style={{ fontSize: "0.9375rem" }} />
            </m.button>
            <m.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go("contact")}
              className="btn-outline"
            >
              Contact Us
            </m.button>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="hero-stats"
          >
            {stats.map((stat, i) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
              >
                <p className="stat-num">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="stat-label">{stat.label}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="section-white">
        <div className="section-container">
          <div className="about-grid">
            <m.div
              {...fadeUp}
              transition={{ duration: 0.6 }}
              style={{ position: "relative" }}
            >
              <div className="about-image">
                <img
                  loading="lazy"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ak%201%20copy.png-Lpd2UAw8bQ6bt4PTMxlHo3mOc95Kbw.jpeg"
                  alt="Damarika Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="about-accent" />
            </m.div>
            <m.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <p className="section-label">About Us</p>
              <h2 className="section-heading">Who We Are</h2>
              <p className="body-text">
                We started the company 'DAMARIKA' — a Greek word which denotes
                Tamil Nadu in the book of "Periplus of Ethreyan Sea". Our team
                consists of three archaeology students who made this possible
                with our department head Mr. V. Selvakumar sir.
              </p>
              <p className="body-text" style={{ marginBottom: "1.25rem" }}>
                The primary purpose is to promote awareness and understanding of
                archaeology, heritage management and museums through seminars,
                lectures and workshops.
              </p>
              <m.p
                whileHover={{ x: 4 }}
                onClick={() => go("about")}
                className="link-arrow"
              >
                Learn more about us{" "}
                <ArrowForwardIcon style={{ fontSize: "1rem" }} />
              </m.p>
            </m.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-cream">
        <div className="section-container">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <p className="section-label">What We Offer</p>
            <h2 className="section-heading">Our Services</h2>
          </m.div>
          <div className="grid-4col">
            {services.map((s, i) => (
              <m.div key={s.title} {...fadeUp} transition={delay(i)}>
                <div className="service-card" onClick={() => go("services")}>
                  <div className="service-icon">
                    <s.icon
                      style={{ fontSize: "1.375rem", color: "#8b4513" }}
                    />
                  </div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.description}</p>
                </div>
              </m.div>
            ))}
          </div>
          <m.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ textAlign: "center", marginTop: "2.5rem" }}
          >
            <m.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go("services")}
              className="btn-ghost"
            >
              View All Services
            </m.button>
          </m.div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="section-white">
        <div className="section-container">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <p className="section-label">Learn & Grow</p>
            <h2 className="section-heading">Our Programs</h2>
            <p className="section-sub">
              Explore our educational workshops and training sessions
            </p>
          </m.div>

          {loading ? (
            <InlineSkeleton cards={3} cols={3} />
          ) : error ? (
            <p style={{ textAlign: "center", color: "#ef4444" }}>{error}</p>
          ) : displayPrograms.length === 0 ? (
            <p style={{ textAlign: "center", color: "#a1a1aa" }}>
              No programs available at the moment.
            </p>
          ) : (
            <>
              <div className="grid-3col">
                {displayPrograms.map((p, i) => (
                  <m.div key={p.id} {...fadeUp} transition={delay(i)}>
                    <Card
                      className="h-full group overflow-hidden program-card"
                      onClick={() => {
                        navigate("/programs");
                        useAppStore.getState().setActiveProgramId(p.id);
                      }}
                    >
                      <div className="program-image">
                        <img
                          loading="lazy"
                          src={p.image || placeholderIcon}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <CardContent sx={{ padding: "1.25rem" }}>
                        <CardTitle
                          style={{
                            marginBottom: "0.5rem",
                            fontSize: "1rem",
                            color: "#1a0e05",
                          }}
                        >
                          {p.title}
                        </CardTitle>
                        <CardDescription
                          style={{
                            fontSize: "0.8125rem",
                            lineHeight: 1.6,
                            color: "#71717a",
                          }}
                        >
                          {p.description.length > 120
                            ? p.description.substring(0, 120) + "..."
                            : p.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </m.div>
                ))}
              </div>
              <m.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ textAlign: "center", marginTop: "2.5rem" }}
              >
                <m.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => go("programs")}
                  className="btn-primary-sm"
                >
                  View all programs{" "}
                  <ArrowForwardIcon style={{ fontSize: "0.9375rem" }} />
                </m.button>
              </m.div>
            </>
          )}
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="section-dark">
        <div className="section-container">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <p className="section-label" style={{ color: "#cd853f" }}>
              Discover Heritage
            </p>
            <h2 className="section-heading" style={{ color: "#fff" }}>
              Archaeological Sites of Tamil Nadu
            </h2>
            <p
              className="section-sub"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Click on any site marker to explore details
            </p>
          </m.div>
          <TamilnaduMap />
        </div>
      </section>

      {/* ===== CONTACT BANNER ===== */}
      <section style={{ padding: "3rem 0", background: "#fff" }}>
        <div className="section-container">
          <m.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="contact-banner"
          >
            <div className="contact-banner-text">
              <h2
                style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.625rem)",
                  fontWeight: 700,
                  color: "#1a0e05",
                  marginBottom: "0.25rem",
                }}
              >
                Have questions? Let's talk.
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "#8b7355" }}>
                Reach out through any of these channels
              </p>
            </div>
            <div className="contact-links">
              {contactInfo.map((item, i) => (
                <m.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fadeUp}
                  transition={delay(i)}
                  className="contact-link"
                >
                  <item.icon style={{ fontSize: "1rem", color: "#8b4513" }} />
                  <span>{item.label}</span>
                </m.a>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* ===== CSS ===== */}
      <style>{`
        /* Hero */
        .hero-section { position: relative; display: flex; align-items: center; background: #0f0906; overflow: hidden; min-height: min(92vh, 52rem); padding: 2rem 0; }
        .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.25; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,9,6,0.9) 0%, rgba(61,30,8,0.7) 50%, rgba(139,69,19,0.5) 100%); }
        .hero-content { position: relative; z-index: 1; width: 100%; max-width: 44rem; }
        .hero-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #cd853f; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 1rem; }
        .hero-title { font-size: clamp(1.75rem, 6vw, 3.75rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .hero-desc { font-size: clamp(0.875rem, 2vw, 1.0625rem); color: rgba(255,255,255,0.55); max-width: 30rem; line-height: 1.7; margin-bottom: 1.5rem; }
        .hero-buttons { display: flex; flex-wrap: wrap; gap: 0.625rem; margin-bottom: 2rem; }
        .hero-stats { display: flex; flex-wrap: wrap; gap: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.08); }
        .stat-num { font-size: 1.25rem; font-weight: 700; color: #cd853f; margin-bottom: 0; font-family: 'DM Sans', sans-serif; }
        .stat-label { font-size: 0.6875rem; color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; }

        /* Countdown */
        .countdown-section { padding: 0; background: linear-gradient(135deg, #1a0e05 0%, #2d1810 50%, #3d1e08 100%); position: relative; overflow: hidden; }
        .countdown-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(205,133,63,0.08) 0%, transparent 60%); pointer-events: none; }
        .countdown-wrapper { position: relative; text-align: center; padding: 3rem 0; }
        .countdown-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #cd853f; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .countdown-heading { font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 700; color: #fff; margin-bottom: 2rem; }
        .countdown-grid { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }
        .countdown-card { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 5.5rem; height: 5.5rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; backdrop-filter: blur(8px); transition: transform 0.2s, border-color 0.2s; }
        .countdown-card:hover { transform: translateY(-2px); border-color: rgba(205,133,63,0.3); }
        .countdown-value { font-size: 2rem; font-weight: 800; color: #cd853f; line-height: 1; font-family: 'DM Sans', sans-serif; font-variant-numeric: tabular-nums; }
        .countdown-unit { font-size: 0.625rem; font-weight: 600; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.25rem; font-family: 'DM Sans', sans-serif; }

        @media (max-width: 480px) {
          .countdown-card { width: 4.5rem; height: 4.5rem; }
          .countdown-value { font-size: 1.5rem; }
          .countdown-wrapper { padding: 2rem 0; }
        }

        /* Buttons */
        .btn-primary { display: inline-flex; align-items: center; gap: 0.375rem; background: #cd853f; color: #1a0e05; font-weight: 700; padding: 0.7rem 1.5rem; font-size: 0.8125rem; font-family: 'DM Sans', sans-serif; border-radius: 2rem; border: none; cursor: pointer; letter-spacing: -0.01em; }
        .btn-outline { display: inline-flex; align-items: center; gap: 0.375rem; background: transparent; color: #fff; font-weight: 600; padding: 0.7rem 1.5rem; font-size: 0.8125rem; font-family: 'DM Sans', sans-serif; border-radius: 2rem; border: 1.5px solid rgba(255,255,255,0.2); cursor: pointer; }
        .btn-ghost { background: transparent; color: #6d3a1f; font-weight: 600; font-size: 0.8125rem; font-family: 'DM Sans', sans-serif; border: 1.5px solid rgba(109,58,31,0.15); padding: 0.625rem 1.5rem; border-radius: 2rem; cursor: pointer; }
        .btn-primary-sm { display: inline-flex; align-items: center; gap: 0.375rem; background: #6d3a1f; color: #fff; font-weight: 600; font-size: 0.8125rem; font-family: 'DM Sans', sans-serif; padding: 0.625rem 1.5rem; border-radius: 2rem; border: none; cursor: pointer; }

        /* Sections */
        .section-white { padding: 4rem 0; background: #fff; }
        .section-cream { padding: 4rem 0; background: #faf8f5; }
        .section-dark { padding: 4rem 0; background: linear-gradient(135deg, #1a0e05 0%, #3d1e08 40%, #6d3a1f 100%); }
        .section-header { text-align: center; margin-bottom: 2.5rem; }
        .section-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #b08968; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .section-heading { font-size: clamp(1.375rem, 3.5vw, 2.125rem); font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .section-sub { font-size: 0.875rem; color: #8b7355; max-width: 26rem; margin: 0 auto; }
        .body-text { font-size: 0.9375rem; color: #52525b; line-height: 1.8; margin-bottom: 0.625rem; }
        .link-arrow { display: inline-flex; align-items: center; cursor: pointer; color: #6d3a1f; font-weight: 600; font-size: 0.875rem; gap: 0.375rem; font-family: 'DM Sans', sans-serif; }

        /* About */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .about-image { border-radius: 0.75rem; overflow: hidden; aspect-ratio: 4/3; }
        .about-accent { position: absolute; bottom: -0.5rem; right: -0.5rem; width: 4rem; height: 4rem; border-radius: 0.75rem; background: #cd853f; opacity: 0.12; z-index: -1; }

        /* Grids */
        .grid-4col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .grid-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }

        /* Service card */
        .service-card { background: #fff; border-radius: 0.75rem; padding: 1.5rem 1.25rem; text-align: center; border: 1px solid #f0ebe4; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); height: 100%; }
        .service-card:hover { box-shadow: 0 8px 24px rgba(109,58,31,0.08); border-color: rgba(109,58,31,0.15); transform: translateY(-3px); }
        .service-icon { width: 2.75rem; height: 2.75rem; border-radius: 0.75rem; background: linear-gradient(135deg, rgba(205,133,63,0.12), rgba(109,58,31,0.08)); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; }
        .service-title { font-weight: 600; margin-bottom: 0.375rem; font-size: 0.875rem; color: #1a0e05; }
        .service-desc { font-size: 0.8125rem; color: #71717a; line-height: 1.55; }

        /* Program card */
        .program-card { border: 1px solid #f0ebe4; border-radius: 0.75rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .program-card:hover { box-shadow: 0 8px 24px rgba(109,58,31,0.08); transform: translateY(-3px); }
        .program-image { height: 12rem; overflow: hidden; }

        /* Contact banner */
        .contact-banner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 2rem 2.5rem; background: #faf8f5; border-radius: 1rem; border: 1px solid #f0ebe4; }
        .contact-banner-text { flex-shrink: 0; }
        .contact-links { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
        .contact-link { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: #52525b; font-size: 0.8125rem; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: color 0.15s; }
        .contact-link:hover { color: #6d3a1f; }

        /* ===== MOBILE ===== */
        @media (max-width: 1024px) {
          .grid-4col { grid-template-columns: repeat(2, 1fr); }
          .grid-3col { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero-section { min-height: auto; padding: 3.5rem 0 2.5rem; }
          .hero-title { margin-bottom: 0.75rem; }
          .hero-desc { margin-bottom: 1.25rem; }
          .hero-buttons { margin-bottom: 1.5rem; }
          .hero-stats { gap: 1.25rem; }
          .stat-num { font-size: 1.125rem; }
          .about-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .about-image { aspect-ratio: 16/9; }
          .about-accent { display: none; }
          .section-white, .section-cream, .section-dark { padding: 2.75rem 0; }
          .section-header { margin-bottom: 1.75rem; }
          .grid-3col { grid-template-columns: 1fr; }
          .program-image { height: 10rem; }
          .contact-banner { flex-direction: column; text-align: center; padding: 1.5rem; gap: 1.25rem; }
          .contact-links { justify-content: center; gap: 1rem; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 3rem 0 2rem; }
          .hero-buttons { flex-direction: column; }
          .btn-primary, .btn-outline { width: 100%; justify-content: center; }
          .grid-4col { grid-template-columns: 1fr; }
          .grid-3col { grid-template-columns: 1fr; }
          .contact-links { flex-direction: column; align-items: center; }
        }
      `}</style>
    </PageWrapper>
  );
};

export default HomeScreen;
