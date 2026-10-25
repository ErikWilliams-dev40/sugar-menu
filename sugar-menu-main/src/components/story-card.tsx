import Link from "next/link";
import type { Article } from "@/content/types";
import { PlaceholderImage } from "./placeholder-image";

export function StoryCard({ article }: { article: Article }) {
  return (
    <article className="story-card">
      <Link href={`/stories/${article.slug}`}>
        <PlaceholderImage caption={article.shot} />
        <div className="card-copy">
          <p className="eyebrow">{article.subtopic}</p>
          <h3>{article.title}</h3>
          <p>{article.dek}</p>
          <span className="text-link">Read the sample →</span>
        </div>
      </Link>
    </article>
  );
}
