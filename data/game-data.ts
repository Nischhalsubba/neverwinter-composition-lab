import {
  nwHubArtifactsRaw,
} from "@/data/nw-hub/artifacts";
import {
  nwHubClassFeaturesRaw,
} from "@/data/nw-hub/class-features";
import {
  nwHubClassPowersRaw,
} from "@/data/nw-hub/class-powers";
import {
  nwHubClassMetaRaw,
} from "@/data/nw-hub/classes";
import {
  nwHubCompanionsRaw,
} from "@/data/nw-hub/companions";
import {
  nwHubCompanionEnhancementsRaw,
} from "@/data/nw-hub/companion-enhancements";
import {
  nwHubCompanionPowersRaw,
} from "@/data/nw-hub/companion-powers";
import {
  type Artifact,
  type BossPreset,
  type Companion,
  type CompanionBonus,
  type CompanionEnhancement,
  type EffectDefinition,
  type GameClass,
  type InsigniaBonus,
  type Mount,
  type MountCombatPower,
  type MountEquipPower,
  type PatchChange,
  type PowerDefinition,
  type TeamRole,
  type TeamMember,
} from "@/lib/types";

const moduleVersion = "module_32_5";
const nwHubSourceVersion = "nw-hub-2026-04-04";
const mountSheetSourceUrl =
  "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=2133630453#gid=2133630453";
const mountSheetSourceVersion = "aragon-mount-sheet-2025-11-22";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeEntityId(prefix: string, value: string) {
  return `${prefix}-${slugify(value)}`;
}

function uniqueValues<T>(items: T[]) {
  return Array.from(new Set(items));
}

function normalizeRole(value: string): TeamRole {
  const normalized = value.toLowerCase();

  if (normalized === "tank") {
    return "tank";
  }

  if (normalized === "healer") {
    return "healer";
  }

  if (normalized === "dps") {
    return "dps";
  }

  return "support";
}

function parsePercentValue(text: string) {
  const match = text.match(/(\d+(?:\.\d+)?)%/);
  return match ? Number(match[1]) / 100 : null;
}

