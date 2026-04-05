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
  artifactRankingSheetSourceUrl,
  artifactRankingSheetSourceVersion,
  dungeonArtifactRankingRows,
  trialArtifactRankingRows,
} from "@/data/google-sheet/artifact-rankings";
import {
  companionEnhancementRankingRows,
  companionEnhancementSheetSourceUrl,
  companionEnhancementSheetSourceVersion,
} from "@/data/google-sheet/companion-enhancements";
import {
  mountEquipBonusRows,
  mountSheetSourceUrl,
  mountSheetSourceVersion,
  mountSingleTargetDamageRows,
  mountSupportDungeonRows,
  mountSupportTrialRows,
} from "@/data/google-sheet/mounts";
import {
  recommendedSupportCompanionRows,
  supportCompanionSheetSourceUrl,
  supportCompanionSheetSourceVersion,
  trialMandatorySupportCompanionRows,
} from "@/data/google-sheet/support-companions";
import {
  companionDamageSheetSourceUrl,
  companionDamageSheetSourceVersion,
  singleTargetCompanionRows,
} from "@/data/google-sheet/companion-damage";
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

function normalizeLookup(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getAliasLabels(value: string) {
  return value
    .split("/")
    .map((item) => normalizeLookup(item))
    .filter(Boolean);
}

function matchesRecommendationLabel(entityName: string, label: string) {
  const normalizedEntityName = normalizeLookup(entityName);

  return getAliasLabels(label).some((alias) => {
    return (
      normalizedEntityName === alias ||
      normalizedEntityName.includes(alias) ||
      alias.includes(normalizedEntityName)
    );
  });
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
    value: 0.09,
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
    value: 0.09,
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
    value: 0.09,
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
    value: 0.09,
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
    id: "effect-black-death-scorpion-ca-coverage",
    name: "Black Death Scorpion CA Coverage",
    effect_category: "carry_only",
    stat: "combat_advantage",
    value: null,
    stack_rule: "strongest_only",
    scope: "carry",
    source_type: "user_sheet",
    source_url: supportCompanionSheetSourceUrl,
    source_version: supportCompanionSheetSourceVersion,
    verification_status: "verified",
    notes: "Trial-mandatory support coverage flag. Grants combat advantage uptime, but no direct numeric CA percent is asserted here.",
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

const stCompanionRankingByName = new Map(
  singleTargetCompanionRows.map((row) => [normalizeLookup(row.name), row]),
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
  "Black Death Scorpion": {
    st_dps: null,
    max_hit: null,
    effect_ids: ["effect-black-death-scorpion-ca-coverage"],
    source_type: "user_sheet",
    source_url: companionDamageSheetSourceUrl,
    source_version: companionDamageSheetSourceVersion,
    verification_status: "verified",
    notes: "Trial CA support pick. ST damage was marked broken in training room in the recovered proof.",
  },
};

function getSupportCompanionRecommendation(name: string) {
  return recommendedSupportCompanionRows.find((row) => matchesRecommendationLabel(name, row.name)) ?? null;
}

function getSingleTargetCompanionRecommendation(name: string) {
  return stCompanionRankingByName.get(normalizeLookup(name)) ?? null;
}

function getTrialMandatorySupportCompanion(name: string) {
  return trialMandatorySupportCompanionRows.find((row) => matchesRecommendationLabel(name, row.name)) ?? null;
}

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
  const recommendation = getSupportCompanionRecommendation(item.name);
  const stRecommendation = getSingleTargetCompanionRecommendation(item.name);
  const trialMandatory = getTrialMandatorySupportCompanion(item.name);

  return {
    id: makeEntityId("comp", item.name),
    name: item.name,
    role_tag: getCompanionRoleTag(item.type, item.playerBonusName),
    archetype: `${item.type} / ${roles.length ? roles.join(", ") : "mixed roles"}`,
    st_dps: seeded?.st_dps ?? stRecommendation?.stDps ?? null,
    max_hit: seeded?.max_hit ?? stRecommendation?.maxHit ?? null,
    effect_ids: seeded?.effect_ids ?? [],
    source_type:
      recommendation || stRecommendation || trialMandatory ? "user_sheet" : (seeded?.source_type ?? "community_reference"),
    source_url:
      recommendation
        ? supportCompanionSheetSourceUrl
        : stRecommendation || trialMandatory
          ? companionDamageSheetSourceUrl
          : (seeded?.source_url ?? item.source_url),
    source_version:
      recommendation
        ? supportCompanionSheetSourceVersion
        : stRecommendation || trialMandatory
          ? companionDamageSheetSourceVersion
          : (seeded?.source_version ?? nwHubSourceVersion),
    verification_status: seeded?.verification_status ?? "verified",
    notes: [
      recommendation
        ? `Recommended support companion #${recommendation.rank}. Benefit: ${recommendation.benefit}. Rough damage boost ${recommendation.roughDamageBoost?.toFixed(2) ?? "pending"}%.`
        : null,
      stRecommendation
        ? `Single-target ranking #${stRecommendation.rank}.${stRecommendation.stDps != null ? ` ST DPS ${stRecommendation.stDps.toLocaleString()}.` : ""}${stRecommendation.maxHit != null ? ` Max hit ${stRecommendation.maxHit.toLocaleString()}.` : ""}`
        : null,
      trialMandatory
        ? `Trial mandatory support pick. ${trialMandatory.benefit}. ${trialMandatory.usage}`
        : null,
      seeded?.notes ??
        `Player bonus: ${item.playerBonusName}. Enhancement: ${item.enhancementPower}. Imported from the local NW Hub companion list snapshot.`,
      recommendation?.notes ?? null,
      stRecommendation?.notes ?? null,
    ]
      .filter(Boolean)
      .join(" "),
  };
});

