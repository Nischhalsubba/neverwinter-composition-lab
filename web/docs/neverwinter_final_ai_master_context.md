# Neverwinter Endgame Hub - Final AI-Ready Master Context

## 0. What this file is

This file is the **master context document** for an AI coding/design agent building a modern Neverwinter endgame platform.

It combines:
- product scope
- content architecture
- site structure ideas
- Neverwinter system knowledge
- patch-note impact summaries
- NW Hub-derived usable sections
- Aragon workbook and build-doc seed data
- artifact / companion / mount / support data discovered during research
- calculator requirements
- team builder requirements
- implementation rules
- verification notes

This file is intended to be the **first thing an AI agent reads** before generating code, UI, content models, or data schemas.



## 1. Truthfulness and reliability policy

This file contains three kinds of information:

### A. Verified
Information directly recovered from readable source material in this research process.

### B. Partially recovered
Information where the workbook, site, or patch-note page could be opened only partially in this environment, but enough context was available to recover the important structure or values.

### C. Reconstructed / inferred
Information pieced together from:
- repeated patterns in build docs
- visible sheet tab names
- public artifact / companion / mount pages
- patch summaries
- connected source snippets
- the product requirements given in this conversation

The AI agent must **not silently treat inferred data as guaranteed live truth**.
The app should support:
- source labels
- version labels
- verification labels
- future overrides



## 2. Product identity

**Recommended repository name:** `neverwinter-endgame-hub`

Good alternatives:
- `neverwinter-composition-lab`
- `nw-endgame-intel`
- `neverwinter-trial-builder`
- `nw-carry-planner`
- `neverwinter-boss-math`

**Project type:** fan-made, data-heavy web app for Neverwinter endgame players

**Core idea:** build a more modern, more visual, more transparent, more patch-aware alternative to NW Hub for:
- 5-player dungeon planning
- 10-player trial planning
- team composition
- buff/debuff calculation
- boss-state inspection
- carry-DPS optimization
- mount-hit simulation
- endgame knowledge browsing



## 3. Main product goals

The product should help users answer these questions instantly:

1. What does each member bring to the team?
2. What buffs are active on the team?
3. What debuffs are active on the boss?
4. Which effects are duplicated or missing?
5. Which player is the carry DPS?
6. What is the final damage state of the carry?
7. What is the estimated final hit of a selected damage mount?
8. Which companions, mounts, artifacts, and support effects matter most in current endgame?
9. What changed across patches and modules?
10. What should an endgame player use in 2026, and why?

This is not just a calculator.
It is a hybrid of:
- knowledge hub
- build explorer
- team builder
- patch tracker
- endgame encyclopedia
- support package planner



## 4. Non-negotiable app rules

### Team size
- Dungeon mode = 5 members
- Trial mode = 10 members
- Trial mode must visually display **two groups of 5**

### Each member must be fully configurable
Every member can have:
- label / player slot name
- class
- paragon / path
- race
- role
- encounter powers
- daily powers
- class features / passives
- artifact
- companion
- companion enhancement
- companion equip / bonus power
- mount combat power
- mount equip power
- insignia bonuses
- notes
- optional personal buff overrides
- carry DPS flag

### One member may be marked as carry
The app must support:
- team-wide buffs
- self-only buffs
- one-ally buffs
- nearest-ally effects
- boss debuffs
- typed vulnerability
- personal burst effects
- owner-only mount damage logic

### Boss summary must exist
The app must show:
- total boss debuff summary
- full boss-state breakdown
- sources for each effect
- duplicate / overwrite warnings

### Final mount hit output must exist
The app must let the user pick:
- mount owner
- selected damage mount
- target boss preset
- crit / CA assumptions if needed

Then output:
- base hit
- after owner scaling
- after personal buffs
- after team buffs
- after boss debuffs
- final estimated hit



## 5. Source registry

## 5.1 NW Hub - known usable sections discovered during research

These are the NW Hub sections explicitly surfaced during the conversation:

### Main site
- https://nw-hub.com/

### Classes
- https://nw-hub.com/classes

### Companion pages
- https://nw-hub.com/companions/powers
- https://nw-hub.com/companions/enhancements
- https://nw-hub.com/companions/list

### Build pages / API surfaced via search
Observed route pattern:
- `https://api.nw-hub.com/rainer/builds/<id>/pdf?type=file`

Those API/PDF routes surfaced through web search results and appear to back at least some NW Hub/Rainer build exports.

### Important limitation
The NW Hub pages are heavily JS-rendered.
In this environment, some pages were not readable in a full lossless way, especially hover-only tooltip content.
Therefore:
- structure is usable
- many categories are known
- some values were verified through alternate sources
- but not every hover tooltip on NW Hub itself was directly extracted line-by-line here

The AI agent should treat NW Hub as:
- a model for product structure
- a data inspiration source
- a candidate future ingestion target
- not the only source of truth



## 5.2 Aragon workbook links provided in conversation

Primary workbook:
- https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit

