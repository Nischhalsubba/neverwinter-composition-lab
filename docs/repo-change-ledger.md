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

## Pass 4 - Spacious violet theme overhaul

### Global visual system

Files:

- `app/globals.css`
- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/summary-panel.tsx`

Changes:

- Replaced the previous teal-forward shell styling with the new violet palette based on:
  - `#3a015c`
  - `#4f0147`
  - `#35012c`
  - `#290025`
  - `#11001c`
- Updated background gradients, surface fills, borders, shadows, and focus states to use the new darker purple system.
- Increased padding, radius, and panel softness across cards, form controls, badges, and summary panels.

Why:

- The user explicitly requested the new color theme and asked for a more spacious layout.
- The previous styling still felt too compressed and too close to utility-dashboard density.

### Shell spacing pass

Files:

- `components/layout/app-shell.tsx`

Changes:

- Widened the overall shell max width.
- Increased spacing in the top bar and sidebar.
- Shifted active navigation and shell accents into the new violet palette.
- Softened the right rail presentation so it reads as secondary structure instead of competing with the main page.

Why:

- The previous shell still consumed too much attention and did not feel premium or spacious enough.

### Team Builder widening pass

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Increased hero spacing and control-row breathing room.
- Delayed the third-column Team Builder layout to only appear at much larger widths.
- Let the summary rail fall below the main content on smaller desktop widths instead of compressing the center canvas.
- Enlarged member cards, increased internal card spacing, and updated selected-state styling to match the violet shell.
- Cleaned remaining malformed separator text inside roster/member labels.

Why:

- The previous Team Builder still had broken-looking compression in large desktop screenshots.
- The center planning surface needed to be wider than the side rails.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the palette and spacing overhaul.

### Remaining follow-up

- Some non-Team-Builder pages still use the earlier content density and can be widened in a later pass.
- The shell still has static utility actions rather than fully wired interactions.

## Pass 5 - Team Builder setup flow and boss debuff aggregate

### Data-layer power presets

Files:

- `data/game-data.ts`

Changes:

- Expanded the local power seed list with source-backed class powers already referenced in the docs:
  - `Pack Tactics`
  - `Mystic Aura / Runic Aura`
  - `Ray of Enfeeblement`
  - `Prophecy of Doom`
- Added `classPowerPresets` and `getDefaultPowerLoadoutForClass()` so class selection can auto-fill seeded encounter/feature slots.
- Updated initial team member creation to use these default class power presets.

Why:

- The user asked for class selection to auto-slot the debuff/buff encounters the class has, while still allowing manual edits later.
- These presets had to live in the typed local data layer rather than as component-only logic.

### Team Builder selection flow

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Added boss debuff aggregate display showing:
  - total tracked/applied boss debuff sources
  - resolved combined percent for planning display
- Added `handleClassChange()` so choosing a class auto-fills the current seeded encounter/feature loadout.
- Moved the high-priority member setup fields together in the Identity tab:
  - class
  - race
  - purple debuff / enhancement
  - artifact
- Reworked the Loadout tab to expose overrideable class power slots for:
  - encounter 1
  - encounter 2
  - encounter 3
  - feature 1
  - feature 2
- Added visible power badges on member cards so auto-slotted powers are obvious in the team canvas.

Why:

- The user wanted the Team Builder flow to start from dungeon/trial mode and then quickly select race, purple debuff, artifact, and class.
- The user also wanted the app to show the total number of boss debuffs and total percent on the boss.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the Team Builder setup-flow update.

### Remaining follow-up

- Only a small subset of class powers are currently seeded because the docs do not yet verify full encounter lists for every class.
- Auto-slotting currently uses source-backed partial seeds and leaves unresolved live values un-invented.

## Pass 6 - Empty Team Builder start flow and pastel shell reset

### Global styling reset

Files:

- `app/globals.css`
- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/summary-panel.tsx`
- `components/layout/app-shell.tsx`

Changes:

- Removed all border radius globally by forcing square corners through the base stylesheet.
- Switched the visual system to the new pastel palette:
  - `#cdb4db`
  - `#ffc8dd`
  - `#ffafcc`
  - `#bde0fe`
  - `#a2d2ff`
- Updated shared surfaces, controls, badges, shell accents, and gradients to use the new color direction instead of the prior violet theme.

Why:

- The user explicitly asked to remove all border radius and replace the previous palette with the new pastel set.

### Empty Team Builder initialization

Files:

- `data/game-data.ts`
- `features/team-builder/team-builder-page.tsx`

Changes:

- Changed Team Builder initialization so it no longer starts with seeded members already filled in.
- The Team Builder now opens in a mode-prompt state and asks the user to choose:
  - Dungeon -> 5 empty slots
  - Trial -> 10 empty slots
- Updated `createInitialTeamMembers()` to create truly empty slots for class, artifact, enhancement, encounter powers, mount selections, and carry state.
- Kept click-to-configure flow so each empty slot can then be filled through the member editor.
- Kept class-based encounter/feature slotting available once a class is chosen.

Why:

- The user explicitly asked for empty 5-slot / 10-slot builder setup instead of pre-populated team members.
- The requested workflow starts with mode choice, then slot click, then member configuration.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the empty-builder and global-style reset.

### Remaining follow-up

- Many route-level components still contain square-corner utility classes in markup even though the global stylesheet already flattens them.
- The Team Builder still uses source-aware partial power seeds where the docs do not yet verify full live class loadouts.

## Pass 7 - NW Hub data ingestion and Team Builder auto-slotting

### Live-source ingestion

Files:

- `data/nw-hub/artifacts.ts`
- `data/nw-hub/companions.ts`
- `data/nw-hub/companion-powers.ts`
- `data/nw-hub/companion-enhancements.ts`
- `data/nw-hub/classes.ts`
- `data/nw-hub/class-powers.ts`
- `data/nw-hub/class-feats.ts`
- `data/nw-hub/class-features.ts`
- `data/game-data.ts`

Changes:

- Pulled the NW Hub client bundles and extracted the locally typed snapshots for:
  - artifacts
  - companion enhancement powers
  - companion player bonuses
  - class metadata
  - class powers
  - class feats
  - class features / mechanics / skills
- Stored those snapshots under `data/nw-hub/` so the repo now contains the imported source data instead of relying on live requests at runtime.
- Rebuilt the app-facing `classes`, `powers`, `companionEnhancements`, `companionBonuses`, and `artifacts` exports in `data/game-data.ts` from the NW Hub snapshot files.
- Added direct image URLs for artifacts and classes where the NW Hub dataset exposed them.
- Added snapshot exports like `artifactSnapshots`, `companionEnhancementSnapshots`, `companionPowerSnapshots`, and `classSnapshots` so route pages can render the richer imported data directly.

Why:

- The user explicitly asked for the app to list artifacts, companion enhancements, companion slot powers, and class information from NW Hub rather than relying on the older hand-seeded subset.
- Storing the extracted data locally keeps the app patch-aware and source-aware without introducing runtime scraping or a backend.

### Team Builder class and power behavior

Files:

- `features/team-builder/team-builder-page.tsx`
- `lib/types.ts`
- `lib/effect-engine.ts`
- `data/game-data.ts`

Changes:

- Switched Team Builder class selection to use the imported NW Hub class/paragon data.
- Class selection now auto-selects a default paragon path from the imported class metadata.
- Paragon selection is now a dropdown instead of a free-text input.
- Changing class or paragon now re-slots:
  - encounter powers
  - daily powers
  - class features
- Added imported power metadata fields to the typed model:
  - `paragon_path`
  - `description`
  - `image_url`
- Built a first-pass effect inference layer for imported encounter powers so known boss-debuff style encounters can contribute real effect IDs when their text explicitly exposes supported categories.
- Changed the Team Builder entity-to-effect mapping so it is built from the actual imported `powers`, `artifacts`, `companionEnhancements`, `companionBonuses`, and mount exports instead of relying only on the small hardcoded map.

Why:

- The user asked for class selection to automatically pick the relevant buff/debuff encounter for the selected class and paragon path.
- The old free-text paragon field made it impossible to keep class loadouts aligned with imported class data.
- Building the entity-to-effect map from the data layer prevents repeating the same manual mapping work as the dataset grows.

### Library route upgrades

Files:

- `app/artifacts/page.tsx`
- `app/classes/page.tsx`
- `app/companions/page.tsx`

Changes:

- Replaced the older minimal artifact page with an NW Hub-backed artifact library that now shows:
  - artifact images
  - power text
  - top-rank item level
  - top-rank combined rating
  - top-rank stats
- Replaced the older minimal classes page with an NW Hub-backed class page that now shows:
  - class emblems
  - paragon paths
  - imported power counts
- Replaced the older companion page with a view centered on:
  - imported companion slot bonuses
  - imported enhancement powers

Why:

- The user asked for the app to surface the imported NW Hub data directly.
- The older pages still reflected the earlier seed-only foundation and no longer matched the source-backed data layer.

### Palette cleanup

Files:

- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/summary-panel.tsx`

Changes:

- Removed the remaining older named accent colors from the shared UI primitives and replaced them with the current five-color pastel palette using direct RGBA values derived from:
  - `#cdb4db`
  - `#ffc8dd`
  - `#ffafcc`
  - `#bde0fe`
  - `#a2d2ff`

Why:

- The user explicitly asked to stop using the previous accent colors and to replace them with the provided palette.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the NW Hub ingestion, Team Builder auto-slotting update, and shared UI palette cleanup.

## Pass 8 - Team Builder popup pickers and remote image repair

### Team Builder picker workflow

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Replaced the brittle inline-only selection flow for the highest-impact Team Builder fields with popup picker overlays for:
  - artifacts
  - summoned companions
  - mount combat powers
  - companion enhancements
- Made the member-card equipment cells clickable so the user can click directly on Artifact, Companion, Mount, or Enhancement and open the corresponding picker.
- Added reusable picker UI with:
  - search input
  - scrollable comprehensive local list
  - badges
  - source link
  - image tile when the selected dataset exposes an image URL
- Updated the member editor tabs so Artifact, Companion, Mount, and Enhancement now use picker-launch buttons instead of forcing the user through long select menus.
- Refactored the member card wrapper away from nested interactive buttons so the canvas no longer relies on invalid nested button markup.

Why:

