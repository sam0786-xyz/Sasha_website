import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SASHA General Contracting",
  description:
    "Abu Dhabi general contracting — All Kind Building Projects Contracting",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
