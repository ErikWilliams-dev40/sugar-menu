import type { Article } from "./types.ts";

/**
 * Shape sample for the optional answer-engine fields. It is not merged into
 * the launch drafts and is not a published answer.
 */
export const aeoFieldExample = {
  quickAnswer:
    "SUGARMENU is a lifestyle publication with a separate GLP-1 Guide called GLProud. This quick-answer field is optional. When editors supply 40 to 60 words, the article template shows them under the headline. This sample is not published on a story, and it is not medical advice or a reviewed answer.",
  faq: [
    {
      question: "Where does a quick answer appear?",
      answer:
        "Under the article headline, and only when the story record includes one.",
    },
    {
      question: "When is a medical reviewer shown?",
      answer:
        "Only on a GLP-1 Guide story that already has a real reviewer in the content record.",
    },
  ],
  updatedAt: null,
  reviewer: null,
} satisfies Pick<Article, "quickAnswer" | "faq" | "updatedAt" | "reviewer">;
