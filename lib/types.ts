export type VerificationStatus =
  | "verified"
  | "partially_recovered"
  | "inferred"
  | "needs_live_check";

export type SourceType =
  | "official_patch"
  | "official_announcement"
  | "official_archive"
  | "wiki_reference"
  | "user_sheet"
  | "connected_build_doc"
  | "community_reference"
  | "inferred_seed";

export type StackRule =
  | "stacks"
  | "does_not_stack"
  | "strongest_only"
  | "refreshes"
  | "duration_based"
  | "unknown";

export type EffectCategory =
  | "boss_debuff"
  | "typed_vulnerability"
  | "team_buff"
  | "self_buff"
  | "carry_only"
  | "owner_only"
  | "utility";

export type EffectStat =
  | "incoming_damage"
  | "defense_reduction"
  | "awareness_reduction"
  | "critical_avoidance_reduction"
  | "deflect_reduction"
  | "physical_vulnerability"
  | "magical_vulnerability"
  | "projectile_vulnerability"
  | "damage_bonus"
  | "power"
  | "crit_strike"
  | "crit_severity"
  | "combat_advantage"
  | "accuracy"
  | "forte";

export type EffectScope =
  | "self"
  | "team"
  | "carry"
  | "owner"
  | "boss"
  | "targeted_ally";

export type TeamMode = "dungeon" | "trial";
export type TeamRole = "dps" | "healer" | "tank" | "support";

export interface SourceMetadata {
  source_url: string;
  source_type: SourceType;
  source_version: string;
  verification_status: VerificationStatus;
  notes: string;
}

export interface SourcedEntity extends SourceMetadata {
  id: string;
  name: string;
}

export interface EffectDefinition extends SourcedEntity {
  effect_category: EffectCategory;
  stat: EffectStat;
  value: number | null;
  stack_rule: StackRule;
  scope: EffectScope;
  duration_sec?: number | null;
  refresh_rule?: string;
  applies_to?: string;
}

export interface GameClass extends SourcedEntity {
  role_focus: TeamRole[];
  paragon_options: string[];
  identity_note: string;
}

export interface PowerDefinition extends SourcedEntity {
  class_name: string;
  power_type: "encounter" | "daily" | "feature";
  effect_ids: string[];
}

export interface Companion extends SourcedEntity {
  role_tag: "st" | "aoe" | "support" | "healing" | "augment";
  archetype: string;
  st_dps: number | null;
  max_hit: number | null;
  effect_ids: string[];
}

export interface CompanionEnhancement extends SourcedEntity {
  effect_ids: string[];
}

export interface CompanionBonus extends SourcedEntity {
  effect_ids: string[];
}

export interface Artifact extends SourcedEntity {
  category: "debuff" | "personal_burst" | "utility" | "support";
  exact_value: number | null;
  duration_sec: number | null;
  cooldown_sec: number | null;
  rank_order: number | null;
  team_or_personal: "team" | "personal";
  effect_ids: string[];
}

export interface Mount extends SourcedEntity {
  mount_type: "support" | "damage" | "utility";
  combat_power_ids: string[];
  equip_power_ids: string[];
}

export interface MountCombatPower extends SourcedEntity {
  mount_id: string;
  base_hit: number | null;
  base_magnitude: number | null;
  damage_type: "physical" | "magical" | "mixed" | "utility";
  can_crit: boolean;
  can_gain_ca: boolean;
  affected_by_team_buffs: boolean;
  affected_by_boss_debuffs: boolean;
  effect_ids: string[];
}

export interface MountEquipPower extends SourcedEntity {
  mount_id: string;
  effect_ids: string[];
}

export interface InsigniaBonus extends SourcedEntity {
  effect_ids: string[];
}

export interface PatchChange extends SourcedEntity {
  date: string;
  category: string;
  affected_entity: string;
  before: string;
  after: string;
  importance: "low" | "medium" | "high" | "critical";
}

export interface BossPreset extends SourcedEntity {
  defense: number;
  awareness: number;
  critical_avoidance: number;
  deflect: number;
  typed_tags: string[];
}

export interface TeamMember {
  id: string;
  group: "A" | "B";
  slot: number;
  label: string;
  class_id: string;
  paragon: string;
  race: string;
  role: TeamRole;
  encounter_ids: string[];
  daily_ids: string[];
  feature_ids: string[];
  artifact_id: string;
  companion_id: string;
  enhancement_id: string;
  companion_bonus_id: string;
  mount_id: string;
  mount_combat_power_id: string;
  mount_equip_power_id: string;
  insignia_bonus_ids: string[];
  notes: string;
  is_carry: boolean;
  personal_overrides: Partial<Record<EffectStat, number>>;
}

export interface StatSummaryLine {
  stat: EffectStat;
  total: number;
  contributions: EffectDefinition[];
  unresolved: EffectDefinition[];
}

export interface DuplicateRuleWarning {
  stackKey: string;
  effectNames: string[];
  reason: string;
}
