import Image from "next/image";
import { COPY, type Lang } from "@/lib/copy";
import { COMPANY, telHref, whatsappHref } from "@/lib/site";
import { Header } from "./Header";
import { Footer, MobileBar } from "./Footer";
import { LangSuggest } from "./LangSuggest";
import { RolesBoard } from "./RolesBoard";
import { RequirementForm, type JobLite } from "./Forms";
import { Faq5 } from "@/components/ui/faq-5";
import { Cta1 } from "@/components/ui/cta-1";
import { IconArrow, IconChat, IconCheck, IconMail, IconPhone, IconPin, IconShield } from "./Icons";

function SectionHead({ eyebrow, title, lead, id }: { eyebrow: string; title: string; lead?: string; id: string }) {
  return (
    <div className="sec-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="sec-title">
        {title}
      </h2>
      {lead && <p className="sec-lead">{lead}</p>}
    </div>
  );
}

/** Structural frame drawing echoing the building bars in the logo mark. */
function FrameDrawing() {
  const cols = [40, 130, 220, 310, 400];
  const floors = [40, 110, 180, 250, 320, 390];
  return (
    <svg className="hero__frame" viewBox="0 0 440 430" aria-hidden="true" focusable="false">
      <g className="hero__frame-grid">
        {cols.map((x) => (
          <line key={`c${x}`} x1={x} y1={20} x2={x} y2={430} />
        ))}
        {floors.map((y) => (
          <line key={`f${y}`} x1={20} y1={y} x2={420} y2={y} />
        ))}
      </g>
      <g className="hero__frame-accent">
        <rect x={304} y={40} width={12} height={390} />
        <rect x={214} y={110} width={12} height={320} />
        <rect x={124} y={180} width={12} height={250} />
      </g>
    </svg>
  );
}

