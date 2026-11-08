// Watermelon UI "faq-5" (registry.watermelon.sh/r/faq-5.json), adapted for SASHA:
// FAQ grouped by audience, sticky group intro beside the questions.
// Answers use forceMount so every answer is in the server-rendered HTML (search and answer engines
// read closed answers too); closed panels carry the `hidden` attribute.

import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqCategory {
  title: string;
  description?: React.ReactNode;
  items: FaqItem[];
}

export interface Faq5Props {
  categories: FaqCategory[];
  className?: string;
}

export function Faq5({ categories, className }: Faq5Props) {
  return (
    <div className={cn("flex w-full flex-col gap-14 md:gap-20", className)}>
      {categories.map((category, idx) => (
        <div key={idx} className="grid grid-cols-1 items-start gap-6 md:gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:col-span-4">
            <h3 className="text-2xl font-bold leading-tight tracking-tight [font-stretch:112%] md:text-[1.75rem]">{category.title}</h3>
            {category.description && <div className="text-base leading-relaxed text-muted-foreground">{category.description}</div>}
          </div>

          <div className="lg:col-span-8">
            <Accordion type="multiple" defaultValue={idx === 0 ? ["item-0-0"] : []} className="w-full border-t border-input">
              {category.items.map((item, itemIdx) => (
                <AccordionItem key={itemIdx} value={`item-${idx}-${itemIdx}`} className="border-b border-input last:border-b">
                  <AccordionTrigger className="py-5 text-start text-[1.05rem] font-semibold leading-snug transition-colors hover:text-brand-text hover:no-underline md:text-lg [&>svg]:size-5 [&>svg]:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent forceMount className="max-w-[68ch] pb-6 text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      ))}
    </div>
  );
}
