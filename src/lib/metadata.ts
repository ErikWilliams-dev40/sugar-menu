import type { Metadata } from "next";
import { readSiteConfig, SITE_NAME, type SiteConfig } from "./site.ts";

export function pageMetadata(
  input: {
    title: string;
    description: string;
    path: string;
    absoluteTitle?: boolean;
    /** False forces noindex. Omit to follow SITE_INDEXABLE. */
    index?: boolean;
    type?: "website" | "article";
    publishedTime?: string | null;
    modifiedTime?: string | null;
  },
  config: SiteConfig = readSiteConfig(),
): Metadata {
  const index = input.index ?? config.indexable;
  const canonical =
    input.path === "/" ? "/" : input.path.replace(/\/+$/, "") || "/";
  const socialTitle = input.absoluteTitle
    ? input.title
    : `${input.title} | ${SITE_NAME}`;
  const shared = {
    title: socialTitle,
    description: input.description,
    url: canonical,
    siteName: SITE_NAME,
    locale: "en_US",
  };
  const openGraph: Metadata["openGraph"] =
    input.type === "article"
      ? {
          ...shared,
          type: "article",
          ...(input.publishedTime
            ? { publishedTime: input.publishedTime }
            : {}),
          ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
        }
      : { ...shared, type: "website" };
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: input.description,
    },
  };
}
