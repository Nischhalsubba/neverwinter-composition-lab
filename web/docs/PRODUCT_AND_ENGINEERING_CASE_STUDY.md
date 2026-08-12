# Neverwinter Composition Lab — Product and Engineering Case Study

> A comprehensive case-study document for the Neverwinter Composition Lab repository. This file is intentionally detailed so the project can be understood by portfolio reviewers, collaborators, maintainers, future AI coding agents, and the exhausted human who eventually has to remember why a certain role shell exists. Documentation: the place where optimism goes to become searchable.

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Context](#product-context)
3. [Problem Statement](#problem-statement)
4. [Target Users](#target-users)
5. [Design Goals](#design-goals)
6. [Core Product Loops](#core-product-loops)
7. [Feature Inventory](#feature-inventory)
8. [Information Architecture](#information-architecture)
9. [Team Builder Model](#team-builder-model)
10. [Buff and Debuff Model](#buff-and-debuff-model)
11. [Data Provenance and Verification](#data-provenance-and-verification)
12. [Export and Sharing Strategy](#export-and-sharing-strategy)
13. [Frontend Architecture](#frontend-architecture)
14. [State and Persistence](#state-and-persistence)
15. [Design System Direction](#design-system-direction)
16. [Accessibility Strategy](#accessibility-strategy)
17. [Performance Strategy](#performance-strategy)
18. [SEO and Social Preview Strategy](#seo-and-social-preview-strategy)
19. [Testing Strategy](#testing-strategy)
20. [Risk Register](#risk-register)
21. [Maintenance Playbook](#maintenance-playbook)
22. [Future Roadmap](#future-roadmap)
23. [Portfolio Review Notes](#portfolio-review-notes)
24. [Maintainer Checklist](#maintainer-checklist)
25. [Disclaimer](#disclaimer)

---

## Executive Summary

**Neverwinter Composition Lab** is a planning tool for endgame group composition in the MMORPG Neverwinter. It combines a team builder, role-shell planner, buff/debuff reference system, saved-build workflow, JSON import/export, Excel workbook export, and patch-aware data documentation into one Next.js application.

The project exists because Neverwinter planning is usually fragmented across spreadsheets, Discord messages, screenshots, wiki pages, community rankings, patch notes, and player memory. That fragmented system works until values change, sources disappear, role assumptions shift, or party leaders need a decision faster than a fifteen-tab spreadsheet ritual can provide.

The app is designed to help users answer a focused product question:

> What team composition gives a dungeon or trial group the best role coverage, support value, buff/debuff coverage, and planning clarity for a specific activity?

The goal is not to create an official game database. The goal is to create a practical planning surface that makes assumptions visible, keeps uncertain values labeled, and helps users compare team-building choices without hiding the reasoning behind a single suspiciously confident score.

---

## Product Context

Neverwinter group content often depends on more than individual player damage. Effective parties depend on:

- role coverage
- class and paragon interaction
- artifact selection
- companion selection
- companion enhancement selection
- mount power choices
- offensive buffs
- enemy debuffs
- support stacking rules
- carry-target strategy
- encounter-specific assumptions
- patch version
- player execution

Many tools only solve part of the problem. A spreadsheet can store values. A wiki can explain items. Discord can preserve community knowledge for approximately twelve minutes before it gets buried under memes, arguments, and someone asking the same question again. Composition Lab tries to connect those pieces into a single product experience.

### Product category

Composition Lab sits between:

| Category | What it contributes |
|---|---|
| Team builder | Slot-based planning and role assignment |
| Reference hub | Browsable classes, artifacts, companions, mounts, buffs, and debuffs |
| Optimization assistant | Ranked planning surfaces and coverage warnings |
| Personal utility | Local saved builds and reusable exports |
| Community documentation | Source metadata and verification status |
| Portfolio project | Product design, frontend architecture, and data-modeling demonstration |

---

## Problem Statement

### The user problem

Players who organize dungeon or trial groups need to make composition decisions quickly, but the information needed to make those decisions is spread across unreliable or fast-aging sources.

### The product problem

A useful planner must be flexible enough to support different modes and team sizes while still being structured enough to prevent bad assumptions, duplicate effects, and dead-end placeholder data.

### The data problem

Game data changes. Community rankings disagree. Some values are verified, some are inferred, some are old, and some are hopeful guesses wearing a spreadsheet cell as camouflage.

### The design problem

A powerful planning interface can easily become visually overwhelming. The interface needs to show enough context to be useful without turning the screen into a magical tax form.

---

## Target Users

### 1. Party leaders

Party leaders need to form reliable groups quickly. They care about role balance, support coverage, required buffs/debuffs, and whether the planned composition is suitable for the selected activity.

Key needs:

- fast role-shell selection
- clear slot responsibilities
- warnings for missing coverage
- exportable build summaries
- simple comparison between compositions

### 2. Support players

Support players need to understand how their artifacts, companions, enhancements, mount powers, and class choices affect the team.

Key needs:

- effect-family visibility
- duplicate-effect awareness
- ranking references
- source notes
- distinction between personal and team value

### 3. DPS/carry players

DPS players want to understand which support setup improves their output and which buffs/debuffs matter most for a carry-focused strategy.

Key needs:

- carry-target designation
- boost-one-DPS mode
- visible support effects
- explanation of recommendation logic

### 4. Build theorycrafters

Theorycrafters need structured data, repeatable imports, and clear provenance.

Key needs:

- typed data shape
- source metadata
- verification state
- import/export consistency
- patch-aware notes

### 5. Portfolio reviewers

Portfolio reviewers need to understand the product thinking, UX decisions, technical implementation, and scope control.

Key needs:

- clear product story
- realistic feature boundaries
- maintainable architecture
- credible documentation
- evidence of design-engineering thinking

---

## Design Goals

The interface is intentionally not styled like a fantasy wiki. The goal is a calm technical planning system.

### Primary goals

1. **Make planning state visible**
   - Users should always know the current mode, role shell, selected slot, and active assumptions.

2. **Separate effect categories**
   - Incoming damage, defense reduction, awareness reduction, vulnerabilities, damage bonuses, ratings, and other effects should not be collapsed into one mystery score.

3. **Preserve uncertainty**
   - Unverified values should remain labeled. The app should not launder uncertainty into fake precision. Sadly, computers do this constantly unless supervised.

4. **Support multiple optimization strategies**
   - A composition that boosts one DPS is not always the same as a composition that maximizes team-wide output.

5. **Keep the interface readable**
   - Dense planning tools must be structured, not loud.

6. **Make exports useful**
   - JSON supports re-import and sharing. Excel supports planning outside the app.

7. **Keep data local and transparent**
   - Until a verified backend exists, local typed data is safer than pretending there is live canonical truth.

---

## Core Product Loops

### Loop 1: Build a composition

1. Select dungeon or trial mode.
2. Select the role-shell preset.
3. Edit each slot.
4. Choose class, paragon, role, artifact, companion, enhancement, mount, and loadout details.
5. Review coverage and warnings.
6. Save or export the build.

### Loop 2: Compare support value

1. Choose a carry target or team-wide mode.
2. Review support recommendations.
3. Add or replace team effects.
4. Watch coverage categories update.
5. Resolve duplicate or missing effects.
6. Export the final plan.

### Loop 3: Verify reference data

1. Browse an entity such as artifact, companion, mount, or effect.
2. Review source metadata.
3. Check verification status.
4. Update notes or rankings in source files.
5. Run validation.
6. Release with patch notes.

### Loop 4: Preserve a useful build

1. Create a composition.
2. Save it locally.
3. Export JSON for portability.
4. Export Excel for group planning or Discord sharing.
5. Re-import when needed.
6. Update after balance changes.

---

## Feature Inventory

### Implemented or represented features

| Feature | Purpose | Product value |
|---|---|---|
| Dungeon builder | Build five-player parties | Supports common content planning |
| Trial builder | Build ten-player groups | Supports endgame group organization |
| Standard trial preset | 2 tank, 2 healer, 6 DPS shell | Common trial composition pattern |
| MSOD preset | 2 tank, 3 healer, 5 DPS shell | Activity-specific planning |
| Slot editing | Configure each role and loadout | Makes builds concrete |
| Carry target | Identify boost target | Enables support-focused planning |
| Artifact planning | Select and compare artifacts | Tracks major support sources |
| Companion planning | Select companions and recommendations | Supports team-value decisions |
| Enhancement planning | Track companion enhancements | Covers important supporting effects |
| Mount planning | Include mount-related choices | Adds another planning dimension |
| Effect families | Keep buff/debuff types separate | Prevents hidden stacking confusion |
| Saved builds | Store locally | Preserves user work |
| JSON export/import | Move builds between sessions/users | Enables portability |
| Excel export | Generate planning workbook | Useful for organized groups |
| Reference routes | Browse source data | Reduces context switching |
| Dynamic social preview | Repository/app identity | Improves sharing polish |

### Feature maturity scale

| Level | Meaning |
|---|---|
| Concept | Direction exists, but implementation may be partial |
| Prototype | Works locally with mock or curated data |
| Validated | Tested against expected behavior |
| Patch-verified | Data checked against a known game version |
| Production-ready | Reliable enough for public use with clear limitations |

Every feature should be labeled honestly. Not every impressive-looking screen deserves the word production. Humanity has already suffered enough dashboards.

---

## Information Architecture

### Top-level route groups

| Route group | Purpose |
|---|---|
| Dashboard | High-level planning command board |
| Team Builder | Main composition workflow |
| Reference | Navigation hub for game data |
| Classes | Class and paragon exploration |
| Artifacts | Artifact lookup and ranking |
| Companions | Companion lookup and ranking |
| Mounts | Mount planning references |
| Buffs/Debuffs | Effect-family reference |
| Saved Builds | Locally persisted compositions |
| Settings | Product preferences and assumptions |

### IA principle

The app separates **planning**, **reference**, and **saved output**.

That matters because a user in planning mode should not need to dig through reference pages for every decision, but the reference system must be close enough to support verification. The product should act like a command center, not like a wiki that accidentally learned buttons.

---

## Team Builder Model

### Slot model

Each team slot should carry enough data to explain its role in the composition.

Recommended slot fields:

```ts
type TeamSlot = {
  id: string;
  role: "tank" | "healer" | "dps" | "support" | "carry";
  classId?: string;
  paragonId?: string;
  artifactId?: string;
  companionId?: string;
  companionEnhancementId?: string;
  mountPowerId?: string;
  notes?: string;
};
```

### Composition model

A composition should preserve mode and assumptions.

```ts
type Composition = {
  id: string;
  name: string;
  mode: "dungeon" | "trial";
  trialPreset?: "standard" | "msod";
  carrySlotId?: string;
  slots: TeamSlot[];
  createdAt: string;
  updatedAt: string;
  patchVersion?: string;
  sourceNotes?: string[];
};
```

### Role-shell validation

Validation should check:

- correct slot count
- expected role count
- missing required roles
- duplicate carry target
- incompatible class/paragon assumptions
- missing required activity coverage
- unresolved or deprecated effects

### Team modes

| Mode | Slot count | Expected use |
|---|---:|---|
| Dungeon | 5 | Fast party planning |
| Standard trial | 10 | Normal trial composition |
| MSOD trial | 10 | Activity-specific support-heavy preset |

---

## Buff and Debuff Model

### Why effect families matter

A single total score can be useful for rough sorting, but it hides where value actually comes from. Two compositions with the same score might have very different risk profiles. One might stack useful incoming-damage amplification. Another might duplicate effects that do not stack. A third might look strong because unverified values were accidentally treated as confirmed, because apparently numbers become truth when formatted in a table.

### Recommended effect shape

```ts
type Effect = {
  id: string;
  name: string;
  family:
    | "incoming_damage"
    | "defense_reduction"
    | "awareness_reduction"
    | "critical_avoidance_reduction"
    | "deflect_reduction"
    | "physical_vulnerability"
    | "magical_vulnerability"
    | "projectile_vulnerability"
    | "damage_bonus"
    | "power"
    | "critical_strike"
    | "critical_severity"
    | "combat_advantage"
    | "accuracy"
    | "forte";
  value?: number;
  unit?: "percent" | "rating" | "flat" | "unknown";
  stacksWith?: string[];
  conflictsWith?: string[];
  sourceId: string;
  verificationStatus: VerificationStatus;
  notes?: string;
};
```

### Verification status

```ts
type VerificationStatus =
  | "verified"
  | "partially_verified"
  | "inferred"
  | "unresolved"
  | "deprecated"
  | "patch_stale";
```

### Effect handling rules

1. Do not merge different effect families into one raw total without explanation.
2. Do not rank unverified values as confidently as verified values.
3. Show missing source metadata clearly.
4. Keep duplicate and conflict warnings visible.
5. Preserve patch context where known.
6. Prefer transparent partial data over fake completeness.

---

## Data Provenance and Verification

### Core principle

Game data is only useful when users know where it came from and how current it is.

### Source metadata

Each meaningful data item should preserve:

- source URL
- source type
- source version or patch
- retrieval/import date
- verification status
- notes
- known limitations

### Source types

| Source type | Example use | Risk |
|---|---|---|
| Official patch notes | Balance changes | May omit exact values |
| Community sheet | Rankings and comparisons | Can become stale |
| Wiki/reference site | Item details | May lag behind patches |
| Manual test | Verified behavior | Requires reproducibility |
| Screenshot | Visual evidence | Can lack context |
| Player report | Early signal | Needs confirmation |
| Imported snapshot | Bulk data | Needs schema validation |

### Data quality rules

- Every ranked recommendation should have a source trail.
- Patch-stale values should stay visible but not silently rank as current.
- Imported data should be reproducible.
- Entity IDs should remain stable across name changes.
- Display labels can change, but IDs should not casually mutate like bored goblins.

---

## Export and Sharing Strategy

### JSON export

JSON export should preserve the composition shape so it can be re-imported without data loss.

JSON should include:

- composition name
- mode
- preset
- slots
- selected entities
- carry target
- patch/version notes
- timestamps
- app schema version

### Excel export

Excel export is useful for:

- raid leaders
- Discord planning
- static review
- offline organization
- comparing group plans

Recommended workbook sheets:

| Sheet | Purpose |
|---|---|
| Summary | Mode, preset, carry target, warnings |
| Slots | One row per player slot |
| Effects | Buff/debuff coverage by family |
| Sources | Source metadata and verification notes |
| Warnings | Conflicts, duplicates, missing values |

### Sharing limitations

Local storage is browser-specific. JSON and Excel exports are the portable formats. Until there is a backend, saved builds should not be described as cloud-synced. Tiny detail, massive difference, naturally.

---

## Frontend Architecture

### Framework stack

| Layer | Tool | Responsibility |
|---|---|---|
| Framework | Next.js | App Router, metadata, routing, build |
| Runtime | React | UI state and interaction |
| Language | TypeScript | Data contracts and safety |
| Styling | Tailwind CSS | Layout, responsive styling, utilities |
| Motion | GSAP | Controlled reveal and transition motion |
| Export | ExcelJS | Workbook generation |
| Icons | Lucide React | Interface iconography |
| Variants | class-variance-authority | Component variant management |
| Class utilities | clsx, tailwind-merge | Conditional class composition |

### Folder responsibilities

| Folder | Responsibility |
|---|---|
| `app/` | Routes, layouts, metadata, Open Graph image generation |
| `components/` | Shared UI, shell, layout, reusable pieces |
| `features/team-builder/` | Main composition workflow |
| `features/` | Product-specific modules |
| `data/` | Typed game and ranking data |
| `lib/` | Helpers for validation, effects, storage, exports |
| `docs/` | Product context, source history, design notes |

### Architecture rule

Business logic should live in reusable modules, not inside page components. Page components should orchestrate, not secretly become multi-headed dragons of state and side effects.

---

## State and Persistence

### Local state

Interactive builder state should remain predictable and serializable.

State should be:

- easy to export
- easy to reset
- resilient to missing entities
- safe around schema changes
- free from circular references

### Local storage

Local storage is useful for quick saved builds but has limitations:

- browser-specific
- device-specific
- user-clearable
- not secure storage
- not collaborative
- not guaranteed permanent

### Schema versioning

Saved builds should include a schema version.

```ts
type SavedBuildEnvelope = {
  schemaVersion: number;
  appVersion?: string;
  build: Composition;
};
```

This lets future versions migrate older builds instead of simply breaking them and pretending the user is the problem, a beloved software tradition.

---

## Design System Direction

### Visual personality

The product should feel:

- technical
- calm
- focused
- data-aware
- readable
- tactical
- trustworthy
- low-noise

### It should not feel:

- like a fantasy fan wiki
- like a casino dashboard
- like a spreadsheet wearing lipstick
- like an MMO tooltip explosion
- like every card is begging for attention

### Color direction

The current palette leans toward navy, blue, cyan, and pale surfaces.

| Role | Example value |
|---|---|
| Deep base | `#03045E` |
| Primary blue | `#0077B6` |
| Cyan highlight | `#00B4D8` |
| Light supporting cyan | `#90E0EF` |
| Pale surface | `#CAF0F8` |

### Component principles

- Selected states must be obvious.
- Disabled states must explain why they are disabled when possible.
- Warnings should be visible but not melodramatic.
- Dense cards need hierarchy, not more borders.
- Tables should be scannable on desktop and digestible on mobile.
- Tooltips should clarify, not hide essential meaning.

---

## Accessibility Strategy

### Keyboard support

The builder should support keyboard navigation across:

- mode selection
- slot selection
- drawer controls
- import/export actions
- saved build actions
- reference navigation

### Focus visibility

Focus states should be visible on:

- buttons
- links
- cards that behave as controls
- selects
- dialogs
- drawers
- import/export controls

### Motion accessibility

Motion should respect reduced-motion preferences. GSAP animations should support a reduced-motion fallback because not every user asked to be gently ambushed by interface choreography.

### Content accessibility

- Avoid unexplained abbreviations where possible.
- Use labels for effect families.
- Keep warnings text-based, not color-only.
- Avoid relying only on icons.
- Preserve semantic headings.
- Use tables only when tabular relationships matter.

---

## Performance Strategy

### Current strengths

- Local data means no API latency for reference pages.
- Typed data can be statically optimized.
- Next.js supports route-level optimization.
- Export logic can be isolated from initial page load.

### Watch areas

- Large imported datasets
- ExcelJS bundle impact
- Dynamic Open Graph generation cost
- Heavy animation on lower-end devices
- Reference pages with long lists
- Repeated derived calculations inside render loops

### Recommendations

- Lazy-load export-heavy utilities where practical.
- Memoize expensive derived coverage calculations.
- Keep reference data normalized.
- Paginate or virtualize very long lists if needed.
- Avoid importing every dataset into every route.
- Use loading states that match final layout shape.

---

## SEO and Social Preview Strategy

The project includes application metadata and a dynamic social-preview image. That matters because community tools are often shared through Discord, GitHub, social posts, and direct links.

### Good metadata should include

- clear app name
- concise description
- canonical URL
- Open Graph image
- Twitter summary image
- useful keywords
- independent-project disclaimer where relevant

### Caution

Search metadata should not imply official affiliation with Neverwinter, Cryptic Studios, Arc Games, Gearbox Publishing, or any rights holder. We are optimizing clarity, not manufacturing authority like a tiny SEO goblin with legal exposure.

---

## Testing Strategy

### Static checks

Use:

```bash
npm run lint
npm run typecheck
npm run build
```

Or:

```bash
npm run check
```

### Unit-test candidates

High-value logic to test:

- role-shell validation
- mode switching
- trial preset handling
- carry-target validity
- duplicate effect detection
- conflicting effect detection
- JSON export/import roundtrip
- saved-build migration
- Excel sheet generation
- source verification sorting

### Interaction-test candidates

High-value UI flows to test:

- create dungeon composition
- switch to trial mode
- switch standard trial to MSOD
- edit a slot
- select artifact and companion
- set carry target
- save build
- reload and recover saved build
- export JSON
- import JSON
- export Excel
- open reference page from builder

---

## Risk Register

| Risk | Severity | Why it matters | Mitigation |
|---|---:|---|---|
| Stale game values | High | Users may make bad planning decisions | Add patch and source metadata |
| Unverified rankings | High | Bad recommendations look authoritative | Display verification status |
| Duplicate effect logic | Medium | Users may overestimate team value | Track conflicts and stacking rules |
| Local storage loss | Medium | Saved builds can disappear | Encourage JSON export |
| Excel export drift | Medium | Workbook may not match UI state | Add export tests |
| Bundle growth | Medium | Export/data libraries can increase load | Lazy-load heavy utilities |
| Mobile complexity | Medium | Builder may become hard to use | Prioritize progressive disclosure |
| Official-affiliation confusion | High | Legal and trust risk | Keep disclaimers visible |
| Overconfident scoring | High | Fake precision damages trust | Explain scoring and uncertainty |

---

## Maintenance Playbook

### Updating game data

1. Identify the patch or source change.
2. Update the source registry.
3. Update affected entities.
4. Mark verification state.
5. Recompute ranking tables where needed.
6. Run lint, typecheck, and build.
7. Update changelog notes.
8. Review UI labels and warnings.

### Adding a new entity type

1. Define the TypeScript type.
2. Add stable IDs.
3. Add source metadata fields.
4. Add display components.
5. Add reference route or section.
6. Add builder integration only if needed.
7. Add tests for derived logic.
8. Update documentation.

### Changing role rules

1. Update role-shell constants.
2. Update validation logic.
3. Update UI summaries.
4. Update export shape if necessary.
5. Test dungeon, standard trial, and MSOD modes.
6. Update documentation and known limitations.

### Before release

```bash
npm ci
npm run check
```

Then manually verify:

- dungeon builder
- standard trial builder
- MSOD trial builder
- selected slot editing
- carry target behavior
- warnings
- saved builds
- JSON import/export
- Excel export
- mobile layout
- social preview

---

## Future Roadmap

### Near-term

- Add more explicit duplicate-effect warnings.
- Improve verification badges in reference pages.
- Add more source metadata to ranked data.
- Add tests for effect-family calculations.
- Add stronger export validation.
- Improve mobile selected-slot editing.

### Mid-term

- Add shareable URL builds.
- Add build comparison.
- Add Discord-friendly summary export.
- Add printable composition report.
- Add import validation with detailed error messages.
- Add patch snapshot switcher.

### Long-term

- Add collaborative planning.
- Add backend-backed build sharing.
- Add community source submission workflow.
- Add moderation/review for submitted data.
- Add encounter-specific composition templates.
- Add historical patch comparison.

---

## Portfolio Review Notes

This project is valuable as a portfolio case study because it combines:

- product strategy
- UX architecture
- domain-specific modeling
- design-system thinking
- frontend implementation
- data provenance
- export workflows
- uncertainty handling
- documentation discipline

It is not just a pretty interface. The interesting design challenge is how the app makes complex group-building logic understandable without hiding assumptions.

### Strong portfolio angles

| Angle | Evidence |
|---|---|
| Product thinking | Supports different user strategies and planning modes |
| UX depth | Distinguishes builder, reference, saved builds, and exports |
| Technical judgment | Uses TypeScript and local typed data responsibly |
| Domain modeling | Keeps effect families and verification state explicit |
| Trust design | Does not pretend incomplete game data is verified |
| Portfolio maturity | Includes disclaimers, roadmap, and risk register |

---

## Maintainer Checklist

Use this checklist when making meaningful changes.

### Product

- [ ] Does the change support a real planning need?
- [ ] Does it reduce ambiguity?
- [ ] Does it avoid fake precision?
- [ ] Does it preserve source metadata?
- [ ] Does it help both new and experienced users?

### Design

- [ ] Is the active state clear?
- [ ] Is the warning state visible?
- [ ] Does the layout still work on mobile?
- [ ] Is the content hierarchy understandable?
- [ ] Does motion support the task instead of showing off?

### Engineering

- [ ] Are types updated?
- [ ] Are exports still valid?
- [ ] Are saved builds backward-compatible?
- [ ] Are heavy dependencies isolated?
- [ ] Does `npm run check` pass?

### Data

- [ ] Is the source listed?
- [ ] Is the verification status correct?
- [ ] Is the patch context clear?
- [ ] Are deprecated values labeled?
- [ ] Are unresolved values still visible?

---

## Disclaimer

Neverwinter Composition Lab is an independent community planning prototype. It is not affiliated with, endorsed by, sponsored by, or officially connected to Cryptic Studios, Arc Games, Gearbox Publishing, Wizards of the Coast, or any Neverwinter rights holder. Game names, terminology, data, imagery, and related intellectual property belong to their respective owners.

This project should be used as a planning aid, not as an official source of truth. Values may be incomplete, inferred, stale, or affected by game balance changes. Always verify current behavior in-game or through current official/community sources before using the output for serious competitive planning.
