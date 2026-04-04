# Neverwinter Endgame Hub - Source Registry & Proof Map for Codex

## Purpose

This file is the **evidence appendix** for the Neverwinter Endgame Hub project.

Use it to give ChatGPT Codex or any AI agent:
- direct source links
- what each source proves
- which sources are official vs community vs user-provided
- where rankings came from
- where system rules came from
- where current-era patch and module context came from
- where spreadsheet/workbook seed data came from

This file should be used alongside:
- `neverwinter_final_ai_master_context.md`
- `neverwinter_endgame_hub_master_spec.md`
- any future machine-readable JSON/CSV imports



## Trust model

### Tier 1 - Official / primary
Use first whenever possible:
- playneverwinter.com
- arcgames.com
- steamcommunity.com official announcements for Neverwinter

### Tier 2 - Structured current references
Useful for current mechanical pages and lists:
- neverwinter.fandom.com
- neverwinter-mmo.fandom.com

### Tier 3 - User-provided / connected-source documents
Useful for rankings, build context, and meta usage:
- Google Sheets / Drive files shared by the user
- Aragon build docs
- 4-slot mount sheets
- damage formula sheets

### Tier 4 - Secondary mirrors / community summaries
Useful when official pages are not readable in this environment:
- Steam discussion copies
- mirrored patch-note copies
- community summaries

Do not treat Tier 4 as stronger than official sources.



# 1. Official patch-note and module sources

## 1.1 Official PlayNeverwinter news / patch notes hub
Link:
- https://www.playneverwinter.com/en/news#patch-notes

Use:
- official patch-note browsing
- official article landing page
- current official news feed

What it proves:
- official patch notes exist on PlayNeverwinter
- recent patch notes are organized in the official news feed
- "View More" expands older entries in the live site

Notes:
- heavily JavaScript-driven
- not always fully readable in non-JS fetches
- good for live manual verification in a browser



## 1.2 Arc Games patch-note archive tag page
Link:
- https://www.arcgames.com/en/games/neverwinter/news/tag/nw-patch-notes

Use:
- modern official patch-note archive
- confirmed list of patch-note titles and dates
- easier non-JS archive enumeration than the PlayNeverwinter page

What it proves:
- a modern official patch-note archive exists
- accessible 2024 entries include:
  - 1/18/24
  - 1/31/24
  - 2/22/24
  - 2/27/24
  - 4/23/24
  - 5/7/24
  - 5/14/24
  - 5/17/24
  - 5/31/24
  - 6/7/24

Recommended usage:
- patch tracker seed
- patch title/date/version mapping
- official source provenance



## 1.3 Arc Games generic patch-notes tag page
Link:
- https://www.arcgames.com/en/games/neverwinter/news/tag/patch-notes

Use:
- backup patch-note archive browsing
- alternative official archive view

What it proves:
- same current patch trail can be surfaced via the broader tag page
- useful fallback if the narrower NW-specific tag page changes



## 1.4 Steam official announcements for Neverwinter
Link:
- https://steamcommunity.com/app/109600/announcements/

Use:
- official module announcements
- official feature summaries
- recent module context
- readable summaries for modern content

What it proves:
- official recent Neverwinter announcements are publicly readable
- current module line includes Red Harvest, Soul Collector, Tempus Arena
- recent official feature summaries are visible there

Key entries surfaced during research:
- Tempus Arena - The Slaughterhouse
- For Gods and Glory Battle Pass
- Red Harvest Part II - The Soul Collector is Live!

Recommended usage:
- module page summaries
- latest-era content overview
- queue/system update context
- current event descriptions



## 1.5 Launcher / official feed surface
Link:
- https://launcher.playneverwinter.com/

Use:
- current official launcher/news surface
- latest patch/news references

What it proves:
- official launcher still publishes/reflects current Neverwinter news items
- recent patch-note chain continues into 2026

Recommended usage:
- recency check
- latest update sanity-checking



# 2. Official / semi-official module timeline and system references

## 2.1 Neverwinter module timeline
Link:
- https://neverwinter.fandom.com/wiki/Module

Use:
- module history
- module numbering
- release ordering
- patch-to-module cross-reference seed

