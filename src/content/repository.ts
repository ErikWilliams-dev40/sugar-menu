import { articles, heroSlides, sections } from "./fixtures.ts";
import type { Article, ContentRepository } from "./types.ts";
export function articleUrl(article: Pick<Article, "category" | "slug">) {
  return `/${article.category}/${article.slug}`;
}
export function readingMinutes(article: Article) {
  const text = [
    article.dek,
    article.shortVersion,
    ...article.sections.flatMap((s) => [s.heading, s.text]),
    ...article.takeaways,
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 220));
}
export function searchArticles(
  query: string,
  items: readonly Article[] = articles,
) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return items
    .map((article, index) => {
      const title = article.title.toLocaleLowerCase();
      const text = [
        title,
        article.dek,
        article.topic,
        ...article.tags,
        ...article.sections.map((s) => `${s.heading} ${s.text}`),
      ]
        .join(" ")
        .toLocaleLowerCase();
      return {
        article,
        index,
        score: terms.filter((t) => title.includes(t)).length,
        match: terms.every((t) => text.includes(t)),
      };
    })
    .filter((x) => x.match)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((x) => x.article);
}
export const content: ContentRepository = {
  async getSections() {
    return sections;
  },
  async getSection(slug) {
    return sections.find((s) => s.slug === slug);
  },
  async getArticles(section) {
    return section ? articles.filter((a) => a.category === section) : articles;
  },
  async getArticle(slug, section) {
    return articles.find(
      (a) => a.slug === slug && (!section || a.category === section),
    );
  },
  async getHeroSlides() {
    return heroSlides;
  },
};
