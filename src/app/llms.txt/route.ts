import { baseData } from "@/content/fixtures";
import { llmsText } from "@/lib/seo";
import { readSiteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText(readSiteConfig(), baseData), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
