"use client";

// Watermelon UI "continuous-tabs" (registry.watermelon.sh/r/continuous-tabs.json), adapted for SASHA:
// - renders on the server (no mount gate, so no layout jump)
// - controlled, with proper tablist/tab semantics and arrow-key navigation
// - brand colours via the shadcn tokens mapped in app/tailwind.css
// - honours reduced motion
// - animation features load lazily (LazyMotion) to keep the first load small

import { useId, useRef, type FC, type KeyboardEvent } from "react";
import { LazyMotion, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export interface TabItem {
  id: string;
  label: string;
}

interface ContinuousTabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
  /** id of the panel the tabs control */
  panelId?: string;
  idPrefix?: string;
  className?: string;
}

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
  tabs,
  activeId,
  onChange,
  ariaLabel,
  panelId,
  idPrefix,
  className,
}) => {
  const autoId = useId();
  const prefix = idPrefix ?? autoId;
  const reduceMotion = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const dir = getComputedStyle(e.currentTarget).direction === "rtl" ? -1 : 1;
    let next = -1;
    if (e.key === "ArrowRight") next = index + dir;
    else if (e.key === "ArrowLeft") next = index - dir;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === -1) return;
    e.preventDefault();
    const i = (next + tabs.length) % tabs.length;
    onChange(tabs[i].id);
    refs.current[i]?.focus();
  }

  return (
    <LazyMotion features={loadFeatures} strict>
        <div
          role="tablist"
          aria-label={ariaLabel}
          className={cn(
            "relative grid auto-cols-fr grid-flow-col gap-1 rounded-[10px] border border-border bg-muted p-1",
            className,
          )}
        >
          {tabs.map((tab, i) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${prefix}-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="relative min-h-[46px] rounded-md px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isActive && (
                  <m.span
                    layoutId={`${prefix}-active-pill`}
                    aria-hidden="true"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                            mass: 0.9,
                          }
                    }
                    className="absolute inset-0 rounded-md bg-ink shadow-sm dark:bg-on-ink"
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 text-[0.95rem] font-semibold transition-colors duration-200",
                    isActive
                      ? "text-on-ink dark:text-ink"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
    </LazyMotion>
  );
};