Requested tabs:
1. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265#gid=999278265
2. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1245615469#gid=1245615469
3. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1200006036#gid=1200006036
4. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=2133630453#gid=2133630453
5. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=839734160#gid=839734160
6. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1781041228#gid=1781041228
7. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=471288844#gid=471288844
8. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=49155600#gid=49155600
9. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=401177450#gid=401177450
10. https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1260281279#gid=1260281279

### Workbook title observed
**Aragon's Companion, Mount, Artifact Document - Neverwinter**

### Workbook update date observed
**10-March-2026**

### Visible workbook tabs observed
1. ST Damage Companions
2. Support Comps
3. Support Artifacts
4. Support Mounts
5. Support Enhancements
6. Comp Equip Bonuses
7. M30 - ST Damage Comps
8. AoE Damage Comps
9. Healing Comps
10. Augment Comps

### Important limitation
The exact gid-to-tab mapping was not fully recoverable for every tab in the non-JS sheet view available here.
Only the first ST tab was fully readable directly.



## 5.3 Other source types used during research

- official Arc/PlayNeverwinter patch archives
- official module timelines
- Steam/official announcement pages for recent modules
- Neverwinter Wiki / Fandom pages for:
  - modules
  - artifacts
  - mounts
  - companions
  - enhancements
  - bonus powers
  - patch-note mirrors / historical references
- connected build docs and notes around Aragon builds
- connected 4-slot mounts sheet references



## 6. Product modules

The app should be built around these modules:

1. Home / Dashboard
2. Team Builder
3. Buff & Debuff Explorer
4. Class Library
5. Powers Library
6. Companion Library
7. Mount Library
8. Artifact Library
9. Enchantments & Insignias
10. Dungeons
11. Trials
12. Events
13. Patch Tracker
14. Endgame Guide
15. Boss Presets
16. Carry DPS Optimization
17. Mount Hit Calculator
18. Glossary
19. Data QA / Verification



## 7. Design principles

### Recognition over recall
Prefer image-first and icon-first browsing.

### Explain before expanding
Show summaries first, deep detail on click.

### Dense data, clean UI
Large information volume is allowed, but the UI must feel premium and calm.

### Always show contribution
Each member card should answer:
**"What does this member bring to the team?"**

### Separate UI layer from math layer
The visual layer should feel simple.
The effect engine underneath should be explicit and structured.

### Trust is part of design
Everything important should be inspectable:
- effect source
- stack rule
- scope
- duration
- owner
- patch history
- verification status



## 8. Visual direction

### Overall
- premium dark mode
- game-adjacent
- fantasy-tech feel
- elegant panels
- high readability
- image-rich but not cluttered
- modern, not spreadsheet-like

### Semantic color logic
- green = team buff
- red = boss debuff
- purple = companion / enhancement
- orange = mount / insignia
- gold = artifact / special power
- blue = utility / system info
- teal = verified / selected
- gray = inactive / missing

### Typography
- primary font: Inter
- fallback: system-ui, sans-serif
- optional fantasy accent for tiny headings only, if desired
- always prioritize readability

### Spacing
Recommended scale:
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

### Radius
- chips: 10-14
- cards: 16-24
- panels: 20-28



## 9. Main layout structure

### Desktop app shell
- left sidebar = library / roster browsing
- center = team builder + member config
- right sidebar = summaries + calculator output

### Desktop widths
- left: 280-340px
- center: fluid
- right: 340-420px

### Trial mode
Display:
- Group A (5)
- Group B (5)

### Dungeon mode
Display:
- one group of 5



## 10. Team Builder requirements

## 10.1 Top bar
Include:
- logo
- mode toggle: Dungeon / Trial
- boss preset selector
- carry DPS selector
- save
- load
- share
- compare
- reset

## 10.2 Left panel
Tabs:
- Roster
- Classes
- Companions
- Artifacts
- Mounts
- Powers
- Effects

## 10.3 Center panel
Show:
- team layout
- selected member editor
- group split for trials

## 10.4 Right panel
Show:
- Boss Debuff Summary
- Team Buff Summary
- Carry DPS State
- Final Mount Hit calculator
- Missing Effects
- Duplicate / overwrite warnings
- Coverage summary



## 11. Member card spec

Each member card should show:

### Header
- slot number
- class portrait / icon
- race icon
- player label
- role badge
- carry badge if selected

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
- Combat Advantage support
- Boss Only
- Physical Only
- Non-stacking

### Warnings
Examples:
- missing artifact
- no mount selected
- duplicate non-stacking debuff
- typed support mismatch
- no boss-debuff contribution



## 12. Member configuration panel

Each selected member needs tabs:

### Identity
- label
- class
- paragon/path
- race
- role
- carry toggle

### Powers
- encounter 1
- encounter 2
- encounter 3
- daily 1
- daily 2
- feature 1
- feature 2

### Artifact
- selected artifact
- optional set notes
- usage timing note

### Companion
- companion
- enhancement
- equip/bonus power
- ST/AoE/support preview

