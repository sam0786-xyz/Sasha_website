import "./ops.css";
import type { Metadata } from "next";

// The operations portal keeps its original stylesheet and stays out of search engines.
export const metadata: Metadata = {
  title: "Operations Portal",
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