const seededEffectCatalog: EffectDefinition[] = [
  {
    id: "effect-tutor-ca",
    name: "Tutor Combat Advantage",
    effect_category: "team_buff",
    stat: "combat_advantage",
    value: 0.05,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Recovered from the support companion seed in the product docs.",
  },
  {
    id: "effect-drizzt-damage",
    name: "Drizzt Team Damage",
    effect_category: "team_buff",
    stat: "damage_bonus",
    value: 0.03,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Documented as 3% multiplicative damage for everyone.",
  },
  {
    id: "effect-portobello-power",
    name: "Portobello Team Power",
    effect_category: "team_buff",
    stat: "power",
    value: 0.035,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Docs explicitly call out 3.5% Power for everyone.",
  },
  {
    id: "effect-portobello-ca",
    name: "Portobello Team CA",
    effect_category: "team_buff",
    stat: "combat_advantage",
    value: 0.035,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Docs explicitly call out 3.5% Combat Advantage for everyone.",
  },
  {
    id: "effect-uni-ca",
    name: "Uni Party CA",
    effect_category: "team_buff",
    stat: "combat_advantage",
    value: 0.05,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Recovered from the support mount seed.",
  },
  {
    id: "effect-red-dragon-owner-damage",
    name: "Red Dragon Owner Damage",
    effect_category: "owner_only",
    stat: "damage_bonus",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "owner",
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Caster gets +15% damage for 10s.",
  },
  {
    id: "effect-red-dragon-owner-crit",
    name: "Red Dragon Owner Crit Strike",
    effect_category: "owner_only",
    stat: "crit_strike",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "owner",
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Docs mention Crit Strike increase on the caster.",
  },
  {
    id: "effect-red-dragon-boss-crit-avoid",
    name: "Red Dragon Boss Crit Avoid Reduction",
    effect_category: "boss_debuff",
    stat: "critical_avoidance_reduction",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Target gets -15% Crit Avoidance for 10s.",
  },
  {
    id: "effect-halaster-defense",
    name: "Halaster Defense Reduction",
    effect_category: "boss_debuff",
    stat: "defense_reduction",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "wiki_reference",
    source_url:
      "https://neverwinter.fandom.com/wiki/Halaster%27s_Blast_Scepter/Tooltip",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Tooltip verification surfaced in the source registry.",
  },
  {
    id: "effect-charm-serpent-incoming",
    name: "Charm of the Serpent Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.16,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "wiki_reference",
    source_url: "https://neverwinter.fandom.com/wiki/Charm_of_the_Serpent",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Mythic value reaches 16% increased damage taken.",
  },
  {
    id: "effect-lantern-incoming",
    name: "Lantern of Revelation Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.1,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "wiki_reference",
    source_url: "https://neverwinter.fandom.com/wiki/Lantern_of_Revelation",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Mythic value reaches 10% increased damage taken.",
  },
  {
    id: "effect-wyvern-incoming",
    name: "Wyvern-Venom Coated Knives Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: null,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "wiki_reference",
    source_url:
      "https://neverwinter.fandom.com/wiki/Wyvern-Venom_Coated_Knives/Tooltip",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Verified as increased damage taken, but exact value was not recovered in the docs.",
  },
  {
    id: "effect-armor-break-defense",
    name: "Armor Break Defense Reduction",
    effect_category: "boss_debuff",
    stat: "defense_reduction",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "wiki_reference",
    source_url:
      "https://neverwinter.fandom.com/wiki/Companion/Enhancement_powers",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Priority support debuff enhancement with unresolved live value.",
  },
  {
    id: "effect-dulled-senses-awareness",
    name: "Dulled Senses Awareness Reduction",
    effect_category: "boss_debuff",
    stat: "awareness_reduction",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "wiki_reference",
    source_url:
      "https://neverwinter.fandom.com/wiki/Companion/Enhancement_powers",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Priority support debuff enhancement with unresolved live value.",
  },
  {
    id: "effect-vulnerability-crit-avoid",
    name: "Vulnerability Crit Avoid Reduction",
    effect_category: "boss_debuff",
    stat: "critical_avoidance_reduction",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "wiki_reference",
    source_url:
      "https://neverwinter.fandom.com/wiki/Companion/Enhancement_powers",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Priority support debuff enhancement with unresolved live value.",
  },
  {
    id: "effect-slowed-reactions-deflect",
    name: "Slowed Reactions Deflect Reduction",
    effect_category: "boss_debuff",
    stat: "deflect_reduction",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "wiki_reference",
    source_url:
      "https://neverwinter.fandom.com/wiki/Companion/Enhancement_powers",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Priority support debuff enhancement with unresolved live value.",
  },
  {
    id: "effect-tutor-coverage",
    name: "Tutor Support Coverage",
    effect_category: "carry_only",
    stat: "combat_advantage",
    value: null,
    stack_rule: "unknown",
    scope: "carry",
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Used as a carry-oriented support flag when numeric values are already represented elsewhere.",
  },
  {
    id: "effect-mythallar-defense",
    name: "Mythallar Fragment Defense Reduction",
    effect_category: "boss_debuff",
    stat: "defense_reduction",
    value: null,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "wiki_reference",
    source_url: "https://neverwinter.fandom.com/wiki/Mythallar_Fragment",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Verified as target damage resistance reduction, exact live value pending.",
  },
  {
    id: "effect-hag-defense",
    name: "Hag's Enchanted Cauldron Defense Reduction",
    effect_category: "boss_debuff",
    stat: "defense_reduction",
    value: 0.075,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Recovered from Aragon's mount support sheet dated November 22, 2025.",
  },
  {
    id: "effect-hag-crit-avoid",
    name: "Hag's Enchanted Cauldron Crit Avoid Reduction",
    effect_category: "boss_debuff",
    stat: "critical_avoidance_reduction",
    value: 0.075,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Recovered from Aragon's mount support sheet dated November 22, 2025.",
  },
  {
    id: "effect-pegasus-team-damage",
    name: "Pegasus Team Damage Bonus",
    effect_category: "team_buff",
    stat: "damage_bonus",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states allies gain +15% damage depending on role.",
  },
  {
    id: "effect-red-dragon-boss-outgoing-damage",
    name: "Red Dragon Boss Outgoing Damage Reduction",
    effect_category: "utility",
    stat: "incoming_damage",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet also lists target outgoing damage reduction, which is tracked in notes but not modeled as a dedicated stat yet.",
  },
  {
    id: "effect-red-dragon-owner-accuracy",
    name: "Red Dragon Owner Accuracy",
    effect_category: "owner_only",
    stat: "accuracy",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "owner",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states the caster gains +15% accuracy.",
  },
  {
    id: "effect-undead-lion-incoming",
    name: "Glorious Undead Lion Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.16,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 16% more incoming damage.",
  },
  {
    id: "effect-undead-lion-accuracy",
    name: "Glorious Undead Lion Accuracy Reduction",
    effect_category: "utility",
    stat: "accuracy",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Boss accuracy reduction is preserved in notes but not modeled as a dedicated tracked boss stat yet.",
  },
  {
    id: "effect-alder-incoming",
    name: "Twice-Paled Alder Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.16,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 16% more incoming damage.",
  },
  {
    id: "effect-alder-outgoing",
    name: "Twice-Paled Alder Outgoing Damage Reduction",
    effect_category: "utility",
    stat: "incoming_damage",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Target outgoing damage reduction preserved in notes but not modeled as a tracked stat yet.",
  },
  {
    id: "effect-panther-incoming",
    name: "Phantom Panther Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.16,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 16% more incoming damage.",
  },
  {
    id: "effect-panther-crit-strike",
    name: "Phantom Panther Crit Strike Reduction",
    effect_category: "utility",
    stat: "crit_strike",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Target critical strike reduction preserved in notes but not modeled as a tracked boss stat yet.",
  },
  {
    id: "effect-swarm-incoming",
    name: "Swarm Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 15% more incoming damage.",
  },
  {
    id: "effect-swarm-outgoing",
    name: "Swarm Outgoing Damage Reduction",
    effect_category: "utility",
    stat: "incoming_damage",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Target outgoing damage reduction preserved in notes but not modeled as a tracked stat yet.",
  },
  {
    id: "effect-swarm-crit-strike",
    name: "Swarm Critical Chance Reduction",
    effect_category: "utility",
    stat: "crit_strike",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Target critical chance reduction preserved in notes but not modeled as a tracked boss stat yet.",
  },
  {
    id: "effect-eclipse-lion-incoming",
    name: "Eclipse Lion Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 15% more incoming damage.",
  },
  {
    id: "effect-eclipse-lion-outgoing",
    name: "Eclipse Lion Outgoing Damage Reduction",
    effect_category: "utility",
    stat: "incoming_damage",
    value: null,
    stack_rule: "unknown",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Target outgoing damage reduction preserved in notes but not modeled as a tracked stat yet.",
  },
  {
    id: "effect-tyrannosaur-incoming",
    name: "King of Spines Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 15% more incoming damage.",
  },
  {
    id: "effect-brain-stealer-incoming",
    name: "Brain Stealer Dragon Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 15% more incoming damage.",
  },
  {
    id: "effect-fire-archon-incoming",
    name: "Bestial Fire Archon Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets receive 15% more incoming damage within magma pools.",
  },
  {
    id: "effect-balgora-incoming",
    name: "Balgora Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.11,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets take 11% more damage.",
  },
  {
    id: "effect-balloons-incoming",
    name: "Reconnaissance Balloons Incoming Damage",
    effect_category: "boss_debuff",
    stat: "incoming_damage",
    value: 0.075,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states targets take 7.5% more damage.",
  },
  {
    id: "effect-cauldron-team-accuracy",
    name: "Cauldron Team Accuracy",
    effect_category: "team_buff",
    stat: "accuracy",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states all allies gain 15% Accuracy.",
  },
  {
    id: "effect-cauldron-team-ca",
    name: "Cauldron Team Combat Advantage",
    effect_category: "team_buff",
    stat: "combat_advantage",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "team",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states all allies gain 15% Combat Advantage.",
  },
  {
    id: "effect-salamander-owner-damage",
    name: "Salamander Owner Damage",
    effect_category: "owner_only",
    stat: "damage_bonus",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "owner",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states caster gains 15% damage.",
  },
  {
    id: "effect-salamander-deflect",
    name: "Salamander Deflect Reduction",
    effect_category: "boss_debuff",
    stat: "deflect_reduction",
    value: 0.15,
    stack_rule: "strongest_only",
    scope: "boss",
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Sheet states target loses 15% deflect.",
  },
];

