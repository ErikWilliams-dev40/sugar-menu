import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content } from "@/content/repository";
import { PageIntro } from "@/components/page-intro";
import { StoryCard } from "@/components/story-card";

type Props = { params: Promise<{ section: string }> };

export async function generateStaticParams() {
  return (await content.getSections())
    .filter((section) => section.slug !== "glproud")
    .map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = await content.getSection((await params).section);
  if (!section) notFound();
  return { title: section.name, description: section.description };
}

export default async function SectionPage({ params }: Props) {
  const section = await content.getSection((await params).section);
  if (!section) notFound();
  const articles = await content.getArticles(section.slug);
  return (
    <>
      <PageIntro
        eyebrow={section.eyebrow}
        title={section.name}
        description={section.description}
      />
      <section className="container section-space">
        <h2>Latest in {section.name}</h2>
        {articles.length ? (
          <div className="story-grid">
            {articles.map((article) => (
              <StoryCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="eyebrow">Coming to the menu</p>
            <p>
              The first stories are on their way. Come back for a little more{" "}
              {section.name}.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
