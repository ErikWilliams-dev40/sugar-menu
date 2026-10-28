import { content } from "@/content/repository";
import { ogImage, ogSize } from "@/components/og-card";

export const alt = "SUGARMENU story";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const article = await content.getArticle(slug, section);
  return ogImage(
    article ? `${article.topic}` : "SUGARMENU",
    article?.title ?? "SUGARMENU",
  );
}
