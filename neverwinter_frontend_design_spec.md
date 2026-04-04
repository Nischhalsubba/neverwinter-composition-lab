# Neverwinter Endgame Hub — Frontend Design Specification

## 1. Purpose

This document covers **frontend design only** for the Neverwinter Endgame Hub.

It defines:
- page count and page purpose
- navigation structure
- sidebar items
- top bar items
- layout patterns
- design tokens
- component rules
- interaction rules
- responsive behavior
- accessibility requirements
- visual hierarchy
- content presentation rules
- image and card usage
- motion and state behavior

This file should be used by:
- UI designers
- frontend developers
- AI agents generating interfaces
- component library builders
- product designers creating page layouts in Figma / Stitch / code

This document is intentionally focused on **design and frontend structure**, not backend logic.

---

# 2. Product design goals

The UI should feel:

- premium
- modern
- dark-mode first
- image-rich
- highly readable
- game-adjacent
- less cluttered than spreadsheet-style fan tools
- more structured and more intuitive than wiki-style information dumps

The UI should help players answer:

- What does this team member bring?
- What buffs are active?
- What debuffs are active?
- What is missing?
- What is duplicated?
- What should I pick instead?
- What is the final carry / mount damage result?
- What content matters for endgame in 2026?

---

# 3. Core design principles

## 3.1 Recognition over recall
Use:
- icons
- portraits
- images
- chips
- tags
- visual grouping

Do not force users to remember names only.

## 3.2 Show summary first
Default state should show:
- headline value
- key chips
- category
- importance

Detailed text opens on click, hover, drawer, or expand.

## 3.3 Premium data density
The product can hold lots of information, but it should still feel:
- calm
- layered
- intentional
- clean

## 3.4 Always expose contribution
Every player card should answer:
**“What does this member contribute to the team?”**

## 3.5 Separate browse mode from build mode
Do not mix encyclopedic browsing and detailed team editing into one messy surface.
Use dedicated page layouts and clear modes.

## 3.6 Trust through transparency
Always show:
- source badges
- verification badges
- stack rules
- scope
- duration
- notes
- patch or version labels when relevant

---

# 4. Recommended total page count

## 4.1 Primary navigation pages
These should exist in version 1:

1. Home / Dashboard
2. Team Builder
3. Buff & Debuff Explorer
4. Classes
5. Companions
6. Mounts
7. Artifacts
8. Dungeons
9. Trials
10. Events
11. Patch Tracker
12. Endgame Guide
13. Glossary

## 4.2 Secondary pages / utility views
These can be included in version 1 or 1.5 depending scope:

14. Boss Presets
15. Compare View
16. Saved Builds
17. Design / Data QA page
18. Settings / Preferences
19. About / Project Notes

## 4.3 Suggested MVP page count
For MVP, build these first:

- Home
- Team Builder
- Buff & Debuff Explorer
- Companions
- Mounts
- Artifacts
- Patch Tracker
- Endgame Guide

That is enough to make the app feel real and useful.

---

# 5. Sidebar navigation

## 5.1 Recommended sidebar items

Order:

1. Home
2. Team Builder
3. Buffs & Debuffs
4. Classes
5. Companions
6. Mounts
7. Artifacts
8. Dungeons
9. Trials
10. Events
11. Patch Tracker
12. Endgame Guide
13. Glossary

Bottom utility items:
- Saved Builds
- Settings
- About / Data Notes

## 5.2 Sidebar behavior

### Desktop
- persistent left sidebar
- collapsible to icon-only mode
- hover tooltips in collapsed mode

### Tablet
- collapsible drawer

### Mobile
- off-canvas navigation drawer
- bottom nav not recommended for v1 because page count is large

## 5.3 Sidebar content rules
Each item should have:
- icon
- text label
- active state
- optional badge if page has updates
- good spacing and hit target size

## 5.4 Sidebar style rules
- width: 280–320px expanded
- width: 72–88px collapsed
- dark elevated panel
- subtle border and shadow
- section grouping if needed

---

# 6. Top bar

## 6.1 Global top bar items

Always include:
- app logo / identity
- current page title
- global search
- patch/version badge
- quick actions

## 6.2 Team Builder top bar items

Include:
- mode switch: Dungeon / Trial
- boss preset selector
- carry DPS selector
- save build
- load build
- share build
- reset build

## 6.3 Library page top bar items
Include:
- page title
- search
- sort
- filter toggle
- view toggle (grid/list)
- compare toggle where relevant

---

# 7. Global layout system

## 7.1 Main app shell
Use a three-zone shell:

- Left sidebar = navigation or library
- Main content = page content
- Optional right panel = summary / inspector / filters / compare

