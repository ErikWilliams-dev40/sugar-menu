/**
 * Lifestyle drafts that already discuss protein, training, or wellness
 * marketing, and the GLProud drafts a reader can open next. Targets stay
 * inside the supplied guide. This is not a medical recommendation.
 */
export const guideLinksBySlug: Record<string, readonly string[]> = {
  "protein-without-sad-chicken": [
    "muscle-protein-and-your-trainer",
    "eating-with-a-smaller-appetite",
  ],
  "strength-training-belongs-to-you": ["muscle-protein-and-your-trainer"],
  "the-twenty-minute-workout-youll-repeat": ["muscle-protein-and-your-trainer"],
  "the-celebrity-wellness-brand-nobody-needs": [
    "what-glp-one-medicines-actually-do",
  ],
};

export function guideArticleSlugs(slug: string): readonly string[] {
  return guideLinksBySlug[slug] ?? [];
}
