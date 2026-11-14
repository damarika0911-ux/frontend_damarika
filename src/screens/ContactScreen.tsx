import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/common-components/Input";
import { Label } from "../components/common-components/Label";
import { Textarea } from "../components/common-components/Textarea";
import PageWrapper from "../components/common-components/PageWrapper";
import { useMutation } from "@tanstack/react-query";
import { postContactForm } from "../service/apiService";
import { BUSINESS, whatsappLink } from "../utils/business";
import { getConsent, onConsentChange, trackEvent } from "../utils/consent";

const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d62719.63810961837!2d79.05687890222259!3d10.736226519868959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3baabeda0b7adc5b%3A0xda2b7c06ad7fa1b7!2sP3PX%2BF64%2C%20Tamil%20University%20Road%2C%20Thanjavur%2C%20Tamil%20Nadu%20613010!3m2!1d10.7361449!2d79.098079!5e0!3m2!1sen!2sin!4v1744571565888!5m2!1sen!2sin";
const EMPTY = { firstName: "", lastName: "", email: "", subject: "", message: "" };
const NO_ERRORS = { firstName: "", email: "", message: "", consent: "" };

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" className="ct-copy" onClick={copy} aria-label={copied ? `${label} copied` : `Copy ${label}`}>
      {copied ? <CheckIcon style={{ fontSize: "0.875rem" }} /> : <ContentCopyIcon style={{ fontSize: "0.875rem" }} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/** Google Maps sets cookies, so the map loads only after consent or an explicit click. */
function ConsentMap() {
  const [allowed, setAllowed] = useState(getConsent() === "accepted");
  useEffect(() => onConsentChange((c) => { if (c === "accepted") setAllowed(true); }), []);
  if (!allowed) {
    return (
      <div className="ct-map-placeholder">
        <LocationOnIcon style={{ fontSize: "2rem", color: "var(--brand-text)" }} />
        <p>The map is provided by Google and may set cookies.</p>
        <button type="button" className="ct-map-link" onClick={() => setAllowed(true)}>Load map</button>
      </div>
    );
  }
  return (
    <iframe title="Map: Tamil University, Thanjavur" src={MAP_SRC} width="100%" height="100%" style={{ border: 0, position: "absolute", inset: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
  );
}

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" } };
const del = (i: number) => ({ duration: 0.4, delay: i * 0.08, ease: "easeOut" as const });

export default function ContactPage() {
  const [formData, setFormData] = useState(EMPTY);
  const [consent, setConsentChecked] = useState(false);
  // Spam trap: hidden from people and screen readers; bots that fill every field reveal themselves.
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState(NO_ERRORS);
  const { mutateAsync: submitContact, isPending: isSubmitting } = useMutation({ mutationFn: postContactForm, retry: false });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status !== "idle") statusRef.current?.focus();
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
    if (errors[id as keyof typeof errors]) setErrors((p) => ({ ...p, [id]: "" }));
    if (status === "error") setStatus("idle");
  };

  const validateForm = () => {
    const n = { ...NO_ERRORS }; let ok = true;
    if (!formData.firstName.trim()) { n.firstName = "Please enter your first name."; ok = false; }
    if (!formData.email.trim()) { n.email = "Please enter your email address."; ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) { n.email = "That email address doesn't look right. Please check it."; ok = false; }
    if (!formData.message.trim()) { n.message = "Please write a message."; ok = false; }
    if (!consent) { n.consent = "Please tick this box before sending."; ok = false; }
    setErrors(n);
    if (!ok) {
      const first = (["firstName", "email", "message", "consent"] as const).find((k) => n[k]);
      if (first) document.getElementById(first)?.focus();
    }
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;
    setStatus("idle");
    try {
      await submitContact({ ...formData, email: formData.email.trim(), website });
      setStatus("success");
      setFormData(EMPTY);
      setConsentChecked(false);
      trackEvent("generate_lead", { method: "contact_form" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "";
      setServerError(/429|too many/i.test(msg) ? "You've sent several messages in a short time. Please wait 15 minutes and try again." : msg || "Something went wrong.");
      setStatus("error");
    }
  };

  const fieldA11y = (id: keyof typeof NO_ERRORS) => ({
    "aria-required": true,
    "aria-invalid": !!errors[id],
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
  });

  return (
    <PageWrapper title="Contact Us" description="Get in touch with Damarika for inquiries about archaeological programs, workshops, and tools. Located at Tamil University, Thanjavur, Tamil Nadu." keywords="contact damarika, archaeology contact, Tamil University Thanjavur" path="/contact" jsonLd={{ "@context": "https://schema.org", "@type": "ContactPage", "name": "Contact Damarika", "url": "https://damarika.in/contact" }}>

      {/* ===== HERO + CONTACT CARDS ===== */}
      <section className="ct-hero">
        <div className="ct-hero-overlay" />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="ct-hero-inner">
            <m.div initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="ct-hero-text">
              <p className="ct-tag" style={{ color: "#cd853f" }}>Get in Touch</p>
              <h1 className="ct-hero-title">Let's <span style={{ color: "#cd853f" }}>Connect</span></h1>
              <p className="ct-hero-desc">Have questions about our programs, workshops or tools? We'd love to hear from you.</p>
            </m.div>
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="ct-hero-cards">
              {contactInfo.map((item, i) => (
                <a key={i} href={item.href} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="ct-contact-card">
                  <div className="ct-contact-icon">{item.icon}</div>
                  <div>
                    <p className="ct-contact-label">{item.title}</p>
                    <p className="ct-contact-value">{item.details}</p>
                  </div>
                </a>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* ===== FORM + MAP ===== */}
      <section className="ct-section-white">
        <div className="section-container">
          <div className="ct-main-grid">
            {/* Form */}
            <m.div {...fadeUp} transition={{ duration: 0.5 }}>
              <div className="ct-form-wrap">
                <div className="ct-form-header">
                  <h2 className="ct-form-title">Send Us a Message</h2>
                  <p className="ct-form-sub">Fill out the form and we'll get back to you soon.</p>
                </div>
                {status === "success" ? (
                  <div ref={statusRef} tabIndex={-1} role="status" className="ct-success">
                    <CheckCircleIcon style={{ fontSize: "2.25rem" }} />
                    <p className="ct-success-title">Thank you! Your message has been sent.</p>
                    <p className="ct-success-text">We usually reply within 1–2 working days. For anything urgent, message us on WhatsApp.</p>
                    <button type="button" className="ct-map-link" onClick={() => setStatus("idle")}>Send another message</button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="ct-form" noValidate>
                  <p className="ct-required-note">Fields marked * are required.</p>
                  <div className="ct-hp" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>
                  {status === "error" && (
                    <div ref={statusRef} tabIndex={-1} role="alert" className="ct-alert">
                      <ErrorOutlineIcon style={{ fontSize: "1.25rem", flexShrink: 0 }} />
                      <div>
                        <p className="ct-alert-title">Your message wasn't sent.</p>
                        <p className="ct-alert-text">{serverError} Your text is still here, so you can try again, or reach us on <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a> or by <a href={`mailto:${BUSINESS.email}`}>email</a>.</p>
                      </div>
                    </div>
                  )}
                  <div className="ct-form-row">
                    <div className="ct-field">
                      <Label htmlFor="firstName">First name *</Label>
                      <Input id="firstName" autoComplete="given-name" value={formData.firstName} onChange={handleChange} placeholder="e.g. Priya" error={!!errors.firstName} inputProps={{ ...fieldA11y("firstName"), maxLength: 100 }} />
                      {errors.firstName && <p id="firstName-error" className="ct-error">{errors.firstName}</p>}
                    </div>
                    <div className="ct-field">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" autoComplete="family-name" value={formData.lastName} onChange={handleChange} placeholder="e.g. Kumar" inputProps={{ maxLength: 100 }} />
                    </div>
                  </div>
                  <div className="ct-field">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" error={!!errors.email} inputProps={{ ...fieldA11y("email"), maxLength: 254, inputMode: "email" }} />
                    {errors.email && <p id="email-error" className="ct-error">{errors.email}</p>}
                  </div>
                  <div className="ct-field">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" inputProps={{ maxLength: 255 }} />
                  </div>
                  <div className="ct-field">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your enquiry…" rows={5} multiline error={!!errors.message} inputProps={{ ...fieldA11y("message"), maxLength: 20000 }} />
                    {errors.message && <p id="message-error" className="ct-error">{errors.message}</p>}
                  </div>
                  <div className="ct-field">
                    <label className="ct-consent" htmlFor="consent">
                      <input id="consent" type="checkbox" checked={consent} onChange={(e) => { setConsentChecked(e.target.checked); if (errors.consent) setErrors((p) => ({ ...p, consent: "" })); }} {...fieldA11y("consent")} />
                      <span>
                        I agree that Damarika may use these details to reply to me, as described in the <Link to="/privacy">Privacy Policy</Link>. If I am under 18, my parent or guardian has agreed. *
                      </span>
                    </label>
                    {errors.consent && <p id="consent-error" className="ct-error">{errors.consent}</p>}
                  </div>
                  <m.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="ct-submit">
                    {isSubmitting ? <><span className="ct-spinner" aria-hidden="true" /> Sending…</> : <><SendIcon style={{ fontSize: "0.875rem" }} /> Send Message</>}
                  </m.button>
                </form>
                )}
              </div>
            </m.div>

            {/* Map side */}
            <m.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="ct-map-side">
              <div className="ct-map-card">
                <div className="ct-map">
                  <ConsentMap />
                </div>
                <div className="ct-map-info">
                  <div>
                    <h3 className="ct-map-title">Tamil University, Thanjavur</h3>
                    <p className="ct-map-address">Tamil University Road, Thanjavur,<br />Tamil Nadu 613010, India</p>
                  </div>
                  <a href="https://maps.google.com/?q=Tamil+University+Thanjavur" target="_blank" rel="noopener noreferrer" className="ct-map-link">
                    Directions <ArrowOutwardIcon style={{ fontSize: "0.75rem" }} />
                  </a>
                </div>
              </div>

              {/* Quick actions */}
              <div className="ct-quick">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="ct-quick-btn" onClick={() => trackEvent("contact_whatsapp", { location: "contact_page" })}>
                  <WhatsAppIcon style={{ fontSize: "0.875rem" }} /> WhatsApp
                </a>
                <a href={`mailto:${BUSINESS.email}`} className="ct-quick-btn">
                  <MailIcon style={{ fontSize: "0.875rem" }} /> Email Us
                </a>
                <a href={`tel:${BUSINESS.phoneE164}`} className="ct-quick-btn">
                  <PhoneIcon style={{ fontSize: "0.875rem" }} /> Call Us
                </a>
              </div>
              <ul className="ct-copy-list" aria-label="Copy contact details">
                <li><span>{BUSINESS.email}</span><CopyButton value={BUSINESS.email} label="email address" /></li>
                <li><span>{BUSINESS.phoneDisplay}</span><CopyButton value={BUSINESS.phoneE164} label="phone number" /></li>
              </ul>
            </m.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="ct-section-cream" id="faq" style={{ scrollMarginTop: "4rem" }}>
        <div className="section-container">
          <m.div {...fadeUp} transition={{ duration: 0.5 }} className="ct-section-header">
            <p className="ct-tag">Common Questions</p>
            <h2 className="ct-heading">Frequently Asked Questions</h2>
          </m.div>
          <div className="ct-faq-grid">
            {faqs.map((faq, i) => (
              <m.div key={i} {...fadeUp} transition={del(i)}>
                <Accordion disableGutters elevation={0} sx={{ borderRadius: "0.75rem !important", border: "1px solid var(--border)", "&:before": { display: "none" }, overflow: "hidden", bgcolor: "var(--surface)", transition: "box-shadow 0.25s", "&:hover": { boxShadow: "0 4px 20px rgba(109,58,31,0.06)" } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#cd853f", fontSize: "1.125rem" }} />} sx={{ px: 2.5, py: 0.25, minHeight: "3rem", "& .MuiAccordionSummary-content": { my: 1 } }}>
                    <span className="ct-faq-q">{faq.question}</span>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 2.5, pb: 2, pt: 0 }}>
                    <p className="ct-faq-a">{faq.answer}</p>
                  </AccordionDetails>
                </Accordion>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* Hero */
        .ct-hero { position: relative; background: #0f0906; overflow: hidden; padding: 4rem 0 3.5rem; }
        .ct-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,9,6,0.92) 0%, rgba(61,30,8,0.8) 50%, rgba(139,69,19,0.55) 100%); }
        .ct-hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .ct-hero-text {}
        .ct-hero-title { font-size: clamp(1.75rem, 5vw, 2.75rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
        .ct-hero-desc { font-size: 0.875rem; color: rgba(255,255,255,0.68); max-width: 24rem; line-height: 1.7; }

        .ct-hero-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .ct-contact-card { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 0.75rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); text-decoration: none; transition: background 0.2s, border-color 0.2s; }
        .ct-contact-card:hover { background: rgba(255,255,255,0.1); border-color: rgba(205,133,63,0.2); }
        .ct-contact-icon { width: 2.25rem; height: 2.25rem; border-radius: 0.625rem; background: rgba(205,133,63,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ct-contact-label { font-size: 0.5625rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.68); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.0625rem; }
        .ct-contact-value { font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.8); font-family: 'DM Sans', sans-serif; }

        /* Shared */
        .ct-tag { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: var(--label); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .ct-heading { font-size: clamp(1.375rem, 3.5vw, 2rem); font-weight: 700; color: var(--heading); }
        .ct-section-white { padding: 4rem 0; background: var(--surface); }
        .ct-section-cream { padding: 4rem 0; background: var(--page-alt); }
        .ct-section-header { text-align: center; margin-bottom: 2.5rem; }

        /* Form + Map */
        .ct-main-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2.5rem; align-items: start; }

        .ct-form-wrap { background: var(--surface); border-radius: 1rem; padding: 2rem; border: 1px solid var(--border); box-shadow: 0 2px 16px rgba(0,0,0,0.03); }
        .ct-form-header { margin-bottom: 1.5rem; }
        .ct-form-title { font-size: 1.25rem; font-weight: 700; color: var(--heading); margin-bottom: 0.25rem; }
        .ct-form-sub { font-size: 0.8125rem; color: var(--soft); }
        .ct-form { display: flex; flex-direction: column; gap: 0.875rem; }
        .ct-field { display: flex; flex-direction: column; gap: 0.25rem; }
        .ct-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; }
        .ct-error { color: var(--danger); font-size: 0.75rem; margin-top: 0.125rem; font-weight: 500; }
        .ct-hp { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }
        .ct-required-note { font-size: 0.75rem; color: var(--muted); margin: -0.5rem 0 0; }
        .ct-consent { display: flex; gap: 0.625rem; align-items: flex-start; font-size: 0.8125rem; color: var(--text); line-height: 1.55; cursor: pointer; }
        .ct-consent input { width: 1.125rem; height: 1.125rem; margin-top: 0.125rem; accent-color: var(--brand); flex-shrink: 0; cursor: pointer; }
        .ct-consent a { color: var(--brand-text); font-weight: 600; }
        .ct-alert { display: flex; gap: 0.625rem; padding: 0.875rem 1rem; border-radius: 0.75rem; background: var(--danger-bg); border: 1px solid var(--danger-border); color: var(--danger); outline: none; }
        .ct-alert-title { font-weight: 700; font-size: 0.875rem; margin: 0 0 0.125rem; }
        .ct-alert-text { font-size: 0.8125rem; margin: 0; color: var(--text); line-height: 1.55; }
        .ct-alert-text a { color: var(--brand-text); font-weight: 600; }
        .ct-spinner { width: 0.875rem; height: 0.875rem; border-radius: 50%; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; animation: ct-spin 0.7s linear infinite; }
        @keyframes ct-spin { to { transform: rotate(360deg); } }
        .ct-success-title { font-weight: 700; font-size: 1rem; margin: 0.5rem 0 0.25rem; color: var(--heading); }
        .ct-success-text { font-size: 0.8125rem; margin: 0 0 1rem; color: var(--text); }
        .ct-map-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; background: var(--page-alt); text-align: center; padding: 1rem; }
        .ct-map-placeholder p { font-size: 0.8125rem; color: var(--muted); margin: 0; }
        .ct-copy-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
        .ct-copy-list li { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.625rem 0.875rem; border-radius: 0.75rem; border: 1px solid var(--border); background: var(--surface); font-size: 0.8125rem; color: var(--heading); font-family: 'DM Sans', sans-serif; }
        .ct-copy-list span { overflow-wrap: anywhere; }
        .ct-copy { display: inline-flex; align-items: center; gap: 0.25rem; border: 1px solid var(--border); background: var(--page-alt); color: var(--brand-text); border-radius: 2rem; padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; flex-shrink: 0; }
        .ct-copy:hover { border-color: var(--brand-text); }
        .ct-submit { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 0.375rem; background: #6d3a1f; color: #fff; font-weight: 600; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; padding: 0.8rem 1.5rem; border-radius: 2rem; border: none; cursor: pointer; margin-top: 0.25rem; }
        .ct-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .ct-success { display: flex; flex-direction: column; align-items: center; outline: none; padding: 2rem 1.25rem; background: var(--success-bg); color: var(--success-text); border-radius: 0.75rem; text-align: center; font-size: 0.8125rem; border: 1px solid var(--success-border); font-weight: 500; }

        /* Map side */
        .ct-map-side { display: flex; flex-direction: column; gap: 1rem; }
        .ct-map-card { border-radius: 1rem; overflow: hidden; border: 1px solid var(--border); background: var(--surface); }
        .ct-map { aspect-ratio: 16/10; position: relative; }
        .ct-map-info { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; }
        .ct-map-title { font-size: 0.875rem; font-weight: 700; color: var(--heading); margin-bottom: 0.125rem; }
        .ct-map-address { font-size: 0.75rem; color: var(--muted); line-height: 1.45; }
        .ct-map-link { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.6875rem; font-weight: 600; color: var(--brand-text); font-family: 'DM Sans', sans-serif; text-decoration: none; padding: 0.4rem 0.875rem; border-radius: 2rem; border: 1px solid rgba(109,58,31,0.15); white-space: nowrap; transition: all 0.15s; }
        .ct-map-link:hover { background: rgba(109,58,31,0.04); border-color: rgba(109,58,31,0.25); }

        /* Quick action buttons */
        .ct-quick { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.625rem; }
        .ct-quick-btn { display: flex; align-items: center; justify-content: center; gap: 0.375rem; padding: 0.75rem 0.5rem; border-radius: 0.75rem; background: var(--page-alt); border: 1px solid var(--border); font-size: 0.75rem; font-weight: 600; color: var(--brand-text); font-family: 'DM Sans', sans-serif; text-decoration: none; transition: all 0.2s; }
        .ct-quick-btn:hover { background: var(--skeleton); border-color: rgba(109,58,31,0.15); transform: translateY(-1px); }

        /* FAQ */
        .ct-faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.875rem; max-width: 56rem; margin: 0 auto; }
        .ct-faq-q { font-weight: 600; color: var(--heading); font-size: 0.875rem; }
        .ct-faq-a { font-size: 0.8125rem; color: var(--muted); line-height: 1.7; }

        /* Mobile */
        @media (max-width: 1024px) {
          .ct-hero-inner { grid-template-columns: 1fr; gap: 2rem; }
          .ct-hero-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ct-hero { padding: 3.5rem 0 3rem; }
          .ct-hero-cards { grid-template-columns: 1fr 1fr; gap: 0.625rem; }
          .ct-contact-card { padding: 0.75rem; }
          .ct-section-white, .ct-section-cream { padding: 2.75rem 0; }
          .ct-main-grid { grid-template-columns: 1fr; gap: 2rem; }
          .ct-form-wrap { padding: 1.5rem; }
          .ct-form-row { grid-template-columns: 1fr; }
          .ct-quick { grid-template-columns: repeat(3, 1fr); }
          .ct-faq-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .ct-hero { padding: 3rem 0 2.5rem; }
          .ct-hero-cards { grid-template-columns: 1fr; }
          .ct-quick { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageWrapper>
  );
}

const contactInfo = [
  { icon: <MailIcon sx={{ fontSize: "1rem", color: "#cd853f" }} />, title: "Email", details: "damarika0911@gmail.com", href: "mailto:damarika0911@gmail.com" },
  { icon: <PhoneIcon sx={{ fontSize: "1rem", color: "#cd853f" }} />, title: "Phone", details: "+91 74188 59886", href: "tel:+917418859886" },
  { icon: <WhatsAppIcon sx={{ fontSize: "1rem", color: "#cd853f" }} />, title: "WhatsApp", details: "Chat with us", href: whatsappLink() },
  { icon: <InstagramIcon sx={{ fontSize: "1rem", color: "#cd853f" }} />, title: "Instagram", details: "@teamdamarika", href: "https://www.instagram.com/teamdamarika" },
  { icon: <LocationOnIcon sx={{ fontSize: "1rem", color: "#cd853f" }} />, title: "Address", details: "Thanjavur, Tamil Nadu", href: "https://maps.google.com/?q=Tamil+University+Thanjavur" },
];

const faqs = [
  { question: "What programs do you offer for students?", answer: "We offer introduction to archaeology, excavation techniques, temple architecture and epigraphy workshops tailored for students at different academic levels." },
  { question: "Do you conduct programs in Tamil?", answer: "Yes, we conduct all our programs in both Tamil and English to ensure accessibility for all participants." },
  { question: "How can I purchase archaeological tools?", answer: "Browse our products online and contact us directly for purchases. We also offer bulk orders for educational institutions." },
  { question: "Do you offer field trips to archaeological sites?", answer: "Yes, we organize guided tours to significant sites across Tamil Nadu, including Keeladi, Gangaikonda Cholapuram and other important locations." },
  { question: "Can you help with dissertation guidance?", answer: "We provide guidance to archaeology students for dissertations, helping with research methodology, documentation and analysis." },
  { question: "How can I register for your workshops?", answer: "Register through our website or contact us via email or phone. Early registration is recommended as spaces are limited." },
];
