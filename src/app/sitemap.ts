import type { MetadataRoute } from "next";
import { baseData } from "@/content/fixtures";
import { sitemapEntries } from "@/lib/seo";
import { readSiteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(readSiteConfig(), baseData);
}
