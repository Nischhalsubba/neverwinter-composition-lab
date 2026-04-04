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

export const companions: Companion[] = [
  {
    id: "comp-tutor",
    name: "Tutor",
    role_tag: "support",
    archetype: "Carry support",
    st_dps: 130617,
    max_hit: 340432,
    effect_ids: ["effect-tutor-ca", "effect-tutor-coverage"],
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "ST ranking value recovered directly; support effect comes from connected seed notes.",
  },
  {
    id: "comp-drizzt",
    name: "Drizzt Do'Urden",
    role_tag: "support",
    archetype: "Team damage support",
    st_dps: 48642,
    max_hit: 69128,
    effect_ids: ["effect-drizzt-damage"],
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support value seeded from the docs, ST figure from the recovered ranking table.",
  },
  {
    id: "comp-portobello",
    name: "Portobello DaVinci",
    role_tag: "support",
    archetype: "Power and CA support",
    st_dps: 57399,
    max_hit: 345825,
    effect_ids: ["effect-portobello-power", "effect-portobello-ca"],
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support values were explicitly called out in the docs.",
  },
  {
    id: "comp-sardina",
    name: "Sardina the Tressym",
    role_tag: "st",
    archetype: "Single target summon",
    st_dps: 179561,
    max_hit: null,
    effect_ids: [],
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Top recovered ST ranking from the Aragon sheet.",
  },
  {
    id: "comp-blaspheme",
    name: "Blaspheme Assassin",
    role_tag: "st",
    archetype: "Single target summon",
    st_dps: 164299,
    max_hit: null,
    effect_ids: [],
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Recovered directly from the ST ranking proof.",
  },
  {
    id: "comp-lysaera",
    name: "Lysaera",
    role_tag: "st",
    archetype: "Single target summon",
    st_dps: 160581,
    max_hit: null,
    effect_ids: [],
    source_type: "user_sheet",
    source_url:
      "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=999278265",
    source_version: moduleVersion,
    verification_status: "verified",
    notes: "Recovered directly from the ST ranking proof.",
  },
];

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
export const companionEnhancementSnapshots = nwHubCompanionEnhancementsRaw;
export const companionPowerSnapshots = nwHubCompanionPowersRaw;
export const classSnapshots = nwHubClassMetaRaw;

export const mountCombatPowers: MountCombatPower[] = [
  {
    id: "combat-uni-party",
    name: "Uni the Unicorn",
    mount_id: "mount-uni",
    base_hit: null,
    base_magnitude: null,
    damage_type: "utility",
    can_crit: false,
    can_gain_ca: false,
    affected_by_team_buffs: false,
    affected_by_boss_debuffs: false,
    effect_ids: ["effect-uni-ca"],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Party +5% Combat Advantage for 10 seconds.",
  },
  {
    id: "combat-red-dragon",
    name: "Red Dragon",
    mount_id: "mount-red-dragon",
    base_hit: null,
    base_magnitude: null,
    damage_type: "mixed",
    can_crit: true,
    can_gain_ca: true,
    affected_by_team_buffs: true,
    affected_by_boss_debuffs: true,
    effect_ids: [
      "effect-red-dragon-owner-damage",
      "effect-red-dragon-owner-crit",
      "effect-red-dragon-boss-crit-avoid",
    ],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Owner and target package recovered from the support mount seed.",
  },
  {
    id: "combat-slab-vecna",
    name: "Slab of Vecna",
    mount_id: "mount-slab-vecna",
    base_hit: null,
    base_magnitude: null,
    damage_type: "physical",
    can_crit: true,
    can_gain_ca: true,
    affected_by_team_buffs: true,
    affected_by_boss_debuffs: true,
    effect_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Strong personal damage boost on the caster; exact live numbers not recovered.",
  },
];

export const mountEquipPowers: MountEquipPower[] = [
  {
    id: "equip-zodar",
    name: "Zodar Armor",
    mount_id: "mount-zodar",
    effect_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support seed includes a +15% damage package, but internal exact modeling remains pending.",
  },
];

export const mounts: Mount[] = [
  {
    id: "mount-uni",
    name: "Uni the Unicorn",
    mount_type: "support",
    combat_power_ids: ["combat-uni-party"],
    equip_power_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support mount seed.",
  },
  {
    id: "mount-red-dragon",
    name: "Red Dragon",
    mount_type: "support",
    combat_power_ids: ["combat-red-dragon"],
    equip_power_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support mount seed.",
  },
  {
    id: "mount-slab-vecna",
    name: "Slab of Vecna",
    mount_type: "damage",
    combat_power_ids: ["combat-slab-vecna"],
    equip_power_ids: [],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Damage mount seed from connected build docs.",
  },
  {
    id: "mount-zodar",
    name: "Zodar Armor",
    mount_type: "support",
    combat_power_ids: [],
    equip_power_ids: ["equip-zodar"],
    source_type: "connected_build_doc",
    source_url: "https://neverwinter_final_ai_master_context.md",
    source_version: moduleVersion,
    verification_status: "partially_recovered",
    notes: "Support mount seed.",
  },
];

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