### Mount
- combat power
- equip power
- insignia bonus 1
- insignia bonus 2
- insignia bonus 3

### Personal Buffs
- personal damage bonus
- personal power bonus
- personal crit strike
- personal crit severity
- personal CA
- personal accuracy
- personal forte
- special toggles

### Notes
- assumptions
- rotation note
- uptime note
- comment



## 13. Buff / debuff engine requirements

Never store only one flat "total debuff" internally.

Keep separate buckets:

### Universal boss modifiers
- incoming damage
- defense reduction
- awareness reduction
- crit avoidance reduction
- deflect reduction
- deflect severity reduction
- outgoing damage reduction

### Typed vulnerability
- physical
- magical
- projectile
- melee
- ranged

### Player-side offensive buffs
- damage bonus
- power
- crit strike
- crit severity
- combat advantage
- accuracy
- forte
- recharge
- AP gain

### Scope flags
- self only
- team-wide
- one ally
- nearest ally
- owner only
- target only
- boss only
- adds only
- arena only
- event only

### Logic flags
- non-stacking
- strongest applies
- refreshes duration
- duration based
- range-based
- requires summon proximity
- requires control effect
- requires stealth
- requires mastery



## 14. Boss summary panel

Must include:

### Boss Debuff Summary
- incoming damage
- physical vulnerability
- magical vulnerability
- projectile vulnerability
- defense reduction
- awareness reduction
- crit avoidance reduction
- deflect reduction

Each line should show:
- final value
- sources
- stack rule
- overwrite warning if relevant

### Team Buff Summary
- damage bonus
- power
- crit strike
- crit severity
- combat advantage
- accuracy
- forte

### Missing Effects
Examples:
- no awareness debuff
- no crit avoidance debuff
- no universal incoming damage
- no projectile support
- no magical vulnerability

### Duplicate Effects
Examples:
- duplicate non-stacking debuff
- weaker source overwritten
- typed overlap



## 15. Carry DPS panel

Must include:
- selected carry member
- effective final offensive state
- team buffs affecting carry
- personal buffs affecting carry
- typed support coverage
- boss-state impact
- final multiplier preview

Output fields:
- effective power
- effective crit strike
- effective crit severity
- effective CA
- effective accuracy
- effective forte
- outgoing damage bonus
- enemy final defense
- enemy final awareness
- enemy final crit avoidance
- enemy final deflect



## 16. Mount hit calculator

### Inputs
- mount owner
- selected damage mount
- target boss
- crit assumption
- CA assumption
- include personal buffs
- include team buffs
- include boss debuffs

### Outputs
- base hit
- after owner scaling
- after personal buffs
- after team buffs
- after boss debuffs
- final estimated hit

### Expandable breakdown
Every stage should be visible.



## 17. Damage formula seed

A separate Neverwinter damage formula workbook surfaced in the conversation.

### Workbook title
**Damage Formula Neverwinter PVE M32**

### Formula observed
`(Magnitude/100) x ((Item Level x 0.12)+extraDamage) x DamageBuffs x (1+Power) x (1+(Combat Adv-targetsAwareness) x (1+targetsDeflectChance x (1/(1+(targetsDeflectSev-Accuracy)-1))) x (1+(Crit Strike x (Crit Sev-targetsCritAvoid))) x (1+Str or Int) x debuffs x (1/(1+targetsDefense)) x other unique stuff)`

### Inputs observed in that workbook
- Item Level
- Base Damage
- Power
- Accuracy
- Combat Advantage
- Critical Strike
- Critical Severity
- Physical/Magic Boost
- Combat Enchant
- Damage Buffs
- Damage Debuffs
- Multiplicative Damage
- Overall Damage Source
- Power Magnitude
- Enemy Defense
- Enemy Deflect
- Enemy Deflect Severity
- Enemy Awareness
- Enemy Critical Avoidance

### Enemy defaults observed
- Defense = 50%
- Deflect = 50%
- Deflect Severity = 90%
- Awareness = 0%
- Critical Avoidance = 0%

### Implication for the app
The app should separately track:
- player-side buffs
- typed support
- boss-side debuffs
- mitigation stats
- carry-specific amplification
- mount owner state



## 18. Module timeline seed

Recent module chain relevant to live-era endgame:

- Module 30 - As Above, So Below: Return to Pirates' Skyhold
- Module 31 - Red Harvest
- Module 32 - Red Harvest Part II: The Soul Collector
- Module 32.5 - Tempus Arena - The Slaughterhouse

Older important eras to include in the app:
- Fury of the Feywild
- Shadowmantle
- Underdark
- Infernal Descent
- Avernus
- Sharandar
- Jewel of the North
- Dragonbone Vale
- Dragonslayer
- Northdark Reaches
- Menzoberranzan
- Demonweb Pits
- Spelljammer
- Adventures in Wildspace
- Mountain of Flame

### Use in app
Build:
- Module Timeline page
- patch-to-module mapping
- old-vs-new ranking views
- "what changed since module X" support later



