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
- `npm run lint` passed after removing the temporary unused-variable warning from the role-distribution refactor.
