# Handoff: SUGARMENU — Editorial Website (MVP)

## Overview
SUGARMENU ("Indulge Yourself.") is a provocative, lifestyle-first editorial publication and social community. This package covers the MVP desktop screens:

1. Homepage, including a five-slide hero carousel
2. Category page template (shown as Sweet Talk)
3. Article template
4. GLProud hub (GLP-1 education and lifestyle, medically reviewed)
5. The Sugar Dish: community preview and early-access signup
6. Extra Sugar: newsletter signup (landing page, popup, inline module)

**Brand rule:** deep burgundy / black cherry is the signature color, with blush pink and champagne as supporting colors. It should read as a luxury fashion/lifestyle magazine. It must **never** look like a weight-loss or medical site, and that includes GLProud.

## About the Design Files
The files in `designs/` are **design references built in HTML**. They are prototypes that show the intended look and behavior. They are **not production code to copy directly**. Recreate them in the target codebase's environment (for example Next.js/React, Astro, or a headless-CMS front end) using its established patterns. If no environment exists yet, pick the most suitable stack. The MVP needs a flexible CMS, strong SEO/AEO, good mobile performance and accessibility, so a statically generated React framework with a headless CMS is a sensible default.

How to open the files: open any `SugarMenu *.dc.html` file in a browser. Keep the folder together, because the files load `support.js` and each other. Each page file is a **canvas** that shows 2–3 options side by side, labelled `1a`, `1b` and `1c`. The `SM*.dc.html` files are the shared components the pages mount. Inside the `.dc.html` files, `{{ … }}` placeholders are template bindings, and the `class Component` script holds the prototype logic.

`reference/` holds the **approved client mockups**. They are the source of truth for the visual identity. Note that the mockups still say "Spill the Sugar"; the community is now named **The Sugar Dish** everywhere.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy tone and interactions are final in intent. Recreate the UI pixel-perfectly. All imagery is a **striped placeholder** labelled with the shot that should go there; real photography will come from the client. All article copy is on-brand **sample copy**.

Options to choose between: the client will pick one option per screen. Until they do, build **1a** of each screen as the default. Where a 1b pattern is a clearly reusable module, such as the Extra Sugar popup, build it as a component.

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| `cherry` | `#3B0D18` | Header/nav background, primary dark panels, dark buttons, section-title color |
| `cherry-deep` | `#2A0910` | Hero base, footer, primary ink (headlines on light) |
| `wine` | `#4A1422` | Image placeholder base on dark; hero photo fallback |
| `wine-2` | `#5C1A2B` | Footer banner background |
| `pink` | `#F2709C` | Primary CTA background (with `cherry-deep` text), accent italic text **on dark only**, wordmark period |
| `pink-ink` | `#C23A68` | Pink text **on light** backgrounds: kickers, links, numerals (≈5:1 on cream) |
| `pink-ink-2` | `#A82E58` | Kickers on blush panels |
| `blush` | `#F6D6DC` | Promo panel (The Sugar Dish), Ask Sugar cards, ticker |
| `blush-2` | `#F0C2CC` | Extra Sugar panel |
| `blush-ph` | `#F1CBD3` | Placeholder/avatars |
| `champagne` | `#F4EAE0` | GLProud surfaces, author box |
| `champagne-2` | `#E8D8C4` | GLProud image placeholder, avatars |
| `cream` | `#FBF7F5` | Page background |
| `paper` | `#FFFDFC` | Cards, inputs, white text on dark |
| `body` | `#5B4248` | Body/excerpt text on light |
| `body-2` | `#3A2328` | Long-form article body text |
| `muted` | `#7A5F65` | Bylines, captions, metadata |
| `on-dark` | `#F3E6E8` | Body text on burgundy |
| `on-dark-2` | `#F6D6DC` / `#EADADD` | Kickers and metadata on burgundy |
| `rule` | `rgba(59,13,24,.12–.20)` | Hairline dividers on light |
| `rule-dark` | `rgba(255,253,252,.12–.18)` | Hairline dividers on dark |