## 19. Patch-note impact digest

This section is not every line of every patch note.
It focuses on endgame-relevant, app-relevant changes discovered during research.

## 19.1 Global buff-stack rule
Long-term buffs were grouped into categories.
Only one buff from each category can be active.
This affects:
- potions
- elixirs
- invocation
- stronghold food
- event food
- event item
- trinket

### App implication
Never allow stacking of multiple long-term buffs from the same category.



## 19.2 Early debuff logic changes
Older patch notes showed that powers such as **Ray of Enfeeblement** had debuff behavior reduced and stacking behavior corrected.
Multiple Wizards could no longer apply separate overlapping versions in the old exploit pattern.

### App implication
Do not assume historical debuffs stacked the way players may remember from very old eras.



## 19.3 2019-2020 class change highlights
Examples surfaced during research:
- Warlock Curse buffed to stronger damage amplification in that era
- Barbarian Battlerage increased to 20% personal damage in 2020
- multiple Ranger feats moved to meaningful 5-10% damage layers
- Wizard / Warlock / Cleric feats and set bonuses were normalized or capped in places

### App implication
Any historical or legacy builds section should be version-tagged.
Do not mix old-era values into live-era recommendations.



## 19.4 2023 companion shield standardization
A readable 15 June 2023 patch note established standardized rules for companion shields:
- companion shields stack with player shields
- companion shields do not stack with themselves or other companion shields
- multi-target companion shields roughly baseline at 5% max HP
- single-target summoner shields roughly baseline at 10% max HP
- weaker companion shield should not overwrite a stronger one

### App implication
If the app covers healing / survivability support, companion shield rules need explicit non-stacking logic.



## 19.5 2024 support companion overhaul
Recent official notes reported that many support companions became:
- more consistent
- effectively 100% uptime in many cases
- wider radius
- more reliably reapplying
- often affecting all allies unless otherwise noted

### App implication
Support companions should not be modeled like low-uptime random fluff.
They need proper sustained-support handling.



## 19.6 2024 class support changes
Recent patch notes surfaced:
- Bard buff duration / targeting / range improvements
- Rogue CA support changes on control-immune targets
- Barbarian split between self buff and target debuff
- Fighter self/carry value changes
- Enchanter's Hex trigger, magnitude, and non-stacking rules

### App implication
Patch-aware class entries are required.
Do not store only static text with no patch history.



## 19.7 2024-2026 mount / companion / queue evolution
Recent notes surfaced:
- upgrade screens showing affected powers
- support companion role changes
- queue inspection improvements
- Celestial mount and insignia systems
- Tempus Arena special buff systems
- Cleric balance updates
- event-only exclusions for certain gear in arena/PVP contexts

### App implication
The app should support:
- version-aware values
- quality-aware values
- event-specific modifiers
- modern queue-inspect style content presentation



## 20. NW Hub - known useful data categories for the app

Based on the sections surfaced in research, the AI should treat NW Hub as inspiration for these categories:

### Classes
- class pages
- likely powers / features / loadout sections
- class comparisons

### Companions
- powers
- enhancements
- list pages
- searchable companion database

### Builds
- Rainer build exports / PDFs
- build examples
- loadout snapshots
- mount/companion/insignia/equipment packages

### Likely future ingestion candidates
If later scraping/ingestion is added, target:
- class data
- companion powers
- companion enhancements
- list metadata
- build exports
- mount powers
- artifacts
- dungeons/trials if present
- patch or changelog references if present

### Important warning
Do not design the app to depend on NW Hub availability.
Use your own structured data model.



## 21. Aragon workbook - fully verified and partially recovered content

## 21.1 ST Damage Companions - verified

### Sheet description
- Single Target Damage Companions Tested and Ranked on PC
- Boss Dummy in the Training Room
- With combat advantage
- Same stats
- Celestial Companion Enhancement
- x3 Warlord's Motivation
- Module 32
- open to change

