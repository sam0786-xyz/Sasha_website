// New-enquiry email alerts for the operations team (SMTP), switched on by environment variables —
// see docs/notifications.md. WhatsApp is handled in the browser: after submitting, the visitor is
// handed to a WhatsApp chat with the company with their details already typed (components/site/Forms.tsx).
// Alerts never block or fail a submission: errors are logged without personal details.

import nodemailer from "nodemailer";
import { SITE_URL } from "./site";

export type EnquiryAlert = {
  kind: string;
  name: string;
  phone: string;
  email?: string | null;
  companyName?: string | null;
  projectLocation?: string | null;
  workersCount?: string | null;
  tradePosition?: string | null;
  experience?: string | null;
  remarks?: string | null;
  message: string;
  lang?: string | null;
};

const LANG_LABEL: Record<string, string> = { en: "English", ar: "Arabic", hi: "Hindi", hinglish: "Hinglish" };

const list = (v?: string) =>
  (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

function isEmployer(e: EnquiryAlert) {
  return /employer|requirement|manpower/i.test(e.kind);
}

function headline(e: EnquiryAlert) {
  return isEmployer(e) ? "New employer requirement" : "New job application";
}

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

/** Label/value rows for the alert email. */
function fields(e: EnquiryAlert): [string, string][] {
  const rows: [string, string | null | undefined][] = [
    ["Type", e.kind],
    ["Name", e.name],
    ["Phone / WhatsApp", e.phone],
    ["Email", e.email],
    ["Company", e.companyName],
    [isEmployer(e) ? "Trade needed" : "Applying for", e.tradePosition],
    ["Workers", e.workersCount],
    ["Experience", e.experience],
    ["Location", e.projectLocation],
    ["Language used", e.lang ? LANG_LABEL[e.lang] || e.lang : null],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1] && String(r[1]).trim()));
}

/* ---------------- Email (SMTP) ---------------- */

export function emailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && list(process.env.NOTIFY_EMAIL_TO).length);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function emailHtml(e: EnquiryAlert) {
  const rows = fields(e)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#66666f;font:13px Arial,sans-serif;white-space:nowrap;vertical-align:top">${esc(k)}</td>` +
        `<td style="padding:8px 12px;color:#16161a;font:600 14px Arial,sans-serif">${esc(v)}</td></tr>`,
    )
    .join("");
  const wa = `https://wa.me/${digits(e.phone)}`;
  const btn = (href: string, label: string, primary = false) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:11px 18px;border-radius:6px;font:600 14px Arial,sans-serif;text-decoration:none;${
      primary ? "background:#f26b1d;color:#121214" : "background:#ffffff;color:#16161a;border:1px solid #c9c8c3"
    }">${esc(label)}</a>`;
  return `<!doctype html><html><body style="margin:0;background:#f4f4f2;padding:24px">
<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e3e2de;border-radius:10px;border-collapse:separate">
<tr><td style="background:#121214;border-radius:10px 10px 0 0;padding:18px 20px;color:#f4f3f0;font:700 16px Arial,sans-serif">
<span style="color:#f26b1d">■</span>&nbsp; SASHA GC — ${esc(headline(e))}</td></tr>
<tr><td style="padding:12px 8px"><table role="presentation" style="border-collapse:collapse">${rows}</table></td></tr>
<tr><td style="padding:4px 20px 8px">
${btn(`tel:${e.phone.replace(/[^\d+]/g, "")}`, "Call", true)}${btn(wa, "WhatsApp")}${e.email ? btn(`mailto:${e.email}`, "Reply by email") : ""}${btn(`${SITE_URL}/ops`, "Open operations desk")}
</td></tr>
<tr><td style="padding:8px 20px 20px"><div style="font:12px Arial,sans-serif;color:#66666f;margin-bottom:6px">Full submission</div>
<pre style="margin:0;padding:12px;background:#f4f4f2;border-radius:6px;font:12px/1.5 Menlo,Consolas,monospace;color:#16161a;white-space:pre-wrap">${esc(e.message)}</pre></td></tr>
</table></body></html>`;
}

function emailText(e: EnquiryAlert) {
  return [
    `${headline(e)} — sashagc.com`,
    "",
    ...fields(e).map(([k, v]) => `${k}: ${v}`),
    "",
    `WhatsApp: https://wa.me/${digits(e.phone)}`,
    `Operations desk: ${SITE_URL}/ops`,
    "",
    "Full submission:",
    e.message,
  ].join("\n");
}

async function sendEmail(e: EnquiryAlert) {
  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const who = [e.name, e.companyName].filter(Boolean).join(", ");
  const what = e.tradePosition ? ` — ${e.tradePosition}` : "";
  await transport.sendMail({
    from: { name: "SASHA GC Website", address: process.env.NOTIFY_EMAIL_FROM || process.env.SMTP_USER! },
    to: list(process.env.NOTIFY_EMAIL_TO),
    replyTo: e.email || undefined,
    subject: `${headline(e)}: ${who}${what}`.slice(0, 180),
    text: emailText(e),
    html: emailHtml(e),
  });
}

/* ---------------- Entry point ---------------- */

export async function notifyNewEnquiry(e: EnquiryAlert): Promise<void> {
  if (!emailConfigured()) return;
  try {
    await sendEmail(e);
  } catch (err) {
    console.error(`[notify] email alert failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}
