import "./tailwind.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { getLang } from "@/lib/lang";
import { COPY, HTML_LANG } from "@/lib/copy";
import { COMPANY, SITE_URL } from "@/lib/site";

const sans = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: COPY.en.meta.title, template: `%s | ${COMPANY.name}` },
  description: COPY.en.meta.description,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: SITE_URL }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  category: "construction",
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
  colorScheme: "light dark",
};

// Applies the saved or system theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem('sasha_theme');document.documentElement.setAttribute('data-theme',t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light')}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html
      lang={HTML_LANG[lang]}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${sans.variable} ${mono.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
