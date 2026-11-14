import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { getConsent, onConsentChange, setConsent, trackEvent, trackPageView, type Consent } from "../../utils/consent";
import { whatsappLink } from "../../utils/business";

/** Thin bar at the very top showing how far down the page you are. */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${pct / 100})` }} aria-hidden="true" />;
}

/** Floating WhatsApp button + back-to-top button (appears after scrolling). */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  return (
    <div className="site-fab">
      <button
        type="button"
        className={`fab fab-top${showTop ? " is-visible" : ""}`}
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <KeyboardArrowUpIcon />
      </button>
      <a
        className="fab fab-whatsapp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens in a new tab)"
        onClick={() => trackEvent("contact_whatsapp", { location: "floating_button" })}
      >
        <WhatsAppIcon />
        <span className="fab-label">Chat with us</span>
      </a>
    </div>
  );
}

/** Sends a GA page view on every route change (only if the visitor accepted). */
export function RouteAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Wait a tick so react-helmet has updated document.title.
    const t = setTimeout(() => trackPageView(pathname), 50);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

/** Equal-weight Accept / Reject choice; reopened from the footer's "Cookie settings". */
export function CookieBanner() {
  const [consent, setLocal] = useState<Consent | null>(getConsent);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const off = onConsentChange((c) => {
      setLocal(c);
      if (c) setForced(false);
    });
    const open = () => setForced(true);
    window.addEventListener("open-cookie-settings", open);
    return () => {
      off();
      window.removeEventListener("open-cookie-settings", open);
    };
  }, []);

  if (consent && !forced) return null;

  return (
    <section className="cookie-banner" role="region" aria-label="Cookie consent">
      <p className="cookie-title">Cookies on Damarika</p>
      <p className="cookie-text">
        We use essential storage for your theme and this choice. With your permission, we also use Google Analytics to
        count visits and load the Google Map. Change this any time under "Cookie settings" in the footer.{" "}
        <Link to="/privacy#cookies">Cookie policy</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={() => setConsent("rejected")}>
          Reject optional
        </button>
        <button type="button" className="cookie-btn" onClick={() => setConsent("accepted")}>
          Accept all
        </button>
      </div>
    </section>
  );
}


/** Shared styles for the components above. */
export function SiteChromeStyles() {
  return (
    <style>{`
      .scroll-progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #cd853f, #8b4513); transform-origin: 0 50%; z-index: 60; pointer-events: none; }

      .site-fab { position: fixed; right: 1rem; bottom: 1rem; z-index: 55; display: flex; flex-direction: column; align-items: flex-end; gap: 0.625rem; }
      .fab { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; height: 3rem; min-width: 3rem; border-radius: 999px; border: none; cursor: pointer; text-decoration: none; box-shadow: 0 6px 20px rgba(0,0,0,0.18); transition: transform 0.2s, opacity 0.2s, box-shadow 0.2s; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.875rem; }
      .fab:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.22); }
      .fab-top { background: var(--surface); color: var(--brand-text); border: 1px solid var(--border); opacity: 0; transform: translateY(8px); pointer-events: none; }
      .fab-top.is-visible { opacity: 1; transform: none; pointer-events: auto; }
      .fab-whatsapp { background: #15803d; color: #fff; padding: 0 1.125rem 0 0.875rem; }
      .fab-whatsapp:hover { background: #166534; }
      @media (max-width: 640px) { .fab-label { display: none; } .fab-whatsapp { padding: 0; width: 3.25rem; height: 3.25rem; } }

      .cookie-banner { position: fixed; left: 1rem; bottom: 1rem; z-index: 58; max-width: 26rem; background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: 1rem; padding: 1.125rem 1.25rem; box-shadow: 0 12px 40px rgba(0,0,0,0.18); }
      .cookie-title { font-weight: 700; color: var(--heading); font-size: 0.9375rem; margin: 0 0 0.375rem; }
      .cookie-text { font-size: 0.8125rem; line-height: 1.6; margin: 0 0 0.875rem; }
      .cookie-text a { color: var(--brand-text); font-weight: 600; }
      .cookie-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
      .cookie-btn { padding: 0.625rem 0.75rem; border-radius: 2rem; font-size: 0.8125rem; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; background: var(--brand); color: #fff; border: 1px solid var(--brand); }
      .cookie-btn:hover { filter: brightness(1.1); }
      @media (max-width: 640px) { .cookie-banner { left: 0.75rem; right: 4.75rem; bottom: 0.75rem; max-width: none; padding: 0.875rem 1rem; border-radius: 0.875rem; } .cookie-title { display: none; } .cookie-text { font-size: 0.75rem; margin-bottom: 0.625rem; } .cookie-btn { padding: 0.5rem; } }
      @media (max-width: 380px) { .cookie-banner { right: 0.75rem; bottom: 4.75rem; } }
    `}</style>
  );
}
