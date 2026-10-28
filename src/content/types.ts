export interface Section {
  slug: string;
  name: string;
  topics: string[];
  description: string;
  image: string;
}
export interface Author {
  slug: string;
  name: string;
  bio: string;
  /** Omitted until the team supplies a real expertise statement. */
  expertise?: string;
}
export interface ArticleFaq {
  question: string;
  answer: string;
}
/** A real person supplied by the team. Never invent one. */
export interface ClinicalReviewer {
  name: string;
  url?: string;
  credentials?: string;
  reviewedAt?: string;
}
export interface Article {
  slug: string;
  category: string;
  topic: string;
  title: string;
  dek: string;
  shortVersion: string;
  sections: { heading: string; text: string }[];
  takeaways: string[];
  sources: { title: string; url: string }[];
  status: string;
  image: string;
  alt: string;
  imageCredit: string;
  authorSlug: string;
  tags: string[];
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  internalLinks: string[];
  adult: boolean;
  related: string[];
  featured: boolean;
  trending: boolean;
  reviewStatus?: string;
  /** Optional 40–60 word direct answer. Omit until editors write it. */
  quickAnswer?: string;
  /** Optional visible FAQ. Rendered only when questions and answers exist. */
  faq?: ArticleFaq[];
  updatedAt?: string | null;
  /** GLP-1 Guide only, and only when a real reviewer is on file. */
  reviewer?: ClinicalReviewer | null;
}
export interface HeroSlide {
  eyebrow: string;
  line1: string;
  line2: string;
  copy: string;
  cta: string;
  href: string;
  image: string;
}
export interface ContentRepository {
  getSections(): Promise<readonly Section[]>;
  getSection(slug: string): Promise<Section | undefined>;
  getArticles(section?: string): Promise<readonly Article[]>;
  getArticle(slug: string, section?: string): Promise<Article | undefined>;
  getHeroSlides(): Promise<readonly HeroSlide[]>;
}
export interface HomeModule {
  id: string;
  label: string;
  visible: boolean;
}
export interface Publication {
  tagline: string;
  footerLine: string;
  heroSeconds: number;
}
export interface SiteData {
  categories: Section[];
  articles: Article[];
  heroes: HeroSlide[];
  modules: HomeModule[];
  authors: Author[];
  ad: { eyebrow: string; title: string; cta: string; href: string };
  publication: Publication;
}