What it proves:
- module sequence from early game to modern game
- release ordering for modules including:
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
  - Red Harvest
  - Red Harvest Part II
  - Tempus Arena / 32.5 context

Recommended usage:
- module timeline page
- patch tracker module tagging
- content chronology



# 3. Companion system references

## 3.1 Companion master page
Link:
- https://neverwinter.fandom.com/wiki/Companion

Use:
- companion system overview
- summoned vs augment explanation
- enhancement + bonus power model
- current general companion reference

What it proves:
- summoned companions give stats
- augment companions provide extra stats but do not actively attack
- non-augment companions attack and contribute in combat
- companions have enhancement powers and player bonus powers

Recommended usage:
- glossary
- companion system overview page
- companion library intro copy



## 3.2 Companion enhancement powers master list
Link:
- https://neverwinter.fandom.com/wiki/Companion/Enhancement_powers

Use:
- enhancement power index
- source-companion mapping
- enhancement taxonomy

What it proves:
- enhancement powers are a system feature introduced in Module 16: Undermountain
- only one companion enhancement can be selected
- core enhancement names include:
  - Acute Senses
  - Anticipation
  - Armor Break
  - Potency
  - Potent Precision
  - Precision
  - Perfect Vision
  - Dulled Senses
  - Vulnerability
  - Slowed Reactions
  - Master of Craft

Recommended usage:
- Support Enhancements database
- enhancement source mapping
- filtering by effect type



## 3.3 Companion powers master list
Link:
- https://neverwinter.fandom.com/wiki/Companion/Powers

Use:
- active companion power index
- detailed companion skill behavior
- debuff examples embedded in power descriptions

What it proves:
- companion active powers have explicit effects and cooldowns
- some powers directly apply boss debuffs, e.g. defense debuffs

Recommended usage:
- deep companion detail pages
- tooltip content seeds
- richer companion info panels



## 3.4 Example patch showing companion shield standardization
Link:
- https://steamcommunity.com/app/109600/discussions/0/5570437336430646936/

Use:
- companion shield rules
- older but important support-system normalization
- survivability support logic

What it proves:
- companion shields stack with player shields
- companion shields do not stack with themselves or other companion shields
- baseline multi-target shield ~5% max HP
- baseline single-target shield ~10% max HP
- weaker companion shield should not overwrite stronger shield

Recommended usage:
- healing/support companion pages
- shield logic notes
- non-stacking support logic



# 4. Artifact references

## 4.1 Artifact master page
Link:
- https://neverwinter.fandom.com/wiki/Artifact

Use:
- artifact index
- artifact categories
- debuff artifact ranking reference

What it proves:
- the page includes a "Debuff Artifacts - In Order of Effectiveness" ranking
- that ranking can seed the artifact debuff section

Ranking surfaced during research:
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

Recommended usage:
- artifact debuff ranking seed
- artifact category page
- "best debuff artifacts" section



## 4.2 Mythallar Fragment
Link:
- https://neverwinter.fandom.com/wiki/Mythallar_Fragment

Use:
- specific tooltip/value verification

What it proves:
- Mythallar Fragment lowers target damage resistance
- it is one of the strongest debuff artifacts in current references

Recommended usage:
- artifact detail page
- boss debuff category



## 4.3 Halaster's Blast Scepter
Link:
- https://neverwinter.fandom.com/wiki/Halaster%27s_Blast_Scepter/Tooltip

Use:
- tooltip verification

What it proves:
- Halaster's Blast Scepter reduces target damage resistance
- maximum listed value reaches 15%

Recommended usage:
- artifact database exact value entry



## 4.4 Wyvern-Venom Coated Knives
Link:
- https://neverwinter.fandom.com/wiki/Wyvern-Venom_Coated_Knives/Tooltip

Use:
- tooltip verification

What it proves:
- envenomated enemies take more damage
- envenomated enemies deal less damage
- supports classification as a true debuff artifact

Recommended usage:
- artifact database exact value entry
- debuff + survivability hybrid tag



## 4.5 Charm of the Serpent
Link:
- https://neverwinter.fandom.com/wiki/Charm_of_the_Serpent

Use:
- tooltip verification

What it proves:
- increases enemies' damage taken
- mythic value reaches 16%

