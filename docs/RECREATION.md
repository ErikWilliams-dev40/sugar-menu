# SugarMenu recreation

## Source of truth

`SugarMenu-Recreation-Prompt.txt` and the outer `SugarMenu-Recreation-Kit/` supersede the earlier design handoff. The nested kit is a duplicate. All 53 entries in the supplied manifest passed size and SHA-256 verification before implementation. Source materials are retained unchanged; runtime JSON is copied into `src/content/data/` and compared structurally against the kit in tests.

The site uses all 23 original WebP files, four original WOFF2 files and the supplied favicon. Category/card mapping, article text, hero copy, photo credits, draft statuses and nullable dates come directly from the kit. No generated replacement images or external font requests are used. The source CSS cascade is retained in `globals.css`, with brand tokens extracted into `src/styles/tokens.css` and framework/accessibility corrections in `refinements.css`.

The Chrome [high-definition CSS color guide](https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide) informed the color decision: retain the exact supplied sRGB hex colors and gradients. Wide-gamut recoloring would change the reference palette and is not needed for this recreation.

The reference hosted site was inaccessible during planning. Visual verification therefore uses the kit's explicit layout, CSS, assets and copy rather than a claim of screenshot parity with the live site.

## Routes and content

- `/`: 17 configurable content modules followed by the shared footer, matching the prompt's 18-part homepage.
- `/eye-candy`, `/sweet-talk`, `/sugar-high`, `/sugar-fix`, `/the-sweet-spot`, `/sugar-bytes`, `/the-sugar-rush`, `/glproud`: category/resource fronts with `?topic=` filters.
- `/[section]/[slug]`: 30 supplied article drafts. Category and slug must both match. Known articles are prerendered.
- `/stories`: all articles, with `?category=` filtering.
- `/search?q=`: case-insensitive keyword search across titles, decks, topics, tags and body. All query terms must match; title matches rank first, source order breaks ties.
- `/the-sugar-dish`, `/extra-sugar`: dedicated community and newsletter previews with local demo forms.
- `/about`, `/partnerships`, `/masthead`, `/contact`, `/newsletter-archive`, `/privacy`, `/terms`, `/accessibility`, `/medical-disclaimer`, `/editorial-independence`, `/cookies`: lightweight informational pages. Policies are provisional, and unavailable services are identified.
- `/studio`, `/studio/preview`, `/studio/preview?article=slug`: local editing and isolated saved previews.
- Known `/stories/[slug]` links permanently redirect to their category-based URL. The retired scaffold sample redirects to `/sweet-talk`. Unknown or mismatched routes return HTTP 404.

All 30 articles remain drafts with null publication dates. Reading time is derived at 220 words/minute. Pull quotes use existing takeaways. “SUGARMENU Editors” is the shared editorial attribution. GLProud retains `unreviewed` status, original sources, development notice and general-information disclaimer; no clinician credentials are invented. All routes retain noindex, and robots.txt disallows crawling.

## Interactions and local state

The carousel defaults to seven seconds and a 600ms fade, with manual selectors, previous/next, pause/resume, arrow keys and horizontal swipes. Hover, keyboard focus and hidden documents suspend autoplay. Manual navigation pauses it until resumed. Reduced motion disables autoplay/fades. Resuming after a temporary pause starts a fresh interval. Portrait images are selected below 560px; inactive slides are inert and hidden from assistive technology.

Native dialogs provide the search and mobile menu focus trap, Escape dismissal and focus restoration. Navigation controls have visible focus and at least 44px targets. Informational photos have supplied alternative text; duplicate card/background images are decorative.

Browser storage is split into versioned keys:

| Key                        | Data                                                                       |
| -------------------------- | -------------------------------------------------------------------------- |
| `sugarmenu:studio:v1`      | Validated version-1 content/configuration snapshot                         |
| `sugarmenu:submissions:v1` | Email, newsletter/community interest, explicit consent and local timestamp |
| `sugarmenu:consent:v1`     | Analytics preference and timestamp                                         |

Forms validate email and require an unchecked-by-default consent box. Duplicate emails are normalized per form type. Success explicitly means browser-local storage; no requests are made to a signup backend. Storage failures show errors without success claims. Studio signup records can be refreshed or individually removed.

The studio is an **unauthenticated local demo**, not secure administration. It edits seeded articles, hero content/order/timing, module visibility/order, house ads, the author record and publication display settings. Slugs, category identities, provenance, source metadata and medical review status remain protected. Invalid body JSON blocks saving. Saved snapshots are validated before rendering; corrupt or incompatible storage produces a recoverable message. Reset restores the kit while preserving privacy choices and signup records.

Studio edits affect only the separate preview. Open previews respond to storage changes from another tab. The main site continues to server-render the unchanged seed content. Studio preview article links stay in the preview; category and utility links intentionally open the original public pages. No publishing or real authentication is simulated.

Privacy choices persist locally and can be reopened from the footer. Dismissal alone does not grant consent. No analytics service is connected, including after acceptance.

## Validation

Run the pinned Node/npm versions from `.nvmrc` and `package.json`.

- `npm run check`: lint, route-aware TypeScript, Node tests and formatting.
- `npm run build`: production compilation, type checking and prerendering.
- `npm run test:smoke`: all public routes, mismatched/unknown routes, legacy redirects, health and robots against a running production server.
- `npm run test:e2e`: Chromium production-server checks for carousel behavior, dialogs, search/filtering, forms, storage failures, consent and studio isolation. Screenshots cover home, category, article, community, newsletter and GLProud at 390, 768, 1024 and 1440px.

Browser output lives in ignored `test-results/` and `playwright-report/`. The health endpoint remains process liveness only. Hosting, live CMS/authentication/email services, approved production policies and launch indexing are not configured. Workflow changes remain separate under repository rules.

## Verification record

Verified locally on October 25, 2026 with Node 24.19.0 and npm 11.17.0:

- ESLint, TypeScript, seven Node tests and formatting passed.
- Production build generated all 30 article pages successfully.
- HTTP smoke checks passed for 55 public routes, four real 404s, two permanent redirects, health and robots.
- Fifteen Chromium browser scenarios passed, including studio isolation and unsaved-edit protection.
- Responsive screenshots cover six page types at all four requested widths. Image loading and horizontal overflow checks passed; desktop and phone homepage screenshots were visually inspected.

Next.js TypeScript subprocess output could not be captured inside the restricted execution sandbox; the normal production build and full checks passed outside that sandbox without changing Next.js configuration. Browser verification covers Chromium, not a claim of cross-browser certification. The live reference remains unavailable for a direct visual comparison.