Contrast rule: on light backgrounds, pink text is always `#C23A68` (or `#A82E58` on blush), never `#F2709C`.

### Typography
Google Fonts: **Playfair Display** (400–900, italic), **Libre Caslon Text** (400/700, italic 400), **Jost** (400–600). These are the closest matches to the approved mockups. Confirm with the client whether licensed brand fonts exist.

| Role | Font | Size / line-height | Weight | Other |
|---|---|---|---|---|
| Wordmark | Playfair Display | 66px / .9 (header), 44px (footer) | 800 | letter-spacing −.025em; "." in `pink` |
| Tagline "Indulge Yourself." | Playfair Display italic | 27px / 1 | 500 | `pink` |
| Hero headline | Playfair Display | clamp(46px, 5.4vw, 72px) / .92 | 800 | UPPERCASE, −.035em; line 2 is italic `pink`, on its own line |
| Page H1 (category/hub) | Playfair Display | 96–128px / .85–.88 | 800 | UPPERCASE, −.04em; second word italic pink |
| Article H1 | Playfair Display | 62–66px / .92–.95 | 800 | UPPERCASE, −.035em, balanced wrap |
| Section title | Playfair Display | 22px / 1 (rail headers) · 26–34px (section heads) | 600–700 | UPPERCASE |
| Card title lg/md/sm | Playfair Display | 32 / 22 / 18px, lh 1.14 | 600 | — |
| Tile title (over image) | Playfair Display | 24px / 1 | 600 | UPPERCASE, paper on a gradient |
| Pull quote | Playfair Display italic | 34px / 1.2 | 600 | `pink-ink`, centered, hairlines above and below |
| Dek / italic lede | Playfair Display italic | 21–30px / 1.2–1.4 | 400–500 | — |
| Body (article) | Libre Caslon Text | 19px / 1.75 | 400 | `body-2`, max column 680px |
| Excerpt | Libre Caslon Text | 14–17px / 1.5–1.6 | 400 | `body` |
| Kicker / eyebrow | Jost | 10–10.5px / 1.2 | 600 | UPPERCASE, letter-spacing .16–.2em, `pink-ink` |
| Hero eyebrow | Jost | 12px | 500 | UPPERCASE, letter-spacing .3em, `#F6D6DC` |
| Nav | Jost | 11px | 500 | UPPERCASE, .14em |
| Button | Jost | 11–12px | 600 | UPPERCASE, .16–.18em |
| Meta / byline | Jost | 11–12px | 500 | .06–.08em, `muted` |
| Numerals (lists) | Playfair Display italic | 28–34px | 400 | `pink-ink` (light) / `pink` (dark) |

### Spacing
The base unit is 4px. Values in common use: 6, 8, 10, 12, 14, 16, 18, 22, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72px.
- Page gutter at the 1280 design width: 16–24px (homepage, matching the approved tight-grid feel); 40–56px (inner templates).
- Section vertical padding: 44–64px.
- Card grid gap: 12px for category tiles, 22–28px for story grids.

### Radius and shadow
- **Radius: 0 everywhere.** Square buttons, inputs and cards. The only exceptions are circular avatars (50%).
- Polaroid/print shadow: `0 6px 16px rgba(59,13,24,.15)` (small) and `0 20px 50px rgba(0,0,0,.35)` (hero print).
- Floating card: `0 8px 24px rgba(59,13,24,.08)`.
- Modal: `0 40px 80px rgba(0,0,0,.4)`. Overlay `rgba(42,9,16,.72)`.
- Tilted "print" frames: white `#FFFDFC` border of 7–10px with a thicker bottom (18–36px), rotated −7° to +6°.

