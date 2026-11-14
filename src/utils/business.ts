/** Single source of truth for business details shown across the site and legal pages. */
export const BUSINESS = {
  brand: "Damarika",
  legalName: "Damarika Archaeological Training Agency Pvt. Ltd.",
  email: "damarika0911@gmail.com",
  phoneDisplay: "+91 74188 59886",
  phoneE164: "+917418859886",
  whatsappNumber: "917418859886",
  whatsappGreeting: "Hello Damarika! I have a question about your programs.",
  addressLines: ["Tamil University Road", "Thanjavur, Tamil Nadu 613010", "India"],
  site: "https://damarika.in",
};

/** Date the Privacy Policy and Terms were last changed. Update when you edit them. */
export const LEGAL_LAST_UPDATED = "2026-11-13";

export const whatsappLink = (text: string = BUSINESS.whatsappGreeting) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const formatLongDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
