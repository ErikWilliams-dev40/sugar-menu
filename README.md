# SugarMenu

SUGARMENU — “Indulge Yourself.” A responsive editorial publication recreated from the supplied SugarMenu kit, built with Next.js App Router, React, strict TypeScript and local assets.

## Run locally

Use Node **24.19.0** and npm **11.17.0**:

```sh
nvm use
npm ci
npm run dev
```

Open <http://localhost:3000>. No service credentials are needed. All fonts and photography are served locally.

## What is included

- The complete homepage: five-slide carousel, ten-category menu, editorial sections, featured story, trending list, community/newsletter bands, GLProud, house ad and closing photograph.
- Eight editorial/resource category fronts, all 30 supplied draft articles, story index, keyword search, community/newsletter pages and lightweight utility pages.
- Keyboard-accessible navigation/search dialogs, reduced-motion support, responsive photographs, demo signup forms and persistent privacy choices.
- A browser-local `/studio` with content editing, hero/module ordering, display settings and local signup management. Saved changes appear only at `/studio/preview`; the main site always uses the kit baseline.

This is a **local editorial preview**, not a production service. All supplied articles remain drafts with no invented publication dates. GLProud articles remain unreviewed and carry the medical-development notice. Photography is credited as AI-generated editorial illustration. Demo forms save only in this browser; they do not send email or create accounts. The studio is explicitly unauthenticated and has no publishing capability.

Indexing stays off until launch. `SITE_INDEXABLE=true` together with a canonical `SITE_URL` is the switch for the robots meta tag, `robots.txt`, the sitemap, and `llms.txt`. The default build leaves every page `noindex` and disallows crawling. Set the variables in `.env.example` and rebuild; static pages read them at build time. `AI_CRAWLER_POLICY` is `allow` or `deny` for GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, and Google-Extended. When it is unset, those agents follow `SITE_INDEXABLE`. `GOOGLE_SITE_VERIFICATION` is the Search Console token and is omitted when empty.

## Verification

```sh
npm run check
npm run build
npm run test:e2e
```

`check` runs ESLint, TypeScript, Node tests and Prettier. Browser tests use Playwright Chromium against the production build, automatically starting a server on port 3100. Install the browser once with `npx playwright install chromium` if needed. Tests save responsive screenshots under `test-results/` and an HTML report under `playwright-report/` (both ignored).

To run the HTTP smoke suite, start the production server with `npm start`, then run `npm run test:smoke`. `SMOKE_BASE_URL` selects a different port.

## Project organization

- `src/app/`: routes, metadata, reference CSS and framework/accessibility refinements.
- `src/styles/tokens.css`: reference palette and spacing tokens; supplied sRGB colors remain the baseline.
- `src/components/`: shared editorial views and interactive components.
- `src/content/`: unchanged seed JSON, typed repository, home configuration and provisional utility copy.
- `src/lib/`: validated local studio storage and demo signup storage.
- `public/`: the kit's original WebPs and fonts, retaining filenames.
- `tests/`: content/contracts, HTTP smoke checks and browser scenarios.

See [recreation notes](docs/RECREATION.md) for routes, provenance and demo storage behavior. [Phase 0](docs/PHASE_0.md) records the historical scaffold; the recreation kit now supersedes its visual and content assumptions.

## Delivery

Follow [CONTRIBUTING.md](CONTRIBUTING.md) and [the delivery lifecycle](docs/LIFECYCLE.md). Workflow changes ship separately. Existing remote workflows do not run these application checks; record local validation in the feature PR. Hosting, real authentication, CMS, email delivery, reviewed policies and production deployment remain separate work.