### Verified ST ranking
| Rank | Companion | Archetype | Max Hit | ST DPS |
|---|---|---:|---:|---:|
| 1 | Sardina the Tressym | Mixed | 1,127,890 | 179,561 |
| 2 | Blaspheme Assassin | Single Target (support) | 524,096 | 164,299 |
| 3 | Lysaera | Mixed (support) | 696,057 | 160,581 |
| 4 | Rattigan the Wise | Single Target (support) | 1,922,540 | 157,526 |
| 5 | Wiggins the Undead Intern | Single Target | 274,996 | 153,472 |
| 6 | Mage Slayer | Single Target | 410,203 | 147,796 |
| 7 | Flame Sprite | Single Target | 717,431 | 147,365 |
| 8 | Xuna | Single Target | 258,314 | 147,210 |
| 9 | Etrien | Single Target (support) | 412,527 | 140,542 |
| 10 | Aoth Fezim & Brightwing | Single Target (support) | 1,225,690 | 138,914 |
| 11 | Shadow Elemental | Single Target (support) | 1,005,580 | 138,369 |
| 12 | Tutor | Single Target (support) | 340,432 | 130,617 |
| 13 | Flapjack | Multi-target (support) | 775,757 | 110,291 |
| 14 | Spined Devil | Mixed (support) | 533,333 | 97,036 |
| 15 | Bruenor Battlehammer | Mixed (support) | 911,934 | 93,517 |
| 16 | Blue Fire Eye | Mixed | 235,564 | 90,373 |
| 17 | Twitchspine the Clinging | Multi-target | 386,263 | 67,274 |
| 18 | Portobello DaVinci | Mixed (support) | 345,825 | 57,399 |
| 19 | Harper Bard | Single Target (support) | 377,104 | 53,944 |
| 20 | Crimson Crystal Golem | Multi-target (support) | 424,934 | 52,360 |
| 21 | Stalwart Golden Lion | Mixed (support) | 341,586 | 48,707 |
| 22 | Drizzt Do'Urden | Multi-target (support) | 69,128 | 48,642 |
| 23 | Minsc | Mixed (support) | 608,669 | 48,549 |
| 24 | Riotous Rothe | Multi-target (support) | 366,903 | 42,054 |
| 25 | Cantankerous Mage | Multi-target | 358,678 | 37,249 |
| 26 | Black Death Scorpion | Single Target (support) | broken in training room atm | n/a |

### Verified alphabetical ST reference values
- Aoth Fezim & Brightwing - 138,914
- Blaspheme Assassin - 164,299
- Blue Fire Eye - 90,373
- Bruenor Battlehammer - 93,517
- Cantankerous Mage - 37,249
- Crimson Crystal Golem - 52,360
- Drizzt Do'Urden - 48,642
- Etrien - 140,542
- Flame Sprite - 147,365
- Flapjack - 110,291
- Harper Bard - 53,944
- Lysaera - 160,581
- Mage Slayer - 147,796
- Minsc - 48,549
- Portobello DaVinci - 57,399
- Rattigan the Wise - 157,526
- Riotous Rothe - 42,054
- Shadow Elemental - 138,369
- Spined Devil - 97,036
- Stalwart Golden Lion - 48,707
- Tutor - 130,617
- Wiggins the Undead Intern - 153,472
- Xuna - 147,210

### Use in app
This should power:
- ST companion rankings
- card lists
- "best ST" pages
- compare views
- recommendation panels



## 21.2 Support Comps - partially recovered / reconstructed

The exact cells were not fully recoverable here, but the connected build docs repeatedly surfaced these support companions:

- Spined Devil - often treated as a strong single-enemy debuff support swap
- Tutor - 5% Combat Advantage for everyone
- Drizzt Do'Urden - 3% multiplicative damage for everyone
- Black Death Scorpion - older support contexts mention "permanent CA"
- Portobello DaVinci - 3.5% Power and CA for everyone
- Flapjack - support optimization
- Shadow Elemental - ST support hybrid
- Bruenor Battlehammer - mixed/support
- Stalwart Golden Lion - mixed/support
- Harper Bard - support/ST hybrid
- Etrien - support/ST hybrid
- Aoth Fezim & Brightwing - support/ST hybrid
- Rattigan the Wise - support/ST hybrid

### Why these matter
They contribute:
- party buffs
- boss debuffs
- multiplicative support
- CA support
- raid utility beyond raw summon DPS



## 21.3 Support Artifacts - partially recovered, heavily cross-seeded

The workbook tab was not fully readable, so the artifact section below uses the current artifact ranking and tooltip references discovered during research.

### Debuff artifacts ranking seed
1. Mythallar Fragment
2. Halaster's Blast Scepter
3. Wyvern-Venom Coated Knives
4. Dragonbone Blades
5. Demogorgon's Reach
6. Tentacle Rod
7. Black Dragon's Mark
8. Charm of the Serpent
9. Heart of the Black Dragon
10. Lantern of Revelation
11. Assassin's Dice
12. Frozen Storyteller's Journal
13. Jewel of the North
14. Thirst
15. Token of Chromatic Storm
16. Book of Vile Darkness
17. Neverwinter's Standard
18. Sparkling Fey Emblem
19. Vanguard's Banner
20. Erratic Drift Globe
21. Sigil of the Nine

### Verified high-value debuff artifacts
- Mythallar Fragment - target damage resistance reduction
- Halaster's Blast Scepter - target damage resistance reduction up to 15%
- Wyvern-Venom Coated Knives - increased damage taken plus reduced outgoing damage
- Charm of the Serpent - up to 16% increased damage taken
- Lantern of Revelation - up to 10% increased damage taken

### Important artifact categories
#### True debuff artifacts
Affect the boss / target for the team.

#### Personal burst artifacts
Primarily amplify one player's output.
Examples:
- Soul Sight Crystal
- Lliira's Bell of Empowerment
- Sigil of the Barbarian

#### Long-duration buff / utility artifacts
Reusable, often not true boss debuffs.



## 21.4 Support Mounts - partially recovered