### Image placeholder (dev stand-in only)
`background: <base>; background-image: repeating-linear-gradient(135deg, <stripe> 0 1px, transparent 1px 10px)`, with a monospace caption. Replace with real `<img>`/`<picture>` (responsive `srcset`, lazy-loaded below the fold, art-directed crops) and alt text taken from the placeholder caption.

---

## Shared Components (`designs/SM*.dc.html`)

### SMHeader: global masthead and navigation
- Background `cherry`, text `paper`.
- Row 1 uses a 3-column grid (`1fr auto 1fr`) with padding 22/32/16. The centered column holds the wordmark with "Indulge Yourself." below it (6px gap). The right column holds `Search` · **Join** (pink filled, padding 11×18, `cherry-deep` text) · `Sign in`, gap 20px.
- Row 2 is the nav: border-top `rgba(251,247,245,.14)`, centered with `justify-content: safe center`, horizontally scrollable on overflow with the scrollbar hidden, gap clamp(16px, 2.2vw, 30px).
- Nav items, in order: **Eye Candy · Sweet Talk · Sugar High · Sugar Fix · The Sweet Spot · Sugar Bytes · The Sugar Rush · GLProud · The Sugar Dish · Extra Sugar**.
- Active item: text `pink` plus a 2px `pink` bottom border (padding-bottom 13px). Prop: `active`.

### SMHero: homepage carousel (5 slides)
The client-approved content (keep the copy exactly as written):

| # | Eyebrow | Line 1 (white) | Line 2 (pink italic) | Supporting copy | CTA | Shot |
|---|---|---|---|---|---|---|
| 01 | A brighter chapter awaits. | The old you called. | We sent her to voicemail. | New places. New experiences. New possibilities. Some calls just aren't worth taking. | Start your next chapter | Pink coupe, cherries, passport, "Good Girls Book Bigger Trips" luggage tag, city at dusk |
| 02 | Go somewhere better. | Your comfort zone? Adorable. | Now leave it. | Better stories rarely start with staying home. There's a whole world on the menu. | Plan the escape | Coastal balcony at sunset, spritz, sunglasses, blush luggage |
| 03 | A bolder era begins. | It's not a comeback. | It's a takeover. | A brighter life. Bigger plans. Better taste. This is your era now. | Explore the takeover | Champagne, stacked books, sunglasses, quilted burgundy bag, skyline |
| 04 | Indulge a little. | Good taste. | Questionable decisions. Great stories. | The best nights, best trips and best stories rarely come with an instruction manual. | Get the stories | Martini, lipstick, candlelight, "Meet me here" matchbook |
| 05 | No more waiting around. | A little more pleasure. | A lot less permission. | Go. Stay. Splurge. Change your mind. You don't need a permission slip to enjoy your life. | Indulge yourself | Velvet, perfume, "Suite 505" key tag, pink cocktail, travel snapshot |

Variants (prop `variant`):
- **photo (approved, default):** full-bleed image, min-height 560px. Left-to-right scrim `linear-gradient(90deg, rgba(42,9,16,.95) 0%, rgba(42,9,16,.78) 40%, transparent 72%)`. Text block max-width 660px, padding 64/56/110, gap 20px.
- **split:** 50/50 grid with the text on `cherry` and the image inset 20px on the right.
- **cover:** 3-column grid (`1fr 340px 1fr`). Line 1 is right-aligned on the left, a tilted white-framed 4:5 print sits in the centre, and line 2, the copy and the CTA sit on the right.

Controls sit absolutely positioned at bottom 30px, left 56px (centered for the cover variant):
- Numbered tabs `01–05`: Jost 12px. Active is `paper` with a 2px `pink` underline; inactive is `rgba(255,253,252,.62)`.
- A 90×2px progress track (`rgba(255,253,252,.25)`) with a `pink` fill that animates `scaleX(0→1)` linearly over the interval.
- Prev/next square buttons, 36×36, with a 1px `rgba(255,253,252,.35)` border.

