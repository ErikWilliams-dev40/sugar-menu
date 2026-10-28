export const utilityPages: Record<
  string,
  {
    title: string;
    intro: string;
    sections: { heading: string; text: string }[];
  }
> = {
  about: {
    title: "About SugarMenu",
    intro: "Consider this your permission slip.",
    sections: [
      {
        heading: "A little more life",
        text: "SUGARMENU is a lifestyle-first editorial publication exploring fashion, relationships, travel, dining, wellness, technology, culture and community. This is a private editorial preview of original launch drafts.",
      },
      {
        heading: "Still to be supplied",
        text: "Ownership, a public mailing address, and a fuller mission statement have not been supplied. Editorial standards, the medical review policy, and corrections each have their own page and are waiting on the same team copy.",
      },
    ],
  },
  "editorial-standards": {
    title: "Editorial standards",
    intro:
      "How SUGARMENU assigns, edits, sources, and labels stories. This copy has not been supplied.",
    sections: [
      {
        heading: "Reporting and editing",
        text: "The editorial team has not published how stories are assigned, edited, or approved. No standard is claimed on this page until that copy is supplied.",
      },
      {
        heading: "Sources",
        text: "The editorial team has not published how sources are chosen or shown. Stories that already list sources show those links from the content record.",
      },
      {
        heading: "Sponsored placements",
        text: "The editorial team has not published how paid placements will be labeled. The advertisement in this preview is a SUGARMENU house ad.",
      },
      {
        heading: "Corrections",
        text: "The corrections page describes the request path. That process has not been supplied.",
      },
    ],
  },
  "medical-review": {
    title: "Medical review policy",
    intro:
      "How GLProud resources are reviewed before publication. No reviewer roster or review standard has been supplied.",
    sections: [
      {
        heading: "What is reviewed",
        text: "GLProud drafts are unreviewed. This page will name which pages require clinical review once the team supplies that list. The current guide is the GLP-1 section already on the site.",
      },
      {
        heading: "Who reviews",
        text: "No clinical reviewer, credential, or advisory board is on file. This page will not name a reviewer until the team supplies one.",
      },
      {
        heading: "How a review is shown",
        text: "A GLP-1 Guide story shows “Medically reviewed by” only when its content record includes a real reviewer. Unreviewed drafts do not show that line.",
      },
      {
        heading: "What this site does not do",
        text: "Nothing on this site is individual medical advice. The medical disclaimer describes that limit.",
      },
    ],
  },
  corrections: {
    title: "Corrections",
    intro:
      "How to request a correction. Contact details and the review process have not been supplied.",
    sections: [
      {
        heading: "What you can request",
        text: "This page will explain which errors SUGARMENU corrects. That policy has not been supplied.",
      },
      {
        heading: "How to send a request",
        text: "No corrections inbox is configured. Do not send personal information through the demo forms. The contact page states that no public address is configured.",
      },
      {
        heading: "What happens next",
        text: "The team has not published how a request is logged, reviewed, or noted on a story.",
      },
    ],
  },
  partnerships: {
    title: "Partner with us",
    intro: "Good taste has good company.",
    sections: [
      {
        heading: "Your brand. On the menu.",
        text: "Partnerships are in development. The advertisement in this preview is a clearly labeled SUGARMENU house ad. No paid placements or partnership enquiries are being processed here.",
      },
    ],
  },
  masthead: {
    title: "Masthead",
    intro: "SUGARMENU Editors",
    sections: [
      {
        heading: "The editorial preview",
        text: "These original launch drafts are credited to SUGARMENU Editors. Staff biographies and named medical reviewers have not been supplied. We do not imply independent reporting, product testing or medical review.",
      },
    ],
  },
  contact: {
    title: "Contact",
    intro: "Good conversations start somewhere.",
    sections: [
      {
        heading: "Contact details are coming",
        text: "No public contact address or live enquiry service is configured for this preview. Newsletter and community forms save demo records in your browser only.",
      },
    ],
  },
  "newsletter-archive": {
    title: "Newsletter archive",
    intro: "A little extra. Just for you.",
    sections: [
      {
        heading: "The first edition is still ahead",
        text: "There are no published newsletter editions in this preview. Extra Sugar signup is a local demonstration and does not send email.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    intro: "A little privacy. As it should be.",
    sections: [
      {
        heading: "Preview privacy notice",
        text: "This provisional notice describes the local demo, not a production privacy policy. Demo signups, consent choices and studio edits are stored in this browser. No signup email is transmitted to an email service.",
      },
      {
        heading: "Your choices",
        text: "You can remove demo signup records in the studio and reset studio edits there. Clear this site’s browser storage to remove all local data. Cookie preferences in the footer let you change your analytics choice. No analytics is currently connected.",
      },
    ],
  },
  terms: {
    title: "Terms",
    intro: "A thoughtful place to begin.",
    sections: [
      {
        heading: "Preview terms",
        text: "This is a local editorial demonstration containing original launch drafts and AI-generated illustrative photography. Content is not verified reporting or tested-product advice. Production terms remain in development; no purchases, memberships or subscriptions are offered here.",
      },
    ],
  },
  accessibility: {
    title: "Accessibility",
    intro: "A seat at the table for everyone.",
    sections: [
      {
        heading: "Using this preview",
        text: "The site supports keyboard navigation, visible focus, labeled forms and reduced motion. The carousel has manual and pause controls. Search and the mobile menu close with Escape. This statement describes implementation intent and is not a certification of conformance.",
      },
    ],
  },
  "medical-disclaimer": {
    title: "Medical disclaimer",
    intro: "Knowledge. Without the judgment.",
    sections: [
      {
        heading: "General information only",
        text: "GLProud resources are unreviewed editorial drafts. Medical review is required. They are general information, not individual medical advice, diagnosis or treatment. Discuss questions about medicines, nutrition or exercise with a qualified clinician or pharmacist. No medical reviewer or reviewed status is claimed.",
      },
    ],
  },
  "editorial-independence": {
    title: "Editorial independence",
    intro: "Good taste. Clear intentions.",
    sections: [
      {
        heading: "Drafts and illustration",
        text: "All supplied articles retain their draft status. Photography is AI-generated editorial illustration, not documentary photography. Illustrated locations and products are not evidence of on-location reporting or product testing. The house ad is labeled; no paid sponsor is implied.",
      },
    ],
  },
  cookies: {
    title: "Cookie details",
    intro: "Your choices belong to you.",
    sections: [
      {
        heading: "What this preview stores",
        text: "This preview uses browser local storage for demo signups, editorial studio edits and privacy choices. No optional analytics or advertising cookies are set. Essential access cookies may be needed by a future authenticated service; this demo has no authentication service.",
      },
      {
        heading: "Change your mind",
        text: "Use Cookie preferences in the footer to reopen your choices. Accepting analytics records a preference only; it does not activate an analytics service in this preview.",
      },
    ],
  },
};
export const newsletterFaq = [
  {
    question: "Will this send me an email?",
    answer:
      "No. Your demo signup is stored only in this browser. A live subscription service is not configured.",
  },
  {
    question: "Where are previous editions?",
    answer:
      "There are no published editions yet. The newsletter archive describes its current status.",
  },
  {
    question: "How do I remove my demo signup?",
    answer:
      "Use the local signup records panel in the editorial studio demo, or clear this site’s browser storage.",
  },
] as const;

export const utilityLinks = Object.entries(utilityPages).map(
  ([slug, page]) => ({ href: `/${slug}`, label: page.title }),
);

export function getUtilityPage(slug: string) {
  return Object.hasOwn(utilityPages, slug) ? utilityPages[slug] : undefined;
}