export const recommendedSupportCompanions = recommendedSupportCompanionRows.map((row) => ({
  ...row,
  companionIds: companions.filter((item) => matchesRecommendationLabel(item.name, row.name)).map((item) => item.id),
}));

export const recommendedSingleTargetCompanions = singleTargetCompanionRows.map((row) => ({
  ...row,
  companionIds: companions.filter((item) => matchesRecommendationLabel(item.name, row.name)).map((item) => item.id),
}));

export const trialMandatorySupportCompanions = trialMandatorySupportCompanionRows.map((row) => ({
  ...row,
  companionIds: companions.filter((item) => matchesRecommendationLabel(item.name, row.name)).map((item) => item.id),
}));

const companionEnhancementEffectMap: Record<string, string[]> = {
  "Armor Break": ["effect-armor-break-defense"],
  "Dulled Senses": ["effect-dulled-senses-awareness"],
  Vulnerability: ["effect-vulnerability-crit-avoid"],
  "Slowed Reactions": ["effect-slowed-reactions-deflect"],
};

const enhancementRecommendationByName = new Map(
  companionEnhancementRankingRows.map((row) => [normalizeLookup(row.name), row]),
);

export const companionEnhancements: CompanionEnhancement[] = nwHubCompanionEnhancementsRaw.map((item) => {
  const recommendation = enhancementRecommendationByName.get(normalizeLookup(item.name));

  return {
    id: makeEntityId("enh", item.name),
    name: item.name,
    effect_ids: companionEnhancementEffectMap[item.name] ?? [],
    source_type: recommendation ? "user_sheet" : "community_reference",
    source_url: recommendation ? companionEnhancementSheetSourceUrl : item.source_url,
    source_version: recommendation ? companionEnhancementSheetSourceVersion : nwHubSourceVersion,
    verification_status: "verified",
    notes: [
      recommendation
        ? `Recommended enhancement #${recommendation.rank}. Companion source: ${recommendation.companion}. Benefit: ${recommendation.benefit}. Damage boost: ${recommendation.damageBoost == null ? "survivability / unresolved" : `${recommendation.damageBoost.toFixed(2)}%`}.`
        : null,
      "Directly extracted from NW Hub companion enhancement data on 2026-04-04. Effect IDs are attached only for the currently supported boss-debuff categories.",
    ]
      .filter(Boolean)
      .join(" "),
  };
});