Behavior:
- Autoplay interval 7s (configurable). When the progress animation ends, advance to the next slide (wrapping 5→1).
- Pause the timer and progress while the pointer is over the hero.
- Clicking a tab or arrow jumps to that slide and restarts the progress.
- Touch swipe with a threshold of 50px horizontal.
- Slide transition: cross-fade, `opacity .9s ease`. All slides are stacked in one grid cell; inactive slides get `visibility:hidden` and `aria-hidden="true"`.
- Accessibility: `aria-roledescription="carousel"` and labelled controls. Honour `prefers-reduced-motion` by disabling autoplay and fading instantly. Add a visible pause button in production (WCAG 2.2.2).
- Responsive (not mocked): stack the text over the image below about 768px, keep the scrim from the bottom up, and allow headlines down to about 40px.

### SMTile: category tile (homepage grid)
- Card: `paper`, 1px border `rgba(59,13,24,.08)`, full height.
- Image: 4:3, with the title overlaid at the bottom on the gradient `to top, rgba(42,9,16,.9) → 0` (padding 34/14/10).
- Body (padding 14/14/16, gap 9): kicker (`sub`), then a 13.5px description, or in the "latest" variant an italic Playfair 16px headline. "Explore →" is pinned to the bottom.
- GLProud renders as "GL" + italic pink "Proud" (prop `em`).
- Ten tiles, 5 per row, 12px gap. The tile copy is in `SugarMenu Homepage v2.dc.html` (const `T`).

### SMStory: story card
- Props: `kicker`, `title`, `excerpt`, `byline`, `shot`, `size` (sm/md/lg/xl), `layout` (stack/row), `ratio`, `thumb` (row thumbnail width), `cta` (shows "Read more →"), `tone`.
- Stack layout: image, kicker (6px above), title, excerpt, byline, CTA, with a 10px gap.
- Row layout: thumbnail on the left (fixed width), text on the right, 18px gap.
- Hover (to add): the title underlines with a 1px offset of 4px, and the image scales to 1.03 inside an overflow-hidden frame over .4s.

### SMItem: numbered list row (Trending / Most Read)
Flex row, padding 13px 0, hairline bottom border. It holds a 46px italic numeral, a title (Playfair 16/1.25, 600) with a kicker under it, and an 80px 4:3 thumbnail.

### SMPromos: The Sugar Dish + Extra Sugar panel pair
- Two panels side by side (auto-fit, min 460px), 14px gap, min-height 200px.
- The Sugar Dish panel is on `blush`, Extra Sugar on `blush-2`.
- Each has: an uppercase Playfair title (34px, 700, `cherry`), a kicker, a description, then a CTA or form.
- Decoration: tilted polaroid prints on the right.
- The Extra Sugar form is an email input (46px, `paper`) and a "Subscribe →" button on `cherry`. On submit it is replaced with "Sweet. Check your inbox." in Playfair italic.

### SMFooter
- Optional banner (`banner` prop): image at min-height 300px with a bottom scrim. On the left, the eyebrow "A happier, hotter you." and the title "More Good Days Ahead." (Playfair 66px, 700). On the right, a member quote and a "Join us →" CTA.
- Footer on `cherry-deep`:
  - the wordmark plus "Consider this your permission slip. / The rest of your life is calling." in pink italic
  - four link columns: The Menu, More, Join, Company
  - a legal row: Privacy, Terms, Accessibility, Medical Disclaimer

---

## Screens