- The user explicitly asked for clicking artifact, companion, mounts, and companion enhancement to open a popup with the respective list.
- The previous Team Builder had too many fragile inline selects and nested interactions, which made the core workflow feel broken.

### Remote image repair

Files:

- `next.config.ts`
- `features/team-builder/team-builder-page.tsx`

Changes:

- Added `nw-hub.com` to Next image remote patterns.
- Switched the popup item image tile to `next/image` now that the external source is whitelisted.

Why:

- The imported artifact and class images are hosted on NW Hub and were at risk of failing without explicit remote image configuration.
- The user asked to fix broken images and related Team Builder issues.

### Assumptions and current limits

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Kept the popup lists comprehensive relative to the currently imported local datasets.
- Artifacts and companion enhancements use the full imported NW Hub snapshots already stored in the repo.
- Mount and summoned companion pickers still reflect the current local source-aware seed set because the repo does not yet contain a verified full-game mount master list or a verified full-game summoned companion master list.

Why:

- The user asked to prioritize a working Team Builder immediately.
- This preserves the source-aware rule and avoids inventing unverified game entries that are not yet present in the local typed model.

## Pass 9 - Popup filter system and Team Builder quick-setup redesign

### Full companion popup dataset

Files:

- `data/game-data.ts`

Changes:

- Promoted the `companions` export from the earlier small curated subset to the full locally stored NW Hub companion list snapshot.
- Added role inference for companions from imported companion-bonus roles.
- Preserved the previously seeded source-aware effect mappings and ST ranking values for the known support / ranking companions:
  - Tutor
  - Drizzt Do'Urden
  - Portobello DaVinci
  - Sardina the Tressym
  - Blaspheme Assassin
  - Lysaera
- Added `companionSnapshots` export for the imported full companion list.

Why:

- The user explicitly asked for the companion popup to list all companions instead of only the earlier small seed set.
- Moving the core `companions` export to the full list keeps Team Builder, picker overlays, and selected-member summaries aligned on one dataset.

### Popup layout repair and filtering

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Removed the invalid nested interactive popup card structure that wrapped a clickable source link inside a clickable result button.
- Reworked popup cards so each result now has:
  - a non-interactive card shell
  - a dedicated `Select` action
  - a separate source link
- Widened the popup shell and improved overflow handling so long descriptions no longer collide visually.
- Added popup filter bars for each picker type:
  - artifacts
  - companions
  - mounts
  - enhancements
- Added filter tokens for popup items so filtering is not limited to a text search.

Why:

- The popup overlap bug shown by the user came from unstable card layout and invalid nested click targets.
- The user explicitly asked for filters on each popup and for the popups to be fixed globally.

### Team Builder ease-of-use redesign

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Reframed the left rail as `Roster & Reference` instead of a generic library-only sidebar.
- Added a new quick-setup block at the top of the selected-member editor so the main workflow is now:
  - select slot
  - choose class / paragon / race
  - choose artifact / companion / enhancement / mount
  - then refine powers and notes in the lower tabs
- Kept the existing detailed tabs for loadout, personal buffs, and notes, but moved the high-frequency setup fields into the first visible panel.

Why:

- The user asked for the Team Builder to be redesigned and rethought for ease of use.
- The earlier flow required too much tab switching before the core member setup could be completed.

### Scope note

Files:

- `features/team-builder/team-builder-page.tsx`
- `data/game-data.ts`

Changes:

- Artifact popup remains comprehensive from the imported NW Hub artifact list.
- Companion popup is now comprehensive from the imported NW Hub companion list.
- Mount popup now supports filtering and better selection flow, but still reflects the current local source-aware mount dataset rather than an invented full-game mount master list.

Why:

- This keeps the app aligned with the repo rule not to invent Neverwinter values that have not been verified or ingested.

## Pass 10 - Mount sheet ingestion and popup list-layout rewrite

### Mount data moved to Aragon sheet source

Files:

- `data/game-data.ts`

Changes:

- Replaced the earlier tiny mount seed with mount data sourced from the Google Sheet at:
  `https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=2133630453#gid=2133630453`
- Added sheet-backed mount combat power entries for:
  - trial / dungeon support mounts
  - ST damage mount powers
- Added sheet-backed mount equip power entries for the listed equip bonuses.
- Added supported mount effect mappings for the sheet rows where the data exposed modelable values in existing effect categories such as:
  - incoming damage
  - defense reduction
  - crit avoidance reduction
  - damage bonus
  - combat advantage
  - accuracy
  - deflect reduction
- Preserved unresolved mechanics in notes instead of inventing new unsupported internal stat categories.

Why:

- The user explicitly instructed the app to use the Google Sheet mount information instead of the previous mount seed.
- This keeps mount data source-aware and patch-aware while improving the usefulness of the Team Builder mount picker and mount summaries.

### Popup UI rewrite

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Replaced the popup multi-card grid body with a stable list-row layout.
- Changed each popup result into a row with:
  - image cell
  - title / subtitle / badges block
  - constrained description block
  - action block
- Removed equal-height grid behavior for popup results because it was causing long artifact / companion / enhancement descriptions to visually stack and overlap.
- Kept search and filter bars at the top of the popup while making the body easier to scan for very large datasets.

Why:

- The screenshots showed severe overlap and unreadable text in the artifact, companion, and enhancement popups.
- The previous card-grid popup was not appropriate for very large, text-heavy datasets.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the mount-sheet ingestion and popup list-layout rewrite.

## Pass 11 - Full mount sheet extraction preserved locally

### Local sheet snapshot

Files:

- `data/google-sheet/mounts.ts`
- `data/game-data.ts`

Changes:

- Added a dedicated local snapshot file for the Google Sheet mount tab:
  `data/google-sheet/mounts.ts`
- Preserved the extracted rows from the sheet in structured sections:
  - trial support mounts
  - dungeon support mounts
  - ST damage mount powers
  - mount equip bonuses
- Switched `data/game-data.ts` to import and derive the mount model from that local snapshot instead of relying on duplicated inline transcription.

Why:

- The user explicitly asked to extract all mount debuff information from the Google Sheet.
- Keeping the sheet extraction in its own typed file makes the source durable, inspectable, and reusable for future ingestion work.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after moving the mount-sheet extraction into the dedicated local snapshot file.

## Pass 12 - Functional-only navigation and Team Builder role/setup overhaul

### Main navigation collapse

Files:

- `config/navigation.ts`
- `components/layout/app-shell.tsx`
- `app/reference/page.tsx`

Changes:

- Collapsed the main navigation down to the functional core:
  - Dashboard
  - Team Builder
  - Reference Hub
- Moved the supporting routes into a single `Reference Hub` entry instead of keeping each secondary page in the primary sidebar.
- Simplified the shell header and removed extra chrome such as the old right summary rail and the non-functional quick-action header buttons.
- Kept `Data Notes` as the only secondary sidebar utility link.

Why:

- The user explicitly asked to merge the non-core pages into one menu and remove unnecessary app chrome.
- Team Builder is the primary workflow and needed visual priority over the rest of the product shell.

### Team Builder role and setup flow

Files:

- `lib/types.ts`
- `features/team-builder/team-builder-page.tsx`

Changes:

- Expanded the team role model to support:
  - Tank
  - Healer
  - DPS
  - Boost Person
  - Support DPS
  - Support
- Added clean display formatting for the new role labels inside roster cards and member cards.
- Reworked the selected-member quick setup area so it now includes:
  - class
  - paragon
  - race
  - role
  - artifact
  - companion
  - enhancement
  - mount
- Added a dedicated `Class debuff encounters` section that lists the currently mapped debuff-capable encounters for the selected class and paragon and lets the user slot them directly into the active encounter loadout.

Why:

- The user explicitly asked for empty-slot setup to also expose class selection and the debuff encounters available to that class/paragon.
- The user also explicitly asked for additional functional role options beyond the earlier smaller role model.

### Team Builder chrome reduction

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Removed or simplified several decorative Team Builder boxes so the page focuses more tightly on:
  - mode / boss / carry controls
  - roster
  - team canvas
  - selected member configuration
  - functional summaries
- Reduced the left rail to a roster-first panel instead of a multi-tab mini reference browser.
- Simplified the carry state panel into a summary block instead of another large custom card.

Why:

- The user explicitly asked to remove unnecessary boxes and keep the Team Builder functional rather than decorative.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the navigation collapse and Team Builder setup/role redesign.

## Pass 13 - Sheet-backed enhancement, artifact, and support companion recommendations

Date:

- 2026-04-04

Files:

- `data/game-data.ts`
- `data/google-sheet/companion-enhancements.ts`
- `data/google-sheet/artifact-rankings.ts`
- `data/google-sheet/support-companions.ts`
- `features/team-builder/team-builder-page.tsx`
- `app/artifacts/page.tsx`
- `app/companions/page.tsx`

Changes:

- Added Google Sheet-backed recommendation overlays for:
  - companion enhancements
  - artifacts
  - support companions
- Updated the internal enhancement effect values for the four currently supported debuff enhancement stats to use the sheet-backed `-9%` values instead of leaving them unresolved.
- Added exported recommendation indexes in `data/game-data.ts` so the UI can look up:
  - artifact trial rank
  - artifact dungeon rank
  - support companion rank
  - enhancement rank
- Updated artifact records so their notes now carry imported trial and dungeon ranking context, including recovered damage-boost percentages and durations.
- Updated support companion records so their notes now carry imported support ranking context and rough damage-boost guidance.
- Updated enhancement records so their notes now carry imported enhancement ranking context, source companion, and recovered damage-boost guidance where available.
- Updated Team Builder pickers so:
  - artifact popup includes a `Recommended` filter and rank badges
  - companion popup includes a `Recommended` filter and rank badges
  - enhancement popup includes a `Recommended` filter and rank badges
- Forced slot selection back to the `Identity` setup tab so class and paragon fields are immediately reachable when selecting a member.
- Added a clearer setup hint on unconfigured slots so the user knows the class selection triggers auto-slotting for encounter, daily, and feature defaults.
- Replaced the artifact page with a recommendation-first table that exposes:
  - recommended artifact state
  - trial rank
  - dungeon rank
  - recovered damage boost
  - notes
- Reworked the companions page so it now includes:
  - recommended support companion rankings
  - support benefit summaries
  - enhancement ranking overlays

Why:

- The user explicitly asked to update the app from three Google Sheet tabs and to make those rankings visible in the product instead of leaving them buried in source data.
- The user also explicitly said they still could not reliably reach class/paragon setup from a slot, so slot selection was made to reset back to the setup-oriented editor tab.
- Ranking data needed to stay source-aware and patch-aware, so the implementation keeps the underlying NW Hub snapshots while layering the sheet recommendations on top instead of flattening everything into a single guessed source.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after integrating the recommendation overlays and Team Builder picker updates.

## Pass 14 - Team Builder full layout reset and proven-value UI filtering

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `lib/display-text.ts`
- `app/companions/page.tsx`

Changes:

- Rebuilt the Team Builder layout from scratch around a simpler three-column structure:
  - left = roster
  - center = always-visible selected slot setup
  - right = summaries and mount calculator
- Removed the hidden tab-first setup pattern that required users to scroll before discovering where class and paragon selection lived.
- Moved the critical slot setup fields into the first visible card for the selected slot:
  - class
  - paragon
  - role
  - race
  - artifact
  - companion
  - enhancement
  - mount
  - carry toggle
- Kept the debuff encounter chips and loadout controls directly under the setup card so the full slot workflow stays in one visible vertical sequence.
- Replaced the old Team Canvas card wall with a leaner roster list because the user explicitly wanted the UI to be easier to understand for endgame players.
- Added `lib/display-text.ts` with UI-only sanitization helpers that suppress text containing unresolved variable placeholders or uncertain phrasing such as:
  - `<x>`
  - quality-dependent tooltip text
  - pending / unresolved wording
- Updated Team Builder pickers to show only concise, proven display text instead of raw placeholder-heavy tooltip dumps.
- Updated the companions reference page to sanitize raw NW Hub tooltip text and prefer sheet-backed proven summaries where available.

Why:

- The user explicitly said the current Team Builder hides key setup controls below the fold and that most users would miss them.
- The user also explicitly requested a much simpler endgame-focused UI and asked for uncertain tooltip text to be removed from the visible app.
- The sanitization layer preserves source-aware data in the repo while preventing placeholder or unresolved values from being shown as if they were usable live values.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the Team Builder rewrite and proven-value filtering pass.

## Pass 15 - Flat palette reset and guided best-setup automation

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/layout/app-shell.tsx`
- `components/summary-panel.tsx`
- `features/team-builder/team-builder-page.tsx`

Changes:

- Removed gradient usage from the app-facing shell and shared UI primitives.
- Reset the visual system to a flat palette built from:
  - `#cdb4db`
  - `#ffc8dd`
  - `#ffafcc`
  - `#bde0fe`
  - `#a2d2ff`
  - black / white
- Updated shared cards, buttons, badges, inputs, selects, textareas, summary panels, and the shell header/sidebar to use flat surfaces and higher-contrast text.
- Simplified the Team Builder styling further so it reads more like a straightforward tool than a decorative dashboard.
- Added a guided `Best Setup` flow in Team Builder:
  - pressing the button opens a prompt
  - the user chooses either `Boost one DPS` or `Overall team damage`
- Implemented auto-fill logic for those two strategies using existing imported data instead of invented values:
  - recommended artifacts
  - recommended companions
  - recommended enhancements
  - support mount priority
  - damage mount priority
  - current class / paragon loadout defaults
- For `Boost one DPS`, the first slot becomes a carry DPS and the remaining slots are populated with support-oriented classes, artifacts, enhancements, companions, and support mounts.
- For `Overall team damage`, multiple DPS slots are populated with damage-mount choices while the remaining slots still preserve support and debuff coverage.

Why:

- The user explicitly required that gradients be removed entirely and that the app use only the provided palette plus black/white text where needed.
- The user also explicitly requested a guided best-setup action that can either maximize one DPS or balance overall team damage.
- The implementation keeps the auto-build deterministic and source-constrained rather than pretending to know perfect live meta values that are not fully verified.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the flat-theme reset and best-setup automation pass.

## Pass 16 - Support companion and ST companion ranking integration

Date:

- 2026-04-05

Files:

- `data/google-sheet/support-companions.ts`
- `data/google-sheet/companion-damage.ts`
- `data/game-data.ts`
- `features/team-builder/team-builder-page.tsx`

Changes:

- Added a trial-mandatory support companion rule for `Black Death Scorpion` in `data/google-sheet/support-companions.ts`.
- Created `data/google-sheet/companion-damage.ts` to preserve the recovered ST companion ranking proof as typed local data:
  - rank
  - archetype
  - max hit
  - ST DPS
  - notes
- Updated the normalized companion model in `data/game-data.ts` so companions can now carry:
  - support ranking metadata
  - ST ranking metadata
  - trial-mandatory metadata
- Added a dedicated `Black Death Scorpion` effect marker in the effect catalog as a non-numeric carry-coverage flag instead of inventing a fake percent value.
- Exported new derived recommendation maps from `data/game-data.ts`:
  - `recommendedSingleTargetCompanions`
  - `singleTargetCompanionRecommendationsById`
  - `trialMandatorySupportCompanions`
  - `trialMandatoryCompanionById`
- Updated Team Builder companion picker output so companions now show:
  - `Trial Must` badge for Black Death Scorpion
  - support rank badge where applicable
  - ST rank badge where applicable
  - concise ST DPS and max-hit text when recovered
- Updated Team Builder companion picker filters to include:
  - `Trial Must`
  - `ST Best`
- Updated Team Builder auto-fill logic so:
  - trial support lineups start from the trial-mandatory Black Death Scorpion rule
  - support slots use support-companion ranking
  - DPS slots use the ST companion ranking
  - the old single recommendation list is now only a fallback path

Why:

- The user supplied a clearer support-companion ranking image and explicitly stated that `Black Death Scorpion` must be used in all trials because it grants 100% CA uptime.
- The user also supplied ST companion ranking proof and asked for deeper DPS understanding, which required separating support picks from damage picks.
- Keeping support ranking and ST ranking as separate typed datasets makes the Team Builder's auto-setup behavior more accurate and easier to reason about.
- The implementation preserves the user's "only proven values" rule by storing Black Death Scorpion as a mandatory utility rule without inventing a numeric combat-advantage percent.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after integrating the support and ST companion ranking layers.

## Pass 17 - Simpler shell and image-led selection redesign

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/summary-panel.tsx`
- `components/empty-state.tsx`
- `components/loading-state.tsx`
- `components/layout/app-shell.tsx`
- `components/content-page.tsx`
- `app/page.tsx`
- `app/reference/page.tsx`
- `features/team-builder/team-builder-page.tsx`

Changes:

- Reworked the shell from a dense left-sidebar layout into a simpler top-header and top-navigation structure.
- Kept the app on the approved palette only:
  - `#cdb4db`
  - `#ffc8dd`
  - `#ffafcc`
  - `#bde0fe`
  - `#a2d2ff`
  - black / white text only
- Updated shared UI primitives so cards, buttons, badges, inputs, selects, textareas, summary panels, empty states, and loading states all use the approved palette rather than grayscale utility styling.
- Simplified `ContentPage` so the right rail is only rendered when present instead of always reserving visual space.
- Updated the dashboard and reference hub cards to match the new flatter, easier-to-read shell.
- Redesigned the top of the Team Builder setup card:
  - class selection now uses visible image tiles with class emblems
  - paragon selection now uses visible image tiles instead of a hidden dropdown
  - role, race, and carry controls remain immediately visible alongside those choices
- Upgraded Team Builder picker fields so the current selection now shows a thumbnail area instead of text-only rows:
  - classes and paragons use the real imported class emblem image
  - artifacts continue using imported artifact images
  - other selectors use consistent visual thumbnail blocks when no extracted image is available in local data
- Updated the popup selection rows to use stronger visual blocks and palette-based surfaces so entries are easier to scan.

Why:

- The user explicitly asked for a full layout redesign with ease of use as the top priority.
- The user also explicitly required the app to use only the approved five colors plus black and white text.
- The prior shell still looked like a dense admin interface, and class/paragon selection still relied too heavily on dropdowns instead of visual choices.
- Moving the highest-value setup controls to image-led tiles makes the Team Builder easier to understand at a glance and reduces the chance that players miss critical setup options.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- Both passed after the shell simplification and image-led Team Builder redesign.

## Pass 18 - Enforced dungeon and trial role distributions

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`

Changes:

- Updated Team Builder composition rules so dungeon presets now assume:
  - `1 tank`
  - `1 healer`
  - `3 DPS`
- Updated standard trial presets so they now assume:
  - `6 DPS`
  - `2 healers`
  - `2 tanks`
- Added a visible `Trial preset` control in the Team Builder toolbar with:
  - `Standard Trial: 6 DPS / 2 Healer / 2 Tank`
  - `MSOD: 7 DPS / 1 Bard Healer / 2 Tank`
- Updated auto-setup logic so role assignment now follows those preset distributions instead of filling from a loose support-first pool.
- Added explicit tank, healer, and DPS class-path plans so auto-setup can reliably place:
  - tank builds into tank slots
  - healer builds into healer slots
  - DPS builds into DPS slots
- Ensured the MSOD preset forces the healer slot to use the Bard healer path first.
- Updated the Team Builder start-screen copy so the role expectations are visible before the user chooses dungeon or trial.

Why:

- The user explicitly clarified the intended endgame role counts for dungeon and trial compositions.
- The user also gave a special MSOD composition note that needed to be reflected in the planner instead of leaving the builder to infer role counts loosely.
- The supplied MSOD note said `7 DPS / 3 healer / 2 tanks`, which exceeds the product's fixed 10-player trial limit. To stay consistent with the app's 10-player rule, the implementation uses the closest legal interpretation:
  - `7 DPS / 1 Bard healer / 2 tanks`
- That assumption is now explicit in the code and this ledger entry so it can be revised later if a different MSOD split is confirmed.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- `npm run build` passed.

## Pass 27 - Collapsed Team Builder to a real 2-column layout and removed visible source branding

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `app/page.tsx`
- `components/source-badge.tsx`
- `app/reference/[entityType]/[itemId]/page.tsx`
- `app/classes/page.tsx`
- `app/artifacts/page.tsx`
- `app/companions/page.tsx`
- `app/patch-tracker/page.tsx`
- `app/endgame-guide/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Removed the extra visual third column from Team Builder by moving `Party Role Split` into the fixed right sidebar.
- Applied that right-rail role split to both dungeon and trial, including MSOD trial mode.
- Kept the main builder area as a true 2-column layout:
  - left = group canvas
  - right = role split, selected slot, slot debuffs, and power loadout