type RawEncounterPower = (typeof nwHubClassPowersRaw)[number]["powers"][number];

function inferPowerEffects(className: string, power: RawEncounterPower): EffectDefinition[] {
  const description = "description" in power && typeof power.description === "string" ? power.description : "";
  const effects: EffectDefinition[] = [];
  const sourceUrl = "https://nw-hub.com/classes";
  const baseId = `effect-${slugify(className)}-${slugify(power.name)}`;
  const notePrefix =
    "Directly extracted from NW Hub class power text on 2026-04-04. Community-maintained source; in-game tooltip confirmation is still recommended.";

  const addEffect = (
    suffix: string,
    name: string,
    stat: EffectDefinition["stat"],
    value: number,
    scope: EffectDefinition["scope"],
    category: EffectDefinition["effect_category"],
    notes: string,
  ) => {
    effects.push({
      id: `${baseId}-${suffix}`,
      name,
      effect_category: category,
      stat,
      value,
      stack_rule: "strongest_only",
      scope,
      source_type: "community_reference",
      source_url: sourceUrl,
      source_version: nwHubSourceVersion,
      verification_status: "verified",
      notes: `${notePrefix} ${notes}`,
    });
  };

  if (/takes (\d+(?:\.\d+)?)% more damage/i.test(description)) {
    const match = description.match(/takes (\d+(?:\.\d+)?)% more damage/i);
    if (match) {
      addEffect(
        "incoming-damage",
        `${power.name} Incoming Damage`,
        "incoming_damage",
        Number(match[1]) / 100,
        "boss",
        "boss_debuff",
        "Encounter text states that the target takes increased damage.",
      );
    }
  }

  if (/damage resistance is lowered by (\d+(?:\.\d+)?)%/i.test(description)) {
    const match = description.match(/damage resistance is lowered by (\d+(?:\.\d+)?)%/i);
    if (match) {
      addEffect(
        "defense-reduction",
        `${power.name} Defense Reduction`,
        "defense_reduction",
        Number(match[1]) / 100,
        "boss",
        "boss_debuff",
        "Encounter text explicitly lowers target damage resistance.",
      );
    }
  }

  if (/reduces the awareness of all targets by (\d+(?:\.\d+)?)%/i.test(description)) {
    const match = description.match(/reduces the awareness of all targets by (\d+(?:\.\d+)?)%/i);
    if (match) {
      addEffect(
        "awareness-reduction",
        `${power.name} Awareness Reduction`,
        "awareness_reduction",
        Number(match[1]) / 100,
        "boss",
        "boss_debuff",
        "Encounter text explicitly reduces target awareness.",
      );
    }
  }

  if (/takes (\d+(?:\.\d+)?)% more magical and projectile damage/i.test(description)) {
    const match = description.match(/takes (\d+(?:\.\d+)?)% more magical and projectile damage/i);
    if (match) {
      const value = Number(match[1]) / 100;
      addEffect(
        "magical-vulnerability",
        `${power.name} Magical Vulnerability`,
        "magical_vulnerability",
        value,
        "boss",
        "typed_vulnerability",
        "Spell text says the target takes more magical damage.",
      );
      addEffect(
        "projectile-vulnerability",
        `${power.name} Projectile Vulnerability`,
        "projectile_vulnerability",
        value,
        "boss",
        "typed_vulnerability",
        "Spell text says the target takes more projectile damage.",
      );
    }
  }

  if (/allies within .* deal (\d+(?:\.\d+)?)% more damage/i.test(description)) {
    const match = description.match(/allies within .* deal (\d+(?:\.\d+)?)% more damage/i);
    if (match) {
      addEffect(
        "team-damage",
        `${power.name} Team Damage Bonus`,
        "damage_bonus",
        Number(match[1]) / 100,
        "team",
        "team_buff",
        "Encounter text explicitly buffs allied damage.",
      );
    }
  }

  return effects;
}

const nwHubEncounterEffects = nwHubClassPowersRaw.flatMap((classRoot) =>
  classRoot.powers
    .filter((power) => power.type === "Encounter")
    .flatMap((power) => inferPowerEffects(classRoot.className, power)),
);

export const effectCatalog: EffectDefinition[] = [...seededEffectCatalog, ...nwHubEncounterEffects];

export const classes: GameClass[] = nwHubClassMetaRaw.map((item) => ({
  id: makeEntityId("class", item.className),
  name: item.className,
  role_focus: uniqueValues(item.paragons.map((paragon) => normalizeRole(paragon.role))),
  paragon_options: item.paragons.map((paragon) => paragon.name),
  identity_note: `${item.className} currently exposes ${item.paragons.length} NW Hub paragon path records.`,
  image_url: item.emblem_url,
  source_type: "community_reference",
  source_url: item.source_url,
  source_version: nwHubSourceVersion,
  verification_status: "verified",
  notes:
    "Directly extracted from NW Hub class metadata on 2026-04-04. Role focus and paragon options reflect that community-maintained source.",
}));

const powerEffectIds = new Map<string, string[]>(
  nwHubEncounterEffects.map((effect) => {
    const key = effect.id
      .replace(/^effect-/, "")
      .replace(/-(incoming-damage|defense-reduction|awareness-reduction|magical-vulnerability|projectile-vulnerability)$/, "");
    return [key, [] as string[]];
  }),
);

