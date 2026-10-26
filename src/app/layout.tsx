import type { Metadata } from "next";
import "../styles/tokens.css";
import "./globals.css";
import "./refinements.css";
import { SiteFrame } from "@/components/site-frame";
import { PrivacyChoice } from "@/components/privacy";
export const metadata: Metadata = {
  title: {
    default: "SugarMenu — Indulge Yourself.",
    template: "%s | SugarMenu",
  },
  description:
    "New places. New experiences. New possibilities. A lifestyle-first editorial publication.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main-content">
          Skip to content
        </a>
        <SiteFrame>{children}</SiteFrame>
        <PrivacyChoice />
      </body>
    </html>
  );
}