- Removed visible source links from the Team Builder selection overlays.
- Removed visible source badges from the frontend while keeping the underlying source-aware data model intact.
- Removed visible source labels and outbound source links from the live dashboard cards.
- Reworded visible page copy so the frontend no longer calls out NW Hub or source branding directly, while still using the imported content underneath.
- Hid the generic source-link card on reference detail pages so detail views stay gameplay-focused.

Why:

- The user explicitly wanted a 2-column Team Builder instead of the lingering 3-column feel.
- The user also wanted `Party Role Split` available in trial mode, not only dungeon mode.
- The user asked for source and NW Hub branding to be removed from the frontend while still using that imported content to drive the app.

Notes:

- The underlying typed data, verification fields, and source metadata are still preserved in the model and logic layer.
- This pass only removed the visible frontend branding and links, not the provenance data itself.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` reports no new app-code errors after this pass; remaining output is still from temporary `tmp_*` scratch files.

## Pass 28 - Tightened auto-setup rules around support companions and explicit boost targets

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Changed the best-setup overlay so `Boost one DPS` now asks which slot should be the boosted player before applying the setup.
- Updated the auto-setup callback signature to receive that selected boost target instead of always forcing slot 1 to be the boosted player.
- Changed the generated boosted slot label from the older generic carry text to `Boost Target DPS`.
- Enforced the user's planning rule that DPS members should still use support companions in dungeon and trial auto-setup flows, including boosted setups.
- Removed ST summon companion assignment from the generator so the setup builder now rotates through support companions instead of damage companions for DPS slots.
- Restricted the generated recommendation pools to the top 10 imported rows for:
  - artifacts
  - companion enhancements
  - support companions
- Kept damage mounts on DPS slots for the overall-damage shell while still using support companion coverage.
- Added a total boss-debuff count to the Boss Debuffs summary by surfacing both active and pending debuff source counts as a combined total.
- Updated Carry Summary to show the total boss debuff count instead of only the resolved active-source count.

Why:

- The user explicitly said all DPS members should use support companions in dungeon and trial setups, even when boosting one player.
- The older setup overlay only let the app choose the boosted slot implicitly, which made the boost flow too rigid.
- The user also asked for the boss-debuff total to be calculated and visible, not just the resolved percent total.

Notes:

- The app still preserves the concept of a single boosted target internally through the existing `is_carry` flag.
- In user-facing terms, that is the one slot the rest of the composition is optimizing around.
- Mount and insignia calculations are still limited by the currently imported typed values. The current generator structure is ready for a future pass that recalibrates values specifically for Celestial insignias and 125% bolster once those live values are loaded into the local dataset.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` has no new app-code errors from this pass; remaining output is still dominated by temporary `tmp_*` scratch files.

## Pass 31 - Added mobile navigation and replaced generic reference details with NW Hub-backed content

Date:

- 2026-04-05

Files:

- `components/layout/app-shell.tsx`
- `app/reference/[entityType]/[itemId]/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Added a mobile/tablet hamburger navigation flow to the shared app shell.
- Added an off-canvas mobile navigation drawer that includes:
  - app routes
  - reference route entry
  - utility routes
  - mobile search field
- Kept the desktop fixed sidebar behavior unchanged while making the app usable below the `lg` breakpoint.
- Replaced the old generic reference detail page with an entity-aware detail route.
- Wired reference details to the imported NW Hub snapshot data and typed game data already stored locally in the repo.
- Added real detail sections for the main entity types instead of a blank shared shell:
  - artifacts
  - companions
  - classes and paragon records
  - mounts / mount combat powers / mount equip powers
  - effects
  - companion enhancements
  - companion bonus powers
  - bosses
  - patches
  - glossary terms
  - dungeons / trials / events where typed notes exist
- Added richer source-aware right-rail content on detail pages:
  - visual reference image when available
  - navigation links
  - direct source links
- Used sanitized NW Hub-derived text where raw imported strings contained unresolved placeholders, rather than rendering empty or misleading detail cards.
- Changed unsupported detail pages to resolve to `notFound()` instead of keeping a hollow placeholder page.

Why:

- The user wanted the app to be usable on mobile and tablet, not just desktop.
- The previous detail page was a generic wrapper around the reference index and did not justify having a detail route at all.
- The repo already contained extracted NW Hub snapshot data, so using that data directly is better than showing empty shells or fake placeholder copy.
- Returning 404 for unsupported entities is better than keeping a detail page with no real content.

Notes:

- NW Hub pages are heavily app-rendered, so the detail implementation relies on the local typed NW Hub snapshots already extracted into the repo and linked back to their source URLs.
- This satisfies the requirement to use real NW Hub content while keeping the app source-aware and offline-friendly.

### Verification

Checks run:

- `npm run build`

Result:

- `npm run build` passed.

## Pass 30 - Moved Saved Builds and summary cards below the 2-column Team Builder so the right sidebar is slot-tools only

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Closed the left Team Builder content column correctly so the page now renders as a true 2-column layout.
- Kept the right sidebar dedicated to:
  - Selected slot
  - Boss debuffs from this slot
  - Power loadout
- Moved the lower `Saved Builds` block out of the two-column wrapper.
- Moved the lower summary cards out of the right-side lane and into a separate section below the two-column layout:
  - Boss Debuffs
  - Team Buffs
  - Carry Summary
  - Mount Hit Calculator

Why:

- The user wanted the right sidebar to be reserved only for active slot tools.
- The prior structure still placed `Saved Builds` and the summary cards inside the same grid context, which visually pushed them into the right-side lane and made the layout look broken.

Notes:

- This pass is a structural placement correction, not just spacing polish.
- Trial and dungeon now share the same two-column behavior:
  - left side for the builder content
  - right side for selected-slot tools
  - summaries below

### Verification

Checks run:

- `npm run build`

Result:

- `npm run build` passed.
- `npm run lint` passed after removing the temporary unused-variable warning from the role-distribution refactor.

## Pass 19 - Fixed Team Builder summaries, roster icons, insignia data, and select contrast

Date:

- 2026-04-05

Files:

- `data/nw-hub/insignia-bonuses.ts`
- `data/game-data.ts`
- `lib/effect-engine.ts`
- `app/globals.css`
- `components/summary-panel.tsx`
- `features/team-builder/team-builder-page.tsx`

Changes:

- Added a new local extracted data file for NW Hub insignia bonuses:
  - `data/nw-hub/insignia-bonuses.ts`
  - includes the real mount-bonus / insignia-bonus records from `https://nw-hub.com/mounts/bonuses`
  - includes support and damage-relevant entries such as:
    - `Artificer's Persuasion`
    - `Cavalry's Warning`
    - `Combatant's Maneuver`
    - `Gladiator's Guile`
    - `Protector's Camaraderie`
    - `Shepherd's Devotion`
    - `Warlord's Motivation`
    - `Predator's Instinct`
- Replaced the old 3-item placeholder `insigniaBonuses` list in `data/game-data.ts` with the real NW Hub-derived insignia bonus set.
- Added a real exported `entityEffectLookup` in `data/game-data.ts` so the effect engine can resolve:
  - powers
  - artifacts
  - companions
  - enhancements
  - companion bonuses
  - mount combat powers
  - mount equip powers
  - insignia bonuses
- Updated `lib/effect-engine.ts` to use that local entity lookup instead of reading from `globalThis.__NW_ENTITY_EFFECTS__`.
- Fixed the Team Builder roster cards in `features/team-builder/team-builder-page.tsx`:
  - each roster slot now shows a left-side class icon
  - the roster icon now also carries a small paragon badge so the path is easier to identify at a glance
  - selected-slot header now also shows the path badge
- Fixed the broken member summary separator in Team Builder display output.
- Added aggregate total cards to the right-rail summaries:
  - `Boss Debuffs` now shows:
    - resolved total
    - active source count
  - `Team Buffs` now shows:
    - resolved total
    - active source count
  - per-line summary rows now show:
    - active sources
    - pending unresolved sources
- Expanded `Carry Summary` so it now shows:
  - team buff source count
  - boss debuff source count
  - carry-facing resolved totals
- Expanded `Mount Hit Calculator` so it now shows:
  - applied stage count
  - resolved debuff total
  - personal/team/boss bonus values used in the final estimate
- Updated Team Builder auto-setup so insignia bonuses are no longer left empty:
  - support-oriented runs rotate through support-signaling insignia bonuses
  - damage-oriented runs rotate through damage-signaling insignia bonuses
  - the rotation intentionally spreads bonuses across members instead of blindly repeating one bonus on every slot
- Updated `components/summary-panel.tsx` so summary panels can render high-level stat cards above the detailed rows.
- Fixed native select/dropdown contrast in `app/globals.css`:
  - dropdown options now render on a dark background with white text
  - checked / hovered options now switch to accent background with black text for readable contrast

Why:

- The user explicitly asked for:
  - class/paragon icon visibility in the roster
  - fixed alignment and readability across the app
  - real debuff / buff totals in the major summary panels
  - corrected dropdown contrast
  - real insignia bonus data from `https://nw-hub.com/mounts/bonuses`
- The biggest hidden bug was that the effect engine was still looking for entity effect mappings on `globalThis`, but the app never populated that global lookup. That kept many summary totals at zero even when the loadout was full. Replacing that with a local exported lookup fixes the planner at the data-model level instead of hiding the issue in UI.
- The old insignia layer was only a placeholder and could not support real support-vs-damage decisions. Importing the NW Hub insignia bonus data gives the planner a trustworthy local source-aware reference without inventing values.
- The roster previously forced players to read multiple lines of text just to know what each slot was. Adding the class image and a paragon badge makes the left-side roster scannable in a way endgame players can use immediately.
- Native browser dropdowns were failing contrast in the open state, which was directly visible in the screenshot. Explicit option styling fixes that instead of relying on browser defaults.

Notes / assumptions:

