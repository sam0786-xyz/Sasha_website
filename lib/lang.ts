import { headers } from "next/headers";
import { isLang, type Lang } from "./copy";

/** Language resolved by middleware from ?lang= or the saved cookie. */
export async function getLang(): Promise<Lang> {
  const value = (await headers()).get("x-site-lang");
  return isLang(value) ? value : "en";
}
