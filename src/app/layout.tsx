import type { Metadata } from "next";
import { preload } from "react-dom";
import "../styles/tokens.css";
import "./globals.css";
import "./refinements.css";
import { JsonLd } from "@/components/json-ld";
import { PrivacyChoice } from "@/components/privacy";
import { SiteFrame } from "@/components/site-frame";
import { siteStructuredData } from "@/lib/seo";
import {
  DEFAULT_DESCRIPTION,
  readSiteConfig,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";

const site = readSiteConfig();
const fonts = [
  "/fonts/caslon.woff2",
  "/fonts/playfair.woff2",
  "/fonts/jost.woff2",
];

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: site.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  for (const href of fonts) {
    preload(href, {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  }
  return (
    <html lang="en">
      <body>
        <JsonLd data={siteStructuredData(site)} />
        <a className="skip" href="#main-content">
          Skip to content
        </a>
        <SiteFrame>{children}</SiteFrame>
        <PrivacyChoice />
      </body>
    </html>
  );
}