### 1. Homepage (`SugarMenu Homepage v2.dc.html`)
**1a: Faithful refinement (default).** Top to bottom:
1. SMHeader.
2. SMHero (`photo`).
3. Category grid: 10 SMTiles, 5 columns, 16px outer padding, 12px gap. Order: Eye Candy, Sweet Talk, Sugar High, Sugar Fix, The Sweet Spot, Sugar Bytes, The Sugar Rush, GLProud, The Sugar Dish, Extra Sugar.
4. SMPromos.
5. Featured Stories (2fr) and Trending Now (1fr), 36px gap. There are 3 SMStory md cards with CTAs and 5 SMItems.
6. Long Read panel on `cherry`: a 420px tilted white-framed 4:5 print, then an eyebrow, a 54px uppercase headline with an italic pink tail, a dek, a CTA and a byline.
7. Sweet Talk section row: a 2px `cherry` rule under the section title, then 4 SMStory sm cards.
8. Ad slot: "Advertisement" label above a 970×250 placeholder.
9. GLProud strip on `champagne`: wordmark and description (280px), 3 linked headlines with a 1px top rule each, and an outline "Visit GLProud →" button. Keep it deliberately understated.
10. SMFooter with the banner.

**1b: Content-forward.**
- A trending ticker runs under the hero: blush, single line, with a right-edge fade mask (`mask-image: linear-gradient(to right,#000 88%,transparent)`).
- Lead row: a cover story (lg, 16:10 image), 4 row-cards with 96px thumbnails, and a "Most Devoured" top-5 list on `cherry`.
- "On the Menu" tile grid on `cherry`, with tiles showing the latest headline.
- Three section columns: Sugar High, Eye Candy, The Sugar Rush.
- SMPromos, a one-line GLProud strip, then the footer.

### 2. Hero Carousel (`SugarMenu Hero Carousel.dc.html`)
- Options 1a (photo), 1b (split) and 1c (cover), each fully interactive.
- Below them, all five slides of 1a are shown static, for copy review.

### 3. Category page (`SugarMenu Category Page.dc.html`)
**1a: Section front.**
- Burgundy banner (grid 1.2fr / 1fr, min-height 340px) with the eyebrow "Dating. Sex. Relationships.", the H1 "SWEET *TALK*" at 96px, and a dek. Below that, sub-topic chips: **All** (pink filled) · Dating · Sex · Relationships · Breakups · Ask Sugar (1px border `rgba(255,253,252,.4)`). The image sits on the right.
- Lead story (lg) with 2 row stories and an "Ask Sugar" blush advice card.
- "Latest in Sweet Talk" grid: 4 columns, 8 stories, then a "More Sweet Talk" outline button. Use pagination or load-more in the build.
- SMPromos, then the footer without the banner.

**1b: Magazine index.**
- Centered masthead: "02 · On the Menu", the H1 at 128px, an italic dek, and text tabs with the active one underlined.
- Two columns (fluid content and a 320px sidebar):
  - Main column: a lead row (text with a 3:4 image), a river of row-cards (180px 3:2 thumbnails) with bylines, then "Page 1 of 6 / Next page →".
  - Sidebar: an Ask Sugar card on `cherry` with an anonymous-question link, Most Read, a 300×250 ad, and a Sugar Dish CTA card.