The tab itself was not fully readable, but support mount examples surfaced repeatedly:

- Red Dragon - caster gets +15% damage, Crit Strike and Accuracy; target gets -15% damage and Crit Avoidance for 10s
- Uni the Unicorn - strike + party +5% Combat Advantage for 10s
- Neverwinter's Hand - shield + damage-taken reduction + +5% CA for party
- Ebon Riding Lizard - party CA / Def support, stacking at reduced value
- Golden Armored Griffon - AoE damage debuff plus Forte/Crit Avoid/Awareness boost
- Zodar Armor - +15% damage package
- Slab of Vecna - strong personal damage boost on caster
- Balgora - target takes more damage for 10s
- Beastial Fire Archon - damage-taken increase in the area
- Space Guppy School - valued AoE / utility option

### Mount-related app sections required
- mount combat power database
- mount equip power database
- insignia bonus database
- 4-slot mount lookup
- support mount ranking
- damage-mount calculator integration



## 21.5 Support Enhancements - partially recovered

Core support enhancements repeatedly surfaced:

- Armor Break
- Dulled Senses
- Vulnerability
- Slowed Reactions
- Potency
- Potent Precision
- Precision
- Acute Senses
- Perfect Vision
- Master of Craft

### Priority support debuff enhancements
- Armor Break - enemy defense reduction
- Dulled Senses - enemy awareness reduction
- Vulnerability - enemy critical avoidance reduction
- Slowed Reactions - enemy deflect reduction

These are highly relevant to:
- boss debuff summary
- support package selection
- carry DPS optimization
- final mount hit output



## 21.6 Comp Equip Bonuses - partially recovered

Common high-value companion bonus packages surfaced repeatedly:

### ST core
- Batiri
- Minsc
- Neverwinter Knight
- Golden Cat
- Staldorf
- Dark Dealer / Book Imp
- Alpha Compy / Deep Crow Hatchling
- Tamed Velociraptor

### Multi-target swaps
- Spined Devil
- Phase Spider
- Minotaur-related swap in some docs

### Support-driven swaps
- Drizzt
- Tutor
- Portobello DaVinci
- Flapjack
- support enhancement-driven swaps



## 21.7 M30 - ST Damage Comps
This should be treated as:
- historical reference
- previous-module comparison
- "meta changed over time" material

Do not use it as the default live ranking without version badges.



## 21.8 AoE Damage Comps - partial seed
Likely useful AoE or multi-target companions from connected references:
- Flapjack
- Minotaur companion
- Crimson Crystal Golem
- Riotous Rothe
- Drizzt in some multi-target/support situations
- Twitchspine the Clinging
- Cantankerous Mage



## 21.9 Healing Comps - partial seed
Expected categories:
- healer companions
- shield companions
- incoming healing support
- outgoing healing support
- utility heal companions

Not fully recovered cell-by-cell.



## 21.10 Augment Comps - partial seed
Expected categories:
- augment stat packages
- passive stat support
- summon vs augment distinction
- utility-only companions

Not fully recovered cell-by-cell.



## 22. Connected build-doc seed data

These are important because the workbook alone does not explain how players actually use the systems.

## 22.1 Ranger build seed
Observed recurring ST companion bonus core:
- Staldorf
- Batiri
- Minsc
- Neverwinter Knight
- Golden Cat

Common multi-target swaps:
- Batiri -> Spined Devil
- Minsc -> Phase Spider or Minotaur-related swap

Common support/group optimization notes:
- Pack Tactics
- Mystic Aura / Runic Aura
- Portobello
- Flapjack
- Tutor
- Alpha Compy
- Baby Deep Crow

Common ST mount combat powers:
- Bigby's Hand (physical)
- Legendary Giant Toad (magical)
- Golden Warhorse (magical)
- Tunnel Vision (magical)

Common AoE mount powers:
- Space Guppy School
- Pegasus



## 22.2 Rogue build seed
Observed ST companion bonuses:
- Minsc
- Batiri
- Neverwinter Knight
- Tamed Raptor
- Wolf (conditional note)

Multi-target swaps:
- Batiri -> Spined Devil
- Phase Spider possible

Artifacts observed in one rogue build set:
- Nightflame Censer
- Assassin's Knife
- Broken Halo
- Arma-Egg-On



## 22.3 Wizard build seed
Observed ST companion bonuses:
- Neverwinter Knight
- Alpha Compy / Deep Crow Hatchling
- Minsc
- Batiri
- Dark Dealer / Book Imp
- later variants: Drizzt / Hawk / Lightfoot Thief / Sordiel

Observed support optimization notes:
- Pack Tactics
- Mystic Aura
- Tutor
- Portobello
- Tamed Velociraptor
- support enhancement swaps such as Armor Break / Vulnerability / Dulled Senses

Observed ST mount powers:
- Slab of Vecna (physical)
- Legendary Giant Toad (magical)
- Golden Warhorse (magical)
- Tunnel Vision (magical)
- Bigby's Hand (physical)

