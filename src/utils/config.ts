import { env } from "./env";

export const DAMARIKA_API_HOST =
  (env.VITE_DAMARIKA_API_HOST || (import.meta.env.DEV ? "http://localhost:3000/api/v2" : "https://api.damarika.in/api/v2")).replace(/\/+$/, "");

/** Parse image field — DB may store as JSON string '{"url":"..."}' or plain URL */
export function parseImageUrl(image: any): string {
  if (!image) return "";
  let url = "";
  if (typeof image === "object" && image.url) url = image.url;
  else if (typeof image === "string" && image.startsWith("{")) {
    try { url = JSON.parse(image).url || image; } catch { url = image; }
  } else if (typeof image === "string") {
    url = image;
  }
  // Fix mixed content: upgrade http to https for API images
  if (url.startsWith("http://api.damarika.in")) {
    url = url.replace("http://", "https://");
  }
  return url;
}