Recommended usage:
- debuff artifact page
- ranked artifacts section



## 4.6 Lantern of Revelation
Link:
- https://neverwinter.fandom.com/wiki/Lantern_of_Revelation

Use:
- tooltip verification

What it proves:
- increases enemies' damage taken
- mythic value reaches 10%

Recommended usage:
- debuff artifact page
- support-rotation suggestions



## 4.7 Soul Sight Crystal
Link:
- https://neverwinter.fandom.com/wiki/Soul_Sight_Crystal

Use:
- personal burst artifact verification

What it proves:
- Soul Sight Crystal is primarily a personal burst amplifier
- it is not a universal team debuff artifact

Recommended usage:
- personal burst artifact category
- carry DPS optimization



## 4.8 Sigil of the Barbarian
Link:
- https://neverwinter.fandom.com/wiki/Sigil_of_the_Barbarian

Use:
- personal buff artifact verification

What it proves:
- scales personal damage based on targets hit
- should be treated as a personal buff artifact, not a true boss debuff

Recommended usage:
- artifact category split
- carry build recommendations



## 4.9 Awakened Forger's Box
Link:
- https://neverwinter.fandom.com/wiki/Awakened_Forger%27s_Box

Use:
- long-duration utility artifact verification

What it proves:
- provides long-duration stat buffs
- belongs in utility / reusable buff artifact category

Recommended usage:
- utility artifact section
- progression guide



# 5. Mount references

## 5.1 Mount powers master page
Link:
- https://neverwinter.fandom.com/wiki/Mount_Powers

Use:
- mount power system overview
- baseline mythic / bolster-oriented reference
- mount power taxonomy

What it proves:
- combat and equip powers scale by mount quality and bolster
- mount powers are a core power system, not just collectibles

Recommended usage:
- mount library intro
- combat/equip split
- quality-aware data modeling



## 5.2 Example mount detail - King of Spines
Link:
- https://neverwinter.fandom.com/wiki/King_of_Spines_%28mount%29

Use:
- example of a mount page with specific values

What it proves:
- mount pages can expose both combat power and equip power details
- some combat powers apply boss-relevant incoming damage effects

Recommended usage:
- mount detail page template
- exact value examples for modeling



# 6. Historical patch-note references

## 6.1 Neverwinter patch-note history page (community-preserved)
Link:
- https://neverwinter-mmo.fandom.com/wiki/Patch_Notes

Use:
- historical patch-note mirror
- older pre-modern patch notes
- class change history
- debuff stacking history

What it proves:
- older patch notes are preserved enough to recover key balance-system shifts
- useful for:
  - Ray of Enfeeblement stacking changes
  - older class reworks
  - early system rules
  - historical exploit fixes

Recommended usage:
- patch tracker backfill
- historical / legacy section
- "what changed over time" pages



## 6.2 Official Neverwinter wiki patch-note page
Link:
- https://neverwinter.fandom.com/wiki/Patch_Notes

Use:
- historical patch-note browsing
- links to older patch pages and modules

What it proves:
- patch history can be navigated through module / patch pages
- useful as a cross-reference layer with official archives

Recommended usage:
- patch tracker backfill
- module-to-patch linking



## 6.3 Example historical patch page - Underdark
Link:
- https://neverwinter.fandom.com/wiki/Patch_NW.55.20151105a.2

Use:
- example of detailed older patch content
- boon / feat / interaction changes

What it proves:
- older patch pages still contain:
  - buff/debuff interaction fixes
  - stacking notes
  - class interaction corrections
  - boon timing restrictions

Example details surfaced:
- Prophecy of Doom correctly benefits from buffs/debuffs on the caster
- some boon stacks gated to once per second
- level scaling changes affect HP / damage / DR

Recommended usage:
- historical system notes
- proof that old patch pages contain meaningful combat-rule changes



# 7. User-provided Google Sheets / connected data sources

## 7.1 Main Aragon workbook
Link:
- https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit

What it proves:
- there is a current community-maintained endgame workbook
- includes companion / mount / artifact sections
- last update observed during research: 10-March-2026

Visible tabs recovered:
- ST Damage Companions
- Support Comps
- Support Artifacts
- Support Mounts
- Support Enhancements
- Comp Equip Bonuses
- M30 - ST Damage Comps
- AoE Damage Comps
- Healing Comps
- Augment Comps

