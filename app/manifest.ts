import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: COMPANY.shortName,
    description: "Abu Dhabi building contractor — structural, MEP and finishing works, and skilled site crews.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#121214",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
