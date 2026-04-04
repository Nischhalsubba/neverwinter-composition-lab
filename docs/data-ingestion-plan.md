# Data Ingestion Plan

## Principles

- Never invent Neverwinter values.
- Preserve unresolved entries instead of deleting them.
- Keep the data model patch-aware and source-aware.
- Separate verified, partially recovered, inferred, and pending live checks.

## Source priority

1. Official patch and announcement sources
2. Structured wiki references
3. User-provided sheets and connected build docs
4. NW Hub as structure and later verification target

## Initial local seed files

- `data/game-data.ts`
  - module timeline
  - patch registry
  - artifact ranking seed
  - ST companion rankings
  - support companion seeds
  - support enhancement seeds
  - support mount seeds
  - boss debuff categories
  - team buff categories

## Ingestion stages

### Stage 1

- Hand-curated typed seeds from the source docs.
- Use for the first app foundation and Team Builder.

### Stage 2

- Add sheet snapshot importers:
  - Aragon workbook tab exports
  - damage formula sheet defaults
- Store:
  - import date
  - raw source URL
  - workbook tab
  - module/version tag

### Stage 3

- Add patch-note ingestion:
  - official archive pages
  - Steam official announcement entries
- Transform into structured patch change records.

### Stage 4

- Add boss preset ingestion and validation.
- Add image manifest ingestion.

## Required fields per imported value

- `id`
- `name`
- `source_url`
- `source_type`
- `source_version`
- `verification_status`
- `notes`

## Conflict policy

- New imports never silently overwrite older values.
- If a newer value arrives:
  - keep old record for history
  - tag older record as superseded later if needed
  - record patch/version source

## Mount-hit calculator note

- Current seeds do not include enough verified base-hit data for every damage mount.
- The calculator therefore supports a local base-hit override until exact live values are ingested.

## QA checks

- Validate required source fields exist.
- Validate `verification_status` is present.
- Reject records with missing `id` or `name`.
- Flag unresolved numeric values as `null`, not `0`.