nwHubEncounterEffects.forEach((effect) => {
  const key = effect.id
    .replace(/^effect-/, "")
    .replace(/-(incoming-damage|defense-reduction|awareness-reduction|magical-vulnerability|projectile-vulnerability)$/, "");
  powerEffectIds.set(key, [...(powerEffectIds.get(key) ?? []), effect.id]);
});

function buildPowerId(className: string, powerName: string, powerType: string, paragonPath?: string | null) {
  return [
    "power",
    slugify(className),
    slugify(paragonPath || "shared"),
    slugify(powerType),
    slugify(powerName),
  ].join("-");
}

function buildPowerEffectIds(className: string, powerName: string) {
  return powerEffectIds.get(`${slugify(className)}-${slugify(powerName)}`) ?? [];
}

export const powers: PowerDefinition[] = [
  ...nwHubClassPowersRaw.flatMap((classRoot) =>
    classRoot.powers
      .filter((power) => power.type === "Encounter" || power.type === "Daily")
      .map((power) => ({
        id: buildPowerId(
          classRoot.className,
          power.name,
          power.type,
          "paragonPath" in power ? power.paragonPath ?? null : null,
        ),
        name: power.name,
        class_name: classRoot.className,
        power_type: power.type === "Encounter" ? ("encounter" as const) : ("daily" as const),
        paragon_path: "paragonPath" in power ? power.paragonPath ?? null : null,
        description: "description" in power && typeof power.description === "string" ? power.description : "",
        image_url: power.image_url ?? undefined,
        effect_ids: power.type === "Encounter" ? buildPowerEffectIds(classRoot.className, power.name) : [],
        source_type: "community_reference" as const,
        source_url: "https://nw-hub.com/classes",
        source_version: nwHubSourceVersion,
        verification_status: "verified" as const,
        notes:
          "Directly extracted from NW Hub class power data on 2026-04-04. Effect IDs are only attached where the power text exposed a supported buff/debuff category.",
      })),
  ),
  ...nwHubClassFeaturesRaw
    .filter((feature) => "isClassFeature" in feature && feature.isClassFeature)
    .map((feature) => ({
      id: buildPowerId(
        feature.className,
        feature.name,
        "Feature",
        "paragonPath" in feature ? feature.paragonPath ?? null : null,
      ),
      name: feature.name,
      class_name: feature.className,
      power_type: "feature" as const,
      paragon_path: "paragonPath" in feature ? feature.paragonPath ?? null : null,
      description: feature.description,
      image_url: feature.image_url ?? undefined,
      effect_ids: [],
      source_type: "community_reference" as const,
      source_url: "https://nw-hub.com/classes",
      source_version: nwHubSourceVersion,
      verification_status: "verified" as const,
      notes: "Directly extracted from NW Hub class feature data on 2026-04-04.",
    })),
];

function scoreSupportPriority(power: PowerDefinition) {
  const text = `${power.name} ${power.description ?? ""}`.toLowerCase();
  let score = power.effect_ids.length * 100;

  if (/more damage|damage resistance|awareness|critical avoidance|deflect|allies|team|party/.test(text)) {
    score += 40;
  }

  if (/heal|restore|shield|mitigation|cover/.test(text)) {
    score += 10;
  }

  return score;
}

function filterClassPowers(classId: string, powerType: PowerDefinition["power_type"], paragonPath?: string) {
  const className = classes.find((item) => item.id === classId)?.name;
  if (!className) {
    return [];
  }

  return powers.filter(
    (power) =>
      power.class_name === className &&
      power.power_type === powerType &&
      (!paragonPath || !power.paragon_path || power.paragon_path === paragonPath),
  );
}

export function getRoleForClassParagon(classId: string, paragonPath: string) {
  const classItem = classes.find((item) => item.id === classId);
  const meta = nwHubClassMetaRaw.find((item) => item.className === classItem?.name);
  const paragon = meta?.paragons.find((item) => item.name === paragonPath);
  return paragon ? normalizeRole(paragon.role) : classItem?.role_focus[0] ?? "support";
}

export function getDefaultPowerLoadoutForClass(classId: string, paragonPath?: string) {
  const encounters = filterClassPowers(classId, "encounter", paragonPath)
    .sort((left, right) => scoreSupportPriority(right) - scoreSupportPriority(left))
    .slice(0, 3)
    .map((power) => power.id);

  const dailies = filterClassPowers(classId, "daily", paragonPath)
    .sort((left, right) => scoreSupportPriority(right) - scoreSupportPriority(left))
    .slice(0, 1)
    .map((power) => power.id);

  const features = filterClassPowers(classId, "feature", paragonPath)
    .sort((left, right) => scoreSupportPriority(right) - scoreSupportPriority(left))
    .slice(0, 2)
    .map((power) => power.id);

  return {
    encounter_ids: encounters,
    daily_ids: dailies,
    feature_ids: features,
  };
}

const companionRoleMap = new Map<string, string[]>(
  nwHubCompanionPowersRaw.map((item) => [item.name, [...item.roles]]),
);

const seededCompanionValueMap: Record<
  string,
  { st_dps: number | null; max_hit: number | null; effect_ids: string[]; notes: string; verification_status: Companion["verification_status"]; source_type: Companion["source_type"]; source_url: string; source_version: string }