Observed AoE mount powers:
- Space Guppy School
- Legendary Flying Carpet
- Explosive Equalizer



## 22.4 Paladin support seed
Artifacts observed:
- Mythallar Fragment
- Scintillating Symbol of Water
- Champion's Banner
- Tiamat's Arcane Globe

This is useful because support/tank pages surface artifacts that pure DPS sheets may not.



## 23. 4-slot mount / insignia seed

The separate 4-slot mount document surfaced these useful support/debuff examples:

### Mount examples
- Balgora - target takes more damage
- Beastial Fire Archon - AoE damage-taken increase
- Ebon Riding Lizard - CA / defense style support
- Golden Armored Griffon - AoE debuff package
- Red Dragon - caster buff + target outgoing damage / crit avoidance debuff
- Uni the Unicorn - +5% party CA
- Neverwinter's Hand - shield + -damage taken + CA support
- Zodar Armor - +15% damage package
- Slab of Vecna - +15% caster damage package
- Space Guppy School - AoE utility

### Insignia bonuses surfaced
- Warlord's Inspiration
- Shepherd's Devotion
- Gladiator's Guile
- Protector's Camaraderie
- Magistrate's Patience
- Combatant's Maneuver
- Wanderer's Fortune
- Traveler's Treasures
- Victim's Preservation



## 24. Artifact section - app-ready categories

## 24.1 Debuff artifacts
Use the ranked list above as the initial order.

## 24.2 Personal burst artifacts
Examples:
- Soul Sight Crystal
- Lliira's Bell of Empowerment
- Sigil of the Barbarian

## 24.3 Long-duration utility / reusable buff artifacts
Examples:
- Forger's Box line

## 24.4 Artifact fields for the app
- artifact_name
- image
- category
- team_or_personal
- exact_value
- duration_sec
- cooldown_sec
- effect_type
- debuff_or_buff
- rank_order
- patch_changed
- verification_status
- notes



## 25. Endgame Guide - content map

This should be a dedicated user-facing section.

## 25.1 What to use in 2026
- best support companions
- best ST companions
- best AoE companions
- best debuff artifacts
- best personal burst artifacts
- best support mounts
- best damage mounts
- best insignia bonuses
- best enhancement choices
- best support packages
- best consumable packages

## 25.2 How to progress
- what to upgrade first
- best-value upgrades
- mythic vs celestial priorities
- mount priority
- companion priority
- artifact priority
- enchantment priority

## 25.3 Best content to farm
- trials
- dungeons
- events
- currencies
- upgrade materials

## 25.4 Build planning
- best 5-man shells
- best 10-man shells
- best carry support packages
- common overlap traps
- common missing debuffs
- common typed-support mismatches



## 26. Dungeons and trials content model

Every dungeon and trial page should include:

### Header
- name
- image
- module
- type
- size
- entry requirement
- current relevance

### Mechanics
- bosses
- dangerous debuffs
- cleanse requirements
- immunity rules
- split phases
- support recommendations

### Team recommendations
- useful buffs
- useful debuffs
- useful artifacts
- useful mounts
- useful companions
- carry notes

### Rewards
- gear
- upgrade mats
- currencies
- collectibles

### Patch impact
- mechanic fixes
- reward changes
- scaling changes
- HP changes
- queue changes



## 27. Data model seed

## 27.1 Team member entity
```json
{
  "member_id": "",
  "group": "A",
  "slot": 1,
  "label": "",
  "class": "",
  "paragon": "",
  "race": "",
  "role": "",
  "is_carry": false,
  "encounters": [],
  "dailies": [],
  "features": [],
  "artifact": "",
  "companion": "",
  "companion_enhancement": "",
  "companion_bonus": "",
  "mount_combat_power": "",
  "mount_equip_power": "",
  "insignia_bonuses": [],
  "personal_overrides": {}
}
```

## 27.2 Buff/debuff entity
```json
{
  "effect_id": "",
  "name": "",
  "source_type": "class|artifact|companion|mount|consumable|boss|event",
  "source_name": "",
  "effect_category": "boss_debuff|team_buff|personal_buff|utility",
  "applies_to": "all_damage|physical|magical|projectile|power|crit_sev|combat_adv|defense|awareness|crit_avoid|deflect",
  "value": 0,
  "duration_sec": null,
  "stack_rule": "stacks|does_not_stack|strongest_only|refreshes|unknown",
  "scope": "self|ally|party|boss|targeted_ally",
  "notes": "",
  "source_version": "",
  "verification_status": "verified|partial|inferred|needs_check"
}
```

## 27.3 Companion entity
```json
{
  "name": "",
  "role_tag": "st|aoe|support|healing|augment",
  "archetype": "",
  "st_dps": null,
  "max_hit": null,
  "enhancement": "",
  "equip_bonus": "",
  "notes": "",
  "version": "module_32_5"
}
```

