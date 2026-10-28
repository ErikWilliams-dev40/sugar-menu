import { baseData } from "../content/fixtures.ts";
import type { SiteData } from "../content/types.ts";
import { STORAGE } from "./storage.ts";
import { utilityLinks } from "../content/utility.ts";
export const imageNames = [
  "hero-1",
  "hero-2",
  "hero-3",
  "hero-4",
  "hero-5",
  "style",
  "dining",
  "wellness",
  "tech",
];
export const allowedDestinations = [
  "/",
  "/stories",
  "/extra-sugar",
  "/the-sugar-dish",
  ...baseData.categories.map((c) => `/${c.slug}`),
  ...utilityLinks.map((l) => l.href),
];
const strings = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === "string");
const fields = (v: unknown, keys: string[]): boolean =>
  !!v &&
  typeof v === "object" &&
  keys.every((k) => typeof (v as Record<string, unknown>)[k] === "string");
export function validateStudio(value: unknown): value is SiteData {
  if (!value || typeof value !== "object") return false;
  const d = value as SiteData;
  try {
    return (
      JSON.stringify(d.categories) === JSON.stringify(baseData.categories) &&
      Array.isArray(d.articles) &&
      d.articles.length === baseData.articles.length &&
      new Set(d.articles.map((a) => a.slug)).size ===
        baseData.articles.length &&
      d.articles.every((a) => {
        const seed = baseData.articles.find((s) => s.slug === a.slug);
        return (
          !!seed &&
          a.category === seed.category &&
          a.status === "draft" &&
          a.reviewStatus === seed.reviewStatus &&
          a.publishedAt === null &&
          a.adult === seed.adult &&
          fields(a, [
            "slug",
            "category",
            "topic",
            "title",
            "dek",
            "shortVersion",
            "image",
            "alt",
            "imageCredit",
            "authorSlug",
            "seoTitle",
            "seoDescription",
          ]) &&
          imageNames.includes(a.image) &&
          a.imageCredit === seed.imageCredit &&
          typeof a.featured === "boolean" &&
          typeof a.trending === "boolean" &&
          strings(a.tags) &&
          strings(a.internalLinks) &&
          strings(a.related) &&
          a.related.every((s) => baseData.articles.some((b) => b.slug === s)) &&
          Array.isArray(a.sections) &&
          a.sections.length > 0 &&
          a.sections.every((s) => fields(s, ["heading", "text"])) &&
          strings(a.takeaways) &&
          a.reviewer == null &&
          (a.quickAnswer == null || typeof a.quickAnswer === "string") &&
          (a.updatedAt == null || typeof a.updatedAt === "string") &&
          (a.faq == null ||
            (Array.isArray(a.faq) &&
              a.faq.every((item) => fields(item, ["question", "answer"])))) &&
          Array.isArray(a.sources) &&
          a.sources.every(
            (s) => fields(s, ["title", "url"]) && /^https:\/\//.test(s.url),
          )
        );
      }) &&
      Array.isArray(d.heroes) &&
      d.heroes.length === 5 &&
      new Set(d.heroes.map((h) => h.image)).size === 5 &&
      d.heroes.every(
        (h) =>
          fields(h, [
            "eyebrow",
            "line1",
            "line2",
            "copy",
            "cta",
            "href",
            "image",
          ]) &&
          baseData.heroes.some((b) => b.image === h.image) &&
          allowedDestinations.includes(h.href),
      ) &&
      Array.isArray(d.modules) &&
      d.modules.length === baseData.modules.length &&
      new Set(d.modules.map((m) => m.id)).size === d.modules.length &&
      d.modules.every(
        (m) =>
          fields(m, ["id", "label"]) &&
          typeof m.visible === "boolean" &&
          baseData.modules.some((b) => b.id === m.id),
      ) &&
      Array.isArray(d.authors) &&
      d.authors.length > 0 &&
      d.authors.every((a) => fields(a, ["slug", "name", "bio"])) &&
      d.articles.every((a) => d.authors.some((b) => b.slug === a.authorSlug)) &&
      fields(d.ad, ["eyebrow", "title", "cta", "href"]) &&
      allowedDestinations.includes(d.ad.href) &&
      fields(d.publication, ["tagline", "footerLine"]) &&
      Number.isFinite(d.publication.heroSeconds) &&
      d.publication.heroSeconds >= 3 &&
      d.publication.heroSeconds <= 30
    );
  } catch {
    return false;
  }
}
export function readStudio(): SiteData {
  const raw = localStorage.getItem(STORAGE.studio);
  if (!raw) return structuredClone(baseData);
  const saved: unknown = JSON.parse(raw);
  if (
    !saved ||
    typeof saved !== "object" ||
    !("version" in saved) ||
    saved.version !== 1 ||
    !("data" in saved) ||
    !validateStudio(saved.data)
  )
    throw new Error(
      "Saved studio data is invalid or from an unsupported version. Reset to the supplied kit to recover.",
    );
  return saved.data;
}
export function saveStudio(data: SiteData) {
  if (!validateStudio(data))
    throw new Error(
      "The edited content is incomplete or invalid. Check your fields before saving.",
    );
  localStorage.setItem(STORAGE.studio, JSON.stringify({ version: 1, data }));
}
export function moveItem<T>(items: T[], index: number, delta: number) {
  const target = index + delta;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
