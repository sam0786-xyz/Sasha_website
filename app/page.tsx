import { db } from "@/lib/db";
import { PublicSite, Lang } from "@/components/PublicSite";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const jobs = await db.job.findMany({ where: { status: "OPEN" } });
  const { lang } = await searchParams;
  const initialLang: Lang = lang === "ar" || lang === "hi" ? lang : "en";

  return (
    <PublicSite
      jobs={jobs}
      phone={process.env.COMPANY_PHONE || ""}
      initialLang={initialLang}
    />
  );
}
