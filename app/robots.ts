import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search engines and AI answer engines are welcome; the operations portal and API are not.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/ops", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
