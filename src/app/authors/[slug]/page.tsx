import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { baseData } from "@/content/fixtures";
import { articleUrl } from "@/content/repository";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbStructuredData } from "@/lib/seo";
import { readSiteConfig } from "@/lib/site";

export function generateStaticParams() {
  return baseData.authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = baseData.authors.find((item) => item.slug === slug);
  if (!author) notFound();
  return pageMetadata({
    title: author.name,
    description: author.bio,
    path: `/authors/${author.slug}`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = baseData.authors.find((item) => item.slug === slug);
  if (!author) notFound();
  const stories = baseData.articles.filter(
    (article) => article.authorSlug === author.slug,
  );
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contributors", path: "/authors" },
    { name: author.name, path: `/authors/${author.slug}` },
  ];
  return (
    <article className="prose-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              name: author.name,
              description: author.bio,
              url: `${readSiteConfig().origin}/authors/${author.slug}`,
              mainEntity: {
                "@type": "Person",
                name: author.name,
                url: `${readSiteConfig().origin}/authors/${author.slug}`,
                description: author.bio,
              },
            },
            breadcrumbStructuredData(crumbs, readSiteConfig()),
          ],
        }}
      />
      <Breadcrumbs plain items={crumbs} />
      <span className="kicker">SUGARMENU</span>
      <h1>{author.name}</h1>
      <p className="utility-intro">{author.bio}</p>
      <section>
        <h2>Expertise</h2>
        <p>
          {author.expertise ??
            "Named expertise and credentials have not been supplied for this preview."}
        </p>
      </section>
      <section>
        <h2>Stories</h2>
        {stories.length ? (
          <ul>
            {stories.map((story) => (
              <li key={story.slug}>
                <Link href={articleUrl(story)}>{story.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No stories are credited to this name yet.</p>
        )}
      </section>
    </article>
  );
}
