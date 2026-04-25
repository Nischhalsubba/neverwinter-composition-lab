# Neverwinter Composition Lab

> A premium, patch-aware **Neverwinter team builder, support planner, buff/debuff calculator, export tool, and reference hub** for endgame players who want to plan dungeon and trial compositions with clarity instead of spreadsheet fatigue.

![Next.js](https://img.shields.io/badge/Next.js-16.2.2-03045E?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.4-0077B6?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-00B4D8?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-90E0EF?style=for-the-badge&labelColor=03045E)
![Status](https://img.shields.io/badge/Status-Active%20Prototype-CAF0F8?style=for-the-badge&labelColor=03045E)

---

## Table of Contents

- [What This Project Is](#what-this-project-is)
- [Why This Exists](#why-this-exists)
- [Designer’s Perspective](#designers-perspective)
- [Core Product Goals](#core-product-goals)
- [Main Features](#main-features)
- [Design Direction](#design-direction)
- [Frontend Tech Choices](#frontend-tech-choices)
- [Data Philosophy](#data-philosophy)
- [Current Data Sources And Inputs](#current-data-sources-and-inputs)
- [Important Neverwinter Terms For Non-Players](#important-neverwinter-terms-for-non-players)
- [Project Structure](#project-structure)
- [Current Key Pages](#current-key-pages)
- [How To Run The Project](#how-to-run-the-project)
- [Available Scripts](#available-scripts)
- [Team Builder Workflow](#team-builder-workflow)
- [Builder Logic Rules](#builder-logic-rules)
- [Accessibility And UX Principles](#accessibility-and-ux-principles)
- [What Is Finished Vs In Progress](#what-is-finished-vs-in-progress)
- [Quality Checklist](#quality-checklist)
- [Contribution Notes](#contribution-notes)
- [SEO Keywords](#seo-keywords)
- [Final Notes](#final-notes)

---

## What This Project Is

**Neverwinter Composition Lab** is a web application for planning dungeon and trial groups in the MMORPG **Neverwinter**.

If you already play Neverwinter, this repo helps with:

- building a **5-player dungeon party**
- building a **10-player trial team**
- assigning **tank / healer / DPS / support responsibilities**
- tracking **boss debuffs**
- tracking **team buffs**
- comparing **artifacts, companions, companion enhancements, mount powers, and insignia bonuses**
- planning around one boosted damage dealer or overall team damage
- exporting and sharing structured builds

If you do **not** play Neverwinter, the short version is:

- Neverwinter is a cooperative online action RPG.
- Endgame groups are heavily optimized around damage buffs, enemy debuffs, role coverage, and timing.
- Players often use spreadsheets, wikis, screenshots, Discord notes, and patch memory to figure out which setup is strongest.
- This app turns that fragmented information into a clean, visual, typed planning tool.

---

## Why This Exists

Most fan tools for Neverwinter are one of these:

- spreadsheet-first
- text-dense
- patch-blind
- unclear about what is verified vs inferred
- difficult to use while actively planning a party
- too focused on lists and not enough on actual composition decisions

This repo takes a different approach:

- **Team Builder first**
- **source-aware data**
- **patch-aware structure**
- **transparent buff/debuff math**
- **visual loadout planning**
- **reference pages that support the builder instead of competing with it**

The goal is not to be a generic database.  
The goal is to be the **best planning surface for serious Neverwinter endgame group setup**.

---

## Designer’s Perspective

This project is built from the perspective of a player who also thinks like a product designer.

The problem is not only “show all the game data.” The real problem is helping a party leader make decisions quickly:

- Which roles are missing?
- Who is the carry target?
- Which buffs are already covered?
- Which debuffs overlap?
- Which artifact or companion adds value?
- What is verified, partial, or unresolved?
- Can this setup be shared with the group?

The interface is intentionally not styled like a fantasy wiki. It uses a clean, calm, technical planning surface because the main user need is decision-making, not decoration.

The design goal is:

> Make complex group optimization feel understandable, editable, and trustworthy.

---

## Core Product Goals

- Make party planning fast for real dungeon and trial leaders.
- Show where buffs and debuffs actually come from.
- Keep unresolved values visible without pretending they are proven.
- Support both **boost-one-DPS** and **overall-team-damage** planning.
- Stay understandable for both hardcore players and curious newcomers.
- Feel like a polished app, not a spreadsheet wrapped in a website.
- Preserve provenance so users can trust the data model.
- Support export and sharing workflows for group planning.

---

## Main Features

### Team Builder

The Team Builder is the core of the product.

It currently supports:

- **Dungeon mode**: 5 players
- **Trial mode**: 10 players
- **Standard trial shell**: 2 tanks / 2 healers / 6 DPS
- **MSOD shell**: 2 tanks / 3 healers / 5 DPS
- selected-slot editing
- class + paragon assignment
- artifact, companion, enhancement, and mount selection
- carry / boost target setup
- power loadout editing
- role split validation
- save, import, and export

### Buff And Debuff Logic

The app separates effects instead of flattening everything into one hidden number.

Tracked effect families include:

- incoming damage
- defense reduction
- awareness reduction
- critical avoidance reduction
- deflect reduction
- physical vulnerability
- magical vulnerability
- projectile vulnerability
- damage bonus
- power
- crit strike
- crit severity
- combat advantage
- accuracy
- forte

### Reference Hub

The reference system supports the planner with:

- classes and paragon paths
- artifacts
- companions
- companion enhancements
- buffs and debuffs
- mounts
- glossary and system detail

### Build Persistence

- local saved builds
- JSON import/export for sharing setups with friends
- formatted Excel workbook export through ExcelJS

### UX Layer

- responsive desktop / tablet / mobile layout
- fixed shell navigation
- shaped loading skeletons
- subtle GSAP motion
- slide-in drawers and modals
- route transitions
- clean active, hover, selected, and disabled states

---

## Design Direction

This UI is intentionally **not** styled like a fantasy wiki.

The design language is:

- clean
- technical
- calm
- editorial
- planning-first
- data-aware

### Why The Current Color System

The current palette:

- `#03045E`
- `#0077B6`
- `#00B4D8`
- `#90E0EF`
- `#CAF0F8`

was chosen because it gives the app:

- high readability
- a cool strategic feel
- enough contrast to make active, hover, selected, and data states distinct
- a modern control-room identity instead of a typical game-fan-site palette

The rule is simple: **clarity first, decoration second**.

### Why The Layout Looks Like This

The layout is built around how people actually use the product:

- the left side gives navigation and stable orientation
- the center is for the main planning workflow
- the right side is for active context and deeper slot detail

This makes the app feel like a serious planning tool instead of a content site.

---

## Frontend Tech Choices

### Next.js 16 App Router

Chosen for:

- route-based architecture
- nested layouts
- route-level loading states
- long-term scalability
- separation between product pages and reference pages

### React 19

Chosen for:

- modern client/server composition
- smooth interactive UI
- better ergonomics for complex stateful planning tools

### TypeScript

Chosen because this app is heavily data-driven and must stay safe as more game systems are added.

The project depends on strong typing for:

- team members
- powers
- artifacts
- companions
- enhancements
- mounts
- source metadata
- effect resolution

### Tailwind CSS v4

Chosen for:

- fast UI iteration
- consistent spacing and surface design
- predictable component styling
- low-friction theming

### GSAP

Chosen for:

- precise motion control
- subtle route and panel transitions
- polished animation without making the app flashy

### ExcelJS

Chosen for:

- structured spreadsheet export
- richer workbook formatting than plain CSV-only export
- group-friendly build sharing

### UI Utility Libraries

The app also uses utilities such as:

- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`

These support maintainable components, iconography, and conditional styling.

---

## Data Philosophy

This repo is strict about provenance.

### Rules

- Do **not** invent Neverwinter values.
- If something is unresolved, it stays unresolved in the model.
- Verified and partial data should never be mixed without labels.
- Frontend text can be simplified, but internal structure should preserve provenance.

### Every Meaningful Entity Supports Source Metadata

Key entities should keep fields such as:

- `id`
- `name`
- `source_url`
- `source_type`
- `source_version`
- `verification_status`
- `notes`

This matters because Neverwinter changes over time, and not every community value is equally trustworthy.

---

## Current Data Sources And Inputs

The app is built from **local typed data files**, not a live backend.

The current repo integrates structured data derived from:

- NW Hub content
- curated Google Sheets / ranking sheets
- internal documentation in `docs/`
- locally recovered image and ranking data

The frontend intentionally hides noisy source branding in many places, but the underlying model still preserves provenance.

---

## Important Neverwinter Terms For Non-Players

### Dungeon

A standard 5-player group activity.

Typical shell:

- 1 tank
- 1 healer
- 3 DPS

### Trial

A larger 10-player raid-style activity.

Typical shell:

- 2 tanks
- 2 healers
- 6 DPS

### MSOD

A specific trial setup variant used by endgame players.

Typical shell in this app:

- 2 tanks
- 3 healers
- 5 DPS
- at least 1 healer should be **Bard / Minstrel**

### Carry / Boost Target

The selected damage dealer the team is being optimized around.

If a build is set to **boost one DPS**, the rest of the team is evaluated mainly by how much they improve that player’s output.

### Buff

A positive effect applied to your team or a player.

### Debuff

A negative effect applied to an enemy, usually increasing party damage or reducing the enemy’s defenses.

---

## Project Structure

```text
app/                    Next.js App Router pages and route structure
components/             Shared UI, shell, motion, loading, and summary components
features/team-builder/  Core Team Builder experience
data/                   Typed local game data, rankings, and imported source snapshots
lib/                    Core logic, effect math, utilities, export/storage helpers
docs/                   Product context, source registry, design docs, and change ledger
```

---

## Current Key Pages

- `/`  
  Builder-first dashboard with useful ranked planning data

- `/team-builder`  
  Main party planning workflow

- `/reference`  
  Jump surface for reference pages used by the builder

- `/classes`
- `/artifacts`
- `/companions`
- `/mounts`
- `/buffs-debuffs`
- `/saved-builds`
- `/settings`

---

## How To Run The Project

### Requirements

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds the production app |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

---

## Team Builder Workflow

1. Pick **Dungeon** or **Trial**.
2. Choose shell or preset.
3. Assign classes and paragons.
4. Fill artifacts, companions, enhancements, and mounts.
5. Review role split.
6. Review boss debuffs and team buffs.
7. Review carry summary or mount-hit output.
8. Save or export the build.

---

## Builder Logic Rules

Important rules already modeled or actively enforced in the app include:

- dungeon shell uses 5 slots
- trial shell uses 10 slots
- standard trial shell is 2 tanks / 2 healers / 6 DPS
- MSOD shell is 2 tanks / 3 healers / 5 DPS
- dungeon shell is 1 tank / 1 healer / 3 DPS
- one member can be marked as the boost target / carry
- effects are separated by type rather than flattened
- unresolved values should not be faked as verified values

---

## Accessibility And UX Principles

The app aims to be:

- readable
- responsive
- keyboard-friendly
- contrast-aware
- motion-aware

The UX system includes:

- subtle route transitions
- shaped loading skeletons
- reduced-motion support
- clear active / hover / selected states
- drawer-based editing for heavy builder interactions

### UX Quality Checklist

- [ ] Builder is usable without reading documentation.
- [ ] Role errors are visible and understandable.
- [ ] Carry target is visually obvious.
- [ ] Buff/debuff summaries do not hide unresolved values.
- [ ] Saved builds are easy to find and restore.
- [ ] Import/export flow has clear success and error states.
- [ ] Mobile layout remains readable.
- [ ] Motion never blocks the planning task.

---

## What Is Finished Vs In Progress

### Working Today

- dashboard
- team builder
- saved builds
- import/export
- local settings
- reference pages
- route skeletons
- GSAP motion layer

### Still Evolving

- deeper Neverwinter math fidelity for every special case
- more exhaustive image coverage for all assets
- broader verified value coverage across every community-sourced entry
- future auth / cloud save if desired

---

## Quality Checklist

### Technical QA

- [ ] `npm install` works.
- [ ] `npm run dev` works.
- [ ] `npm run build` works.
- [ ] `npm run start` works after build.
- [ ] `npm run lint` passes or known lint issues are documented.
- [ ] Exported Excel workbook opens correctly.
- [ ] Saved builds persist locally.
- [ ] JSON import/export works.

### Data QA

- [ ] New values include source metadata.
- [ ] Unverified values are marked clearly.
- [ ] Patch-sensitive notes are preserved.
- [ ] Effects are classified into correct families.
- [ ] No invented values are added as facts.

---

## Contribution Notes

If you contribute:

- do not invent game values
- preserve source metadata
- keep UX focused on planning speed
- avoid turning the app into a generic wiki
- update the docs when adding or changing important behavior

The most important internal doc for tracking implementation history is:

- [docs/repo-change-ledger.md](docs/repo-change-ledger.md)

---

## SEO Keywords

This repository is intentionally optimized for discoverability around topics such as:

- Neverwinter team builder
- Neverwinter trial setup
- Neverwinter dungeon composition
- Neverwinter buffs and debuffs
- Neverwinter support companions
- Neverwinter artifact rankings
- Neverwinter mount powers
- Neverwinter endgame planner
- Neverwinter party optimizer
- Neverwinter raid planning tool

---

## Final Notes

Neverwinter Composition Lab is built to answer a simple question:

**“What is the cleanest, fastest, most trustworthy way to plan a strong Neverwinter group?”**

This repo is the first serious attempt at answering that with:

- a real app
- a real data model
- real UX intent
- and a clear respect for what is verified versus what is still being recovered