> = {
  Tutor: {
    st_dps: 130617,
    max_hit: 340432,
    effect_ids: ["effect-tutor-ca", "effect-tutor-coverage"],
    source_type: "user_sheet",
    source_url: "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "ST ranking value recovered directly; support effect comes from connected seed notes.",
  },
  "Drizzt Do'Urden": {
    st_dps: 48642,
    max_hit: 69128,
    effect_ids: ["effect-drizzt-damage"],
    source_type: "user_sheet",
    source_url: "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support value seeded from the docs, ST figure from the recovered ranking table.",
  },
  "Portobello DaVinci": {
    st_dps: 57399,
    max_hit: 345825,
    effect_ids: ["effect-portobello-power", "effect-portobello-ca"],
    source_type: "user_sheet",
    source_url: "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support values were explicitly called out in the docs.",
  },
  "Sardina the Tressym": {
    st_dps: 179561,
    max_hit: null,
    effect_ids: [],
    source_type: "user_sheet",
    source_url: "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Top recovered ST ranking from the Aragon sheet.",
  },
  "Blaspheme Assassin": {
    st_dps: 164299,
    max_hit: null,
    effect_ids: [],
    source_type: "user_sheet",
    source_url: "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Recovered directly from the ST ranking proof.",
  },
  Lysaera: {
    st_dps: 160581,
    max_hit: null,
    effect_ids: [],
    source_type: "user_sheet",
    source_url: "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Recovered directly from the ST ranking proof.",
  },
};

function getCompanionRoleTag(type: string, playerBonusName: string): Companion["role_tag"] {
  if (type.toLowerCase() === "augment") {
    return "augment";
  }

  const roles = companionRoleMap.get(playerBonusName) ?? [];
  if (roles.includes("Utility") || roles.includes("Defense")) {
    return "support";
  }

  if (roles.includes("Offense")) {
    return "st";
  }

  return "support";
}

export const companions: Companion[] = nwHubCompanionsRaw.map((item) => {
  const seeded = seededCompanionValueMap[item.name];
  const roles = companionRoleMap.get(item.playerBonusName) ?? [];

  return {
    id: makeEntityId("comp", item.name),
    name: item.name,
    role_tag: getCompanionRoleTag(item.type, item.playerBonusName),
    archetype: `${item.type} / ${roles.length ? roles.join(", ") : "mixed roles"}`,
    st_dps: seeded?.st_dps ?? null,
    max_hit: seeded?.max_hit ?? null,
    effect_ids: seeded?.effect_ids ?? [],
    source_type: seeded?.source_type ?? "community_reference",
    source_url: seeded?.source_url ?? item.source_url,
    source_version: seeded?.source_version ?? nwHubSourceVersion,
    verification_status: seeded?.verification_status ?? "verified",
    notes:
      seeded?.notes ??
      `Player bonus: ${item.playerBonusName}. Enhancement: ${item.enhancementPower}. Imported from the local NW Hub companion list snapshot.`,
  };
});

const companionEnhancementEffectMap: Record<string, string[]> = {
  "Armor Break": ["effect-armor-break-defense"],
  "Dulled Senses": ["effect-dulled-senses-awareness"],
  Vulnerability: ["effect-vulnerability-crit-avoid"],
  "Slowed Reactions": ["effect-slowed-reactions-deflect"],
};

export const companionEnhancements: CompanionEnhancement[] = nwHubCompanionEnhancementsRaw.map((item) => ({
  id: makeEntityId("enh", item.name),
  name: item.name,
  effect_ids: companionEnhancementEffectMap[item.name] ?? [],
  source_type: "community_reference",
  source_url: item.source_url,
  source_version: nwHubSourceVersion,
  verification_status: "verified",
  notes:
    "Directly extracted from NW Hub companion enhancement data on 2026-04-04. Effect IDs are attached only for the currently supported boss-debuff categories.",
}));

export const companionBonuses: CompanionBonus[] = nwHubCompanionPowersRaw.map((item) => ({
  id: makeEntityId("bonus", item.name),
  name: item.name,
  effect_ids: [],
  source_type: "community_reference",
  source_url: item.source_url,
  source_version: nwHubSourceVersion,
  verification_status: "verified",
  notes: `Roles: ${item.roles.join(", ")}. ${item.text}`,
}));

const artifactEffectMap: Record<string, string[]> = {
  "Halaster's Blast Scepter": ["effect-halaster-defense"],
  "Wyvern-Venom Coated Knives": ["effect-wyvern-incoming"],
  "Charm of the Serpent": ["effect-charm-serpent-incoming"],
  "Lantern of Revelation": ["effect-lantern-incoming"],
  "Xeleth's Blast Scepter": ["effect-halaster-defense"],
};

function inferArtifactCategoryFromText(text: string): Artifact["category"] {
  const normalized = text.toLowerCase();

  if (/lowered by|more damage|debuff|reduced/i.test(normalized)) {
    return "debuff";
  }

  if (/allies|party|team/i.test(normalized)) {
    return "support";
  }

  if (/heal|shield|immunity|cleanse/i.test(normalized)) {
    return "utility";
  }

  return "personal_burst";
}

export const artifacts: Artifact[] = nwHubArtifactsRaw.map((item, index) => ({
  id: makeEntityId("artifact", item.name),
  name: item.name,
  category: inferArtifactCategoryFromText(item.powertext),
  exact_value: parsePercentValue(item.powertext),
  duration_sec: (() => {
    const match = item.powertext.match(/for (\d+(?:\.\d+)?) seconds?/i);
    return match ? Number(match[1]) : null;
  })(),
  cooldown_sec: (() => {
    const match = item.powertext.match(/cooldown .*? (\d+(?:\.\d+)?)%/i);
    return match ? Number(match[1]) : null;
  })(),
  rank_order: index + 1,
  team_or_personal: artifactEffectMap[item.name]?.length ? "team" : "personal",
  effect_ids: artifactEffectMap[item.name] ?? [],
  image_url: item.image_url,
  source_type: "community_reference",
  source_url: item.source_url,
  source_version: nwHubSourceVersion,
  verification_status: "verified",
  notes:
    "Directly extracted from NW Hub artifact data on 2026-04-04. Full rank and stat data remain available in the NW Hub snapshot files under data/nw-hub.",
}));

export const artifactSnapshots = nwHubArtifactsRaw;
export const companionSnapshots = nwHubCompanionsRaw;
export const companionEnhancementSnapshots = nwHubCompanionEnhancementsRaw;
export const companionPowerSnapshots = nwHubCompanionPowersRaw;
export const classSnapshots = nwHubClassMetaRaw;

