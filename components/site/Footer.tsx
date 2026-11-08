import { COPY, HTML_LANG, LANGS, LANG_NAME, type Lang } from "@/lib/copy";
import { COMPANY, telHref, whatsappHref } from "@/lib/site";
import { Logo } from "./Logo";
import { IconChat, IconPhone } from "./Icons";

export function Footer({ lang, phone, onHome }: { lang: Lang; phone: string; onHome: boolean }) {
  const t = COPY[lang];
  const base = onHome ? "" : "/";
  const links: [string, string][] = [
    ["services", t.nav.services],
    ["process", t.nav.process],
    ["roles", t.nav.roles],
    ["company", t.nav.company],
    ["faq", t.nav.faq],
    ["contact", t.nav.contact],
  ];

  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div className="ftr__brand">
          <Logo tone="light" />
          <p className="ftr__about">{t.footer.about}</p>
        </div>
        <nav className="ftr__col" aria-label={t.footer.explore}>
          <p className="ftr__head">{t.footer.explore}</p>
          <ul>
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`${base}#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ftr__col">
          <p className="ftr__head">{t.footer.contact}</p>
          <address className="ftr__address">
            <span>{COMPANY.legalName}</span>
            <span>{t.contact.office}</span>
            <a href={telHref(phone)} dir="ltr">
              {phone}
            </a>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </address>
        </div>
        <div className="ftr__col">
          <p className="ftr__head">{t.footer.languages}</p>
          <ul>
            {LANGS.map((l) => (
              <li key={l}>
                <a href={`?lang=${l}`} hrefLang={HTML_LANG[l]} lang={HTML_LANG[l]} aria-current={l === lang ? "true" : undefined}>
                  {LANG_NAME[l]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap ftr__base">
        <p>
          © {new Date().getFullYear()} {COMPANY.legalName}. {t.footer.rights}
        </p>
        <p>{COMPANY.licensedActivity} · Abu Dhabi, UAE</p>
      </div>
    </footer>
  );
}

/** Thumb-reach actions on phones: call, WhatsApp, request a crew. */
export function MobileBar({ lang, phone, onHome }: { lang: Lang; phone: string; onHome: boolean }) {
  const t = COPY[lang].mobileBar;
  return (
    <nav className="mbar" aria-label="Quick contact">
      <a href={telHref(phone)} className="mbar__item">
        <IconPhone size={19} />
        {t.call}
      </a>
      <a href={whatsappHref(phone)} className="mbar__item" target="_blank" rel="noopener noreferrer">
        <IconChat size={19} />
        {t.whatsapp}
      </a>
      <a href={`${onHome ? "" : "/"}#contact`} className="mbar__item mbar__item--cta">
        {t.request}
      </a>
    </nav>
  );
}