**Template note:** every section uses the same template. Data per category: name, italic word, eyebrow (from the brief's section descriptors), dek, sub-topics and banner image.

### 4. Article (`SugarMenu Article.dc.html`)
**1a: Classic.**
- Centered header (max-width 900): breadcrumb kicker, a 62px uppercase H1 with an italic pink tail, an italic dek, then the byline row (avatar, author, date, read time).
- A 21:9 hero image with a caption.
- A three-column grid (`80px | 680px | 300px`, 48px gap):
  - left: a share rail
  - centre: body text with a drop cap (Playfair 92px, 800, `cherry`), H2s at 28px, a pull quote, inline figures, tag chips and an author box on `champagne`
  - right: a sidebar with Trending Now and a 300×600 ad, made sticky in the build
- "More [Section]" with 4 cards, then SMPromos and the footer.

**1b: Editorial split.**
- A 50/50 burgundy opener (min-height 640px): text bottom-aligned on the left, portrait image on the right.
- Body grid `240px | 640px | 240px`: on the left, an "In this story" chapter nav (anchor links; scroll-spy in the build); in the centre, a lede at 24px Playfair, uppercase H2s with italic tails, and a blush "Sugar's Shortlist" callout; on the right, a "Discuss in The Sugar Dish" thread teaser.
- "Keep Talking" with 3 row-cards, then the footer.

**CMS fields:**
- section and sub-topic
- headline (with an optional italic-tail split)
- dek
- author: name, avatar, bio
- publish/updated dates, read time
- hero image and caption/credit
- body as rich text: paragraphs, H2, pull quote, inline image + caption, callout box
- tags
- related stories
- for GLProud only: reviewer name, credential and review date

Use Article/NewsArticle schema.org markup.

### 5. GLProud hub (`SugarMenu GLProud.dc.html`)
**1a: Champagne hub.**
- Hero on `champagne` (grid 1.2fr / 1fr): the "GL*Proud*" wordmark at 96px, an italic tagline, body copy, "Start here →" (`cherry` filled) and "Ask the Doctor" (outline). A 4:5 lifestyle image carries a floating "Medically reviewed" badge card.
- "Explore by topic": a 3×2 grid with 1px gaps, where each cell turns blush on hover. Topics: Getting Started, Side Effects Honestly, Eating Well, Strength & Movement, Style & Confidence, Ask the Doctor.
- A burgundy "Starter Series: Your first 90 days" panel with 4 numbered reads. Each read shows its time and reviewer.
- Real Stories: 3 cards.
- Clinical Advisory Board: 3 people with avatars. **The names are placeholders and must be replaced with the actual board.**
- A disclaimer line, then the footer.

**1b: Library.**
- A burgundy header with a search field ("Ask anything…").
- A 220px sticky topic nav (active item on a blush background).
- Content: a featured guide with a reviewer line; Ask the Doctor as `<details>` accordions; 3 cards; and a "GLProud in The Sugar Dish" CTA.

**Imagery rule:** lifestyle photography only. No scales, tape measures, syringes or before/after photos. Each article needs a medical review attribution and an updated date.

### 6. The Sugar Dish (`SugarMenu Sugar Dish.dc.html`)
**1a: Blush preview.**
- Hero on `blush`: the H1 "THE SUGAR *DISH*" at 112px, the line "Pull up a chair. Spill something.", body copy, and an email form with a "Save my seat →" button. On the right, 3 staggered sample thread cards (the middle one is offset 48px), each with a section kicker, time, question, reply count and handle.
- "What's on the table": 4 columns (Spill, Ask, Debate, Connect).
- A House Rules panel on `cherry`, then the footer with the banner.

**1b: The invitation.**
- A full-bleed image background holds a cream RSVP card (inner pink outline at a −12px offset) with "You're invited", the title, first name and email fields, and an "RSVP for early access" button. Beside it is an "Overheard at the table" feed of 4 translucent cards.
- A row of founding-member benefits, then the footer.

**Behavior:** a valid email submits to the early-access list (store source, timestamp and optional name), then swaps to the success message. Phase 2 is the full community and is out of scope.

### 7. Extra Sugar (`SugarMenu Extra Sugar.dc.html`)
**1a: Landing.**
- Hero on `blush-2`:
  - the H1 "EXTRA *SUGAR*" at 104px, the line "The newsletter your group chat will steal from.", and body copy
  - "Choose your flavors": toggle chips for the 8 sections. Selected chips are `cherry` with `paper` text; unselected are transparent with a `cherry` border. Use `aria-pressed`.
  - an email field with an "Add sugar →" button, and microcopy: "Unsubscribe anytime. We'll only be a little hurt."
- On the right, a tilted issue-preview card styled like an email.
- A cadence row: Monday "The Menu", Wednesday "Hump Day", Friday "Permission Slip".

**1b: Popup and inline module.**
- Inline end-of-article module on `cherry`: an italic pink "Extra Sugar" title, a line of copy and an inline form.
- Popup: a 760px dialog over a `rgba(42,9,16,.72)` overlay, with a 300px image on the left and the form on the right. Title "EXTRA *SUGAR?*", primary button "Yes, sweeten my inbox", and the decline link "No thanks, I prefer my life bland". There is a close × at the top right.
- **Build rules for the popup:**
  - trigger it after 60% scroll or on exit intent
  - suppress it for 30 days after dismissal, and permanently after subscribing
  - make it a real `role="dialog"` with focus trap, Esc to close and focus return

**Newsletter behavior:**
- Validate the email client-side and server-side.
- Use double opt-in through the ESP (for example Beehiiv, Klaviyo or Mailchimp).
- Pass the selected flavors to the ESP as tags or interests.
- Success state: "Sweet. Check your inbox." Show an inline error for invalid email or network failure, in the brand voice (for example "That email looks a little suspicious. Try again?").

---

## Interactions and states (all screens)
- **Links:** they inherit color. On hover, underline with a 4px offset and 1px thickness. Pink text links stay pink.
- **Buttons:** pink-filled goes to `#F58AAE` on hover; `cherry`-filled goes to `#4A1422`; outline buttons fill `cherry` with `paper` text. Transitions are 150–200ms ease.
- **Focus:** a visible 2px outline in `pink-ink` (on light) or `pink` (on dark), with a 2px offset, on every interactive element.
- **Category tiles and cards:** subtle image zoom on hover, as above.
- **Forms:**
  - Loading: disable the button and show "Adding sugar…".
  - Success: replace the form inline.
  - Error: show an inline message under the field in `pink-ink`.
- **Responsive:** only desktop at 1280 was designed. Breakpoints to target:
  - ≥1280 as designed
  - 1024: tiles go to 4 columns, sidebars narrow
  - 768: tiles go to 2–3 columns, sidebars drop below the main content, the hero stacks
  - <600: tiles go to 2 columns, story grids to 1, the nav becomes a horizontal scroller or a menu drawer, and H1s drop to about 44–56px

## State
- Hero: `activeIndex`, `paused`, `autoplay`, `intervalSec`.
- Newsletter: `email`, `selectedFlavors[]`, `status` (idle / loading / success / error).
- Sugar Dish early access: `email`, `firstName?`, `status`.
- Popup: `open`, plus localStorage `extraSugarDismissedAt` and `extraSugarSubscribed`.
- Content is fetched from the CMS: homepage curation (hero slides, featured, trending), section feeds, articles, the GLProud library and the review board.

## Assets
- **Photography:** none supplied yet. Every placeholder caption describes the needed shot. The style is warm, low-light luxury: burgundy, blush and gold tones, champagne, velvet, travel props.
- **Logo:** recreated as live text (Playfair Display 800 plus a pink "."). Ask the client for a vector wordmark (SVG).
- **Icons:** none beyond text arrows (→ ‹ ›) and ×. Use the codebase's icon set if you need more, such as search.
- **Reference mockups:** `reference/approved-mockup-hero-01…05.jpeg`.

## Files
- `designs/SugarMenu Homepage v2.dc.html`: homepage options 1a and 1b
- `designs/SugarMenu Hero Carousel.dc.html`: hero treatments and all five slides
- `designs/SugarMenu Category Page.dc.html`
- `designs/SugarMenu Article.dc.html`
- `designs/SugarMenu GLProud.dc.html`
- `designs/SugarMenu Sugar Dish.dc.html`
- `designs/SugarMenu Extra Sugar.dc.html`
- `designs/SMHeader | SMHero | SMTile | SMStory | SMItem | SMPromos | SMFooter | SMPh .dc.html`: shared components
- `designs/support.js`: prototype runtime, needed only to open the HTML references
- `reference/`: the client's approved mockups
