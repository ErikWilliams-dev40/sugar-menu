import type { Metadata } from "next";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-800.css";
import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/libre-caslon-text/latin-400.css";
import "@fontsource/jost/latin-500.css";
import "@fontsource/jost/latin-600.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "SugarMenu — Indulge Yourself.",
    template: "%s | SugarMenu",
  },
  description:
    "New places. New experiences. New possibilities. A lifestyle-first editorial publication.",
  // Sample content must not be indexed. Revisit with the production content launch.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div className="preview-notice">
          A taste of what’s next · Site preview
        </div>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