type MountSheetRow = {
  name: string;
  note: string;
  damageType: MountCombatPower["damage_type"];
  trialBenefit?: number | null;
  dungeonBenefit?: number | null;
  effectIds?: string[];
  canCrit?: boolean;
  canGainCa?: boolean;
  affectedByTeamBuffs?: boolean;
  affectedByBossDebuffs?: boolean;
};

const mountCombatRows: MountSheetRow[] = [
  {
    name: "Hag's Enchanted Cauldron",
    note: "-7.5% to enemy defense and crit avoidance. Trial support ranking #1, dungeon support ranking #1 from the Aragon mount sheet.",
    damageType: "utility",
    trialBenefit: 0.075,
    dungeonBenefit: 0.075,
    effectIds: ["effect-hag-defense", "effect-hag-crit-avoid"],
    canCrit: false,
    canGainCa: false,
    affectedByTeamBuffs: false,
    affectedByBossDebuffs: false,
  },
  {
    name: "Pegasus",
    note: "1,000 magnitude damage and allies gain +15% damage or damage resist or healing depending on role. Trial and dungeon support ranking 7.89%.",
    damageType: "mixed",
    trialBenefit: 0.0789,
    dungeonBenefit: 0.0789,
    effectIds: ["effect-pegasus-team-damage"],
  },
  {
    name: "Red Dragon",
    note: "-15% to target critical avoidance, -15% to target outgoing damage, +15% damage to caster and crit strike + accuracy. Trial support ranking 7.46%, dungeon support ranking 7.46%.",
    damageType: "mixed",
    trialBenefit: 0.0746,
    dungeonBenefit: 0.0746,
    effectIds: [
      "effect-red-dragon-owner-damage",
      "effect-red-dragon-owner-crit",
      "effect-red-dragon-boss-crit-avoid",
      "effect-red-dragon-boss-outgoing-damage",
      "effect-red-dragon-owner-accuracy",
    ],
  },
  {
    name: "Glorious Undead Lion",
    note: "+16% incoming damage received by targets and reduces their accuracy by 16%. Trial support ranking 6.40%, dungeon support ranking 8.42%.",
    damageType: "mixed",
    trialBenefit: 0.064,
    dungeonBenefit: 0.0842,
    effectIds: ["effect-undead-lion-incoming", "effect-undead-lion-accuracy"],
  },
  {
    name: "Twice-Paled Alder",
    note: "+16% incoming damage received by targets and reduces their outgoing damage by 16%. Trial support ranking 6.40%, dungeon support ranking 8.42%.",
    damageType: "mixed",
    trialBenefit: 0.064,
    dungeonBenefit: 0.0842,
    effectIds: ["effect-alder-incoming", "effect-alder-outgoing"],
  },
  {
    name: "Phantom Panther",
    note: "+16% incoming damage received by targets and reduces their critical strike by 16%. Trial support ranking 6.40%, dungeon support ranking 8.42%.",
    damageType: "mixed",
    trialBenefit: 0.064,
    dungeonBenefit: 0.0842,
    effectIds: ["effect-panther-incoming", "effect-panther-crit-strike"],
  },
  {
    name: "Swarm",
    note: "+15% incoming damage received by target with -15% to outgoing damage and critical chance. Trial support ranking 6.00%, dungeon support ranking 7.89%.",
    damageType: "utility",
    trialBenefit: 0.06,
    dungeonBenefit: 0.0789,
    effectIds: ["effect-swarm-incoming", "effect-swarm-outgoing", "effect-swarm-crit-strike"],
  },
  {
    name: "Eclipse Lion",
    note: "600 magnitude damage, 15% incoming damage received and 15% outgoing damage reduced to the targets. Trial support ranking 6.00%, dungeon support ranking 7.89%.",
    damageType: "mixed",
    trialBenefit: 0.06,
    dungeonBenefit: 0.0789,
    effectIds: ["effect-eclipse-lion-incoming", "effect-eclipse-lion-outgoing"],
  },
  {
    name: "King of Spines / Tyrannosaur",
    note: "6s root to controllable targets with 15% incoming damage received, with minion consume. Trial support ranking 6.00%, dungeon support ranking 7.89%.",
    damageType: "physical",
    trialBenefit: 0.06,
    dungeonBenefit: 0.0789,
    effectIds: ["effect-tyrannosaur-incoming"],
  },
  {
    name: "Brain Stealer Dragon",
    note: "+15% incoming damage received to targets. Trial support ranking 6.00%, dungeon support ranking 7.89%.",
    damageType: "mixed",
    trialBenefit: 0.06,
    dungeonBenefit: 0.0789,
    effectIds: ["effect-brain-stealer-incoming"],
  },
  {
    name: "Bestial Fire Archon",
    note: "+15% incoming damage received to targets within magma pools. Trial support ranking 6.00%, dungeon support ranking 7.89%.",
    damageType: "magical",
    trialBenefit: 0.06,
    dungeonBenefit: 0.0789,
    effectIds: ["effect-fire-archon-incoming"],
  },
  {
    name: "Balgora",
    note: "750 magnitude damage, 20 magnitude DoT for 10s and +11% damage taken by targets. Trial support ranking 4.40%, dungeon support ranking 5.79%.",
    damageType: "mixed",
    trialBenefit: 0.044,
    dungeonBenefit: 0.0579,
    effectIds: ["effect-balgora-incoming"],
  },
  {
    name: "Reconnaissance Balloons",
    note: "800 magnitude with +7.5% damage taken by targets. Treasure increases a random stat by 1.5% for 10s. Trial support ranking 3.00%, dungeon support ranking 3.95%.",
    damageType: "utility",
    trialBenefit: 0.03,
    dungeonBenefit: 0.0395,
    effectIds: ["effect-balloons-incoming"],
  },
  {
    name: "Cauldron",
    note: "115 magnitude DoT for 10s and all allies gain +15% Accuracy and Combat Advantage. Sheet notes zero gain at capped assumptions.",
    damageType: "utility",
    trialBenefit: 0,
    dungeonBenefit: 0,
    effectIds: ["effect-cauldron-team-accuracy", "effect-cauldron-team-ca"],
  },
  {
    name: "Salamander",
    note: "+15% damage buff to caster. Target is slowed, -15% deflect, -15% damage, -13% crit chance. Sheet notes zero gain at capped assumptions.",
    damageType: "physical",
    trialBenefit: 0,
    dungeonBenefit: 0,
    effectIds: ["effect-salamander-owner-damage", "effect-salamander-deflect", "effect-salamander-outgoing", "effect-salamander-crit-strike"],
  },
  {
    name: "Demonic Gravehound",
    note: "Physical 3,938 + 394 magnitude damage against control immune enemies, so bosses.",
    damageType: "physical",
  },
  {
    name: "Grubshank the Burdened",
    note: "Magical 2,362 + 2,264 DoT for 5s.",
    damageType: "magical",
  },
  {
    name: "Hellfire Engine",
    note: "Magical 1,969 + 2,264 DoT for 5s.",
    damageType: "magical",
  },
  {
    name: "Tunnel Vision",
    note: "Magical 3,938 magnitude damage.",
    damageType: "magical",
  },
  {
    name: "Legendary Giant Toad",
    note: "Magical 3,938 magnitude damage.",
    damageType: "magical",
  },
  {
    name: "Golden Warhorse",
    note: "Magical 3,938 magnitude damage.",
    damageType: "magical",
  },
  {
    name: "Bigby's Hand",
    note: "Physical 3,347 + 591 magnitude damage against control immune enemies, so bosses.",
    damageType: "physical",
  },
];

