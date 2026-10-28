export const SITE_NAME = "SUGARMENU";
export const SITE_TAGLINE = "Indulge Yourself.";
export const DEFAULT_DESCRIPTION =
  "New places. New experiences. New possibilities. A lifestyle-first editorial publication.";

/** AI crawlers whose allow/deny rule is chosen in one place. */
export const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
] as const;

export const PRIVATE_PATHS = ["/search", "/studio", "/api/"] as const;

export interface SiteConfig {
  origin: string;
  /** True only when SITE_INDEXABLE=true. Read at build time for static pages. */
  indexable: boolean;
  aiCrawlers: "allow" | "deny";
  googleSiteVerification?: string;
}

const LOCAL_ORIGIN = "http://localhost:3000";

export function googleVerification(
  value: string | undefined,
): string | undefined {
  const token = value?.trim();
  if (!token || !/^[A-Za-z0-9_-]{10,200}$/.test(token)) return undefined;
  return token;
}

function originFrom(raw: string | undefined, indexable: boolean): string {
  const trimmed = raw?.trim();
  if (!trimmed) {
    if (indexable) {
      throw new Error("SITE_URL is required when SITE_INDEXABLE=true");
    }
    return LOCAL_ORIGIN;
  }
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error("SITE_URL must be an absolute http(s) origin");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("SITE_URL must be an absolute http(s) origin");
  }
  return url.origin;
}

export function readSiteConfig(env?: Partial<NodeJS.ProcessEnv>): SiteConfig {
  // Direct process.env reads are inlined at build so static and dynamic
  // routes share one launch decision. Tests pass an explicit env object.
  const source = env ?? {
    SITE_INDEXABLE: process.env.SITE_INDEXABLE,
    SITE_URL: process.env.SITE_URL,
    AI_CRAWLER_POLICY: process.env.AI_CRAWLER_POLICY,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  };
  const indexable = source.SITE_INDEXABLE === "true";
  const policy = source.AI_CRAWLER_POLICY?.trim().toLowerCase();
  const aiCrawlers: "allow" | "deny" =
    policy === "allow" || policy === "deny"
      ? policy
      : indexable
        ? "allow"
        : "deny";
  return {
    origin: originFrom(source.SITE_URL, indexable),
    indexable,
    aiCrawlers,
    googleSiteVerification: googleVerification(source.GOOGLE_SITE_VERIFICATION),
  };
}
