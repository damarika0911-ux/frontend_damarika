/**
 * Cookie consent + Google Analytics 4.
 *
 * - Nothing from Google Analytics loads until the visitor clicks "Accept".
 * - GA runs only when VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) is set at build time.
 * - UTM parameters (utm_source, utm_medium, utm_campaign, ...) on the landing URL are
 *   kept for the visit and sent with the first page view, so campaign links are
 *   attributed even if the visitor accepts cookies after navigating.
 * - IP anonymisation is on, and ad/personalisation signals are off.
 */
import { env } from "./env";

export type Consent = "accepted" | "rejected";
const KEY = "damarika-consent-v1";
const UTM_KEY = "damarika-utm";
const listeners = new Set<(c: Consent | null) => void>();

export const GA_ID = (env.VITE_GA_MEASUREMENT_ID || "").trim();

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(c: Consent | null) {
  try {
    if (c) localStorage.setItem(KEY, c);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: choice applies to this page view only */
  }
  if (c) document.documentElement.removeAttribute("data-needs-consent");
  else document.documentElement.setAttribute("data-needs-consent", "");
  if (c === "accepted") loadAnalytics();
  if (c === "rejected") disableAnalytics();
  listeners.forEach((fn) => fn(c));
}

export function onConsentChange(fn: (c: Consent | null) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Remember UTM params from the landing URL for this browser session. */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 100);
    }
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    /* ignore */
  }
}

function landingUtmQuery(): string {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? "?" + new URLSearchParams(JSON.parse(raw)).toString() : "";
  } catch {
    return "";
  }
}

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let loaded = false;
let firstHitSent = false;

function loadAnalytics() {
  if (!GA_ID || loaded) return;
  loaded = true;
  window[`ga-disable-${GA_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false, // SPA: page views are sent on each route change
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
  trackPageView(window.location.pathname);
}

function disableAnalytics() {
  if (!GA_ID) return;
  window[`ga-disable-${GA_ID}`] = true;
  // Remove GA cookies already set on this domain.
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const domain of ["", `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, "")}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
    }
  }
}

export function trackPageView(path: string) {
  if (!loaded || !window.gtag || getConsent() !== "accepted") return;
  const query = firstHitSent ? "" : landingUtmQuery() || window.location.search;
  firstHitSent = true;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path + query,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!loaded || !window.gtag || getConsent() !== "accepted") return;
  window.gtag("event", name, params);
}

/** Call once at startup. */
export function initConsent() {
  captureUtm();
  if (getConsent() === "accepted") loadAnalytics();
}

/** Re-open the cookie banner (footer "Cookie settings" link). */
export const openCookieSettings = () => {
  document.documentElement.setAttribute("data-needs-consent", "");
  window.dispatchEvent(new Event("open-cookie-settings"));
};
