# SugarMenu

SugarMenu ("Indulge Yourself.") is a lifestyle-first editorial publication. This repository contains its approved design handoff and the Phase 0 application foundation.

## Run locally

Use Node **24.19.0** (see `.nvmrc`) and npm **11.17.0**.

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. No environment variables or service credentials are required. Fonts are self-hosted from installed Fontsource packages; the build does not fetch Google Fonts. `.env.example` documents the configuration boundary.

## Local checks

```sh
npm run check
npm run build
npm start
```

`check` runs ESLint, route-aware TypeScript checking, Node's test runner and Prettier. `build` verifies the production bundle and prerenders the content routes. `start` serves that build. Individual scripts: `lint`, `typecheck`, `test`, `format`, `format:check`.

With `npm start` running, use `npm run test:smoke` in another terminal to check
every content route, real HTTP 404s, the health endpoint and robots policy.
`SMOKE_BASE_URL` optionally selects a different local server port.

## Foundation

- Next.js App Router, React, strict TypeScript and npm with a committed lockfile.
- Burgundy, blush and champagne design tokens; locally served Playfair Display, Libre Caslon Text and Jost.
- Responsive header, section navigation, footer, skip link, focus styles and photography placeholders.
- Home, seven category fronts, GLProud, The Sugar Dish, Extra Sugar and a sample article.
- A typed asynchronous content repository backed by local fixtures, ready for a future CMS adapter.
- Per-route metadata, deliberate 404 handling and a minimal `/api/health` liveness endpoint.

This is a scaffold, not the complete MVP. The home uses the first approved hero's copy in a static split layout; the five-slide carousel and the handoff's full layouts remain future work. Newsletter and community routes are previews with no submission forms. GLProud contains no invented clinical reviewers or medical articles. All pages are `noindex, nofollow`, and `robots.txt` disallows crawling while sample content is present.

## Layout

| Path                             | Purpose                                                  |
| -------------------------------- | -------------------------------------------------------- |
| `src/app/`                       | Routes, metadata, root layout and global styles          |
| `src/components/`                | Shared presentation components                           |
| `src/styles/tokens.css`          | Approved brand palette, type and shadow tokens           |
| `src/content/`                   | Content types, local fixtures and repository boundary    |
| `tests/`                         | Content integrity and endpoint contracts                 |
| `design_handoff_sugarmenu_site/` | Design references; never imported as application runtime |
| `.github/workflows/`             | Existing delivery lifecycle workflows                    |
| `docs/PHASE_0.md`                | Scope, decisions, route map and follow-up work           |

## Delivery status

Work is tracked in [issue #3](https://github.com/House-of-Helix-CMD/sugar-menu/issues/3). Follow [CONTRIBUTING.md](CONTRIBUTING.md) and [the lifecycle](docs/LIFECYCLE.md): use an issue-linked branch and a reviewed pull request.

The existing remote lint/test jobs still check only the design runtime's JavaScript syntax. They **do not run the new application checks**, and there is no build job yet. Workflow integration must ship in its own PR under repository rules. The existing deploy/rollback placeholders deliberately fail until a host is chosen and real commands are supplied. Local checks passing is not deployment approval.

See the [design handoff](design_handoff_sugarmenu_site/README.md) for the full product and interaction requirements, and [Phase 0 notes](docs/PHASE_0.md) for the remaining decisions.
