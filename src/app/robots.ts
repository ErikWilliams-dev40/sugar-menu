import type { MetadataRoute } from "next";
import { robotsPolicy } from "@/lib/seo";
import { readSiteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return robotsPolicy(readSiteConfig());
}