export const recommendedCompanionEnhancements = companionEnhancementRankingRows.map((row) => ({
  ...row,
  enhancementId:
    companionEnhancements.find((item) => normalizeLookup(item.name) === normalizeLookup(row.name))?.id ?? null,
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
  source_type:
    trialArtifactRankingRows.some((row) => matchesRecommendationLabel(item.name, row.label)) ||
    dungeonArtifactRankingRows.some((row) => matchesRecommendationLabel(item.name, row.label))
      ? "user_sheet"
      : "community_reference",
  source_url:
    trialArtifactRankingRows.some((row) => matchesRecommendationLabel(item.name, row.label)) ||
    dungeonArtifactRankingRows.some((row) => matchesRecommendationLabel(item.name, row.label))
      ? artifactRankingSheetSourceUrl
      : item.source_url,
  source_version:
    trialArtifactRankingRows.some((row) => matchesRecommendationLabel(item.name, row.label)) ||
    dungeonArtifactRankingRows.some((row) => matchesRecommendationLabel(item.name, row.label))
      ? artifactRankingSheetSourceVersion
      : nwHubSourceVersion,
  verification_status: "verified",
  notes: [
    (() => {
      const trialRow = trialArtifactRankingRows.find((row) => matchesRecommendationLabel(item.name, row.label));
      return trialRow
        ? `Trial recommended artifact #${trialRow.rank}. Damage boost ${trialRow.damageBoost.toFixed(2)}% over ${trialRow.duration}. ${trialRow.notes || ""}`.trim()
        : null;
    })(),
    (() => {
      const dungeonRow = dungeonArtifactRankingRows.find((row) => matchesRecommendationLabel(item.name, row.label));
      return dungeonRow
        ? `Dungeon recommended artifact #${dungeonRow.rank}. Damage boost ${dungeonRow.damageBoost.toFixed(2)}% over ${dungeonRow.duration}. ${dungeonRow.notes || ""}`.trim()
        : null;
    })(),
    "Directly extracted from NW Hub artifact data on 2026-04-04. Full rank and stat data remain available in the NW Hub snapshot files under data/nw-hub.",
  ]
    .filter(Boolean)
    .join(" "),
}));

export const artifactTrialRecommendations = trialArtifactRankingRows.map((row) => ({
  ...row,
  artifactIds: artifacts.filter((item) => matchesRecommendationLabel(item.name, row.label)).map((item) => item.id),
}));

export const artifactDungeonRecommendations = dungeonArtifactRankingRows.map((row) => ({
  ...row,
  artifactIds: artifacts.filter((item) => matchesRecommendationLabel(item.name, row.label)).map((item) => item.id),
}));

export const artifactRecommendationsById = Object.fromEntries(
  artifacts.map((artifact) => [
    artifact.id,
    {
      trial: trialArtifactRankingRows.find((row) => matchesRecommendationLabel(artifact.name, row.label)) ?? null,
      dungeon:
        dungeonArtifactRankingRows.find((row) => matchesRecommendationLabel(artifact.name, row.label)) ?? null,
    },
  ]),
);

export const companionRecommendationsById = Object.fromEntries(
  companions.map((companion) => [companion.id, getSupportCompanionRecommendation(companion.name)]),
);

export const singleTargetCompanionRecommendationsById = Object.fromEntries(
  companions.map((companion) => [companion.id, getSingleTargetCompanionRecommendation(companion.name)]),
);

export const trialMandatoryCompanionById = Object.fromEntries(
  companions.map((companion) => [companion.id, getTrialMandatorySupportCompanion(companion.name)]),
);

export const enhancementRecommendationsById = Object.fromEntries(
  companionEnhancements.map((enhancement) => [
    enhancement.id,
    enhancementRecommendationByName.get(normalizeLookup(enhancement.name)) ?? null,
  ]),
);

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

