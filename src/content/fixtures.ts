import categories from "./data/categories.json" with { type: "json" };
import heroes from "./data/heroes.json" with { type: "json" };
import launchArticles from "./data/launch-articles.json" with { type: "json" };
import type { Article, Section, HeroSlide, SiteData } from "./types.ts";
export const sections: Section[] = categories;
export const heroSlides: HeroSlide[] = heroes;
export const articles: Article[] = launchArticles;
export const baseData: SiteData = {
  categories: sections,
  articles,
  heroes: heroSlides,
  authors: [
    {
      slug: "sugar-editors",
      name: "SUGARMENU Editors",
      bio: "Original launch drafts from the SUGARMENU editorial preview.",
    },
  ],
  modules: [
    ["hero", "Hero"],
    ["categories", "The menu"],
    ["just-in", "Just In"],
    ["eye-candy", "Eye Candy"],
    ["sweet-talk", "Sweet Talk"],
    ["sugar-high", "Sugar High"],
    ["featured", "The featured edit"],
    ["sugar-fix", "Sugar Fix"],
    ["the-sweet-spot", "The Sweet Spot"],
    ["sugar-bytes", "Sugar Bytes"],
    ["the-sugar-rush", "The Sugar Rush"],
    ["trending", "Trending Now"],
    ["community", "The Sugar Dish"],
    ["newsletter", "Extra Sugar"],
    ["glproud", "GLProud"],
    ["ad", "House ad"],
    ["closing", "Closing banner"],
  ].map(([id, label]) => ({ id, label, visible: true })),
  ad: {
    eyebrow: "Good taste has good company.",
    title: "Your brand. On the menu.",
    cta: "Explore partnerships",
    href: "/partnerships",
  },
  publication: {
    tagline: "Indulge Yourself.",
    footerLine:
      "Consider this your permission slip. The rest of your life is calling.",
    heroSeconds: 7,
  },
};
