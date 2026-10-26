import Link from "next/link";
import type { Article } from "@/content/types";
import { articleUrl, readingMinutes } from "@/content/repository";
import { EditorialImage } from "./editorial-image";
export function StoryCard({
  article,
  categoryName,
  compact = false,
  href,
}: {
  article: Article;
  categoryName?: string;
  compact?: boolean;
  href?: string;
}) {
  const url = href ?? articleUrl(article);
  return (
    <article className={`story${compact ? " row-story" : ""}`}>
      <Link className="story-image" href={url} tabIndex={-1} aria-hidden="true">
        <EditorialImage name={article.image} />
      </Link>
      <div>
        <div className="kicker">
          {categoryName ?? article.category.replaceAll("-", " ")} ·{" "}
          {article.topic}
        </div>
        <h3>
          <Link href={url}>{article.title}</Link>
        </h3>
        <p>{article.dek}</p>
        <Link className="text-link" href={url}>
          Read the story →
        </Link>
        <span className="meta">
          {readingMinutes(article)} min read · Launch draft
        </span>
      </div>
    </article>
  );
}
