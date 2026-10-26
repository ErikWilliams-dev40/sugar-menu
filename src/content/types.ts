export interface Section {
  slug: string;
  name: string;
  topics: string[];
  description: string;
  image: string;
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
  authors: { slug: string; name: string; bio: string }[];
  ad: { eyebrow: string; title: string; cta: string; href: string };
  publication: Publication;
}
