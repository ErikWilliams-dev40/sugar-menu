export type AnalyticsEvent =
  | { name: "article_view"; slug: string; category: string }
  | { name: "category_engagement"; category: string; topic?: string }
  | { name: "newsletter_signup"; status: "success" | "error" }
  | { name: "community_early_access_signup"; status: "success" | "error" }
  | {
      name: "glp1_guide_engagement";
      slug?: string;
      surface: "front" | "article" | "module" | "crosslink";
    }
  | { name: "sponsored_placement_click"; href: string; label: string };

export type AnalyticsTracker = (event: AnalyticsEvent) => void;

let tracker: AnalyticsTracker | null = null;

/** Register a vendor later. Until then trackEvent is a no-op. */
export function setTracker(next: AnalyticsTracker | null) {
  tracker = next;
}

export function trackEvent(event: AnalyticsEvent) {
  tracker?.(event);
}
