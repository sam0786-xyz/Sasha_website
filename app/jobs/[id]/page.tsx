import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getLang } from "@/lib/lang";
import { COPY, type Lang } from "@/lib/copy";
import { COMPANY, SITE_URL, companyPhone, telHref, whatsappHref } from "@/lib/site";
import { jobPostingJsonLd, jsonLd } from "@/lib/seo";
import { toJobLite } from "@/lib/jobs";
import { Header } from "@/components/site/Header";
import { Footer, MobileBar } from "@/components/site/Footer";
import { ApplyForm } from "@/components/site/Forms";
import { RoleMeta } from "@/components/site/RolesBoard";
import { IconArrow, IconChat, IconPhone, IconShield } from "@/components/site/Icons";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

async function loadJob(id: string) {
  try {
    return await db.job.findById(id);
  } catch {
    return null;
  }
}

function withLang(path: string, lang: Lang) {
  return lang === "en" ? path : `${path}?lang=${lang}`;
}

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const [job, lang] = await Promise.all([loadJob(id), getLang()]);
  if (!job) return { title: "Role not found", robots: { index: false } };
  const open = job.status === "OPEN";
  const title = `${job.title} job in ${job.location || "Abu Dhabi"}`;
  const description = `${job.title} at ${COMPANY.name}, ${job.location}. ${job.salaryText ? `Salary ${job.salaryText}. ` : ""}${job.description}`.slice(0, 300);
  // Absolute URLs: Next.js drops the query string from relative metadata URLs.
  const path = `${SITE_URL}/jobs/${job.id}`;
  return {
    title,
    description,
    robots: open ? undefined : { index: false, follow: true },
    alternates: {
      canonical: withLang(path, lang),
      languages: { en: path, ar: `${path}?lang=ar`, "hi-Latn": `${path}?lang=hi`, "x-default": path },
    },
    openGraph: { type: "website", url: withLang(path, lang), siteName: COMPANY.name, title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

export default async function JobPage({ params }: Params) {
  const { id } = await params;
  const [row, lang] = await Promise.all([loadJob(id), getLang()]);
  if (!row) notFound();

  const t = COPY[lang];
  const job = toJobLite(row);
  const open = row.status === "OPEN";
  const phone = companyPhone();
  const back = lang === "en" ? "/#roles" : `/?lang=${lang}#roles`;

  return (
    <>
      {open && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(jobPostingJsonLd(row)) }} />}
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <Header lang={lang} onHome={false} />
      <main id="main" className="jobpage">
        <div className="wrap">
          <a className="backlink" href={back}>
            <IconArrow size={16} className="icon-back" />
            {t.roles.back}
          </a>

          <div className="jobpage__grid">
            <article className="jobpage__main">
              <span className="tag" dir="auto">{job.workType}</span>
              <h1 className="jobpage__title" dir="auto">{job.title}</h1>
              <p className="jobpage__company">{job.companyName || COMPANY.name}</p>
              <RoleMeta lang={lang} job={job} />
              {!open && (
                <p className="jobpage__closed" role="status">
                  {t.roles.closed}
                </p>
              )}
              {job.description && <p className="jobpage__desc" dir="auto">{job.description}</p>}
              {job.requirements && (
                <>
                  <h2 className="jobpage__h2">{t.roles.requirements}</h2>
                  <p className="jobpage__desc" dir="auto">{job.requirements}</p>
                </>
              )}
              <div className="protect protect--compact">
                <span className="protect__icon">
                  <IconShield size={24} />
                </span>
                <div>
                  <p className="protect__title">{t.protect.title}</p>
                  <p className="protect__text">{t.protect.text}</p>
                </div>
              </div>
            </article>

            {open && (
              <div className="jobpage__apply">
                <h2 id="apply-heading" className="jobpage__apply-title">
                  {t.apply.title}
                </h2>
                <p className="jobpage__apply-lead">{t.apply.lead}</p>
                <ApplyForm lang={lang} job={job} />
                <div className="jobpage__alt">
                  <a className="btn btn--ghost btn--sm" href={telHref(phone)}>
                    <IconPhone size={17} />
                    {t.ui.call}
                  </a>
                  <a
                    className="btn btn--ghost btn--sm"
                    href={whatsappHref(phone, t.roles.askText(job.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconChat size={17} />
                    {t.roles.askWhatsApp}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer lang={lang} phone={phone} onHome={false} />
      <MobileBar lang={lang} phone={phone} onHome={false} />
    </>
  );
}
