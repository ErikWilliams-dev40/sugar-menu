# Project instructions

Guidance for coding agents working in this repository.

---

## Project

- **What this is:** SugarMenu, a lifestyle-first editorial publication; currently a Phase 0 scaffold.
- **Stack:** Next.js App Router, React, strict TypeScript, CSS, npm 11.17.0, Node 24.19.0.
- **Hosting:** Not selected; no deploy integration is configured.
- **Owner:** House-of-Helix-CMD; individual product and technical owners remain to be assigned.

## Commands

| Task | Command |
| --- | --- |
| Install | `npm ci` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Test | `npm test` |
| HTTP smoke check (running server required) | `npm run test:smoke` |
| Format check | `npm run format:check` |
| All local checks | `npm run check` |
| Build | `npm run build` |
| Run locally | `npm run dev` |
| Serve production build | `npm start` |

The existing CI workflows still check only the handoff runtime syntax. Wiring
these application commands into CI requires its own workflow PR under rule 5.
Until then, local application validation is required; remote green checks do not
prove application correctness. See `docs/PHASE_0.md`.

## Layout

- `src/app/`: App Router pages, metadata, health route and global CSS.
- `src/components/`: shared shell and presentation components.
- `src/content/`: typed content contract, fixtures and asynchronous local adapter.
- `src/styles/tokens.css`: approved design tokens.
- `tests/`: Node test runner content and endpoint checks.
- Root configuration: Next.js, TypeScript, ESLint, npm, editor and runtime pins.
- `design_handoff_sugarmenu_site/`: reference only; never import its prototype runtime.

Keep CMS and newsletter credentials server-side. Do not invent clinical reviewers
or report successful subscriptions without a real provider response. Phase 0 is
sample content and must remain noindex until the production launch work.

---

## Lifecycle rules

These apply regardless of stack. Do not remove them.

1. **Work starts from an issue.** No branch without a tracking issue.
2. **Branch from the default branch.** Naming: `<type>/<issue-number>-<slug>`,
   e.g. `feat/142-token-refresh`. Types: `feat`, `fix`, `chore`, `docs`, `refactor`.
3. **Never commit directly to the default branch.** Every change lands via pull
   request.
4. **One PR, one concern.** If a PR needs two paragraphs to explain why it
   touches unrelated areas, split it.
5. **Do not edit `.github/workflows/` as a side effect** of a feature change.
   Workflow changes ship in their own PR so they are reviewed on their own terms.
6. **Do not weaken a `permissions:` block** to make a job pass. Escalating a
   workflow's token scope is a security change and needs its own PR and review.
7. **Never hardcode a secret.** Read from GitHub Actions secrets or the
   platform's secret store. If you need a new secret, say so in the PR body
   rather than inventing a value.
8. **Release metadata is append-only.** Records in `releases/` are written once
   and never edited. `commit_sha` identifies the record. See
   [`docs/RELEASE_METADATA.md`](docs/RELEASE_METADATA.md).

## Database migrations

Any change that adds, alters, or drops schema must:

- set `database_migration: true` in the release metadata record,
- state in the PR body whether the migration is backward compatible,
- state whether rollback is safe; if it is not, set `rollback_safe: false`.

A destructive migration makes a release non-rollback-safe. Say so explicitly
rather than leaving it implied.

## Review gates

A change reaches production only after all of these:

| Gate | Who or what |
| --- | --- |
| Automated checks | `lint`, `test`, `build`, `security-check` |
| AI review | `.claude/agents/security-reviewer.md` |
| Peer approval | a human owner (see `CODEOWNERS.example`; not yet operational) |
| Staging verification | `staging-deploy` + `staging-health-check` |
| Business approval | required reviewer on the `production` Environment |
| Production health | `production-health-check` |

Full description: [`docs/LIFECYCLE.md`](docs/LIFECYCLE.md).

## When asked to deploy

Do not run deploy workflows on your own initiative. Deploys are triggered by a
human via `workflow_dispatch`, and production additionally requires the
Environment reviewer to approve. If asked to "ship it," prepare the release
metadata record and report what is still missing.