- The NW Hub insignia bonus source provides exact names, set requirements, and descriptions. The app stores those as verified source-aware local data.
- The current effect engine still treats many mount equip powers and insignia bonuses as non-normalized stat packages rather than percent-based combat effects. Where no safe normalized percent conversion exists, the planner keeps the source data without inventing a percent value.
- Auto-setup insignia allocation now spreads known support or damage bonuses across the team, but this remains a planner heuristic and should be refined further if the user wants a stricter per-trial optimization model.

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- `npm run build` passed.
- `npm run lint` completed without app-code errors.
- Current lint warnings are still coming from temporary scratch files under `tmp_*`, not from the production app files changed in this pass.

## Pass 20 - Rebuilt the app shell to match the frontend spec layout

Date:

- 2026-04-05

Files:

- `components/layout/app-shell.tsx`
- `components/content-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Replaced the top-navigation-heavy shell with a persistent-left-sidebar app shell that follows the frontend spec layout direction more closely.
- Rebuilt `AppShell` around the documented three-zone structure:
  - left sidebar for navigation
  - dominant main content region
  - page-level header row above page content
- Added a full-height desktop sidebar with clear grouped sections:
  - `Primary`
  - `Reference`
  - bottom utility links
- Moved the identity block into the sidebar so the page header can focus on current page context instead of duplicating full app chrome.
- Added a cleaner page header area above content with:
  - current page title
  - supporting line of context
  - module/version tags
  - global search field
  - compact quick-access route row
- Reworked route links into a single consistent tile pattern with:
  - icon tile
  - label
  - stronger active state
  - calmer spacing
- Updated `ContentPage` spacing so page headers read more like design sections instead of stacked generic cards.
- Increased `ContentPage` title rhythm and max text width so page intros feel closer to a designed product shell and less like generated scaffolding.
- Kept the user-mandated palette unchanged:
  - no design colors were copied from any external design
  - only layout, spacing, shell structure, and element grouping were adapted

Why:

- The user explicitly asked for the app to follow the provided design's layout, spacing, and structural design patterns, while keeping the app's own colors.
- The current shell still relied on a broad top-nav treatment, which conflicted with the frontend spec's persistent-sidebar layout system.
- Re-centering the app on a left-sidebar shell makes the product easier to scan and gives the Team Builder and reference pages a more stable frame.
- This pass intentionally changed structure, not color language, so it respects the user's instruction to avoid copying colors from the design.

Notes / limitations:

- No Stitch MCP tool was available in this session, so the implementation followed the repo's existing frontend design specification and shell rules rather than reading the pasted Stitch server configuration directly.
- No external design asset file was found locally in the repo during this pass, so the shell refactor was derived from the documented layout rules already present in:
  - `docs/neverwinter_frontend_design_spec.md`

### Verification

Checks run:

- `npm run lint`
- `npm run build`

Result:

- `npm run build` passed.
- `npm run lint` completed without app-code errors.
- Remaining lint warnings still come from temporary scratch files under `tmp_*`.

## Pass 21 - Applied the Figma shell, dashboard, and architect layout patterns

Date:

- 2026-04-05

Files:

- `components/layout/app-shell.tsx`
- `components/content-page.tsx`
- `components/ui/card.tsx`
- `components/summary-panel.tsx`
- `app/page.tsx`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Used the Figma nodes `1:2` and `1:307` from file `K2WoR5v0ra8eCwcnLN5Tki` as layout references.
- Rebuilt the shared app shell around the Figma structure:
  - fixed top header
  - fixed left navigation rail
  - calmer utility area
  - more rigid desktop canvas proportions
- Updated the shared `ContentPage` wrapper to match the Figma spacing rhythm with a larger intro block and a dedicated right-rail width.
- Flattened shared card treatment so content surfaces read more like the Figma system:
  - lighter visual noise
  - more consistent padding
  - stronger title hierarchy
- Rebuilt the home dashboard to follow the `1:2` layout direction:
  - hero banner first
  - bento-style artifact and patch analysis row
  - saved-loadout row
  - right intelligence rail
- Reworked Team Builder toward the `1:307` architect layout without removing its existing planning logic:
  - top architect header
  - compact control bar
  - two main group panels for trial mode
  - simplified dungeon split panel
  - selected-slot configuration below the group view
  - right-side intelligence/summaries rail
- Added a new `ArchitectGroupCard` component so roster selection is visual and spatial like the design instead of being hidden in a long left-side list.
- Kept the app’s own palette and did not copy the Figma colors.

Why:

- The user explicitly asked for the app to follow the Figma layout, spacing, and design elements, but not the Figma colors.
- The previous shell and Team Builder still felt custom and patch-layered rather than intentionally designed from a consistent layout system.
- Matching the shell and page structure to the Figma references makes the app easier to scan and gives the dashboard and Team Builder a clearer visual hierarchy.

Notes / limitations:

- This pass intentionally copied structure only:
  - spacing
  - proportions
  - grouping
  - information hierarchy
  - page composition
- This pass did not copy the Figma color language.
- `npm run lint` still reports warnings from temporary scratch files such as `tmp_*`, not from the production app files updated here.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` passed for the production app code changed in this pass.
- Remaining lint warnings still come from temporary scratch files under `tmp_*`.

## Pass 22 - Brought slot setup into view and added real local build saving

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `lib/team-build-storage.ts`
- `app/saved-builds/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Added a visible `Selected Slot Setup` card to the Team Builder right-side column so the user can immediately see and change:
  - player name
  - role
  - race
  - artifact
  - companion
  - enhancement
  - mount combat power
  - carry state
  - mapped debuff encounters
- Moved this fast-edit card ahead of the summary stack on smaller layouts and kept it sticky on very wide screens so it stays easier to reach without scrolling down into the lower power section.
- Added player-name support using the existing `TeamMember.label` field and surfaced it in:
  - the selected slot header
  - the group cards
  - carry summary context
- Stopped forcing class selection to overwrite player names.
- Added a real local save system in `lib/team-build-storage.ts` using browser local storage.
- Added save/load/delete flow to Team Builder:
  - build name field in the control bar
  - save button
  - saved-build list in the builder sidebar
  - load and delete actions
- Replaced the placeholder `Saved Builds` page with a functional browser-backed saved-build view.

Why:

- The user correctly pointed out that the current selected-slot equipment and debuff choices were too far below the main click target, which made the builder feel like the slot had no editable setup.
- The most important actions in Team Builder are now in the visible zone:
  - click slot
  - see player setup immediately
  - change key items immediately
- Local save provides working persistence without adding backend complexity or breaking the current local-data-first v1 architecture.

Notes / limitations:

- Google login was not added in this pass because the repo still has no auth provider package, no OAuth credentials, and no backend/session configuration. The local save system now works fully without requiring auth.
- If Google sync is still desired later, it should be added as a separate auth pass with real credentials and a persistence target.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` has no new app-code errors from this pass.
- Remaining lint warnings still come from temporary scratch files under `tmp_*`.

## Pass 23 - Replaced duplicate slot setup with a click-to-edit drawer and dynamic slot effects

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `app/reference/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Added a left-side `MemberInspectorDrawer` that opens when the user clicks any roster card.
- Changed roster-card selection behavior so clicking a slot now:
  - selects the slot
  - opens the editor drawer immediately
- Removed the duplicate `Selected Slot Setup` card from the right rail to reduce repeated controls and visual noise.
- Added a new per-slot dynamic effect summary using the real effect engine data:
  - `Boss debuffs from this slot`
  - `Team buffs from this slot`
  - `Personal or carry effects`
- Built the per-slot effect summary from `collectMemberEffects(...)` so the visible slot summary is driven by the same mapped encounters, artifacts, companions, enhancements, mounts, insignias, and bonuses already used by the calculator engine.
- Hid unresolved per-slot effects from the visible list and replaced them with a concise unresolved count so the UI stays readable and does not surface placeholder-value noise.
- Kept the detailed `Power Loadout` section lower on the page, but surfaced the key slot-edit controls in the drawer:
  - player name
  - class
  - paragon
  - role
  - race
  - artifact
  - companion
  - enhancement
  - mount combat power
  - carry toggle
  - mapped debuff encounters
- Rebuilt the `Reference Hub` page to use live data counts and previews from the current typed datasets instead of placeholder text-only cards.

Why:

- The user pointed out that slot setup and slot-provided effects were not obvious enough after clicking a card, which made the Team Builder feel harder to use than it should.
- The old layout duplicated setup controls in multiple places and still forced too much scanning.
- A click-to-edit drawer is easier to understand:
  - click slot
  - edit slot
  - see the exact resolved buffs and debuffs from that slot
- Replacing the placeholder reference hub makes the app feel less static and removes one of the clearer “empty link” / low-value surfaces in the current shell.

Notes / limitations:

- The per-slot effect drawer only shows resolved, mapped effects with numeric values. Unresolved effects are counted but hidden until they are proven.
- The deeper lower `Power Loadout` area still exists for full slot editing because it includes additional selections such as dailies, features, companion bonus, mount equip power, insignias, and notes.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings from temporary scratch files such as `tmp_*`, not from the production app files updated in this pass.

## Pass 24 - Responsive layout QA audit and density fixes

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `components/layout/app-shell.tsx`
- `components/content-page.tsx`
- `components/ui/card.tsx`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Ran a layout-focused QA pass against the app shell and Team Builder with attention to the issues visible in the user screenshot:
  - early horizontal compression
  - overly narrow main canvas
  - group cards collapsing into unreadable micro-panels
  - right-rail panels appearing too early
  - control bar wrapping poorly at intermediate desktop widths
- Added a shared `--layout-max` token in `app/globals.css` and widened the app shell to use it.
- Increased the fixed header height slightly and widened the persistent sidebar so the shell feels less cramped at desktop widths.
- Updated `components/content-page.tsx` so the secondary right rail only appears at a later breakpoint instead of stealing space too early.
- Updated `components/ui/card.tsx` so card padding scales with viewport size:
  - tighter on smaller screens
  - roomier on larger screens
- Reworked the Team Builder top control bar so it wraps cleanly across medium and large desktop widths instead of forcing all controls into one dense row too early.
- Changed the main Team Builder content split from an earlier three-column desktop layout to a later two-column layout:
  - main composition canvas on the left
  - summaries on the right only at very wide widths
- Delayed sticky behavior for the right-side summary rail until a later breakpoint to preserve space for the primary planning workflow.
- Reworked the group-card internals:
  - removed the cramped three-column artifact / companion / mount mini-box strip
  - replaced it with clearer full-width `LoadoutRow` rows
  - enlarged the slot title line and improved slot metadata spacing

Why:

- The Team Builder is the core product workflow, so it cannot feel compressed or spreadsheet-like on large screens.
- The screenshot showed a recurring design problem: too many panels were competing inside the same horizontal band, and the roster cards were using detail modules that were too small to stay readable.
- These fixes are intentionally systemic, not cosmetic:
  - wider shell
  - later side-rail breakpoint
  - responsive card padding
  - simpler roster-card internals
- This reduces the chance of similar density regressions showing up again when more content is added.

Notes / QA conclusions:

- The app still contains some text-encoding artifacts in older Team Builder strings that should be normalized in a future cleanup pass, but they do not block build or current interaction.
- `npm run lint` warnings remain limited to temporary scratch files under `tmp_*`, not the production UI files updated in this pass.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 26 - Fixed shell active-state contrast and rebuilt companion and mount libraries

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `components/layout/app-shell.tsx`
- `app/classes/page.tsx`
- `app/companions/page.tsx`
- `app/mounts/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Rebalanced the shell color hierarchy so header, sidebar, and page background now read as one system instead of competing layers.
- Strengthened active-state contrast in the shell navigation and top tabs by switching active items to a dark filled state with light text.
- Fixed the `Reference` / `Reference Hub` double-active bug in the sidebar by only marking the secondary `Reference` entry active on child reference pages, not on `/reference` itself.
- Rebuilt the header search control into a clearer search bar with a dedicated submit action.
- Rebuilt the `Classes` page into an interactive browser with class selection, paragon switching, and power filtering by debuff, buff, and support focus using imported class and power images.
- Replaced the static `Companions` page with a filterable planning board:
  - search
  - role tag filtering
  - focus filtering for strongest group buff, strongest debuff, top support, top ST, and trial-must entries
  - enhancement ranking panel
