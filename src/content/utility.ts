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
export const utilityLinks = Object.entries(utilityPages).map(
  ([slug, page]) => ({ href: `/${slug}`, label: page.title }),
);

export function getUtilityPage(slug: string) {
  return Object.hasOwn(utilityPages, slug) ? utilityPages[slug] : undefined;
}
