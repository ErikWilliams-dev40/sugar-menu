export interface Section {
  readonly slug: string;
  readonly name: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly shot: string;
}

export interface Author {
  readonly name: string;
  readonly bio: string;
}

export interface MedicalReview {
  readonly name: string;
  readonly credential: string;
  readonly reviewedAt: string;
}

export type BodyBlock =
  | { readonly type: "paragraph" | "heading" | "quote"; readonly text: string }
  | {
      readonly type: "image";
      readonly src: string;
      readonly alt: string;
      readonly caption: string;
    }
  | { readonly type: "callout"; readonly title: string; readonly text: string };

export interface Article {
  readonly slug: string;
  readonly section: string;
  readonly subtopic: string;
  readonly title: string;
  readonly dek: string;
  readonly author: Author;
  readonly publishedAt: string;
  readonly updatedAt: string;
  readonly readMinutes: number;
  readonly shot: string;
  readonly body: readonly BodyBlock[];
  readonly tags: readonly string[];
  readonly relatedSlugs: readonly string[];
  readonly medicalReview?: MedicalReview;
  readonly sample: boolean;
}

export interface HeroSlide {
  readonly id: string;
  readonly eyebrow: string;
  readonly headline: string;
  readonly accent: string;
  readonly copy: string;
  readonly cta: string;
  readonly href: string;
  readonly shot: string;
}

/** CMS implementations must return the same normalized, validated content. */
export interface ContentRepository {
  getSections(): Promise<readonly Section[]>;
  getSection(slug: string): Promise<Section | undefined>;
  getArticles(section?: string): Promise<readonly Article[]>;
  getArticle(slug: string): Promise<Article | undefined>;
  getHeroSlides(): Promise<readonly HeroSlide[]>;
}