- Replaced the static `Mounts` page with a filterable planning board:
  - mode filter for trial, dungeon, or mixed support setups
  - type filter for strongest group support, damage mounts, or equip powers
  - effect-focus filter for incoming-damage, team-buff, owner-scaled, and utility entries
- Verified that dungeon best-setup role distribution is still enforced as `1 tank / 1 healer / 3 DPS` through the existing Team Builder planning logic.

Why:

- The user reported that active and hover states were too similar, especially in the shell.
- The user also needed the companion and mount libraries to behave like real planning tools instead of static reference dumps.
- The duplicate active state on `Reference Hub` and `Reference` created clear navigation ambiguity.

Notes:

- The companion page now supports the actionable filters that can be backed by the currently verified local dataset. Melee/ranged delivery classification is still not inferred because that data is not fully verified in the local source layer.
- Build and lint are clean for production app code. Remaining lint warnings continue to come only from temporary scratch files such as `tmp_*`.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` reports no production app errors; only existing warnings from temporary scratch files remain.

## Pass 27 - Fixed active-state contrast and preserved standard trial role counts in auto setup

Date:

- 2026-04-05

Files:

- `components/layout/app-shell.tsx`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Strengthened the shell active-state styling again so active nav items and top tabs now use the dark blue fill with light cyan text and icon color instead of a weaker active/read state.
- Fixed the trial `Best Setup` role-allocation bug for non-MSOD trial setups.
- Added a dedicated role-assignment helper for auto-setup generation so the selected boost target can be any slot without corrupting the required role split.
- Standard trial boost setups now preserve `2 tanks / 2 healers / 6 DPS`.
- Dungeon boost setups continue to preserve `1 tank / 1 healer / 3 DPS`.
- MSOD boost setups continue to preserve `2 tanks / 3 healers / 5 DPS`.

Why:

- The user still reported that active state and text contrast were too close in the shell.
- The boost-target logic was overriding whatever role the chosen slot originally had, which could turn a planned tank slot into a DPS slot and inflate the DPS count.

Notes:

- The fix no longer relies on slot order for the carry/boost target. It keeps the required role pool intact, removes one planned DPS from the remaining pool, and then assigns the chosen slot as the boosted DPS.
- Lint output remains limited to `tmp_*` scratch files, not the production app files changed in this pass.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` reports no production app errors; only existing warnings from temporary scratch files remain.

## Pass 29 - Unified shell background, redesigned header search, rebuilt class browser, and ran a QA sweep

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `components/layout/app-shell.tsx`
- `app/classes/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Rebalanced the global theme hierarchy so the app now uses one consistent shell background color, while cards and panels sit on lighter blue surfaces instead of competing with the page background.
- Redesigned the header search bar into a clearer builder-first search control with a stronger border, embedded action button, and better visual separation from the header chrome.
- Strengthened the sidebar active state and inactive hover state so selection is clearly visible.
- Rebuilt the `/classes` page into a functional class and paragon browser using the imported class and power images.
- Added class-level browsing controls for:
  - class selection
  - paragon selection
  - power sorting/filtering by debuff, buff, and support powers
- Surfaced image-led power cards using the imported encounter / daily / feature art from the local NW Hub dataset.
- Ran a dead-link scan against the routes previously removed from the app and confirmed there are no remaining frontend references to them.

Why:

- The shell colors were visually fighting each other, which made the body background irrelevant and weakened hierarchy.
- The previous header search felt like a generic input instead of a primary navigation tool.
- The user wanted the reference hub’s class area to be genuinely useful to builders, not just a list of class names.
- The QA audit needed to cover both design and route integrity, not just compilation.

Notes:

- `npm run lint` remains warning-only because of existing `tmp_*` scratch files, but the app code changed in this pass is clean.

### Verification

Checks run:

- `npm run build`
- `npm run lint`
- route grep for removed pages under `app`, `components`, `config`, and `features`

Result:

- `npm run build` passed.
- `npm run lint` reported warnings only from temporary scratch files such as `tmp_*`.
- The removed-page route grep returned no matches in production app files.

## Pass 28 - Strengthened active tab contrast and corrected role split rules

Date:

- 2026-04-05

Files:

- `components/ui/button.tsx`
- `components/layout/app-shell.tsx`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Strengthened the active visual state for the app shell navigation so active tabs are clearly differentiated from hover-only states.
- Updated the shared button variants so selected mode buttons and preset toggles have a much stronger active treatment and clearer hover separation.
- Corrected `Party Role Split` so empty slots are no longer counted as `support` before a class is selected.
- Changed the Team Builder role split card to show assigned roles against the required shell:
  - Dungeon: `1 tank / 1 healer / 3 DPS`
  - Standard trial: `2 tanks / 2 healers / 6 DPS`
  - MSOD: `2 tanks / 3 healers / 5 DPS`
- Added an explicit MSOD Bard-healer requirement line so the builder now shows progress toward the mandatory `1 Bard / Minstrel healer`.

Why:

- The active tabs and toggles were too close to the hover state, so it was hard to tell what was actually selected.
- The role split card was misleading because blank slots inherited the default `support` role and inflated the counts.
- The user wanted the real dungeon, trial, and MSOD shell rules reflected directly in the sidebar.

### Verification

Checks run:

- `npm run build`

Result:

- `npm run build` passed.

## Pass 27 - Replaced the pastel palette with the blue Neverwinter palette

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `lib/team-build-export.ts`
- `docs/repo-change-ledger.md`

Changes:

- Replaced the previous lavender-pink app palette with the new blue palette:
  - `#03045E`
  - `#0077B6`
  - `#00B4D8`
  - `#90E0EF`
  - `#CAF0F8`
- Remapped the shared global design tokens so the entire app inherits the new palette without having to rewrite every component class individually.
- Rebalanced background, surface, panel, border, focus, selection, and placeholder tokens for the new cooler color family.
- Updated the high-contrast variant to stay consistent with the new palette.
- Updated the exported workbook palette so Excel exports visually match the in-app design direction instead of retaining the previous color system.

Why:

- The user rejected the previous palette and supplied a new blue palette for the whole product.
- The app theme is token-driven, so changing the core CSS variables is the safest way to refresh the entire experience consistently.
- The export should look like part of the same product, not like an outdated theme snapshot.

Notes:

- The token names were preserved to avoid a broad refactor, but their mapped values now follow the new blue palette.

### Verification

Checks run:

- `npm run build`

Result:

- `npm run build` passed.

## Pass 26 - Comprehensive color-contrast audit and control readability pass

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `app/settings/page.tsx`
- `app/page.tsx`
- `app/reference/[entityType]/[itemId]/page.tsx`
- `app/artifacts/page.tsx`
- `components/layout/app-shell.tsx`
- `components/summary-panel.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Ran a contrast-focused audit across the app shell, dashboard, Team Builder, summary panels, reference detail pages, and form controls.
- Standardized form-control text to readable black text on the lighter approved palette surfaces so dropdowns, inputs, and textareas remain legible.
- Kept the global select styling in a light-theme state so native option menus and focused select fields use visible text and selection states.
- Replaced the remaining non-palette settings toggle thumb fill with a palette-only fill so the settings page no longer used a white UI surface.
- Kept black only where contrast is actually required for text readability against the approved pastel palette.
- Verified there were no remaining non-text black or white surface fills in the production app files.

Why:

- The user asked for a comprehensive QA audit focused on visibility and readability.
- The app palette is intentionally light, which means many earlier white-text choices became unreadable once the surfaces changed.
- Inputs, dropdowns, detail panels, and summary cards all need a single readable contrast strategy instead of per-page drift.

Notes:

- The audit focused on production app files only.
- Temporary scratch files such as `tmp_*` remain outside the product surface and were not treated as blockers.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 30 - Repaired the summary drawer, rebuilt settings, and raised the contrast floor

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `app/settings/page.tsx`
- `lib/app-settings.ts`
- `components/layout/app-shell.tsx`
- `app/globals.css`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `components/ui/card.tsx`
- `app/classes/page.tsx`
- `config/navigation.ts`
- `docs/repo-change-ledger.md`

Changes:

- Fixed the right-side summary breakdown drawer so it now sits below the fixed app header instead of colliding with it.
- Increased the drawer width, strengthened its border and surface contrast, and improved the spacing and typography inside each breakdown row.
- Cleaned imported note text in the drawer so visible source-branding phrases are stripped from frontend notes while the gameplay content remains.
- Replaced the previous shallow settings page with a real local-preferences screen.
- Added persistent settings storage in `lib/app-settings.ts` for:
  - builder defaults
  - trial preset defaults
  - auto-setup defaults
  - calculator assumptions
  - accessibility and interaction preferences
  - export behavior
- Added functional settings actions:
  - copy settings JSON
  - import settings JSON
  - reset defaults
  - clear all saved builds
- Hooked the shell into the saved settings so high-contrast mode and reduced-motion mode now apply to the whole app through document-level data attributes.
- Raised the global surface, border, and placeholder contrast values in `globals.css`.
- Strengthened shared form control contrast by moving `Input`, `Select`, and `Textarea` onto the darker surface token and a stronger focus border.
- Moved `Card` surfaces to the explicit surface token to keep panel contrast more consistent across pages.
- Fixed a broken class-detail link fallback in `app/classes/page.tsx` so the class cards never navigate to an empty reference route.
- Added `Settings` to the shell utility navigation so the page is directly reachable from sidebar navigation as well as the header icon.

Why:

- The old summary drawer looked like a debug overlay instead of a finished product because it was flush to the viewport top and too narrow for the amount of detail being shown.
- The user explicitly asked for a comprehensive, functional settings page instead of a placeholder utility screen.
- Contrast problems were showing up in the drawer and in form fields, so the fix needed to happen at the shared token and component level rather than only in one panel.
- Empty-route fallbacks undermine trust in the product, so the most obvious broken-link path was removed in this pass.

Notes:

- The new settings layer is local-browser only for now; there is still no backend or auth dependency.
- Lint output remains dominated by temporary scratch files such as `tmp_*`, not by the production app files changed in this pass.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 29 - Added clickable summary breakdowns and artifact debuff overlap math

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `components/summary-panel.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Wired the `Boss Debuffs` and `Team Buffs` summary cards so both the header and each individual stat line can open a right-side breakdown drawer.
- Added a slide-in summary drawer in Team Builder that lists the active and pending sources behind the clicked summary card.
- Each breakdown row now shows:
  - slot and player
  - source entity name
  - effect name
  - stat label
  - resolved value or pending state
  - recovered uptime wording
  - imported note text
