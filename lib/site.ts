// Company facts used across the site, metadata and structured data.
// Only facts the company has published belong here — no invented figures.

export const SITE_URL = "https://www.sashagc.com";

export const COMPANY = {
  name: "SASHA General Contracting",
  shortName: "SASHA GC",
  legalName: "SASHA General Contracting L.L.C – S.P.C",
  nameAr: "ساشا للمقاولات العامة",
  email: "info@sashagc.com",
  city: "Abu Dhabi",
  countryCode: "AE",
  country: "United Arab Emirates",
  licensedActivity: "All Kind Building Projects Contracting",
  leaders: [
    { name: "Mohammad Naushad", jobTitle: "Managing Director" },
    { name: "Amzad Ali", jobTitle: "Director – Indian Operations & Manpower Mobilization" },
  ],
} as const;

const DEFAULT_PHONE = "+971 56 237 1853";

/** Server-only: reads the public phone number from the environment. */
export function companyPhone(): string {
  return (process.env.COMPANY_PHONE || DEFAULT_PHONE).trim();
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
