# Repo Change Ledger

## Purpose

This file is the cumulative change ledger for the repository.

Use it to avoid repeating the same implementation work in future passes.

For each pass, record:

- what files changed
- what code areas changed
- why the change was made
- what assumptions were used
- what was intentionally left pending

## Recording rule

This ledger is intentionally detailed, but it is not a raw git diff dump.
It tracks file-by-file code changes and the reason each change exists so future implementation can build forward instead of redoing prior work.

## Pass 1 - Initial product foundation

### App bootstrap

Files:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `app/layout.tsx`
- `app/globals.css`

Changes:

- Bootstrapped the repo as a Next.js App Router app with TypeScript and Tailwind.
- Renamed the package to `neverwinter-composition-lab`.
- Replaced the starter layout and starter styles with a dark-mode-only shell and tokenized theme foundation.

Why:

- The repo previously had only product docs and no runnable app.
- The user explicitly required Next.js latest stable, App Router, TypeScript, and Tailwind CSS.

### Utility and type layer

Files:

- `lib/utils.ts`
- `lib/types.ts`
- `lib/effect-engine.ts`

Changes:

- Added shared class-merging and formatting helpers.
- Added strongly typed source-aware entity models for:
  - verification metadata
  - effects
  - classes
  - companions
  - artifacts
  - mounts
  - patch changes
  - boss presets
  - team members
- Added an initial effect engine that:
  - separates boss debuffs from team buffs
  - keeps unresolved values as `null`
  - detects strongest-only / non-stacking overlaps
  - computes carry-state summaries
  - computes a staged mount-hit breakdown

Why:

- The user explicitly required a typed data model and asked that buffs/debuffs not be flattened into one generic value.
- Carry and mount-hit logic needed a reusable non-UI computation layer.

### Seed data

Files:

- `data/game-data.ts`

Changes:

- Added initial seed data for:
  - effect catalog
  - class seeds
  - power seeds
  - companion seeds
  - enhancement seeds
  - companion bonus seeds
  - artifact seeds
  - mount combat/equip seeds
  - insignia seeds
  - patch changes
  - boss presets
  - module timeline
  - glossary terms
  - knowledge-hub sections
  - dungeon/trial/event shells
- Added `createInitialTeamMembers()` for Dungeon and Trial modes.
- Preserved unresolved values as `null` and attached:
  - `verification_status`
  - `source_type`
  - `source_url`
  - `notes`

Why:

- The user required local typed data first with no backend.
- The product docs required verified vs partial vs inferred provenance to remain visible.

### Shared UI primitives

Files:

- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/source-badge.tsx`
- `components/summary-panel.tsx`
- `components/empty-state.tsx`
- `components/loading-state.tsx`
- `components/content-page.tsx`

Changes:

- Added reusable UI primitives for the card system, badges, buttons, form controls, summary blocks, and empty/loading states.
- Added a source/verification badge component that maps verification state to semantic UI color.
- Added a page wrapper pattern so the route pages could share a common hero/header structure.

Why:

- The user required reusable layout shell, card components, selector components, chip/badge components, source/verification badges, and empty/loading states.
- The frontend spec also calls for a reusable card system and data-badge components.

### Navigation and shell

Files:

- `config/navigation.ts`
- `components/layout/app-shell.tsx`

Changes:

- Added primary route navigation for all requested version-1 pages.
- Added the persistent left sidebar shell.
- Added the initial top bar and right summary rail.

Why:

- The product docs required the left sidebar, top bar, and right summary panel patterns.

### Product pages

Files:

- `app/page.tsx`
- `app/team-builder/page.tsx`
- `app/buffs-debuffs/page.tsx`
- `app/classes/page.tsx`
- `app/companions/page.tsx`
- `app/mounts/page.tsx`
- `app/artifacts/page.tsx`
- `app/dungeons/page.tsx`
- `app/trials/page.tsx`
- `app/events/page.tsx`
- `app/patch-tracker/page.tsx`
- `app/endgame-guide/page.tsx`
- `app/glossary/page.tsx`

Changes:

- Added all requested version-1 routes.
- Seeded real content into the dashboard, libraries, patch tracker, endgame guide, and glossary instead of leaving pages as pure placeholders.
- Wired the Team Builder route to the main feature implementation.

Why:

- The user explicitly asked for real and navigable pages, not placeholder-only routes.

### Team Builder feature

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Implemented the main Team Builder experience.
- Added:
  - Dungeon / Trial mode switch
  - Group A / Group B layout for trial mode
  - left sidebar tabs
  - member cards
  - selected member editor
  - carry toggle
  - boss preset selector
  - right-side summaries
  - final mount-hit calculator
  - missing/duplicate effect panels
- Added seeded entity-effect mapping for the current local data layer.

Why:

- The Team Builder is the core feature and the user explicitly prioritized it first.

### Docs created

Files:

- `docs/implementation-plan.md`
- `docs/data-ingestion-plan.md`
- `docs/design-system.md`
- `docs/component-inventory.md`

Changes:

- Added implementation, ingestion, design-system, and component-inventory documents.

Why:

- The user explicitly requested these docs in Step 1.

### Source-of-truth docs normalized

Files:

- `docs/neverwinter_final_ai_master_context.md`
- `docs/neverwinter_source_registry_and_proof.md`

Changes:

- Created canonical copies under `docs/`.
- Cleaned markdown spacing and normalized obvious encoding artifacts.
- Preserved content meaning and filenames.

Why:

- The user asked for the source docs to be read first and normalized before implementation.

### Verification completed

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after a small cleanup to the form-control type aliases.

## Pass 2 - Frontend/UI spec alignment and persistent ledger

### Frontend spec normalization

Files:

- `docs/neverwinter_frontend_design_spec.md`

Changes:

- Normalized visible encoding artifacts in the new frontend/UI document.
- Preserved the file and its content inside `docs/`.

Why:

- The user said the new frontend/UI docs should be followed.
- The user also explicitly said not to delete any file from `docs/`.

### Sidebar and top bar alignment

Files:

- `config/navigation.ts`
- `components/layout/app-shell.tsx`

Changes:

- Added utility routes:
  - Saved Builds
  - Settings
  - About / Data Notes
- Converted the shell to a pathname-aware client component.
- Added current-page-aware top bar title.
- Added a global search input.
- Added patch/version badge in the top bar.
- Added quick-action buttons in the top bar.
- Added sidebar utility section at the bottom.
- Added active-state styling for the primary navigation.

Why:

- The frontend design spec explicitly requires:
  - current page title
  - global search
  - patch/version badge
  - quick actions
  - sidebar utility items
  - active state in navigation

### Team Builder top-bar alignment

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Added carry selector to the Team Builder top action row.
- Added visible quick actions:
  - Save Build
  - Load Build
  - Share Build
  - Reset

Why:

- The frontend spec explicitly calls out these Team Builder top-bar items.

### Utility pages added

Files:

- `app/saved-builds/page.tsx`
- `app/settings/page.tsx`
- `app/about/page.tsx`

Changes:

- Added utility pages referenced by the updated sidebar.
- Kept them intentionally simple with empty-state or note surfaces.

Why:

- The frontend spec includes these as utility views.
- Creating the routes now avoids later shell redesign and broken nav links.

### This ledger added

Files:

- `docs/repo-change-ledger.md`

Changes:

- Added a cumulative repo change ledger.
- Recorded both the initial foundation pass and the frontend-spec alignment pass.

Why:

- The user explicitly asked for a markdown file that tracks changes already made so the same work is not repeated later.

## Pending follow-up work

- Sidebar collapse/drawer behavior is not implemented yet.
- Global search is present as a shell control but not wired to data yet.
- Library pages do not yet have full list/grid toggle, compare toggle, and filter-drawer behavior from the frontend spec.
- Team Builder member config is still a single continuous editor; the spec-preferred tabbed editor can be added in a later pass.
- Saved Builds, Settings, and About are structural utility pages, not complete features yet.

## Future update rule

When making future changes:

1. Add a new pass section.
2. Record every file touched.
3. Explain what changed in code terms.
4. Explain why the change was necessary.
5. Call out anything intentionally left pending.

## Pass 3 - Layout redesign and readability repair

### Shell redesign

Files:

- `components/layout/app-shell.tsx`
- `components/ui/card.tsx`
- `app/globals.css`

Changes:

- Reworked the global shell to reduce visual clutter.
- Simplified the top bar hierarchy so the page title and search lead, instead of large chrome blocks competing with the content.
- Tightened the sidebar presentation and made the utility section feel secondary instead of equally loud.
- Reduced card border/shadow intensity to make panels feel cleaner and less heavy.
- Added minor typography polish in global styles.

Why:

- The previous shell was visually dense and was taking too much attention away from the main workflow.
- The user explicitly reported layout/design problems and asked for a redesign.

### Team Builder redesign

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Rebuilt the Team Builder header into a clearer hero + controls layout.
- Replaced the cramped multi-column mini-card group layout with larger two-column member cards.
- Changed the center area from a compressed card wall into a clearer team canvas.
- Converted the member configuration area from one long continuous form into segmented editor tabs:
  - Identity
  - Loadout
  - Companion
  - Mount
  - Personal Buffs
  - Notes
- Kept the right summary rail but made the overall page hierarchy more readable.
- Removed leftover duplicated editor markup from the old implementation.
- Rewrote the file as clean UTF-8 after a bad byte sequence broke the build.

Why:

- The previous Team Builder canvas was too narrow and produced unreadable member cards.
- The previous editor was too long and visually exhausting.
- The redesign was needed to make the page match the product’s “premium, readable, calm density” goal.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the redesign and UTF-8 cleanup.

### Remaining follow-up

- The Team Builder still uses seeded data rather than full live-verified entity depth.
- The shell still does not implement the fully collapsible sidebar/drawer behavior from the frontend spec.
- The summary rail still uses static card blocks rather than advanced compare/inspector interactions.
