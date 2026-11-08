"use client";

import { useEffect, useRef, useState } from "react";
import { COPY, type Lang } from "@/lib/copy";
import { ApplyForm, type JobLite } from "./Forms";
import Career1 from "@/components/ui/career-1";
import { IconArrow, IconChat, IconClose, IconPin } from "./Icons";

function waLink(phone: string, text: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function RoleMeta({ lang, job }: { lang: Lang; job: JobLite }) {
  const t = COPY[lang].roles;
  return (
    <dl className="role__meta">
      <div>
        <dt>{t.salary}</dt>
        <dd className="role__salary" dir="auto">{job.salaryText || "—"}</dd>
      </div>
      <div>
        <dt>{t.experience}</dt>
        <dd dir="auto">{job.experience}</dd>
      </div>
      <div>
        <dt>{t.location}</dt>
        <dd>
          <IconPin size={15} /> <bdi>{job.location}</bdi>
        </dd>
      </div>
    </dl>
  );
}

export function RolesBoard({ lang, initialJobs, phone }: { lang: Lang; initialJobs: JobLite[]; phone: string }) {
  const t = COPY[lang];
  const [jobs, setJobs] = useState<JobLite[]>(initialJobs);
  const [active, setActive] = useState<JobLite | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const langQuery = lang === "en" ? "" : `?lang=${lang}`;

  // Refresh the list while the tab is visible so new postings appear without a reload.
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      fetch("/api/jobs")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (Array.isArray(data)) {
            setJobs(
              data.map((j) => ({ ...j, createdAt: new Date(j.createdAt).toISOString() })) as JobLite[],
            );
          }
        })
        .catch(() => {});
    };
    const id = window.setInterval(refresh, 60000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <>
      <p className="roles__count" aria-live="polite">
        {t.roles.count(jobs.length)}
      </p>

      {jobs.length === 0 ? (
        <p className="roles__empty">{t.roles.empty}</p>
      ) : (
        <Career1
          allLabel={t.roles.allTrades}
          filterLabel={t.roles.filterLabel}
          emptyTitle={t.roles.emptyFilterTitle}
          emptyText={t.roles.emptyFilterText}
          cta={{ text: t.roles.openApp, linkLabel: t.roles.openAppLink, href: "#job-application", icon: <IconArrow size={16} /> }}
          jobs={jobs.map((job) => ({
            id: job.id,
            title: job.title,
            description: job.description,
            department: job.workType,
            href: `/jobs/${job.id}${langQuery}`,
            meta: [
              { label: t.roles.salary, value: job.salaryText || "—" },
              { label: t.roles.experience, value: job.experience },
              {
                label: t.roles.location,
                value: (
                  <>
                    <IconPin size={15} className="text-muted-foreground" /> <bdi>{job.location}</bdi>
                  </>
                ),
              },
            ],
          }))}
          renderActions={(row) => {
            const job = jobs.find((j) => j.id === row.id)!;
            return (
              <>
                <button type="button" className="btn btn--primary btn--sm" onClick={() => setActive(job)}>
                  {t.roles.apply}
                </button>
                <a
                  className="btn btn--ghost btn--sm"
                  href={waLink(phone, t.roles.askText(job.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconChat size={17} />
                  {t.roles.askWhatsApp}
                </a>
              </>
            );
          }}
        />
      )}

      <dialog
        ref={dialogRef}
        className="sheet"
        aria-labelledby="apply-title"
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        {active && (
          <div className="sheet__body">
            <div className="sheet__head">
              <div>
                <p className="eyebrow">{t.apply.title}</p>
                <h2 id="apply-title" className="sheet__title" dir="auto">
                  {active.title}
                </h2>
                <p className="sheet__sub" dir="auto">
                  {active.location}
                  {active.salaryText ? ` · ${active.salaryText}` : ""}
                </p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setActive(null)} aria-label={t.ui.close}>
                <IconClose size={20} />
              </button>
            </div>
            <p className="sheet__lead">{t.apply.lead}</p>
            <ApplyForm key={active.id} lang={lang} job={active} />
          </div>
        )}
      </dialog>
    </>
  );
}
