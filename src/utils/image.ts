/**
 * Responsive images for photos stored in Supabase Storage.
 *
 * Uploaded photos are full-size PNG/JPEG (often 1–1.5 MB). Supabase's image transformation endpoint
 * returns a resized WebP on the fly, so each screen downloads only the width it needs (~40–120 KB).
 * Non-Supabase URLs (local assets, external links) are returned unchanged.
 */
const OBJECT_PATH = "/storage/v1/object/public/";
const RENDER_PATH = "/storage/v1/render/image/public/";
const WIDTHS = [320, 480, 640, 960, 1280];

function isSupabaseObject(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.endsWith(".supabase.co") && u.pathname.startsWith(OBJECT_PATH) && !/\.svg$/i.test(u.pathname);
  } catch {
    return false;
  }
}

export function resized(url: string, width: number, quality = 70): string {
  if (!url || !isSupabaseObject(url)) return url;
  const u = new URL(url);
  u.pathname = u.pathname.replace(OBJECT_PATH, RENDER_PATH);
  u.search = `?width=${width}&quality=${quality}`;
  return u.toString();
}

/**
 * Props for <img>: a sensible default src plus srcset/sizes so the browser picks the smallest file
 * that is still sharp on this screen. `sizes` describes the rendered width, e.g. "(max-width: 768px) 100vw, 33vw".
 */
export function responsiveImage(url: string | undefined | null, sizes: string, maxWidth = 1280) {
  if (!url) return { src: url ?? undefined };
  if (!isSupabaseObject(url)) return { src: url };
  const widths = WIDTHS.filter((w) => w <= maxWidth);
  return {
    src: resized(url, Math.min(640, maxWidth)),
    srcSet: widths.map((w) => `${resized(url, w)} ${w}w`).join(", "),
    sizes,
  };
}
