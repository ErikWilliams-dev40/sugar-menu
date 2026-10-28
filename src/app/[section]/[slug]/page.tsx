import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, articleUrl } from "@/content/repository";
import { baseData } from "@/content/fixtures";
import { ArticleView } from "@/components/editorial-views";
import { pageMetadata } from "@/lib/metadata";
import { articleMetaTitle } from "@/lib/seo";
type Props = { params: Promise<{ section: string; slug: string }> };
export async function generateStaticParams() {
  return (await content.getArticles()).map((a) => ({
    section: a.category,
    slug: a.slug,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const article = await content.getArticle(slug, section);
  if (!article) notFound();
  return pageMetadata({
    title: articleMetaTitle(article),
    description: article.seoDescription,
    path: articleUrl(article),
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
  });
}
export default async function ArticlePage({ params }: Props) {
  const { section, slug } = await params;
  const article = await content.getArticle(slug, section);
  if (!article) notFound();
  return <ArticleView article={article} data={baseData} />;
}
