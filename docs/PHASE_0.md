# Phase 0 — application foundation

> Historical scaffold record. The [recreation implementation](RECREATION.md) supersedes its visual, content, route and demo-form assumptions.

Tracking: [#3](https://github.com/House-of-Helix-CMD/sugar-menu/issues/3).

## Starting point

The repository contained the Helix delivery template and a detailed SugarMenu MVP design handoff. There was no application, package manifest, runtime configuration, CMS, database or Phase 0 plan. The user confirmed Phase 0 as framework setup, brand tokens, shared layout, route shells, typed fixtures and local validation.

## Decisions

- **Next.js App Router with TypeScript:** follows the handoff's recommendation of a statically generated React foundation. Server Components render content; a small client navigation component marks the active section. See the [official installation guide](https://nextjs.org/docs/app/getting-started/installation).
- **Plain CSS and shared tokens:** the supplied design has a specific palette, typography and square geometry; no component framework is needed for this foundation.
- **Self-hosted fonts:** Fontsource packages bundle the three handoff fonts, avoiding build-time font requests and third-party browser font calls.
- **Local content adapter:** asynchronous reads let a later CMS implementation replace `src/content/repository.ts` without changing page contracts. No CMS vendor, account, credential or schema migration is introduced. Runtime validation of external CMS data belongs with that adapter.
- **Sample-only preview:** noindex metadata and a disallow-all robots file stay in place until content and launch settings are approved. No production domain or canonical URL is invented.
- **No simulated forms:** newsletter and early-access pages explain that signup is not yet available. No personal data is accepted, sent or persisted.

## Route map

| Route                                                    | Foundation                                                     |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| `/`                                                      | Static first hero, ten menu destinations and sample story card |
| `/eye-candy`, `/sweet-talk`, `/sugar-high`, `/sugar-fix` | Shared category shell                                          |
| `/the-sweet-spot`, `/sugar-bytes`, `/the-sugar-rush`     | Shared category shell                                          |
| `/glproud`                                               | Topic overview; no unreviewed medical content                  |
| `/the-sugar-dish`                                        | Community preview; early-access integration pending            |
| `/extra-sugar`                                           | Newsletter preview; ESP integration pending                    |
| `/stories/the-situationship-exit-interview`              | Sample article and typed body blocks                           |
| Unknown categories or story slugs                        | Branded 404                                                    |
| `/api/health`                                            | Uncached liveness response, `{"status":"ok"}`                  |
| `/robots.txt`                                            | Disallow crawling of sample content                            |

Known category and article routes are generated at build time. Unknown content returns a 404 rather than silently falling back to a fixture. The health endpoint checks the application process only; it is not a future CMS or ESP readiness probe.

## Local validation

Run `npm ci`, `npm run check` and `npm run build`. The content tests check route uniqueness, hero destinations, article references, dates, section filtering and missing-content behavior. The health test checks the response and caching policy. Run `npm start` to smoke-test the built application, including unknown routes and `/api/health`.

Dependencies are pinned in `package.json` and resolved in `package-lock.json`. Run `npm audit` before release and review updates deliberately.

At scaffold validation, `npm audit --omit=dev` reported zero vulnerabilities.
The full audit reported five high-severity development-tool findings, all from
`braces` through `micromatch`, `fast-glob`, and Next's ESLint plugin/config
([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)).
The registry's latest `braces` is still the affected 3.0.3; the audit's proposed
fix downgrades the Next lint configuration to 14, so it was not applied.
ESLint 9 is deprecated but is the newest major accepted by the React and
accessibility plugins in Next's configuration. Revisit this tooling chain when
compatible updates are released. Do not process untrusted glob patterns through
these development tools.

## Follow-up work

1. **Separate CI PR:** set up Node 24.19.0, use `npm ci`, wire lint/typecheck/test/format checks, add a build gate and dependency audit. Preserve action SHA pinning and least-privilege permissions. The current CI jobs do not validate this application.
2. **Screen implementation:** build the handoff's default 1a layouts, carousel controls and motion behavior, story grids, promos, article sidebar, sharing and responsive details. Phase 0's static split hero is a temporary shell, not a claim of visual completion.
3. **CMS selection:** choose a vendor and content workflow; implement schemas, validation, preview, content freshness and the repository adapter. Enforce GLProud medical review requirements on external content before publication.
4. **Assets and editorial:** obtain actual photography, logo assets, finished articles and the real advisory board. Current placeholders and sample copy must not be treated as launch content.
5. **Signup integration:** choose an ESP and early-access store; implement server validation, double opt-in, source/timestamp capture, error states and consent requirements.
6. **Search and authentication:** determine MVP behavior before exposing controls. Full community features remain Phase 2.
7. **Launch:** choose staging/production hosting and domain, implement deployment workflows separately, add approved legal pages, canonical/social metadata and a sitemap, then deliberately replace sample-content indexing restrictions.

No workflow permissions, deployment credentials, release metadata or database schema are changed by this scaffold.
