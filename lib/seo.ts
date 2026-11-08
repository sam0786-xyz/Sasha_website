import type { Job } from "@/lib/db";
import { COMPANY, SITE_URL } from "./site";
import { COPY, HTML_LANG, canonicalPath, type Lang } from "./copy";

/** Safe to drop into <script type="application/ld+json">. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationNode(phone: string, lang: Lang) {
  const t = COPY[lang];
  return {
    "@type": ["GeneralContractor", "Organization"],
    "@id": ORG_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    alternateName: [COMPANY.shortName, COMPANY.nameAr],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/sasha-logo.png`, width: 896, height: 461 },
    image: `${SITE_URL}/sasha-logo.png`,
    description: COPY.en.footer.about,
    email: COMPANY.email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.city,
      addressCountry: COMPANY.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "Country", name: COMPANY.country },
    ],
    knowsLanguage: ["en", "ar", "hi"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: phone,
        email: COMPANY.email,
        areaServed: "AE",
        availableLanguage: ["English", "Arabic", "Hindi"],
      },
    ],
    employee: COMPANY.leaders.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.jobTitle, worksFor: { "@id": ORG_ID } })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.title,
      itemListElement: t.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.desc, areaServed: "Abu Dhabi" },
      })),
    },
  };
}

export function homeJsonLd(lang: Lang, phone: string) {
  const t = COPY[lang];
  const url = `${SITE_URL}${canonicalPath("/", lang)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(phone, lang),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: COMPANY.name,
        inLanguage: ["en", "ar", "hi-Latn"],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: HTML_LANG[lang],
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

/** Reads "2,200 AED/month" style text. Returns null unless both amount and period are clear. */
export function parseMonthlySalary(text: string | null | undefined): number | null {
  if (!text || !/(month|monthly|\/\s*m\b|mahina|شهر)/i.test(text)) return null;
  const m = text.match(/(?:AED|درهم)\s*([\d,]+)|([\d,]+)\s*(?:AED|درهم)/i);
  const raw = m?.[1] || m?.[2];
  const n = raw ? Number(raw.replace(/,/g, "")) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function jobPostingJsonLd(job: Job) {
  const salary = parseMonthlySalary(job.salaryText);
  const inAbuDhabi = /abu dhabi|al ain|dhafra|mussafah|reem|saadiyat|yas/i.test(job.location || "Abu Dhabi");
  const description = [
    `<p>${escapeHtml(job.description)}</p>`,
    job.requirements ? `<p><strong>Requirements:</strong> ${escapeHtml(job.requirements)}</p>` : "",
    job.experience ? `<p><strong>Experience:</strong> ${escapeHtml(job.experience)}</p>` : "",
    `<p>Terms are confirmed in a written contract under UAE MOHRE regulations. SASHA General Contracting does not charge recruitment fees.</p>`,
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    identifier: { "@type": "PropertyValue", name: COMPANY.name, value: job.id },
    datePosted: new Date(job.createdAt).toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: COMPANY.name,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/sasha-logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || COMPANY.city,
        ...(inAbuDhabi ? { addressRegion: "Abu Dhabi" } : {}),
        addressCountry: "AE",
      },
    },
    ...(job.experience ? { experienceRequirements: job.experience } : {}),
    ...(salary
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "AED",
            value: { "@type": "QuantitativeValue", value: salary, unitText: "MONTH" },
          },
        }
      : {}),
    directApply: true,
  };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
