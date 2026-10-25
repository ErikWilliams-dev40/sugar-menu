import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/content/repository";
import { PlaceholderImage } from "@/components/placeholder-image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await content.getArticles()).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await content.getArticle((await params).slug);
  if (!article) notFound();
  return { title: article.title, description: article.dek };
}

export default async function ArticlePage({ params }: Props) {
  const article = await content.getArticle((await params).slug);
  if (!article) notFound();
  const section = await content.getSection(article.section);
  return (
    <article className="container section-space">
      <header className="article-heading">
        <Link className="eyebrow" href={`/${article.section}`}>
          {section?.name} / {article.subtopic}
        </Link>
        <h1>{article.title}</h1>
        <p className="dek">{article.dek}</p>
        <p className="meta">
          {article.author.name} ·{" "}
          <time dateTime={article.publishedAt}>{article.publishedAt}</time> ·{" "}
          {article.readMinutes} min read
        </p>
        {article.sample && (
          <p className="sample-label">Sample story · Preview content</p>
        )}
      </header>
      <PlaceholderImage className="article-image" caption={article.shot} />
      <div className="article-body">
        {article.body.map((block, index) => {
          switch (block.type) {
            case "heading":
              return <h2 key={index}>{block.text}</h2>;
            case "quote":
              return <blockquote key={index}>{block.text}</blockquote>;
            case "callout":
              return (
                <aside className="empty-state" key={index}>
                  <h2>{block.title}</h2>
                  <p>{block.text}</p>
                </aside>
              );
            case "image":
              return (
                <figure key={index}>
                  <PlaceholderImage caption={block.alt} />
                  <figcaption>{block.caption}</figcaption>
                </figure>
              );
            case "paragraph":
              return <p key={index}>{block.text}</p>;
          }
        })}
        <aside className="author-box">
          <h2>{article.author.name}</h2>
          <p>{article.author.bio}</p>
        </aside>
      </div>
    </article>
  );
}