Recommended usage:
- data seeding
- ranking seeding
- community meta context
- comparison data



## 7.2 Requested workbook tab links
Use these as direct tab references in docs and for future export scripts.

1.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265#gid=999278265

2.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1245615469#gid=1245615469

3.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1200006036#gid=1200006036

4.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=2133630453#gid=2133630453

5.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=839734160#gid=839734160

6.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1781041228#gid=1781041228

7.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=471288844#gid=471288844

8.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=49155600#gid=49155600

9.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=401177450#gid=401177450

10.
https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1260281279#gid=1260281279

Important note:
- exact gid-to-tab mapping was not fully recoverable for every tab in this environment
- keep the tab URLs in docs so a future ingestion script or manual reviewer can verify them



## 7.3 ST Damage Companions tab - recovered proof
Base link:
- https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265

What it proves:
- Aragon's ST companion ranking is current-era module 32 context
- tested on PC, boss dummy, same stats, CA, Celestial enhancement, x3 Warlord's Motivation
- top ST rankings recovered directly

Recovered top ST results:
- Sardina the Tressym - 179,561
- Blaspheme Assassin - 164,299
- Lysaera - 160,581
- Rattigan the Wise - 157,526
- Wiggins the Undead Intern - 153,472
- Mage Slayer - 147,796
- Flame Sprite - 147,365
- Xuna - 147,210

Recommended usage:
- companion rankings page
- ST comparison seed
- "best ST summons" section



## 7.4 Damage formula workbook
Link:
- https://docs.google.com/spreadsheets/d/1N2ylc1q9fM2lJ555t4NZrdC8f-bZmL25/edit?gid=507744579

What it proves:
- there is a dedicated Neverwinter PvE damage formula sheet
- player-side and boss-side factors are tracked separately
- useful for translating the app from "planner" into "outcome simulator"

Recovered formula inputs:
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

Recommended usage:
- mount-hit calculator
- boss-state engine
- carry-DPS panel



# 8. NW Hub direct links provided / discussed

## Main site
- https://nw-hub.com/

## Classes
- https://nw-hub.com/classes

## Companion pages
- https://nw-hub.com/companions/powers
- https://nw-hub.com/companions/enhancements
- https://nw-hub.com/companions/list

Use:
- structural inspiration
- future manual verification
- page IA comparison

Important note:
- these pages are JS-heavy
- some hover-only values were not directly extractable in full here
- use as inspiration and later verification target, not sole truth source



# 9. What each source should feed in the app

## Official patch / module sources should feed:
- patch tracker
- module timeline
- recent system changes
- queue changes
- event changes
- celestial mount / insignia updates
- official feature descriptions

## Wiki structured references should feed:
- artifact detail pages
- companion power / enhancement lists
- mount power pages
- module cross-links
- historical patch references
- glossary support

## User-provided sheets should feed:
- rankings
- support package seeds
- ST / AoE companion comparisons
- support artifact priorities
- support mount priorities
- support enhancement priorities
- community endgame meta context

## NW Hub should feed:
- product structure inspiration
- navigation ideas
- future scraping / ingestion targets
- visual/content category validation



# 10. Recommended provenance labels in the app

Every significant value should store:
- source_url
- source_type
- source_title
- source_date
- source_version
- verification_status

### Suggested source types
- official_patch
- official_announcement
- official_archive
- wiki_reference
- user_sheet
- connected_build_doc
- community_reference
- inferred_seed

### Suggested verification statuses
- verified
- partially_recovered
- inferred
- needs_live_check
- outdated
- superseded_by_patch



# 11. Final instruction for Codex

When reading this source registry:

1. Prefer official sources for system changes and patch history.
2. Prefer user-provided sheets for rankings and community endgame prioritization.
3. Prefer structured wiki pages for static detail pages and value lookup.
4. Treat NW Hub as inspiration plus future verification target.
5. Never flatten all buffs/debuffs into a single generic number internally.
6. Keep source provenance and verification status in the data model.

This registry exists so the project can be:
- more transparent
- more updateable
- more reliable
- more useful than a static fan wiki or spreadsheet.

