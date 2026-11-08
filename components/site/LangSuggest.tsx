"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { COPY, HTML_LANG, isLang, type Lang } from "@/lib/copy";
import { IconClose } from "./Icons";

const DISMISS_KEY = "sasha_lang_hint_dismissed";

// A quiet, non-blocking suggestion instead of a first-visit language pop-up.
export function LangSuggest({ lang }: { lang: Lang }) {
  const pathname = usePathname() || "/";
  const [target, setTarget] = useState<Lang | null>(null);

  useEffect(() => {
    try {
      if (document.cookie.includes("sasha_lang=")) return;
      if (localStorage.getItem(DISMISS_KEY)) return;
      const saved = localStorage.getItem("sasha_lang");
      let next: Lang | null = isLang(saved) ? saved : null;
      if (!next) {
        const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
        for (const p of prefs) {
          const code = p.toLowerCase().slice(0, 2);
          if (code === "ar" || code === "hi") {
            next = code;
            break;
          }
          if (code === "en") break;
        }
      }
      if (next && next !== lang) setTarget(next);
    } catch {}
  }, [lang]);

  if (!target) return null;
  const s = COPY[target].suggest;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setTarget(null);
  }

  return (
    <div className="suggest" role="region" aria-label={COPY[lang].ui.language} lang={HTML_LANG[target]} dir={target === "ar" ? "rtl" : "ltr"}>
      <p className="suggest__text">{s.text}</p>
      <a className="btn btn--primary btn--sm" href={`${pathname}?lang=${target}`} hrefLang={HTML_LANG[target]}>
        {s.action}
      </a>
      <button type="button" className="icon-btn icon-btn--sm" onClick={dismiss} aria-label={s.dismiss}>
        <IconClose size={18} />
      </button>
    </div>
  );
}
