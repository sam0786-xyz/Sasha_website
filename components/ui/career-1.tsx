"use client";

// Watermelon UI "career-1" (registry.watermelon.sh/r/career-1.json), adapted for SASHA:
// filter chips by trade, a bordered list of roles and a closing prompt — restyled to the brand,
// with role metadata, per-row actions and no decorative "hot"/sparkle badges.

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Career1Meta {
  label: string;
  value: ReactNode;
}

export interface Career1Job {
  id: string;
  title: string;
  description: string;
  department: string;
  href?: string;
  meta?: Career1Meta[];
}

export interface Career1Cta {
  text: string;
  linkLabel: string;
  href: string;
  icon?: ReactNode;
}

export interface Career1Props {
  jobs: Career1Job[];
  allLabel: string;
  filterLabel: string;
  emptyTitle: string;
  emptyText: string;
  cta?: Career1Cta;
  renderActions?: (job: Career1Job) => ReactNode;
  className?: string;
}

function DeptChip({ label, count, isActive, onClick }: { label: string; count: number; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 text-sm font-semibold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? "border-ink bg-ink text-on-ink dark:border-on-ink dark:bg-on-ink dark:text-ink"
          : "border-border bg-card text-muted-foreground hover:border-input hover:text-foreground",
      )}
    >
      <span dir="auto">{label}</span>
      <span
        className={cn(
          "inline-flex min-w-5 items-center justify-center rounded px-1 font-mono text-[11px] tabular-nums",
          isActive ? "bg-white/15 dark:bg-black/10" : "bg-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function JobRow({ job, renderActions }: { job: Career1Job; renderActions?: Career1Props["renderActions"] }) {
  return (
    <li className="border-b border-border last:border-b-0">
      <article className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground" dir="auto">
            {job.department}
          </p>
          <h3 className="mt-1.5 text-xl font-bold leading-tight tracking-tight [font-stretch:112%] sm:text-[1.4rem]" dir="auto">
            {job.href ? (
              <a href={job.href} className="transition-colors hover:text-brand-text">
                {job.title}
              </a>
            ) : (
              job.title
            )}
          </h3>
          {job.description && (
            <p className="mt-2 line-clamp-2 max-w-[62ch] text-[0.97rem] text-muted-foreground" dir="auto">
              {job.description}
            </p>
          )}
          {job.meta && job.meta.length > 0 && (
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {job.meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground">{m.label}</dt>
                  <dd className="mt-0.5 flex items-center gap-1.5 text-[0.95rem] font-semibold tabular-nums" dir="auto">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {renderActions && <div className="flex flex-wrap items-center gap-2.5 md:justify-end">{renderActions(job)}</div>}
      </article>
    </li>
  );
}

export default function Career1({
  jobs,
  allLabel,
  filterLabel,
  emptyTitle,
  emptyText,
  cta,
  renderActions,
  className,
}: Career1Props) {
  const [active, setActive] = useState<string>("all");
  const departments = Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)));
  const visible = active === "all" ? jobs : jobs.filter((j) => j.department === active);
  const count = (d: string) => (d === "all" ? jobs.length : jobs.filter((j) => j.department === d).length);

  return (
    <div className={cn("w-full", className)}>
      {departments.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label={filterLabel}>
          <DeptChip label={allLabel} count={count("all")} isActive={active === "all"} onClick={() => setActive("all")} />
          {departments.map((d) => (
            <DeptChip key={d} label={d} count={count(d)} isActive={active === d} onClick={() => setActive(d)} />
          ))}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card px-5 shadow-[0_1px_2px_rgba(18,18,20,0.06)] sm:px-7">
        {visible.length > 0 ? (
          <ul role="list">
            {visible.map((job) => (
              <JobRow key={job.id} job={job} renderActions={renderActions} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-2 py-14 text-center">
            <p className="font-semibold">{emptyTitle}</p>
            <p className="max-w-md text-sm text-muted-foreground">{emptyText}</p>
          </div>
        )}
      </div>

      {cta && (
        <div className="mt-4 flex flex-col items-start gap-3 rounded-xl border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-[0.95rem] text-muted-foreground">{cta.text}</p>
          <a
            href={cta.href}
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:text-brand-text hover:underline"
          >
            {cta.linkLabel}
            {cta.icon}
          </a>
        </div>
      )}
    </div>
  );
}

export { Career1 };
