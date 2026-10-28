import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content/repository";
import { CategoryView } from "@/components/editorial-views";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { utilityPages, getUtilityPage } from "@/content/utility";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData } from "@/lib/seo";
import { readSiteConfig } from "@/lib/site";
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
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { section } = await params;
  const category = await content.getSection(section);
  const utility = getUtilityPage(section);
  if (!category && !utility) notFound();
  const topic = (await searchParams).topic;
  return pageMetadata({
    title: category?.name ?? utility!.title,
    description: category?.description ?? utility!.intro,
    path: `/${section}`,
    index: category && topic ? false : undefined,
  });
}
export default async function SectionPage({ params, searchParams }: Props) {
  const { section } = await params;
  const utility = getUtilityPage(section);
  if (utility) {
    const crumbs = [
      { name: "Home", path: "/" },
      { name: utility.title, path: `/${section}` },
    ];
    return (
      <article className="prose-page">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            ...breadcrumbStructuredData(crumbs, readSiteConfig()),
          }}
        />
        <Breadcrumbs plain items={crumbs} />
        <span className="kicker">SUGARMENU</span>
        <h1>{utility.title}</h1>
        <p className="utility-intro">{utility.intro}</p>
        {utility.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.text}</p>
          </section>
        ))}
      </article>
    );
  }
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
