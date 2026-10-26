import { notFound, permanentRedirect } from "next/navigation";
import { content, articleUrl } from "@/content/repository";
export default async function LegacyArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "the-situationship-exit-interview")
    permanentRedirect("/sweet-talk");
  const article = await content.getArticle(slug);
  if (!article) notFound();
  permanentRedirect(articleUrl(article));
}
