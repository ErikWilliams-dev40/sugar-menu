import { articles, heroSlides, sections } from "./fixtures.ts";
import type { ContentRepository } from "./types.ts";

/** Local fixture adapter. Replace this boundary when a CMS is selected. */
export const content: ContentRepository = {
  async getSections() {
    return sections;
  },
  async getSection(slug) {
    return sections.find((section) => section.slug === slug);
  },
  async getArticles(section) {
    return section
      ? articles.filter((article) => article.section === section)
      : articles;
  },
  async getArticle(slug) {
    return articles.find((article) => article.slug === slug);
  },
  async getHeroSlides() {
    return heroSlides;
  },
};