- Added a new `Total Artifact Debuff` card to the Team Builder summary area.
- The artifact card now shows:
  - perfect overlap burst total
  - average contribution across a 60-second mythic cooldown cycle
  - per-artifact contribution rows for the currently slotted team
- Imported the missing `effectCatalog` and `entityEffectLookup` into Team Builder so the local summary breakdowns can resolve source entities directly instead of depending only on pre-summarized totals.
- Extended the local summary-breakdown data model with a resolved/pending flag so the drawer can separate active sources from unresolved ones.

Why:

- The user wanted the summary cards to be inspectable instead of acting like static dashboard blocks.
- The existing top-line totals did not explain where a debuff or buff was coming from, which member supplied it, or what the expected uptime was.
- Artifact debuffs were especially opaque, so the new overlap card makes the burst total and the average cycle value visible without forcing the user to infer the timing math manually.

Notes:

- The artifact overlap card assumes a 60-second mythic cooldown, because that was the rule the user explicitly asked for.
- When an artifact duration is recovered in local data, the average cycle value uses that duration. When it is not recovered, the entry stays in the burst total but does not invent a fake cycle average.
- Lint warnings remain limited to temporary scratch files under `tmp_*`; the production app files changed in this pass are clean.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 26 - Rebuilt dashboard with live sourced module, event, and planning content

Date:

- 2026-04-05

Files:

- `app/page.tsx`
- `data/dashboard-live.ts`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Replaced the old seeded dashboard with a real interactive dashboard that can switch between `Trial` and `Dungeon` planning modes.
- Added a live sourced dashboard data module for current Neverwinter items:
  - `Tempus Arena - The Slaughterhouse`
  - `For Gods and Glory Battle Pass`
  - `Patch Notes for 03/25/2026`
  - `April Fowls Day - A Honking Good Time!`
- Added a sourced module timeline that now reflects the current line through Module `32.5`.
- Added a role split card that changes with the selected dashboard mode and trial preset.
- Added mode-aware artifact recommendations:
  - trial artifact ranks for trial mode
  - dungeon artifact ranks for dungeon mode
- Added mode-aware companion recommendations:
  - trial support and mandatory coverage for trial mode
  - ST damage companions for dungeon mode
- Linked dashboard cards to real app routes or source pages instead of leaving them as static display blocks.
- Corrected the Team Builder `MSOD` preset from the older 7 DPS shell to the requested `5 DPS / 3 Healer / 2 Tank` shell.
- Updated the Team Builder preset label to match that corrected MSOD composition.

Why:

- The dashboard was still using stale seeded copy and fake operational numbers, which did not satisfy the user's request for present-date realistic content.
- The user explicitly asked for internet-backed updates and a dashboard that reflects real trial and dungeon planning instead of placeholder cards.
- The MSOD role split was no longer aligned with the user's current rules and needed to be corrected at the builder logic layer, not only in display text.

Notes:

- Live dashboard items use current official Steam Community / launcher surfaced news plus Neverwinter module chronology references.
- Patch note detail depth remains conservative where only the official title and dated publication could be confirmed cleanly from current live sources.

### Verification

Checks run:

- `npm run build`

Result:

- `npm run build` passed.

## Pass 29 - Corrected Team Builder summary compression so the right sidebar remains the real second column

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Changed the lower Team Builder summary section from a 4-column layout inside the left content column to a 2-column layout.
- Updated the `Saved Builds` card to span both columns in that lower summary section.
- Kept the right sidebar reserved for:
  - Selected slot
  - Boss debuffs from this slot
  - Power loadout
- Preserved the same right-sidebar pattern for both:
  - Trial setup
  - Dungeon setup

Why:

- The previous lower summary block was still squeezing four cards into the main content column, which visually created a broken third-column effect and made the selected-slot sidebar feel absent.
- The user wanted the Team Builder to read as a true 2-column layout, with the right side clearly dedicated to slot tools.

Notes:

- This pass is a layout correction on top of the earlier right-sidebar refactor.
- The summary cards now remain readable without stealing the visual role of the right tools column.

### Verification

Checks run:

- `npm run build`

Result:

- `npm run build` passed.

## Pass 30 - Removed empty routes, simplified the dashboard, and tightened the app to the approved palette

Date:

- 2026-04-05

Files:

- `app/events/page.tsx`
- `app/patch-tracker/page.tsx`
- `app/dungeons/page.tsx`
- `app/endgame-guide/page.tsx`
- `app/trials/page.tsx`
- `config/navigation.ts`
- `app/reference/page.tsx`
- `app/reference/[entityType]/[itemId]/page.tsx`
- `components/layout/app-shell.tsx`
- `app/settings/page.tsx`
- `app/page.tsx`
- `app/globals.css`
- `features/team-builder/team-builder-page.tsx`
- `app/about/page.tsx`
- `app/glossary/page.tsx`
- `app/buffs-debuffs/page.tsx`
- `app/companions/page.tsx`
- `app/mounts/page.tsx`
- `app/artifacts/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Deleted the empty route pages the user explicitly wanted removed:
  - `events`
  - `patch tracker`
  - `dungeons`
  - `end game guide`
  - `trials`
- Removed those routes from the shell navigation so the sidebar no longer points to empty or low-value pages.
- Updated the reference hub and generic detail-route fallback map so deleted pages now resolve back into the surviving reference surfaces instead of linking to dead routes.
- Removed the remaining shell-level links that still referenced deleted routes.
- Rebuilt the dashboard into a simpler builder-first planning surface.
- Removed the old live-feed / module-timeline style dashboard structure and replaced it with only the cards that directly help Team Builder:
  - mode switch
  - role shell summary
  - builder actions
  - top debuff artifacts
  - top companions
  - top purple debuffs
- Simplified the dashboard layout to a cleaner 2-column information flow instead of a noisier multi-panel command board.
- Tightened the global theme tokens in `app/globals.css` so the app now stays on the approved palette:
  - `#CDB4DB`
  - `#FFC8DD`
  - `#FFAFCC`
  - `#BDE0FE`
  - `#A2D2FF`
- Kept black and white only for foreground / background text contrast and removed remaining stray utility grays from the touched frontend pages.
- Restyled the Team Builder `Party Role Split` card into clearer count blocks so it no longer reads like a cramped diagnostic panel.
- Replaced lingering `text-stone-*` style utilities in the app pages touched by this pass with palette-safe white-opacity text styles so the frontend no longer drifts into off-palette gray.

Why:

- The user explicitly asked for empty pages to be removed rather than left as hollow routes.
- The previous dashboard still looked like a generalized status board instead of a focused planning surface for Team Builder.
- The user wanted the role split area fixed and the palette constrained to the uploaded five-color reference image.
- Cleaning the remaining off-palette text utilities was necessary so the app would not keep regressing into mixed visual language.

Notes:

- The underlying imported data is still available for the surviving list and detail pages even though several top-level routes were removed.
- Route removal here was limited to the empty / low-value pages the user named, not to the fuller reference surfaces such as artifacts, classes, companions, mounts, buffs and debuffs, glossary, settings, and the reference hub.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 31 - Tightened the remaining surface styling to the approved five-color palette

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`
- `components/content-page.tsx`
- `components/loading-state.tsx`
- `components/layout/app-shell.tsx`
- `app/buffs-debuffs/page.tsx`
- `app/companions/page.tsx`
- `app/mounts/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Replaced the remaining generic white/black surface overlays and shell fills with palette-driven surfaces built from:
  - `#CDB4DB`
  - `#FFC8DD`
  - `#FFAFCC`
  - `#BDE0FE`
  - `#A2D2FF`
- Normalized shared button and badge variants so their fills and borders now come only from the approved palette tokens.
- Moved shared card shadow styling away from generic black-heavy shadows toward a lighter palette-based shadow treatment.
- Replaced the remaining low-value route card backgrounds in:
  - buffs and debuffs
  - companions
  - mounts
  with the shared palette surface token.
- Updated the shell background overlays and desktop rail surface so the app chrome no longer drifts back into generic white overlays.

Why:

- The user explicitly called out that the app was still using colors outside the approved palette.
- The earlier theme cleanup fixed the main tokens, but several route cards and shell overlays were still relying on generic white/black utility fills.
- This pass pulls those remaining surfaces back into the same visual system so the app reads as one designed product instead of a partially themed prototype.

Notes:

