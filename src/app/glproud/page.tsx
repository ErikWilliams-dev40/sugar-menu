import type { Metadata } from "next";
import { content } from "@/content/repository";
import { CategoryView } from "@/components/editorial-views";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}): Promise<Metadata> {
  const category = (await content.getSection("glproud"))!;
  const topic = (await searchParams).topic;
  return pageMetadata({
    title: category.name,
    description: category.description,
    path: "/glproud",
    index: topic ? false : undefined,
  });
}
export default async function GLProud({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const category = (await content.getSection("glproud"))!;
  return (
    <CategoryView
      category={category}
      articles={await content.getArticles("glproud")}
      topic={(await searchParams).topic}
    />
  );
}
