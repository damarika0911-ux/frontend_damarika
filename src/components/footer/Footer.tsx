import React from "react";
import { useNavigate } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import logo from "../../assets/newLogo.svg";

const navLinks = [
  { label: "Home", route: "" },
  { label: "About", route: "about" },
  { label: "Services", route: "services" },
  { label: "Programs", route: "programs" },
  { label: "Products", route: "products" },
  { label: "Contact", route: "contact" },
];

const socialLinks = [
  { icon: EmailIcon, href: "mailto:damarika0911@gmail.com", label: "Email" },
  { icon: LocalPhoneIcon, href: "tel:+917418859886", label: "Phone" },
  { icon: InstagramIcon, href: "https://www.instagram.com/teamdamarika?igsh=czl4OHM3Zmd4OWdk", label: "Instagram" },
  { icon: YouTubeIcon, href: "https://www.youtube.com/@damarika", label: "YouTube" },
  { icon: FacebookIcon, href: "https://www.facebook.com/share/191PyLK6SF/", label: "Facebook" },
  { icon: XIcon, href: "https://x.com/TeamDamarika?t=AVnvxCOSqHsJMNQEwmsA9w&s=09", label: "X" },
];

function Footer() {
  const navigate = useNavigate();
  const go = (route: string) => {
    navigate(`/${route}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer role="contentinfo" aria-label="Site footer" style={{ background: "#1a0e05" }}>
      {/* CTA Banner */}
      <div style={{ background: "linear-gradient(135deg, #6d3a1f 0%, #8b4513 50%, #a0522d 100%)", padding: "3.5rem 0" }}>
        <div className="section-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.25rem" }}>
          <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#fff", margin: 0 }}>
            Ready to Explore the Past?
          </h2>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", maxWidth: "28rem", margin: 0, lineHeight: 1.6 }}>
            Join us in our mission to promote awareness of archaeology and heritage across Tamil Nadu.
          </p>
          <button
            onClick={() => go("contact")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#6d3a1f";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              background: "transparent",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.8125rem",
              fontFamily: "'DM Sans', sans-serif",
              padding: "0.625rem 1.75rem",
              borderRadius: "2rem",
              border: "1.5px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            Get in Touch
            <ArrowOutwardIcon style={{ fontSize: "0.875rem" }} />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-container" style={{ paddingTop: "3rem", paddingBottom: "2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem" }} className="footer-grid">
          {/* Brand Column */}
          <div>
            <img
              src={logo}
              alt="Damarika"
              style={{ width: "8.5rem", marginBottom: "1rem", filter: "brightness(0) invert(1)", opacity: 0.85 }}
            />
            <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "18rem", marginBottom: "1.5rem" }}>
              Creating awareness about archaeology, heritage management and museums through seminars, lectures and workshops.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={social.href}
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "0.625rem",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                    textDecoration: "none",
                  }}
                >
                  <social.icon sx={{ fontSize: "1rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>
              Navigation
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {navLinks.map((link) => (
                <li key={link.route}>
                  <a
                    href={`/${link.route}`}
                    onClick={(e) => { e.preventDefault(); go(link.route); }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.paddingLeft = "0.25rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                    style={{
                      fontSize: "0.8125rem",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(255,255,255,0.45)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>
              Programs
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Archaeological Tours", "Student Workshops", "Heritage Conservation", "Field Training"].map((item) => (
                <li key={item}>
                  <a
                    href="/programs"
                    onClick={(e) => { e.preventDefault(); go("programs"); }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.paddingLeft = "0.25rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                    style={{
                      fontSize: "0.8125rem",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(255,255,255,0.45)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>
              Contact
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <a
                href="mailto:damarika0911@gmail.com"
                style={{ fontSize: "0.8125rem", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                damarika0911@gmail.com
              </a>
              <a
                href="tel:+917418859886"
                style={{ fontSize: "0.8125rem", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                +91 74188 59886
              </a>
              <p style={{ fontSize: "0.8125rem", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.6 }}>
                Tamil University,<br />
                Thanjavur, Tamil Nadu,<br />
                India - 613010
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-container" style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            &copy; {new Date().getFullYear()} Damarika. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.2)", margin: 0 }}>
            Tamil Nadu, India
          </p>
        </div>
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.75rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

export default React.memo(Footer);
