import { effectCatalog, entityEffectLookup } from "@/data/game-data";
import type {
  BossPreset,
  DuplicateRuleWarning,
  EffectDefinition,
  EffectStat,
  StatSummaryLine,
  TeamMember,
} from "@/lib/types";

const trackedBossStats: EffectStat[] = [
  "incoming_damage",
  "defense_reduction",
  "awareness_reduction",
  "critical_avoidance_reduction",
  "deflect_reduction",
  "physical_vulnerability",
  "magical_vulnerability",
  "projectile_vulnerability",
];

const trackedTeamStats: EffectStat[] = [
  "damage_bonus",
  "power",
  "crit_strike",
  "crit_severity",
  "combat_advantage",
  "accuracy",
  "forte",
];

const effectMap = new Map(effectCatalog.map((effect) => [effect.id, effect]));

function createLine(stat: EffectStat, effects: EffectDefinition[]): StatSummaryLine {
  const contributions = effects.filter((effect) => effect.value !== null);
  const unresolved = effects.filter((effect) => effect.value === null);

  return {
    stat,
    total: contributions.reduce((sum, effect) => sum + (effect.value ?? 0), 0),
    contributions,
    unresolved,
  };
}

export function collectMemberEffects(member: TeamMember, selectedCarryId?: string) {
  const ids = [
    ...member.encounter_ids,
    ...member.daily_ids,
    ...member.feature_ids,
    member.artifact_id,
    member.companion_id,
    member.enhancement_id,
    member.companion_bonus_id,
    member.mount_combat_power_id,
    member.mount_equip_power_id,
    ...member.insignia_bonus_ids,
  ].filter(Boolean);

  const entityEffects: EffectDefinition[] = [];
  const directEffectIds = new Set<string>();

  ids.forEach((id) => {
    entityEffectLookup[id]?.forEach((effectId) => directEffectIds.add(effectId));
  });

  directEffectIds.forEach((effectId) => {
    const effect = effectMap.get(effectId);
    if (!effect) {
      return;
    }

    if (effect.scope === "carry" && member.id !== selectedCarryId) {
      return;
    }

    entityEffects.push(effect);
  });

  Object.entries(member.personal_overrides).forEach(([stat, value]) => {
    if (value === undefined) {
      return;
    }

    entityEffects.push({
      id: `${member.id}-${stat}-override`,
      name: `${member.label} Personal Override`,
      effect_category: member.is_carry ? "carry_only" : "self_buff",
      stat: stat as EffectStat,
      value,
      stack_rule: "stacks",
      scope: member.is_carry ? "carry" : "self",
      source_type: "inferred_seed",
      source_url: "local://team-builder/personal-overrides",
      source_version: "local",
      verification_status: "inferred",
      notes: "Manual override entered inside the team builder.",
    });
  });

  return entityEffects;
}

export function summarizeTeam(members: TeamMember[], boss: BossPreset) {
  const carry = members.find((member) => member.is_carry) ?? members[0];
  const effects = members.flatMap((member) => collectMemberEffects(member, carry?.id));

  const bossSummary = trackedBossStats.map((stat) =>
    createLine(
      stat,
      effects.filter((effect) => effect.stat === stat && effect.scope === "boss"),
    ),
  );

  const teamSummary = trackedTeamStats.map((stat) =>
    createLine(
      stat,
      effects.filter((effect) =>
        effect.stat === stat && ["team", "owner", "carry", "self"].includes(effect.scope),
      ),
    ),
  );

  const stackWarnings = effects.reduce<Record<string, DuplicateRuleWarning>>((acc, effect) => {
    if (!["strongest_only", "does_not_stack"].includes(effect.stack_rule)) {
      return acc;
    }

    const key = `${effect.stat}-${effect.scope}-${effect.stack_rule}`;
    const entry = acc[key] ?? {
      stackKey: key,
      effectNames: [],
      reason:
        effect.stack_rule === "strongest_only"
          ? "Only the strongest source should apply."
          : "These sources should not stack together.",
    };

    entry.effectNames.push(effect.name);
    acc[key] = entry;
    return acc;
  }, {});

  const duplicates = Object.values(stackWarnings).filter((warning) => warning.effectNames.length > 1);
  const missingBoss = bossSummary.filter((line) => line.total === 0 && line.unresolved.length === 0);

  const bossDefenseAfterDebuffs =
    boss.defense -
    (bossSummary.find((line) => line.stat === "defense_reduction")?.total ?? 0);
  const bossAwarenessAfterDebuffs =
    boss.awareness -
    (bossSummary.find((line) => line.stat === "awareness_reduction")?.total ?? 0);
  const bossCritAvoidAfterDebuffs =
    boss.critical_avoidance -
    (bossSummary.find((line) => line.stat === "critical_avoidance_reduction")?.total ?? 0);
  const bossDeflectAfterDebuffs =
    boss.deflect - (bossSummary.find((line) => line.stat === "deflect_reduction")?.total ?? 0);

  return {
    carry,
    bossSummary,
    teamSummary,
    duplicates,
    missingBoss,
    carryState: {
      effective_power: teamSummary.find((line) => line.stat === "power")?.total ?? 0,
      effective_crit_strike: teamSummary.find((line) => line.stat === "crit_strike")?.total ?? 0,
      effective_crit_severity: teamSummary.find((line) => line.stat === "crit_severity")?.total ?? 0,
      effective_ca: teamSummary.find((line) => line.stat === "combat_advantage")?.total ?? 0,
      effective_accuracy: teamSummary.find((line) => line.stat === "accuracy")?.total ?? 0,
      effective_forte: teamSummary.find((line) => line.stat === "forte")?.total ?? 0,
      outgoing_damage_bonus: teamSummary.find((line) => line.stat === "damage_bonus")?.total ?? 0,
      enemy_final_defense: Math.max(0, bossDefenseAfterDebuffs),
      enemy_final_awareness: Math.max(0, bossAwarenessAfterDebuffs),
      enemy_final_crit_avoid: Math.max(0, bossCritAvoidAfterDebuffs),
      enemy_final_deflect: Math.max(0, bossDeflectAfterDebuffs),
    },
  };
}

export function calculateMountHit({
  baseHit,
  ownerDamageBonus,
  teamDamageBonus,
  bossIncomingDamage,
  includePersonal,
  includeTeam,
  includeBoss,
  critAssumption,
  caAssumption,
}: {
  baseHit: number;
  ownerDamageBonus: number;
  teamDamageBonus: number;
  bossIncomingDamage: number;
  includePersonal: boolean;
  includeTeam: boolean;
  includeBoss: boolean;
  critAssumption: number;
  caAssumption: number;
}) {
  const afterOwnerScaling = baseHit * (1 + ownerDamageBonus);
  const afterPersonalBuffs = includePersonal ? afterOwnerScaling * (1 + critAssumption) : afterOwnerScaling;
  const afterTeamBuffs = includeTeam ? afterPersonalBuffs * (1 + teamDamageBonus + caAssumption) : afterPersonalBuffs;
  const afterBossDebuffs = includeBoss ? afterTeamBuffs * (1 + bossIncomingDamage) : afterTeamBuffs;

  return {
    baseHit,
    afterOwnerScaling,
    afterPersonalBuffs,
    afterTeamBuffs,
    afterBossDebuffs,
    finalEstimatedHit: afterBossDebuffs,
  };
}
