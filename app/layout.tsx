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
  verification: {
    other: {
      "msvalidate.01": "8074C2887D2C2E801E5B327276CD6F88",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
  colorScheme: "light dark",
};

// Applies the saved or system theme before first paint to avoid a flash.
// The operations portal (/ops) has no dark theme of its own, so it always renders light.
const themeScript = `try{var d=document.documentElement;if(location.pathname.indexOf('/ops')===0){d.setAttribute('data-theme','light');d.style.colorScheme='light'}else{var t=localStorage.getItem('sasha_theme');d.setAttribute('data-theme',t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light')}}catch(e){}`;

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
        {/* Bing Webmaster Tools verification */}
        <meta name="msvalidate.01" content="8074C2887D2C2E801E5B327276CD6F88" />
        {/* Google Tag (GTM-5MSKVV4F) */}
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-5MSKVV4F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
