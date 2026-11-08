// Watermelon UI "cta-1" (registry.watermelon.sh/r/cta-1.json), adapted for SASHA:
// a solid ink band (no blurred gradient blobs), primary + secondary action.

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CTAAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export interface CTAProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primary: CTAAction;
  secondary?: CTAAction;
  className?: string;
}

export function Cta1({ eyebrow, title, description, primary, secondary, className }: CTAProps) {
  const ext = (a: CTAAction) => (a.external ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <div
      className={cn(
        "relative isolate flex flex-col items-start justify-between gap-8 overflow-hidden rounded-xl border border-ink bg-ink p-7 text-on-ink sm:p-10 md:flex-row md:items-center md:gap-12 md:px-12 md:py-14 dark:border-border dark:bg-[#1c1c20]",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute inset-y-0 start-0 w-1.5 bg-primary" />
      <div className="flex max-w-2xl flex-col gap-3">
        {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff9a5c]">{eyebrow}</p>}
        <h2 className="text-[1.75rem] font-bold leading-[1.1] tracking-tight [font-stretch:112%] text-white md:text-[2.4rem]">{title}</h2>
        {description && <p className="max-w-[56ch] text-base text-[#b9b8bf] md:text-lg">{description}</p>}
      </div>

      <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
        <Button asChild size="lg" className="h-[54px] rounded-md px-7 text-base font-semibold hover:bg-[#ff7f36]">
          <a href={primary.href} {...ext(primary)}>
            {primary.text}
            {primary.icon}
          </a>
        </Button>
        {secondary && (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-[54px] rounded-md border-white/35 bg-transparent px-7 text-base font-semibold text-on-ink shadow-none hover:bg-white/10 hover:text-white dark:bg-transparent"
          >
            <a href={secondary.href} {...ext(secondary)}>
              {secondary.icon}
              {secondary.text}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
