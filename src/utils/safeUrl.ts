/**
 * Links come from the admin panel (program "Register", product "Chat & Order", team social links).
 * Only allow web, email and phone links so a bad value like "javascript:..." can never run in a visitor's browser.
 */
const ALLOWED = ["http:", "https:", "mailto:", "tel:"];

export function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v || v === ",") return null;
  try {
    const url = new URL(v);
    return ALLOWED.includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

/** Open an external link in a new tab without giving that page access to ours (no reverse tabnabbing). */
export function openExternal(value: unknown) {
  const url = safeUrl(value);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}