## 7.2 Desktop width behavior
Suggested:
- left sidebar: 280–340px
- right panel: 320–420px
- main content: fluid and dominant

## 7.3 Layout patterns by page type

### Pattern A — Dashboard / Home
- hero / welcome banner
- quick actions
- content cards
- patch highlights
- ranked lists
- latest verified values

### Pattern B — Team Builder
- left: roster or entity tabs
- center: team canvas + member editor
- right: summaries / calculator

### Pattern C — Explorer pages
- left: filters
- center: content grid/list
- right: detail inspector or compare panel

### Pattern D — Detail pages
- top hero/info bar
- sticky overview
- tab sections
- source / patch notes / related items

---

# 8. Design tokens

## 8.1 Color system

### Backgrounds
- background-primary: very dark slate
- background-secondary: slightly lighter panel
- background-elevated: raised card/popup tone
- background-overlay: modal overlay

### Semantic colors
- buff-green
- debuff-red
- utility-blue
- artifact-gold
- companion-purple
- mount-orange
- verified-teal
- warning-amber
- muted-gray

### Text colors
- text-primary
- text-secondary
- text-muted
- text-inverse

### Border colors
- border-subtle
- border-strong
- border-active
- border-warning

## 8.2 Typography

### Primary font
- Inter

### Optional accent
Use only lightly, if needed:
- Cinzel or Marcellus for decorative hero / section titles
- never for dense data tables or chips

### Type scale
- Display: 48
- H1: 36
- H2: 28
- H3: 22
- H4: 18
- Body Large: 16
- Body: 14
- Meta: 12
- Dense label: 11 minimum

### Font-weight guidance
- 600–700 for headings
- 500–600 for labels
- 400–500 for body

## 8.3 Spacing
Use a consistent scale:
- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40
- 48
- 64

Recommended:
- card padding: 16–24
- section gap: 24–40
- page gutter: 24–32 desktop

## 8.4 Radius
- chips: 12
- buttons: 12–16
- cards: 20
- drawers/modals: 24

## 8.5 Shadows
Use subtle shadows.
Dark UI should rely more on:
- contrast
- border
- glow accents
than strong heavy shadows.

---

# 9. Page-by-page design specification

# 9.1 Home / Dashboard

## Purpose
Quick orientation and launch point.

## Main sections
1. Hero / intro
2. Quick action cards
3. Module timeline preview
4. Latest patch changes
5. Top debuff artifacts
6. Latest verified values
7. Best support companions
8. Best damage mounts
9. Endgame shortcuts

## Layout
- wide hero at top
- 2-column or 3-column content grid beneath
- ranked side cards
- patch/news strip
- visually rich but not crowded

## Components needed
- module timeline card
- ranked item list
- patch-note summary cards
- quick action tiles
- source/verification badges

---

# 9.2 Team Builder

## Purpose
Main flagship screen.

## Layout
Three-column desktop shell:

### Left column
Tabs:
- Roster
- Classes
- Companions
- Artifacts
- Mounts
- Powers
- Effects

### Center column
- team layout
- member cards
- selected member configuration panel

### Right column
- Boss Debuff Summary
- Team Buff Summary
- Carry DPS State
- Final Mount Hit
- Missing Effects
- Duplicate Effects

## Mode behavior
### Dungeon mode
- one group of 5

### Trial mode
- Group A (5)
- Group B (5)

Do not show 10 members in a flat row.

## Member card structure
### Header
- class icon/portrait
- race icon
- slot number
- player label
- role badge
- carry badge

### Loadout row
- encounters
- dailies
- passives/features
- artifact
- companion
- mount

### Contribution chips
Examples:
- Incoming Damage +10%
- Party Damage +5%
- Awareness -5%
- Crit Severity +10%
- Combat Advantage
- Boss Only
- Physical Only
- Non-stacking

### Warning row
Examples:
- missing mount
- duplicate debuff
- unsupported damage type
- no support contribution

## Member configuration panel tabs
- Identity
- Powers
- Artifact
- Companion
- Mount
- Personal Buffs
- Notes

---

# 9.3 Buff & Debuff Explorer

## Purpose
Central effect library.

## Main sections
- search bar
- filter row
- category switch
- grid/list of effects
- effect detail drawer

## Categories
- Team Buffs
- Boss Debuffs
- Typed Vulnerability
- Personal Buffs
- Utility Effects
- Non-Stacking Rules
- Event-Specific Effects

## Filters
- source type
- class
- artifact
- companion
- mount
- team-wide
- self-only
- boss-only
- physical
- magical
- projectile
- verified only

## Effect card content
- effect name
- source
- value
- duration
- scope
- stack rule
- source badge
- verification badge

---

# 9.4 Classes page

## Purpose
Endgame class explorer.

