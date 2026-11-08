"use client";

import { useEffect, useId, useState } from "react";
import { COPY, OPTIONS, type Lang, type Option } from "@/lib/copy";
import { IconCheck } from "./Icons";
import { ContinuousTabs } from "@/components/watermelon/continuous-tabs";

export type JobLite = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salaryText: string | null;
  experience: string;
  workType: string;
  description: string;
  requirements: string;
  createdAt: string;
};

async function postEnquiry(body: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ---------- Field primitives ---------- */

function Field({
  label,
  hint,
  required,
  children,
  id,
  wide,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  id: string;
  wide?: boolean;
}) {
  return (
    <div className={`field${wide ? " field--wide" : ""}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? <span className="field__req" aria-hidden="true"> *</span> : hint ? <span className="field__hint"> ({hint})</span> : null}
      </label>
      {children}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  lang,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  lang: Lang;
}) {
  return (
    <select id={id} className="input input--select" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label[lang]}
        </option>
      ))}
    </select>
  );
}

function Success({ title, text, again, onAgain }: { title: string; text: string; again: string; onAgain: () => void }) {
  return (
    <div className="form-done" role="status">
      <span className="form-done__icon">
        <IconCheck size={22} />
      </span>
      <p className="form-done__title">{title}</p>
      <p className="form-done__text">{text}</p>
      <button type="button" className="btn btn--ghost btn--sm" onClick={onAgain}>
        {again}
      </button>
    </div>
  );
}

/* ---------- Apply for a specific role ---------- */

export function ApplyForm({ lang, job }: { lang: Lang; job: Pick<JobLite, "title" | "companyName" | "location" | "salaryText"> }) {
  const t = COPY[lang];
  const f = t.form;
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [exp, setExp] = useState(OPTIONS.workerExperience[1].value);
  const [loc, setLoc] = useState(OPTIONS.currentLocation[0].value);
  const [visa, setVisa] = useState(OPTIONS.visa[0].value);
  const [remarks, setRemarks] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const company = job.companyName || "SASHA General Contracting";
    const message = [
      `=== IN-PLACE DIRECT WORKER APPLICATION ===`,
      `APPLIED POSITION: ${job.title}`,
      `HIRING COMPANY: ${company}`,
      `MONTHLY SALARY: ${job.salaryText || "Standard UAE Site Wages"}`,
      `PROJECT LOCATION: ${job.location || "Abu Dhabi"}`,
      `APPLICANT NAME: ${name}`,
      `MOBILE / WHATSAPP: ${phone}`,
      email ? `EMAIL: ${email}` : null,
      `EXPERIENCE: ${exp}`,
      `CURRENT LOCATION: ${loc}`,
      `VISA STATUS: ${visa}`,
      remarks ? `REMARKS: ${remarks}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const ok = await postEnquiry({
      name,
      phone,
      email: email || undefined,
      kind: "Worker Direct Job Application",
      companyName: company,
      projectLocation: job.location || "Abu Dhabi",
      tradePosition: job.title,
      experience: exp,
      remarks,
      message,
    });
    if (ok) {
      setName("");
      setPhone("");
      setEmail("");
      setRemarks("");
    }
    setState(ok ? "done" : "error");
  }

  if (state === "done") {
    return <Success title={f.successTitle} text={f.successWorker} again={f.again} onAgain={() => setState("idle")} />;
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__grid">
        <Field id={`${uid}-n`} label={f.fullName} required>
          <input id={`${uid}-n`} className="input" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} autoComplete="name" placeholder={f.ph.fullName} />
        </Field>
        <Field id={`${uid}-p`} label={f.phone} required>
          <input id={`${uid}-p`} className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required minLength={5} autoComplete="tel" inputMode="tel" placeholder={f.ph.workerPhone} dir="ltr" />
        </Field>
        <Field id={`${uid}-x`} label={f.yearsExperience}>
          <Select id={`${uid}-x`} value={exp} onChange={setExp} options={OPTIONS.workerExperience} lang={lang} />
        </Field>
        <Field id={`${uid}-l`} label={f.currentLocation}>
          <Select id={`${uid}-l`} value={loc} onChange={setLoc} options={OPTIONS.currentLocation} lang={lang} />
        </Field>
        <Field id={`${uid}-v`} label={f.visa}>
          <Select id={`${uid}-v`} value={visa} onChange={setVisa} options={OPTIONS.visa} lang={lang} />
        </Field>
        <Field id={`${uid}-e`} label={f.email} hint={f.optional}>
          <input id={`${uid}-e`} className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder={f.ph.email} dir="ltr" />
        </Field>
        <Field id={`${uid}-r`} label={f.remarks} hint={f.optional} wide>
          <textarea id={`${uid}-r`} className="input input--area" rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder={f.remarksWorker} />
        </Field>
      </div>
      {state === "error" && (
        <p className="form__error" role="alert">
          {f.error}
        </p>
      )}
      <button type="submit" className="btn btn--primary btn--block" disabled={state === "sending"}>
        {state === "sending" ? f.sending : t.apply.submit}
      </button>
    </form>
  );
}

/* ---------- Employer requirement / general worker application ---------- */

export function RequirementForm({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const f = t.form;
  const uid = useId();
  const [mode, setMode] = useState<"employer" | "worker">("employer");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectSite, setProjectSite] = useState("");
  const [projectLocation, setProjectLocation] = useState(OPTIONS.locations[0].value);
  const [trade, setTrade] = useState(OPTIONS.trades[0].value);
  const [customTrade, setCustomTrade] = useState("");
  const [workersCount, setWorkersCount] = useState(OPTIONS.workers[1].value);
  const [experience, setExperience] = useState(OPTIONS.employerExperience[1].value);
  const [mobilisation, setMobilisation] = useState(OPTIONS.mobilisation[1].value);
  const [duration, setDuration] = useState(OPTIONS.duration[1].value);
  const [provAccom, setProvAccom] = useState(true);
  const [provTransport, setProvTransport] = useState(true);
  const [provPPE, setProvPPE] = useState(true);
  const [provOvertime, setProvOvertime] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [applyingFor, setApplyingFor] = useState("");
  const [workerExp, setWorkerExp] = useState(OPTIONS.workerExperience[1].value);
  const [workerLoc, setWorkerLoc] = useState(OPTIONS.currentLocation[0].value);
  const [workerVisa, setWorkerVisa] = useState(OPTIONS.visa[0].value);

  function switchMode(next: "employer" | "worker") {
    setMode(next);
    setState("idle");
  }

  // "#job-application" links (e.g. from the open roles list) open the worker form.
  useEffect(() => {
    const open = () => {
      if (window.location.hash === "#job-application") {
        setMode("worker");
        setState("idle");
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    let body: Record<string, unknown>;

    if (mode === "employer") {
      const activeTrade = trade === "Other Trade" && customTrade.trim() ? customTrade.trim() : trade;
      const provisions = [
        provAccom ? "Accommodation by SASHA" : "Accommodation by Client",
        provTransport ? "Transport by SASHA" : "Transport by Client",
        provPPE ? "Standard PPE Required" : "",
        provOvertime ? "Overtime Required" : "",
      ]
        .filter(Boolean)
        .join(", ");
      const message = [
        `=== EMPLOYER MANPOWER REQUIREMENT ===`,
        `COMPANY: ${companyName || "Not specified"}`,
        `CONTACT PERSON: ${contactPerson}`,
        `PHONE: ${phone}`,
        email ? `EMAIL: ${email}` : null,
        `PROJECT SITE: ${projectSite || "Abu Dhabi Project"}`,
        `LOCATION: ${projectLocation}`,
        `TRADE NEEDED: ${activeTrade}`,
        `WORKERS COUNT: ${workersCount}`,
        `REQUIRED EXPERIENCE: ${experience}`,
        `MOBILIZATION: ${mobilisation}`,
        `DURATION: ${duration}`,
        provisions ? `PROVISIONS: ${provisions}` : null,
        remarks ? `REMARKS: ${remarks}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      body = {
        name: contactPerson,
        phone,
        email: email || undefined,
        kind: "Employer Project Requirement",
        companyName,
        projectLocation,
        workersCount,
        tradePosition: activeTrade,
        experience,
        remarks,
        message,
      };
    } else {
      const message = [
        `=== WORKER / CANDIDATE APPLICATION ===`,
        `APPLICANT NAME: ${contactPerson}`,
        `PHONE: ${phone}`,
        email ? `EMAIL: ${email}` : null,
        `APPLIED TRADE: ${applyingFor}`,
        `EXPERIENCE: ${workerExp}`,
        `CURRENT LOCATION: ${workerLoc}`,
        `VISA STATUS: ${workerVisa}`,
        remarks ? `REMARKS: ${remarks}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      body = {
        name: contactPerson,
        phone,
        email: email || undefined,
        kind: "Worker Job Application",
        projectLocation: workerLoc,
        tradePosition: applyingFor,
        experience: workerExp,
        remarks,
        message,
      };
    }

    const ok = await postEnquiry(body);
    if (ok) {
      setCompanyName("");
      setContactPerson("");
      setPhone("");
      setEmail("");
      setProjectSite("");
      setRemarks("");
      setApplyingFor("");
      setCustomTrade("");
    }
    setState(ok ? "done" : "error");
  }

  const id = (s: string) => `${uid}-${s}`;
  const employer = mode === "employer";

  return (
    <div className="req" id="job-application">
      <ContinuousTabs
        ariaLabel={f.tabsLabel}
        idPrefix={id("tabs")}
        panelId={id("panel")}
        activeId={mode}
        onChange={(m) => switchMode(m as "employer" | "worker")}
        tabs={[
          { id: "employer", label: f.tabEmployer },
          { id: "worker", label: f.tabWorker },
        ]}
      />

      <div className="req__panel" role="tabpanel" id={id("panel")} aria-labelledby={`${id("tabs")}-tab-${mode}`}>
        <div className="req__head">
          <h3 className="req__title">{employer ? f.employerTitle : f.workerTitle}</h3>
          <p className="req__lead">{employer ? f.employerLead : f.workerLead}</p>
        </div>

        {state === "done" ? (
          <Success
            title={f.successTitle}
            text={employer ? f.successEmployer : f.successWorker}
            again={f.again}
            onAgain={() => setState("idle")}
          />
        ) : (
          <form className="form" onSubmit={submit}>
            <fieldset className="form__set">
              <legend className="form__legend">{employer ? f.sec.contact : f.sec.candidate}</legend>
              <div className="form__grid">
                {employer && (
                  <Field id={id("co")} label={f.company} required>
                    <input id={id("co")} className="input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required autoComplete="organization" placeholder={f.ph.company} />
                  </Field>
                )}
                <Field id={id("cp")} label={employer ? f.contactPerson : f.fullName} required>
                  <input id={id("cp")} className="input" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required minLength={2} autoComplete="name" placeholder={employer ? f.ph.contactPerson : f.ph.fullName} />
                </Field>
                <Field id={id("ph")} label={f.phone} required>
                  <input id={id("ph")} className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required minLength={5} autoComplete="tel" inputMode="tel" placeholder={employer ? f.ph.phone : f.ph.workerPhone} dir="ltr" />
                </Field>
                <Field id={id("em")} label={f.email} hint={f.optional}>
                  <input id={id("em")} className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder={f.ph.email} dir="ltr" />
                </Field>
                {!employer && (
                  <Field id={id("af")} label={f.applyingFor} required>
                    <input id={id("af")} className="input" value={applyingFor} onChange={(e) => setApplyingFor(e.target.value)} required placeholder={f.ph.applyingFor} />
                  </Field>
                )}
              </div>
            </fieldset>

            {employer ? (
              <>
                <fieldset className="form__set">
                  <legend className="form__legend">{f.sec.site}</legend>
                  <div className="form__grid">
                    <Field id={id("ps")} label={f.projectSite} required>
                      <input id={id("ps")} className="input" value={projectSite} onChange={(e) => setProjectSite(e.target.value)} required placeholder={f.ph.projectSite} />
                    </Field>
                    <Field id={id("pl")} label={f.location}>
                      <Select id={id("pl")} value={projectLocation} onChange={setProjectLocation} options={OPTIONS.locations} lang={lang} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="form__set">
                  <legend className="form__legend">{f.sec.crew}</legend>
                  <div className="form__grid form__grid--3">
                    <Field id={id("tr")} label={f.trade}>
                      <Select id={id("tr")} value={trade} onChange={setTrade} options={OPTIONS.trades} lang={lang} />
                    </Field>
                    <Field id={id("wc")} label={f.workersCount}>
                      <Select id={id("wc")} value={workersCount} onChange={setWorkersCount} options={OPTIONS.workers} lang={lang} />
                    </Field>
                    <Field id={id("ex")} label={f.experience}>
                      <Select id={id("ex")} value={experience} onChange={setExperience} options={OPTIONS.employerExperience} lang={lang} />
                    </Field>
                    {trade === "Other Trade" && (
                      <Field id={id("ot")} label={f.otherTrade} required wide>
                        <input id={id("ot")} className="input" value={customTrade} onChange={(e) => setCustomTrade(e.target.value)} required placeholder={f.ph.otherTrade} />
                      </Field>
                    )}
                    <Field id={id("mb")} label={f.mobilisation}>
                      <Select id={id("mb")} value={mobilisation} onChange={setMobilisation} options={OPTIONS.mobilisation} lang={lang} />
                    </Field>
                    <Field id={id("du")} label={f.duration}>
                      <Select id={id("du")} value={duration} onChange={setDuration} options={OPTIONS.duration} lang={lang} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="form__set">
                  <legend className="form__legend">{f.sec.provisions}</legend>
                  <div className="checks">
                    {(
                      [
                        [provAccom, setProvAccom, f.provAccom],
                        [provTransport, setProvTransport, f.provTransport],
                        [provPPE, setProvPPE, f.provPPE],
                        [provOvertime, setProvOvertime, f.provOvertime],
                      ] as [boolean, (v: boolean) => void, string][]
                    ).map(([checked, set, label]) => (
                      <label key={label} className="check">
                        <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            ) : (
              <fieldset className="form__set">
                <legend className="form__legend">{f.sec.availability}</legend>
                <div className="form__grid form__grid--3">
                  <Field id={id("wx")} label={f.yearsExperience}>
                    <Select id={id("wx")} value={workerExp} onChange={setWorkerExp} options={OPTIONS.workerExperience} lang={lang} />
                  </Field>
                  <Field id={id("wl")} label={f.currentLocation}>
                    <Select id={id("wl")} value={workerLoc} onChange={setWorkerLoc} options={OPTIONS.currentLocation} lang={lang} />
                  </Field>
                  <Field id={id("wv")} label={f.visa}>
                    <Select id={id("wv")} value={workerVisa} onChange={setWorkerVisa} options={OPTIONS.visa} lang={lang} />
                  </Field>
                </div>
              </fieldset>
            )}

            <fieldset className="form__set">
              <legend className="form__legend">{f.sec.notes}</legend>
              <Field id={id("rm")} label={f.remarks} hint={f.optional} wide>
                <textarea id={id("rm")} className="input input--area" rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder={employer ? f.remarksEmployer : f.remarksWorker} />
              </Field>
            </fieldset>

            {state === "error" && (
              <p className="form__error" role="alert">
                {f.error}
              </p>
            )}
            <button type="submit" className="btn btn--primary btn--lg form__submit" disabled={state === "sending"}>
              {state === "sending" ? f.sending : employer ? f.submitEmployer : f.submitWorker}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