export const mountCombatPowers: MountCombatPower[] = mountCombatRows.map((item) => {
  const mountId = makeEntityId("mount", item.name);

  return {
    id: makeEntityId("combat", item.name),
    name: item.name,
    mount_id: mountId,
    base_hit: null,
    base_magnitude: null,
    damage_type: item.damageType,
    can_crit: item.canCrit ?? true,
    can_gain_ca: item.canGainCa ?? true,
    affected_by_team_buffs: item.affectedByTeamBuffs ?? true,
    affected_by_boss_debuffs: item.affectedByBossDebuffs ?? true,
    effect_ids: item.effectIds ?? [],
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: [
      item.note,
      item.trialBenefit != null ? `Trial support value: ${(item.trialBenefit * 100).toFixed(2)}%.` : null,
      item.dungeonBenefit != null ? `Dungeon support value: ${(item.dungeonBenefit * 100).toFixed(2)}%.` : null,
    ]
      .filter(Boolean)
      .join(" "),
  };
});

const mountEquipRows = [
  { mountName: "Ebon Riding Lizard", powerName: "Pack Tactics", note: "+2,953 Combat Advantage and Awareness." },
  { mountName: "Myconid Bulette", powerName: "Mystic Aura", note: "+2,953 Power and Accuracy." },
  { mountName: "Manticore", powerName: "Runic Aura", note: "+2,953 Power and Defense." },
  { mountName: "Dragon Chicken", powerName: "Avian Aura", note: "Forte and Power." },
  { mountName: "Turmish Lion", powerName: "Ferocity", note: "Extra damage per hit." },
] as const;

export const mountEquipPowers: MountEquipPower[] = mountEquipRows.map((item) => ({
  id: makeEntityId("equip", `${item.mountName}-${item.powerName}`),
  name: `${item.mountName} - ${item.powerName}`,
  mount_id: makeEntityId("mount", item.mountName),
  effect_ids: [],
  source_type: "user_sheet",
  source_url: mountSheetSourceUrl,
  source_version: mountSheetSourceVersion,
  verification_status: "partially_recovered",
  notes: item.note,
}));

export const mounts: Mount[] = Array.from(
  new Set([
    ...mountCombatRows.map((item) => item.name),
    ...mountEquipRows.map((item) => item.mountName),
  ]),
).map((name) => {
  const mountId = makeEntityId("mount", name);
  const combatIds = mountCombatPowers.filter((item) => item.mount_id === mountId).map((item) => item.id);
  const equipIds = mountEquipPowers.filter((item) => item.mount_id === mountId).map((item) => item.id);

  return {
    id: mountId,
    name,
    mount_type: combatIds.length > 0 && equipIds.length === 0 ? "damage" : combatIds.some((id) => mountCombatPowers.find((power) => power.id === id)?.effect_ids.length) ? "support" : "utility",
    combat_power_ids: combatIds,
    equip_power_ids: equipIds,
    source_type: "user_sheet",
    source_url: mountSheetSourceUrl,
    source_version: mountSheetSourceVersion,
    verification_status: "partially_recovered",
    notes: "Imported from the Aragon mount support sheet. Keep live values patch-aware and source-aware.",
  };
});

export const insigniaBonuses: InsigniaBonus[] = [
  {
    id: "insignia-warlord",
    name: "Warlord's Inspiration",
    effect_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Recovered from the 4-slot mount seed.",
  },
  {
    id: "insignia-shepherd",
    name: "Shepherd's Devotion",
    effect_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Recovered from the 4-slot mount seed.",
  },
  {
    id: "insignia-gladiator",
    name: "Gladiator's Guile",
    effect_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Recovered from the 4-slot mount seed.",
  },
];

export const bossPresets: BossPreset[] = [
  {
    id: "boss-default-training-dummy",
    name: "Training Dummy Baseline",
    defense: 0.5,
    awareness: 0,
    critical_avoidance: 0,
    deflect: 0.5,
    typed_tags: ["baseline"],
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1N2ylc1q9fM2lJ555t4NZrdC8f-bZmL25/edit?gid=507744579",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Recovered from the PvE damage formula workbook defaults.",
  },
  {
    id: "boss-trial-generic",
    name: "Trial Boss Shell",
    defense: 0.5,
    awareness: 0,
    critical_avoidance: 0,
    deflect: 0.5,
    typed_tags: ["trial", "generic"],
    source_type: "inferred_seed",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "inferred",
    notes: "Uses formula defaults until a boss-specific live preset is verified.",
  },
];