## Main sections
- class grid
- filters
- comparison shortcuts
- class detail page / drawer

## Class card
- class icon
- class name
- main role
- ST / AoE / support tags
- short summary
- patch-changed badge if relevant

## Class detail sections
- overview
- paragon/path split
- key powers
- team contribution
- carry value
- patch notes summary
- recommended items
- related support packages

---

# 9.5 Companions page

## Purpose
Companion rankings and browsing.

## Views
- ST Damage
- AoE Damage
- Support
- Healing
- Augment
- All

## Main sections
- search
- role filters
- list/grid toggle
- ranking table/cards
- detail inspector

## Companion card
- portrait
- name
- role tags
- ST/AoE/support badge
- enhancement name
- bonus power
- verification/source badge

## Companion detail layout
- portrait and identity
- role/category
- active behavior
- enhancement
- equip bonus
- rankings
- support use cases
- source history

---

# 9.6 Mounts page

## Purpose
Mount library and combat power explorer.

## Views
- Damage Mounts
- Support Mounts
- Equip Powers
- Insignia Bonuses
- 4-slot Mount Lookup

## Main sections
- search
- filter chips
- combat/equip/insignia tabs
- grid/list content
- detail drawer

## Mount card
- image
- name
- combat power tag
- equip power tag
- damage/support tag
- quality badge

## Mount detail sections
- mount image
- combat power
- equip power
- insignia synergy
- damage type
- use in carry setup
- source / patch / version info

---

# 9.7 Artifacts page

## Purpose
Artifact library and rankings.

## Views
- Debuff Artifacts
- Personal Burst Artifacts
- Utility Artifacts
- Support Artifacts
- All

## Main sections
- ranked list
- search
- filter
- detail panel
- compare state

## Artifact card
- image
- artifact name
- category tag
- debuff/buff tag
- personal/team tag
- value preview

## Artifact detail sections
- active effect
- passive effect
- duration
- cooldown
- category
- rank
- patch notes
- usage recommendations

---

# 9.8 Dungeons page

## Purpose
5-man content knowledge hub.

## Main sections
- dungeon cards
- filters
- recent / relevant tags
- detail page

## Dungeon detail sections
- overview
- boss list
- dangerous mechanics
- dangerous debuffs
- recommended support
- rewards
- patch changes

---

# 9.9 Trials page

## Purpose
10-man content knowledge hub.

## Main sections
- trial cards
- filters
- detail pages

## Trial detail sections
- overview
- phases
- dangerous mechanics
- support requirements
- group positioning
- recommended artifacts / mounts / companions
- rewards
- patch changes

---

# 9.10 Events page

## Purpose
Timed and special content.

## Include
- Tempus Arena
- seasonal events
- progression events
- battle pass highlights if relevant

## Event detail sections
- overview
- dates/frequency
- unique buffs or rules
- key rewards
- endgame relevance

---

# 9.11 Patch Tracker

## Purpose
Readable patch history.

## Main sections
- patch timeline
- search
- category filters
- patch cards
- extracted change list

## Filters
- class changes
- companions
- mounts
- artifacts
- dungeons
- trials
- systems
- UI/queue

## Patch card
- date
- title
- module tag
- category tags
- short summary
- “affected systems” chips

## Patch detail sections
- high-level summary
- extracted changes
- gameplay impact
- affected entities
- source links

---

# 9.12 Endgame Guide

## Purpose
High-value educational section.

## Suggested sections
- What to use in 2026
- Best support companions
- Best ST companions
- Best damage mounts
- Best debuff artifacts
- Best support packages
- How to progress
- What to upgrade first
- Best farming targets
- Common mistakes

## Layout
- magazine / knowledge-hub style
- hero + category cards
- readable editorial sections
- recommendation blocks
- compare lists

---

# 9.13 Glossary

## Purpose
Explain terms clearly.

## Terms to include
- CA
- Crit Sev
- Crit Avoid
- Deflect
- Deflect Sev
- Forte
- Bolster
- Mythic
- Celestial
- Proc
- Uptime
- Strongest Only
- Refresh
- Carry DPS
- Typed Vulnerability
- Team Buff
- Boss Debuff

## Layout
- alphabetical list
- searchable
- side quick index

---

# 10. Component inventory

## Navigation
- Sidebar
- Collapsed Sidebar
- Top Bar
- Breadcrumb / current page label
- Search bar

## Cards
- Quick Action Card
- Module Timeline Card
- Ranked Item Card
- Member Card
- Companion Card
- Mount Card
- Artifact Card
- Class Card
- Dungeon Card
- Trial Card
- Patch Card
- Stat Card

## Data display
- Effect Chip
- Verification Badge
- Source Badge
- Role Badge
- Patch Badge
- Category Tag
- Empty State
- Skeleton Loader