## 27.4 Artifact entity
```json
{
  "name": "",
  "category": "debuff|personal_burst|utility|support",
  "exact_value": "",
  "duration_sec": null,
  "cooldown_sec": null,
  "rank_order": null,
  "team_or_personal": "",
  "notes": ""
}
```

## 27.5 Mount combat power entity
```json
{
  "mount_name": "",
  "combat_power_name": "",
  "damage_type": "physical|magical|mixed|utility",
  "base_magnitude": null,
  "secondary_effects": [],
  "can_crit": true,
  "can_gain_ca": true,
  "affected_by_team_buffs": true,
  "affected_by_boss_debuffs": true
}
```

## 27.6 Patch change entity
```json
{
  "change_id": "",
  "date": "",
  "patch_title": "",
  "version": "",
  "category": "",
  "affected_entity": "",
  "before": "",
  "after": "",
  "importance": "low|medium|high|critical",
  "verified": false,
  "notes": ""
}
```



## 28. Search/filtering rules

Every major library should support:
- free-text search
- role filters
- source filters
- effect filters
- typed support filters
- boss-only filter
- team-wide filter
- self-only filter
- ST / AoE / support filter
- verified-only filter
- latest changed filter

Search must feel fast and forgiving.



## 29. Image and asset rules

Use images for:
- class icons
- race icons
- encounter powers
- daily powers
- artifacts
- companions
- mounts
- dungeon/trial cover images
- effect badges

### Asset rules
- the layout must survive missing images
- use consistent crops
- no distorted art
- provide hover or click preview where helpful
- do not depend on exact art availability



## 30. Accessibility rules

- sufficient contrast on dark backgrounds
- semantic headings
- keyboard navigation for selectors
- visible focus states
- readable type sizes
- no hover-only dependency for critical information
- no color-only communication
- icon + label when meaningful



## 31. Web and engineering rules

### General
- fast initial load
- lazy-load heavy images
- avoid giant bundles
- use skeleton loading states
- good empty states
- local save/load for presets in MVP
- predictable URL routes

### UX rules
- do not hide math
- do not default to giant tables everywhere
- support compact and detailed modes
- use drawers / modals for dense picking flows
- support future compare mode

### Data rules
- every meaningful value should have source provenance
- support patch-aware overrides
- support version labels
- do not silently overwrite older values
- support verification labels



## 32. Suggested repo structure

```txt
/app
  /home
  /team-builder
  /buffs-debuffs
  /classes
  /companions
  /mounts
  /artifacts
  /dungeons
  /trials
  /events
  /patch-tracker
  /endgame-guide
  /glossary

/components
  /layout
  /cards
  /selectors
  /charts
  /summary
  /filters
  /modals
  /icons

/features
  /team-builder
  /carry-optimizer
  /mount-hit-calc
  /boss-state
  /search
  /compare
  /patch-tracker

/data
  /classes
  /powers
  /companions
  /mounts
  /artifacts
  /buffs
  /debuffs
  /bosses
  /patches
  /presets

/docs
  ai-master-context.md
  product-spec.md
  design-system.md
  content-model.md
  patch-ingestion.md
```



## 33. AI agent priorities

When generating code or UI, optimize for:
- information clarity
- scalability
- visual hierarchy
- editable content structure
- future patch ingestion
- transparent calculations
- strong search
- intuitive member editing
- premium visual design
- image-rich but clean UI

Do **not** optimize only for flashy visuals.



## 34. AI agent must not assume

Do not assume:
- all support effects stack
- ST companion rankings equal support rankings
- old module rankings are still current
- Mythic is permanently the final tier
- typed vulnerability is universal
- boss-only effects apply to all targets
- every reconstructed value here is fully verified



## 35. MVP definition

Version 1 should include:
- Home
- Team Builder
- Buff & Debuff Explorer
- Companion Library
- Mount Library
- Artifact Library
- Patch Tracker
- Endgame Guide
- Boss Presets
- Carry DPS selector
- Final Mount Hit calculator
- local save/load team presets



## 36. V2 ideas
- team comparison
- build sharing
- patch diff viewer
- better mobile flow
- event planner
- farming planner
- reward map
- upgrade route planner



## 37. Final benchmark

The final product should feel:
- more modern than NW Hub
- more organized than Discord pins or scattered spreadsheets
- more visual than a spreadsheet
- more transparent than a black-box calculator
- more useful than a simple item database

A user should open it and immediately feel:
**"This helps me build, compare, understand, and optimize my Neverwinter endgame setup."**



## 38. Final implementation direction

Build a premium, patch-aware, image-rich Neverwinter endgame platform that combines:
- a visual team builder
- a transparent buff/debuff calculator
- a carry-DPS optimizer
- a mount-hit simulator
- a companion / mount / artifact / patch knowledge hub
- enough structure to grow into a full endgame reference platform over time



## 39. File output note

This file is intentionally long and descriptive because the AI agent needs:
- context
- product direction
- content structure
- data seeds
- implementation constraints
- known source links
- clear honesty about verification status

Treat this file as the **master AI handoff context** for the project.

