# Implementation Plan

## Goal

Ship a premium, patch-aware Neverwinter endgame web app with a functional Team Builder first, then expand the knowledge hub and ingestion pipeline without breaking source provenance.

## Phase 0 - Source normalization

- Normalize `docs/neverwinter_final_ai_master_context.md`.
- Normalize `docs/neverwinter_source_registry_and_proof.md`.
- Keep wording and intent intact.
- Fix markdown spacing, headings, and encoding artifacts.

## Phase 1 - Product shell

- Next.js App Router, TypeScript, Tailwind CSS, local typed data.
- Shared shell:
  - left navigation
  - top bar
  - reusable right summary rail
- Core pages:
  - `/`
  - `/team-builder`
  - `/buffs-debuffs`
  - `/classes`
  - `/companions`
  - `/mounts`
  - `/artifacts`
  - `/dungeons`
  - `/trials`
  - `/events`
  - `/patch-tracker`
  - `/endgame-guide`
  - `/glossary`

## Phase 2 - Typed data layer

- Define strongly typed entities for:
  - team members
  - classes
  - powers
  - buffs
  - debuffs
  - companions
  - companion enhancements
  - companion bonus powers
  - mounts
  - mount combat powers
  - mount equip powers
  - insignia bonuses
  - artifacts
  - patch changes
  - boss presets
  - verification/source metadata
- Every meaningful entity stores:
  - `id`
  - `name`
  - `source_url`
  - `source_type`
  - `source_version`
  - `verification_status`
  - `notes`

## Phase 3 - Team Builder foundation

- Dungeon mode: 5 members.
- Trial mode: 10 members in Group A and Group B.
- One member can be the carry DPS.
- Center layout:
  - roster cards
  - selected member editor
  - trial group split
- Right sidebar:
  - Boss Debuff Summary
  - Team Buff Summary
  - Carry DPS State
  - Final Mount Hit Calculator
  - Missing Effects
  - Duplicate Effects

## Phase 4 - Effect engine

- Separate:
  - boss debuffs
  - typed vulnerability
  - team buffs
  - self-only buffs
  - carry-only effects
  - owner-only effects
- Handle:
  - stack rules
  - strongest-only rules
  - refresh rules
  - unresolved values
- Initial tracked categories:
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

## Phase 5 - Knowledge hub pages

- Seed useful content instead of blank placeholders:
  - best support companions
  - best ST companions
  - best debuff artifacts
  - best support mounts
  - enhancement overview
  - current module timeline
  - patch-aware notes
  - 2026 endgame priorities

## Phase 6 - Data ingestion

- Support future imports from:
  - Aragon sheets
  - patch archives
  - wiki references
  - NW Hub structural pages
- Preserve raw source URLs and verification status on import.

## Shared layouts and patterns

- Root shell:
  - left nav
  - top bar
  - optional right summary rail
- Reusable patterns:
  - card
  - stat card
  - chip/badge
  - source badge
  - empty state
  - loading state
  - list/grid toggle
  - selector fields

## Initial unresolved data areas

- Exact live values for several enhancement debuffs.
- Exact live values for some support artifacts and support mounts.
- Full gid-to-tab mapping for every user-provided sheet tab.
- Boss-specific presets beyond the formula defaults.
- Verified mount base-hit values for the final mount-hit estimator.

## Future ingestion points

- Google Sheet export scripts for tab snapshots.
- Patch-note diff ingestion for new official updates.
- Boss preset enrichment once live values are verified.
- Asset/image ingestion for class, companion, mount, and artifact artwork.