const mountEffectMap: Record<string, string[]> = {
  "Hag's Enchanted Cauldron": ["effect-hag-defense", "effect-hag-crit-avoid"],
  Pegasus: ["effect-pegasus-team-damage"],
  "Red Dragon": [
    "effect-red-dragon-owner-damage",
    "effect-red-dragon-owner-crit",
    "effect-red-dragon-boss-crit-avoid",
    "effect-red-dragon-boss-outgoing-damage",
    "effect-red-dragon-owner-accuracy",
  ],
  "Glorious Undead Lion": ["effect-undead-lion-incoming", "effect-undead-lion-accuracy"],
  "Twice-Paled Alder": ["effect-alder-incoming", "effect-alder-outgoing"],
  "Phantom Panther": ["effect-panther-incoming", "effect-panther-crit-strike"],
  Swarm: ["effect-swarm-incoming", "effect-swarm-outgoing", "effect-swarm-crit-strike"],
  "Eclipse Lion": ["effect-eclipse-lion-incoming", "effect-eclipse-lion-outgoing"],
  "King of Spines / Tyrannosaur": ["effect-tyrannosaur-incoming"],
  "Brain Stealer Dragon": ["effect-brain-stealer-incoming"],
  "Bestial Fire Archon": ["effect-fire-archon-incoming"],
  Balgora: ["effect-balgora-incoming"],
  "Reconnaissance Balloons": ["effect-balloons-incoming"],
  Cauldron: ["effect-cauldron-team-accuracy", "effect-cauldron-team-ca"],
  Salamander: ["effect-salamander-owner-damage", "effect-salamander-deflect", "effect-salamander-outgoing", "effect-salamander-crit-strike"],
};

const dungeonBenefitMap = new Map(
  mountSupportDungeonRows.map((item) => [item.name, item.damageBoostAtMythic100Bolster]),
);

function getSheetMountDamageType(name: string): MountCombatPower["damage_type"] {
  if (name === "Bestial Fire Archon") {
    return "magical";
  }

  if (name === "King of Spines / Tyrannosaur" || name === "Salamander") {
    return "physical";
  }

  if (
    name === "Hag's Enchanted Cauldron" ||
    name === "Swarm" ||
    name === "Cauldron" ||
    name === "Reconnaissance Balloons"
  ) {
    return "utility";
  }

  return "mixed";
}

const mountCombatRows: MountSheetRow[] = [
  ...mountSupportTrialRows.map((item) => ({
    name: item.name,
    note: `${item.sourceNote}${item.rank ? ` Trial support ranking #${item.rank}.` : ""}`,
    damageType: getSheetMountDamageType(item.name),
    trialBenefit:
      item.damageBoostAt150Debuffs90Buffs != null ? item.damageBoostAt150Debuffs90Buffs / 100 : null,
    dungeonBenefit:
      dungeonBenefitMap.get(item.name) != null ? (dungeonBenefitMap.get(item.name) as number) / 100 : null,
    effectIds: mountEffectMap[item.name] ?? [],
    canCrit: item.name !== "Hag's Enchanted Cauldron",
    canGainCa: item.name !== "Hag's Enchanted Cauldron",
    affectedByTeamBuffs: item.name !== "Hag's Enchanted Cauldron",
    affectedByBossDebuffs: item.name !== "Hag's Enchanted Cauldron",
  })),
  ...mountSingleTargetDamageRows.map((item) => ({
    name: item.name,
    note: item.sourceNote,
    damageType: item.damageType,
    effectIds: mountEffectMap[item.name] ?? [],
  })),
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

export const mountEquipPowers: MountEquipPower[] = mountEquipBonusRows.map((item) => ({
  id: makeEntityId("equip", `${item.mountName}-${item.powerName}`),
  name: `${item.mountName} - ${item.powerName}`,
  mount_id: makeEntityId("mount", item.mountName),
  effect_ids: [],
  source_type: "user_sheet",
  source_url: mountSheetSourceUrl,
  source_version: mountSheetSourceVersion,
  verification_status: "partially_recovered",
  notes: item.sourceNote,
}));

export const mounts: Mount[] = Array.from(
    new Set([
      ...mountCombatRows.map((item) => item.name),
      ...mountEquipBonusRows.map((item) => item.mountName),
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
