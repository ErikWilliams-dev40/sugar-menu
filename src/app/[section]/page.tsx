import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content/repository";
import { CategoryView } from "@/components/editorial-views";
import { utilityPages, getUtilityPage } from "@/content/utility";
type Props = {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ topic?: string }>;
};
export async function generateStaticParams() {
  return [
    ...(await content.getSections())
      .filter(
        (s) => !["glproud", "extra-sugar", "the-sugar-dish"].includes(s.slug),
      )
      .map((s) => ({ section: s.slug })),
    ...Object.keys(utilityPages).map((section) => ({ section })),
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const category = await content.getSection(section),
    utility = getUtilityPage(section);
  if (!category && !utility) notFound();
  return {
    title: category?.name ?? utility!.title,
    description: category?.description ?? utility!.intro,
  };
}
export default async function SectionPage({ params, searchParams }: Props) {
  const { section } = await params;
  const utility = getUtilityPage(section);
  if (utility)
    return (
      <article className="prose-page">
        <span className="kicker">SUGARMENU · Editorial preview</span>
        <h1>{utility!.title}</h1>
        <p className="utility-intro">{utility!.intro}</p>
        {utility.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </article>
    );
  const category = await content.getSection(section);
  if (!category) notFound();
  const { topic } = await searchParams;
  return (
    <CategoryView
      category={category}
      articles={await content.getArticles(section)}
      topic={topic}
    />
  );
}