- Black and white are still retained for core readability and contrast in text and base dark-mode structure.
- The palette restriction in this pass is focused on frontend surfaces, borders, fills, and UI chrome rather than eliminating readable text contrast.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 32 - Removed black and white from app surfaces and overlays

Date:

- 2026-04-05

Files:

- `app/globals.css`
- `components/summary-panel.tsx`
- `app/artifacts/page.tsx`
- `app/settings/page.tsx`
- `app/reference/[entityType]/[itemId]/page.tsx`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Changed the global app background from black to the approved palette, using `#CDB4DB` as the base app field.
- Rebuilt the shared surface tokens so cards, panels, overlays, and secondary shells now use only:
  - `#CDB4DB`
  - `#FFC8DD`
  - `#FFAFCC`
  - `#BDE0FE`
  - `#A2D2FF`
- Removed the remaining black-based overlays and dark modal panels in Team Builder and replaced them with palette overlays and palette panel fills.
- Replaced the remaining white-tinted generic panel fills in:
  - summary cards
  - artifact table cells
  - settings cards
  - generic reference detail cards
  - Team Builder saved-build rows
  - Team Builder side panels
  - Team Builder picker and breakdown panels
- Switched the app color scheme from dark to light at the browser hint level so native controls stop expecting black-backed UI chrome.

Why:

- The user explicitly said black and white should not be used as app colors, only as text colors when contrast requires them.
- The earlier palette pass still left black app backgrounds and white-tinted surface utilities in several high-visibility panels.
- This pass removes those remaining violations at the token level and in the most visible route-level surfaces.

Notes:

- Black and white are still intentionally used for text where contrast requires them.
- This pass was about eliminating non-palette app surfaces, not removing readable text contrast.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 28 - Upgraded build export to formatted Excel and locked Team Builder into a true 2-column layout

Date:

- 2026-04-05

Files:

- `package.json`
- `lib/team-build-export.ts`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Added `exceljs` as an app dependency so build exports can generate a real `.xlsx` workbook instead of a flat CSV.
- Created `lib/team-build-export.ts` to centralize workbook generation for Team Builder exports.
- Built a formatted Excel workbook export with two sheets:
  - `Overview`
  - `Team Setup`
- Styled workbook headers and overview rows so the export opens with readable structure instead of raw id-only data.
- Added workbook image embedding where the current local typed data already exposes image URLs:
  - class icons
  - artifact icons
  - encounter icons
  - daily icon
  - feature icons
- Kept text fields for entities that do not yet have fully recovered image assets in the current typed dataset, instead of inventing fake images.
- Replaced the previous `Export CSV` Team Builder action with `Export Excel`.
- Changed the Team Builder shell from a padded single-column main area plus overlaid right rail to a true responsive 2-column layout at `xl` and above.
- Removed the old right-padding workaround from the main Team Builder container.
- Made the right sidebar structurally part of the Team Builder grid instead of relying on late-breakpoint overlay positioning.
- Kept the right sidebar viewport-aware and scrollable with:
  - selected slot
  - boss debuffs from this slot
  - power loadout
- Kept the lower summary block in the requested 4-column layout for:
  - Boss Debuffs
  - Team Buffs
  - Carry Summary
  - Mount Hit Calculator

Why:

- The user wanted the Team Builder to behave as a real 2-column app layout, with the active slot tools anchored on the right instead of feeling detached from the main content.
- The user also wanted the spreadsheet export to feel presentation-ready rather than dumping raw ids into an unformatted table.
- Moving from CSV to `.xlsx` makes it possible to preserve headers, spacing, frozen panes, and inline images where local source-aware assets already exist.

Notes:

- The export currently embeds images only for entities that already expose usable image URLs in the app data model.
- JSON import/export remains the exact-share universal format between users.
- The formatted Excel export is the presentation-friendly spreadsheet output.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 26 - Fixed shell navigation and added list/detail/search flow for clickable reference surfaces

Date:

- 2026-04-05

Files:

- `components/layout/app-shell.tsx`
- `lib/reference-index.ts`
- `app/search/page.tsx`
- `app/reference/page.tsx`
- `app/reference/[entityType]/[itemId]/page.tsx`
- `app/settings/page.tsx`
- `app/classes/page.tsx`
- `app/artifacts/page.tsx`
- `app/companions/page.tsx`
- `app/mounts/page.tsx`
- `app/buffs-debuffs/page.tsx`
- `app/dungeons/page.tsx`
- `app/trials/page.tsx`
- `app/events/page.tsx`
- `app/glossary/page.tsx`
- `app/patch-tracker/page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Made the desktop sidebar fixed under the header so it no longer scrolls with the main page content.
- Converted the shell search box into a real form that routes to a new `/search` results page.
- Wired the header utility icons into functional routes:
  - patch tracker
  - reference hub
  - settings
  - team builder
- Added `lib/reference-index.ts` as a shared typed index of reference entities so list pages, search, and generic detail pages can all use the same source of truth.
- Added a new `/search` page that searches the shared reference index and returns linked results.
- Added a new generic detail route at `/reference/[entityType]/[itemId]`.
- Replaced brittle list-page fallback logic in the detail route with an explicit entity-to-list-page map so detail pages always route back to a real page.
- Updated the `Reference Hub` page so it acts as a functional launch surface into the live list pages rather than a loose placeholder.
- Turned major list pages into actual list-to-detail flows by linking visible entity names into the generic detail route:
  - classes
  - artifacts
  - companions
  - companion powers
  - companion enhancements
  - mounts
  - effects
  - dungeons
  - trials
  - events
  - glossary terms
  - patch changes
- Replaced the old placeholder-style settings screen with a functional utility page that links into saved builds, team builder, reference, data notes, and patch tracking.
- Normalized some newly touched strings to remove encoding artifacts and apostrophe lint issues from the new routing surfaces.

Why:

- The user explicitly wanted every clickable UI surface to lead somewhere real instead of stopping in dead ends or placeholder screens.
- The shell controls were visually present but not functionally complete, which made the app feel unfinished.
- A shared reference index prevents duplicated routing logic and makes it easier to keep future list/detail pages consistent.
- The fixed sidebar change supports the user's requirement that the navigation remain stable while the page content scrolls.

Notes:

- This pass focuses on making the existing clickable information surfaces functional and connected.
- Lint warnings still come from temporary scratch files under `tmp_*`, not from the production app files updated here.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` passed for production app code and still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 27 - Added build export/import and moved active slot tools into a fixed right rail

Date:

- 2026-04-05

Files:

- `features/team-builder/team-builder-page.tsx`
- `lib/team-build-storage.ts`
- `docs/repo-change-ledger.md`

Changes:

- Added a versioned shared build payload format in `lib/team-build-storage.ts`:
  - schema id: `neverwinter-composition-lab-build`
  - version: `1`
  - includes mode, trial preset, boss preset, build name, and all team members
- Added exact-build JSON export from Team Builder using that shared payload format.
- Added JSON import support so a shared exported build can be loaded directly into the app and saved into local saved builds.
- Added Excel-friendly CSV export from Team Builder:
  - one row per team member
  - includes build metadata plus all selected slot ids and loadout ids
  - intended to open cleanly in Excel or Sheets
- Added top-bar Team Builder actions for:
  - `Save build`
  - `Export CSV`
  - `Export JSON`
  - `Import build`
- Added inline import error handling so invalid files do not fail silently.
- Reworked the Team Builder layout so the active slot workflow is no longer buried in the main page:
  - the older in-page selected-slot and power-loadout blocks were hidden
  - a new fixed right rail now shows:
    - selected slot setup
    - per-slot resolved boss / team / personal effects
    - power loadout controls
- Made the right rail fit inside the viewport height and become internally scrollable when needed.
- Widened the left-side inspector drawer from `440px` to `520px` to reduce control cramping.
- Changed the lower summary area to the requested 4-column layout for:
  - Boss Debuffs
  - Team Buffs
  - Carry Summary
  - Mount Hit Calculator

Why:

- The user wanted a practical way to share builds with friends and reopen them exactly inside the app.
- CSV satisfies the spreadsheet/export requirement without adding a backend or a new package.
- JSON provides the exact universal import/export format for full-fidelity setup exchange.
- The active slot tools were too easy to miss in the scrolling main flow, so moving them into a fixed right rail keeps them visible while the user reviews Group A and Group B.
- The wider left drawer reduces compression in the expanded slot editor.

Notes:

- CSV export is for Excel/Sheets compatibility.
- JSON import/export is the canonical exact-share format between users of this app.
- Lint warnings remain limited to temporary scratch files under `tmp_*`, not the production app files updated in this pass.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.

## Pass 25 - Reflowed Team Builder into a full-width top-first composition layout

Date:

- 2026-04-05

Files:

- `components/layout/app-shell.tsx`
- `components/content-page.tsx`
- `features/team-builder/team-builder-page.tsx`
- `docs/repo-change-ledger.md`

Changes:

- Removed the remaining shell width cap for the app layout so the UI can use the full viewport width instead of stopping at a desktop max-width too early.
- Updated page padding in the shell and content pages to scale more naturally by breakpoint rather than depending on a narrower centered container.
- Reworked Team Builder into a single full-width flow instead of a main column plus summary sidebar.
- Kept `Group A` and `Group B` at the top of the Team Builder so the roster view stays the first thing the user sees.
- Moved the summaries into a dedicated lower summary section.
- Rebuilt that summary section into the layout the user asked for:
  - `Saved Builds` spans full width at the top of the summary block
  - `Boss Debuffs` and `Team Buffs` render as a 2-column row
  - `Carry Summary` and `Mount Hit Calculator` render as a 2-column row below
- Preserved responsive wrapping so the summary section collapses to one column on smaller widths instead of creating broken or cramped layouts.

Why:

- The previous Team Builder still behaved like a sidebar-driven page, which kept important summary cards competing for the same upper viewport space as the main roster.
- The user explicitly wanted:
  - Group A and Group B on top
  - two-column summary rows below
  - full viewport usage
- This pass makes the layout hierarchy clearer:
  - controls
  - groups
  - selected slot and loadout
  - summaries

Notes:

- A few older text-encoding artifacts still remain in Team Builder strings and should be normalized in a later cleanup pass, but they do not affect functionality.

### Verification

Checks run:

- `npm run build`
- `npm run lint`

Result:

- `npm run build` passed.
- `npm run lint` still reports warnings only from temporary scratch files such as `tmp_*`.
