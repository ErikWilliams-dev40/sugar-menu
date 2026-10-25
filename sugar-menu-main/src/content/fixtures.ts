import type { Article, HeroSlide, Section } from "./types.ts";

export const sections: readonly Section[] = [
  {
    slug: "eye-candy",
    name: "Eye Candy",
    eyebrow: "Fashion. Beauty. Style.",
    description:
      "Statement looks. Effortless glam. The little things that make life prettier.",
    shot: "Lipsticks on red satin",
  },
  {
    slug: "sweet-talk",
    name: "Sweet Talk",
    eyebrow: "Dating. Sex. Relationships.",
    description:
      "Real conversations. Modern dating. Better boundaries. Happier you.",
    shot: "Love letter, heart seal",
  },
  {
    slug: "sugar-high",
    name: "Sugar High",
    eyebrow: "Travel. Hotels. Adventures.",
    description:
      "Bucket lists. City guides. Weekend escapes and wilder getaways.",
    shot: "Cliffside village, sea",
  },
  {
    slug: "sugar-fix",
    name: "Sugar Fix",
    eyebrow: "Food. Drinks. Dining.",
    description:
      "Good food. Great drinks. Memorable meals. Life tastes better here.",
    shot: "Pasta, wine, linen",
  },
  {
    slug: "the-sweet-spot",
    name: "The Sweet Spot",
    eyebrow: "Wellness. Fitness. Mindset.",
    description:
      "Stronger habits. Calmer minds. A happier, hotter you — inside and out.",
    shot: "Towel, pink dumbbells",
  },
  {
    slug: "sugar-bytes",
    name: "Sugar Bytes",
    eyebrow: "Tech. AI. Gadgets.",
    description:
      "Smart finds. Cool tools. The latest tech to make life sweeter.",
    shot: "Laptop, rose light",
  },
  {
    slug: "the-sugar-rush",
    name: "The Sugar Rush",
    eyebrow: "Culture. Celebrity. Trending.",
    description:
      "Pop culture. Obsessions. Deep dives and everything worth talking about.",
    shot: "Disco ball, coupes",
  },
  {
    slug: "glproud",
    name: "GLProud",
    eyebrow: "GLP-1. Health. Lifestyle.",
    description:
      "Real stories. Real science. A brighter, bolder you — on your terms.",
    shot: "Warm lifestyle portrait, champagne tones",
  },
];

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "01",
    eyebrow: "A brighter chapter awaits.",
    headline: "The old you called.",
    accent: "We sent her to voicemail.",
    copy: "New places. New experiences. New possibilities. Some calls just aren't worth taking.",
    cta: "Start your next chapter",
    href: "/sugar-high",
    shot: 'Pink coupe, cherries, passport, "Good Girls Book Bigger Trips" luggage tag, city at dusk',
  },
  {
    id: "02",
    eyebrow: "Go somewhere better.",
    headline: "Your comfort zone? Adorable.",
    accent: "Now leave it.",
    copy: "Better stories rarely start with staying home. There's a whole world on the menu.",
    cta: "Plan the escape",
    href: "/sugar-high",
    shot: "Coastal balcony at sunset, spritz, sunglasses, blush luggage",
  },
  {
    id: "03",
    eyebrow: "A bolder era begins.",
    headline: "It's not a comeback.",
    accent: "It's a takeover.",
    copy: "A brighter life. Bigger plans. Better taste. This is your era now.",
    cta: "Explore the takeover",
    href: "/the-sweet-spot",
    shot: "Champagne, stacked books, sunglasses, quilted burgundy bag, skyline",
  },
  {
    id: "04",
    eyebrow: "Indulge a little.",
    headline: "Good taste.",
    accent: "Questionable decisions. Great stories.",
    copy: "The best nights, best trips and best stories rarely come with an instruction manual.",
    cta: "Get the stories",
    href: "/sugar-fix",
    shot: 'Martini, lipstick, candlelight, "Meet me here" matchbook',
  },
  {
    id: "05",
    eyebrow: "No more waiting around.",
    headline: "A little more pleasure.",
    accent: "A lot less permission.",
    copy: "Go. Stay. Splurge. Change your mind. You don't need a permission slip to enjoy your life.",
    cta: "Indulge yourself",
    href: "/eye-candy",
    shot: 'Velvet, perfume, "Suite 505" key tag, pink cocktail, travel snapshot',
  },
];

export const articles: readonly Article[] = [
  {
    slug: "the-situationship-exit-interview",
    section: "sweet-talk",
    subtopic: "Relationships",
    title: "The Situationship Exit Interview",
    dek: "Closure is a gift you give yourself. Preferably in writing.",
    author: {
      name: "SugarMenu Editorial",
      bio: "Sample editorial attribution for the site preview.",
    },
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
    readMinutes: 1,
    shot: "Couple in taxi, city lights",
    body: [
      {
        type: "paragraph",
        text: "This sample story introduces the SugarMenu reading experience. The headline and description come from the design handoff; the finished editorial will arrive with the content launch.",
      },
      { type: "heading", text: "A little room for yourself" },
      {
        type: "paragraph",
        text: "Some chapters deserve a proper ending. Make space for the conversations, places and people you want in the next one.",
      },
      { type: "quote", text: "Closure is a gift you give yourself." },
    ],
    tags: ["Relationships"],
    relatedSlugs: [],
    sample: true,
  },
];
