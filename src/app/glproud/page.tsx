import { content } from "@/content/repository";
import { CategoryView } from "@/components/editorial-views";
export const metadata = {
  title: "GLProud",
  description:
    "Your life is bigger than a prescription. Thoughtful resources, without the judgment.",
};
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
