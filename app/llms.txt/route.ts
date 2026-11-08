import { db } from "@/lib/db";
import { COPY } from "@/lib/copy";
import { COMPANY, SITE_URL, companyPhone } from "@/lib/site";

export const dynamic = "force-dynamic";

// Plain-language company summary for AI assistants and answer engines (llmstxt.org).
export async function GET() {
  const t = COPY.en;
  const phone = companyPhone();
  let roles: string[] = [];
  try {
    const jobs = await db.job.findMany({ where: { status: "OPEN" } });
    roles = jobs.map(
      (j) => `- [${j.title} – ${j.location}](${SITE_URL}/jobs/${j.id})${j.salaryText ? `: ${j.salaryText}` : ""}${j.experience ? `, ${j.experience}` : ""}`,
    );
  } catch {}

  const body = `# ${COMPANY.name}

> ${t.footer.about}

## Key facts
- Legal name: ${COMPANY.legalName}
- Arabic name: ${COMPANY.nameAr}
- Licensed activity: ${COMPANY.licensedActivity}
- Registered in: Abu Dhabi, United Arab Emirates
- Works in: Emirate of Abu Dhabi (Saadiyat, Yas, Reem, Mussafah, Al Ain, Al Dhafra); Dubai, Sharjah and the Northern Emirates considered
- Languages: English, Arabic, Hindi
- Leadership: ${COMPANY.leaders.map((l) => `${l.name} (${l.jobTitle})`).join("; ")}
- Phone and WhatsApp: ${phone}
- Email: ${COMPANY.email}
- Website: ${SITE_URL}

## Services
${t.services.items.map((s) => `- ${s.title}: ${s.desc}`).join("\n")}

## Trades supplied
${t.hero.trades.map((x) => `- ${x}`).join("\n")}

## Worker policy
- ${t.protect.text}
- ${t.company.notice}

## Open roles
${roles.length ? roles.join("\n") : "- No roles are open right now."}

## Frequently asked questions
${t.faq.items.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Pages
- [Home (English)](${SITE_URL}/)
- [Home (Arabic)](${SITE_URL}/?lang=ar)
- [Home (Hinglish)](${SITE_URL}/?lang=hi)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