export function HomePage({ lang, jobs, phone }: { lang: Lang; jobs: JobLite[]; phone: string }) {
  const t = COPY[lang];
  const tel = telHref(phone);
  const wa = whatsappHref(phone);

  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <Header lang={lang} onHome />

      <main id="main">
        {/* Hero */}
        <section id="top" className="hero" aria-labelledby="hero-title">
          <FrameDrawing />
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--light">{t.hero.eyebrow}</p>
              <h1 id="hero-title" className="hero__title">
                {t.hero.title}
              </h1>
              <p className="hero__lead">{t.hero.lead}</p>
              <div className="hero__actions">
                <a className="btn btn--primary btn--lg" href="#contact">
                  {t.ui.requestCrew}
                  <IconArrow size={18} />
                </a>
                <a className="btn btn--outline-light btn--lg" href="#roles">
                  {t.ui.seeRoles}
                </a>
              </div>
              <p className="hero__direct">
                <a href={tel} dir="ltr">
                  <IconPhone size={16} /> {phone}
                </a>
                <span aria-hidden="true">·</span>
                <a href={`mailto:${COMPANY.email}`}>
                  <IconMail size={16} /> {COMPANY.email}
                </a>
              </p>
            </div>

            <div className="record">
              <p id="record-title" className="record__title">
                {t.hero.recordTitle}
              </p>
              <dl className="record__list">
                {t.hero.record.map((r) => (
                  <div key={r.k} className="record__row">
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="trades">
            <div className="wrap trades__in">
              <p className="trades__label">{t.hero.tradesLabel}</p>
              <ul className="trades__list">
                {t.hero.trades.map((tr) => (
                  <li key={tr}>{tr}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Audience paths */}
        <section className="sec" aria-labelledby="paths-title">
          <div className="wrap">
            <SectionHead id="paths-title" eyebrow={t.paths.eyebrow} title={t.paths.title} />
            <div className="paths">
              {(["contractor", "worker"] as const).map((k) => {
                const p = t.paths[k];
                return (
                  <article key={k} className={`path path--${k}`}>
                    <p className="path__label">{p.label}</p>
                    <h3 className="path__title">{p.title}</h3>
                    <ul className="ticks">
                      {p.points.map((pt) => (
                        <li key={pt}>
                          <IconCheck size={18} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <a className={`btn ${k === "contractor" ? "btn--dark" : "btn--primary"}`} href={k === "contractor" ? "#contact" : "#roles"}>
                      {p.cta}
                      <IconArrow size={18} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="sec sec--tint" aria-labelledby="services-title">
          <div className="wrap">
            <SectionHead id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
            <ol className="services">
              {t.services.items.map((s, i) => (
                <li key={s.title} className="service">
                  <span className="service__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="service__title">{s.title}</h3>
                  <p className="service__desc">{s.desc}</p>
                  <ul className="service__tags" aria-label={s.title}>
                    {s.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="sec" aria-labelledby="process-title">
          <div className="wrap">
            <SectionHead id="process-title" eyebrow={t.process.eyebrow} title={t.process.title} />
            <ol className="steps">
              {t.process.steps.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__desc">{s.desc}</p>
                </li>
              ))}
            </ol>
            <Cta1
              className="mt-16 md:mt-24"
              eyebrow={t.cta.eyebrow}
              title={t.cta.title}
              description={t.cta.desc}
              primary={{ text: t.cta.primary, href: "#contact", icon: <IconArrow size={18} /> }}
              secondary={{ text: t.cta.secondary, href: wa, icon: <IconChat size={18} />, external: true }}
            />
          </div>
        </section>

        {/* Open roles */}
        <section id="roles" className="sec sec--tint" aria-labelledby="roles-title">
          <div className="wrap">
            <SectionHead id="roles-title" eyebrow={t.roles.eyebrow} title={t.roles.title} lead={t.roles.lead} />
            <RolesBoard lang={lang} initialJobs={jobs} phone={phone} />
            <div className="protect">
              <span className="protect__icon">
                <IconShield size={26} />
              </span>
              <div>
                <h3 id="protect-title" className="protect__title">
                  {t.protect.title}
                </h3>
                <p className="protect__text">{t.protect.text}</p>
              </div>
              <div className="protect__actions">
                <a className="btn btn--dark btn--sm" href={tel}>
                  <IconPhone size={17} />
                  {t.ui.call}
                </a>
                <a className="btn btn--ghost btn--sm" href={wa} target="_blank" rel="noopener noreferrer">
                  <IconChat size={17} />
                  {t.ui.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Company & leadership */}
        <section id="company" className="sec" aria-labelledby="company-title">
          <div className="wrap">
            <div className="company">
              <div className="company__intro">
                <SectionHead id="company-title" eyebrow={t.company.eyebrow} title={t.company.title} />
                <p className="company__p">{t.company.p1}</p>
                <p className="company__p">{t.company.p2}</p>
              </div>
              <div className="notice">
                <p className="notice__title">{t.company.noticeTitle}</p>
                <p className="notice__text">{t.company.notice}</p>
                <dl className="notice__facts">
                  <div>
                    <dt>{t.hero.record[0].k}</dt>
                    <dd>{t.hero.record[0].v}</dd>
                  </div>
                  <div>
                    <dt>{t.hero.record[1].k}</dt>
                    <dd>{t.hero.record[1].v}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <h3 className="leaders__title">{t.company.leadersTitle}</h3>
            <ul className="leaders">
              {t.company.leaders.map((p, i) => (
                <li key={p.image} className="leader">
                  <div className={`leader__photo leader__photo--${i === 0 ? "wide" : "tall"}`}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1100px) 100vw, 640px"
                      className="leader__img"
                    />
                  </div>
                  <div className="leader__body">
                    <p className="leader__role">{p.role}</p>
                    <p className="leader__name">{p.name}</p>
                    <p className="leader__bio">{p.bio}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec sec--tint" aria-labelledby="faq-title">
          <div className="wrap">
            <SectionHead id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <Faq5
              categories={t.faq.groups.map((g) => ({
                title: g.title,
                description: g.desc,
                items: g.items.map((i) => ({ question: t.faq.items[i].q, answer: t.faq.items[i].a })),
              }))}
            />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="sec" aria-labelledby="contact-title">
          <div className="wrap contact">
            <div className="contact__side">
              <SectionHead id="contact-title" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
              <ul className="channels">
                <li>
                  <a className="channel" href={tel}>
                    <span className="channel__icon">
                      <IconPhone />
                    </span>
                    <span>
                      <span className="channel__label">{t.contact.callLabel}</span>
                      <span className="channel__value" dir="ltr">
                        {phone}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a className="channel" href={wa} target="_blank" rel="noopener noreferrer">
                    <span className="channel__icon">
                      <IconChat />
                    </span>
                    <span>
                      <span className="channel__label">{t.contact.whatsappLabel}</span>
                      <span className="channel__value" dir="ltr">
                        {phone}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a className="channel" href={`mailto:${COMPANY.email}`}>
                    <span className="channel__icon">
                      <IconMail />
                    </span>
                    <span>
                      <span className="channel__label">{t.contact.emailLabel}</span>
                      <span className="channel__value">{COMPANY.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="channel channel--static">
                    <span className="channel__icon">
                      <IconPin />
                    </span>
                    <span>
                      <span className="channel__label">{t.contact.officeLabel}</span>
                      <span className="channel__value">{t.contact.office}</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="contact__form">
              <RequirementForm lang={lang} />
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} phone={phone} onHome />
      <MobileBar lang={lang} phone={phone} onHome />
      <LangSuggest lang={lang} />
    </>
  );
}
