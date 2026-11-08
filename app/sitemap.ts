import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

function languages(path: string) {
  return { en: `${SITE_URL}${path}`, ar: `${SITE_URL}${path}?lang=ar`, "hi-Latn": `${SITE_URL}${path}?lang=hi` };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1, alternates: { languages: languages("/") } },
  ];
  try {
    const jobs = await db.job.findMany({ where: { status: "OPEN" } });
    for (const j of jobs) {
      entries.push({
        url: `${SITE_URL}/jobs/${j.id}`,
        lastModified: new Date(j.updatedAt),
        changeFrequency: "daily",
        priority: 0.7,
        alternates: { languages: languages(`/jobs/${j.id}`) },
      });
    }
  } catch {
    // The home page is still listed if the database is unavailable.
  }
  return entries;
}
