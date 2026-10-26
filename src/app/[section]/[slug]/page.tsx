import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content/repository";
import { baseData } from "@/content/fixtures";
import { ArticleView } from "@/components/editorial-views";
type Props = { params: Promise<{ section: string; slug: string }> };
export async function generateStaticParams() {
  return (await content.getArticles()).map((a) => ({
    section: a.category,
    slug: a.slug,
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const a = await content.getArticle(slug, section);
  if (!a) notFound();
  return { title: { absolute: a.seoTitle }, description: a.seoDescription };
}
export default async function ArticlePage({ params }: Props) {
  const { section, slug } = await params;
  const article = await content.getArticle(slug, section);
  if (!article) notFound();
  return <ArticleView article={article} data={baseData} />;
}