export const patchChanges: PatchChange[] = [
  {
    id: "patch-global-buff-categories",
    name: "Global long-term buff category rule",
    date: "2015-11-05",
    category: "system",
    affected_entity: "long_term_buffs",
    before: "Multiple long-term consumables could be layered more loosely.",
    after: "Only one buff from each long-term category can be active.",
    importance: "critical",
    source_type: "community_reference",
    source_url: "https://neverwinter-mmo.fandom.com/wiki/Patch_Notes",
    source_version: "historical",
    verification_status: "partially_recovered",
    notes: "Core non-stacking rule for the app.",
  },
  {
    id: "patch-companion-shields-2023",
    name: "Companion shield standardization",
    date: "2023-06-15",
    category: "companions",
    affected_entity: "companion_shields",
    before: "Support shields had inconsistent stacking behavior.",
    after: "Companion shields stack with player shields but not with other companion shields.",
    importance: "high",
    source_type: "community_reference",
    source_url:
      "https://steamcommunity.com/app/109600/discussions/0/5570437336430646936/",
    source_version: "2023-06-15",
    verification_status: "verified",
    notes: "Use for support logic and patch tracker.",
  },
  {
    id: "patch-support-companion-overhaul-2024",
    name: "Support companion uptime overhaul",
    date: "2024-01-18",
    category: "companions",
    affected_entity: "support_companions",
    before: "Many support companions behaved like unreliable proc pets.",
    after: "Recent notes describe more consistent uptime and wider ally coverage.",
    importance: "high",
    source_type: "official_archive",
    source_url: "https://www.arcgames.com/en/games/neverwinter/news/tag/nw-patch-notes",
    source_version: "2024",
    verification_status: "partially_recovered",
    notes: "Applied as a modeling rule in the effect engine.",
  },
  {
    id: "patch-tempus-arena-2026",
    name: "Tempus Arena special systems",
    date: "2026-01-01",
    category: "module",
    affected_entity: "events",
    before: "No Tempus Arena special event system.",
    after: "Tempus Arena surfaced with event-specific buff systems and restrictions.",
    importance: "medium",
    source_type: "official_announcement",
    source_url: "https://steamcommunity.com/app/109600/announcements/",
    source_version: "module_32_5",
    verification_status: "partially_recovered",
    notes: "Exact date should be verified against a live announcement before publishing hard chronology.",
  },
];

export const moduleTimeline = [
  "Module 30 - As Above, So Below: Return to Pirates' Skyhold",
  "Module 31 - Red Harvest",
  "Module 32 - Red Harvest Part II: The Soul Collector",
  "Module 32.5 - Tempus Arena - The Slaughterhouse",
];

export const glossaryTerms = [
  {
    term: "Carry DPS",
    definition:
      "The one team member explicitly optimized by the rest of the composition. The app lets exactly one member be flagged as the carry.",
  },
  {
    term: "Typed Vulnerability",
    definition:
      "Damage support that only applies to a damage family such as physical, magical, or projectile. It must stay separate from universal debuffs.",
  },
  {
    term: "Verification Status",
    definition:
      "A field that labels whether a value is verified, partially recovered, inferred, or still needs live checking.",
  },
];

export const knowledgeSections = [
  {
    title: "Best support companions",
    points: [
      "Tutor remains a carry-focused CA support seed.",
      "Drizzt Do'Urden is seeded as a team damage companion.",
      "Portobello DaVinci covers both Power and Combat Advantage.",
    ],
  },
  {
    title: "Best ST companions",
    points: [
      "Sardina the Tressym leads the recovered ST ranking at 179,561.",
      "Blaspheme Assassin and Lysaera remain top verified options.",
      "Tutor keeps relevance when the group needs support coverage more than raw summon DPS.",
    ],
  },
  {
    title: "Best debuff artifacts",
    points: [
      "Mythallar Fragment sits at the top of the recovered debuff ranking but still needs exact live value verification.",
      "Halaster's Blast Scepter has a verified 15% defense reduction tooltip reference.",
      "Charm of the Serpent and Lantern of Revelation have verified incoming damage values.",
    ],
  },
];

export const dungeons = [
  {
    id: "dungeon-generic",
    name: "Dungeon Planning Shell",
    size: 5,
    current_relevance: "Core mode for fast support-package planning.",
    notes:
      "The repo currently seeds system-aware planning patterns first; dungeon-specific mechanics stay open for future verified ingestion.",
  },
];

export const trials = [
  {
    id: "trial-tempus-arena",
    name: "Tempus Arena - The Slaughterhouse",
    size: 10,
    current_relevance: "Recent trial-era special system reference from official announcements.",
    notes:
      "Use two groups of five and keep event-specific restrictions patch-aware.",
  },
];

export const events = [
  {
    id: "event-gods-and-glory",
    name: "For Gods and Glory Battle Pass",
    notes: "Surfaced in recent official announcements and useful for the event page seed.",
  },
];

export function createInitialTeamMembers(mode: "dungeon" | "trial"): TeamMember[] {
  const total = mode === "trial" ? 10 : 5;

  return Array.from({ length: total }, (_, index) => {
    const slot = index + 1;
    const group = slot <= 5 ? "A" : "B";

    return {
      id: `member-${slot}`,
      group,
      slot,
      label: `Empty Slot ${slot}`,
      class_id: "",
      paragon: "",
      race: "",
      role: "support",
      encounter_ids: [],
      daily_ids: [],
      feature_ids: [],
      artifact_id: "",
      companion_id: "",
      enhancement_id: "",
      companion_bonus_id: "",
      mount_id: "",
      mount_combat_power_id: "",
      mount_equip_power_id: "",
      insignia_bonus_ids: ["", "", ""],
      notes: "",
      is_carry: false,
      personal_overrides: {},
    };
  });
}