## Interactive patterns
- Filter chip group
- Tab switcher
- Segmented control
- Dropdown selector
- Combo box search selector
- Drawer
- Modal
- Tooltip
- Popover
- Compare panel

## Team Builder specific
- Team Canvas
- Group container
- Member Config Panel
- Boss Debuff Summary block
- Team Buff Summary block
- Carry State block
- Mount Hit Result block
- Duplicate warning panel
- Missing effect panel

---

# 11. Frontend interaction rules

## Hover behavior
Hover should enhance, not be required for core understanding.

Allowed on hover:
- richer tooltip
- image preview
- micro-elevation
- chip explanation

Do not hide essential content in hover only.

## Selection behavior
Selected entities should have:
- stronger border
- subtle glow or accent
- persistent visible state
- clear deselect option

## Drag/drop
Optional later.
Do not require drag/drop for MVP.

## Compare behavior
Should support later:
- companion vs companion
- artifact vs artifact
- mount vs mount
- team vs team

---

# 12. Responsive behavior

## Desktop
- full 3-column layouts
- persistent sidebar
- persistent summaries
- wide cards and rich grids

## Tablet
- left and right panels become drawers or tabbed side sheets
- main content remains dominant
- team builder still usable without overcrowding

## Mobile
- stacked sections
- sticky mini summary
- bottom sheets for selectors
- member-by-member editing flow

Do not try to force the full desktop Team Builder into one tiny screen.

---

# 13. Content presentation rules

## Page copy style
- concise
- useful
- expert
- readable
- not overly dramatic

## Card copy rules
Use short labels:
- source
- value
- duration
- scope
- stack rule
- category

## Long text handling
- use accordions
- use detail drawers
- use “read more”
- avoid dense paragraphs inside cards

---

# 14. Data display rules

## Numbers
- use tabular style if possible
- align ranked values consistently
- highlight important percentages

## Lists
- use ranked lists for “best” or “strongest”
- use grouped lists for categories
- use cards for browsing
- use tables only when comparison truly needs it

## Tooltips
Every tooltip should try to answer:
- what is this?
- what does it do?
- who does it affect?
- does it stack?
- where is it from?

---

# 15. States and empty-state design

## States required
- default
- hover
- active
- selected
- disabled
- loading
- empty
- warning
- error

## Empty state examples
- no companion selected
- no debuff source found
- no saved builds
- no results match filters
- data not yet verified

Each empty state should include:
- short explanation
- next action if possible

---

# 16. Accessibility and readability rules

- never use tiny type on critical data
- always keep sufficient contrast
- focus states must be visible
- labels must be readable without memorizing icons
- use keyboard-friendly controls
- provide alt text or descriptive labels for meaningful images

---

# 17. Motion guidelines

Use subtle motion only.

Recommended:
- panel fade/slide
- card hover lift
- tab underline movement
- drawer slide-in
- skeleton shimmer

Avoid:
- flashy particle effects
- constant motion backgrounds
- large animated UI elements
- motion that slows reading

---

# 18. Image usage rules

Use images for:
- class portraits/icons
- race icons
- power icons
- companion portraits
- artifact icons
- mount art
- dungeon/trial cover art

Rules:
- keep crops consistent
- do not stretch
- use placeholders gracefully
- keep image corners aligned with card system
- do not let images dominate text hierarchy

---

# 19. Frontend implementation suggestions

## Recommended stack
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons

## Frontend file suggestions
- layout shell
- nav components
- card primitives
- selector components
- summary components
- data-badge components
- drawer/modal components
- page-level templates

---

# 20. Build order for frontend

## Phase 1
- app shell
- sidebar
- top bar
- theme tokens
- page routes
- basic cards

## Phase 2
- Home
- Team Builder shell
- Buff & Debuff Explorer
- Companions
- Mounts
- Artifacts

## Phase 3
- detailed member config panel
- summary right sidebar
- patch tracker
- endgame guide
- glossary

## Phase 4
- compare mode
- refined mobile behavior
- image library polish
- advanced table/list toggles

---

# 21. Final design benchmark

The final UI should feel:
- more premium than NW Hub
- more readable than wiki pages
- more visual than spreadsheets
- more organized than Discord build notes
- more intuitive than manual calculator sheets

A serious endgame player should open the app and immediately understand:
- where to go
- what to click
- what each teammate contributes
- what the final team output is

---

# 22. One-sentence frontend direction

Design a premium dark-mode Neverwinter endgame web app with a clean three-panel structure, image-first browsing, transparent stat summaries, and a polished team-builder experience centered around buffs, debuffs, carry optimization, and endgame knowledge discovery.
