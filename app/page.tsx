import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getLang } from "@/lib/lang";
import { COPY, canonicalPath } from "@/lib/copy";
import { COMPANY, SITE_URL, companyPhone } from "@/lib/site";
import { homeJsonLd, jsonLd } from "@/lib/seo";
import { toJobLite } from "@/lib/jobs";
import { HomePage } from "@/components/site/HomePage";
import type { JobLite } from "@/components/site/Forms";

export const dynamic = "force-dynamic";

// Next.js metadata reduces any "/" URL to the bare origin and drops "?lang=", so the
// home page renders its canonical, hreflang and og:url tags itself (React hoists them to <head>).
const HOME_ALTERNATES = [
  ["en", `${SITE_URL}/`],
  ["ar", `${SITE_URL}/?lang=ar`],
  ["hi-Latn", `${SITE_URL}/?lang=hi`],
  ["x-default", `${SITE_URL}/`],
] as const;

const OG_LOCALE = { en: "en_AE", ar: "ar_AE", hi: "hi_IN" } as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = COPY[lang];
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    openGraph: {
      type: "website",
      siteName: COMPANY.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: OG_LOCALE[lang],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[lang]),
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export default async function Home() {
  const lang = await getLang();
  const phone = companyPhone();

  let jobs: JobLite[] = [];
  try {
    jobs = (await db.job.findMany({ where: { status: "OPEN" } })).map(toJobLite);
  } catch (err) {
    // Keep the company site up even if the jobs database is unreachable.
    console.error("Could not load open roles", err);
  }

  const url = `${SITE_URL}${canonicalPath("/", lang)}`;

  return (
    <>
      <link rel="canonical" href={url} />
      {HOME_ALTERNATES.map(([hreflang, href]) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      <meta property="og:url" content={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homeJsonLd(lang, phone)) }} />
      <HomePage lang={lang} jobs={jobs} phone={phone} />
    </>
  );
}
