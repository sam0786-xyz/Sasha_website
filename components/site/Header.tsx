"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { COPY, LANGS, LANG_NAME, LANG_SHORT, HTML_LANG, type Lang } from "@/lib/copy";
import { Logo } from "./Logo";
import { IconChevronDown, IconClose, IconGlobe, IconMenu, IconMoon, IconSun } from "./Icons";

type Theme = "light" | "dark";

export function Header({ lang, onHome }: { lang: Lang; onHome: boolean }) {
  const t = COPY[lang];
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [scrolled, setScrolled] = useState(false);
  const base = onHome ? "" : "/";

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Compact language menu (small screens): close on outside click or Escape.
  const langMenu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const d = langMenu.current;
      if (d?.open && !d.contains(e.target as Node)) d.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      const d = langMenu.current;
      if (e.key === "Escape" && d?.open) {
        d.open = false;
        d.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sasha_theme", next);
    } catch {}
  }

  const links: [string, string][] = [
    ["services", t.nav.services],
    ["process", t.nav.process],
    ["roles", t.nav.roles],
    ["company", t.nav.company],
    ["faq", t.nav.faq],
    ["contact", t.nav.contact],
  ];

  const themeLabel = theme === "dark" ? t.ui.themeLight : t.ui.themeDark;

  return (
    <header className={`hdr${scrolled || open ? " is-raised" : ""}`}>
      <div className="hdr__in wrap">
        <a href={onHome ? "#top" : "/"} className="hdr__brand" aria-label="SASHA General Contracting">
          <Logo />
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          {links.map(([id, label]) => (
            <a key={id} href={`${base}#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hdr__tools">
          <nav className="langs" aria-label={t.ui.language}>
            {LANGS.map((l) => (
              <a
                key={l}
                href={`${pathname}?lang=${l}`}
                hrefLang={HTML_LANG[l]}
                lang={HTML_LANG[l]}
                aria-current={l === lang ? "true" : undefined}
                className="langs__item"
              >
                {LANG_SHORT[l]}
              </a>
            ))}
          </nav>
          <details className="langs-compact" ref={langMenu}>
            <summary aria-label={`${t.ui.language}: ${LANG_NAME[lang]}`}>
              <IconGlobe size={17} />
              <span lang={HTML_LANG[lang]}>{LANG_SHORT[lang]}</span>
              <IconChevronDown size={15} className="langs-compact__chev" />
            </summary>
            <ul className="langs-compact__menu">
              {LANGS.map((l) => (
                <li key={l}>
                  <a
                    href={`${pathname}?lang=${l}`}
                    hrefLang={HTML_LANG[l]}
                    lang={HTML_LANG[l]}
                    aria-current={l === lang ? "true" : undefined}
                  >
                    {LANG_NAME[l]}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <button type="button" className="icon-btn hdr__theme" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>
          <a className="btn btn--primary btn--sm hdr__cta" href={`${base}#contact`}>
            {t.ui.requestCrew}
          </a>
          <button
            type="button"
            className="icon-btn hdr__menu"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t.ui.close : t.ui.menu}
          >
            {open ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="site-menu" className="hdr__panel">
          <nav className="wrap hdr__panel-nav" aria-label={t.ui.menu} onClick={() => setOpen(false)}>
            {links.map(([id, label]) => (
              <a key={id} href={`${base}#${id}`}>
                {label}
              </a>
            ))}
            <button type="button" className="hdr__panel-theme" onClick={toggleTheme}>
              {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
              {themeLabel}
            </button>
            <a className="btn btn--primary btn--block" href={`${base}#contact`}>
              {t.ui.requestCrew}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
