"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Calculator, ExternalLink, ImageOff, Search, Swords, Target, X } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { SummaryPanel } from "@/components/summary-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  artifacts,
  artifactRecommendationsById,
  bossPresets,
  classes,
  companionBonuses,
  companionEnhancements,
  companionRecommendationsById,
  companions,
  createInitialTeamMembers,
  enhancementRecommendationsById,
  getDefaultPowerLoadoutForClass,
  getRoleForClassParagon,
  insigniaBonuses,
  mountCombatPowers,
  mountEquipPowers,
  powers,
  singleTargetCompanionRecommendationsById,
  trialMandatoryCompanionById,
} from "@/data/game-data";
import { sanitizeUiText } from "@/lib/display-text";
import { calculateMountHit, summarizeTeam } from "@/lib/effect-engine";
import type { TeamMember, TeamMode } from "@/lib/types";
import { formatPercent, titleCase } from "@/lib/utils";

const raceOptions = [
  "Human",
  "Wood Elf",
  "Moon Elf",
  "Drow",
  "Half-Orc",
  "Tiefling",
  "Dragonborn",
  "Aasimar",
  "Menzoberranzan Renegade",
] as const;

const roleOptions = [
  { value: "tank", label: "Tank" },
  { value: "healer", label: "Healer" },
  { value: "dps", label: "DPS" },
  { value: "boost", label: "Boost Person" },
  { value: "support_dps", label: "Support DPS" },
  { value: "support", label: "Support" },
] as const;

type PickerKind = "artifact" | "companion" | "mount" | "enhancement";
type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

interface PickerState {
  kind: PickerKind;
  memberId: string;
}

interface PickerItem {
  id: string;
  name: string;
  description: string;
  subtitle?: string;
  imageUrl?: string;
  sourceUrl?: string;
  filters: string[];
  badges: Array<{ label: string; variant: BadgeVariant }>;
}

type AutoSetupGoal = "boost_one_dps" | "overall_team_damage";
type TrialCompositionPreset = "standard" | "msod";

const supportMountPriority = [
  "Hag's Enchanted Cauldron",
  "Pegasus",
  "Red Dragon",
  "Glorious Undead Lion",
  "Twice-Paled Alder",
  "Phantom Panther",
  "Swarm",
  "Eclipse Lion",
  "King of Spines / Tyrannosaur",
  "Brain Stealer Dragon",
];

const damageMountPriority = [
  "Tunnel Vision",
  "Legendary Giant Toad",
  "Golden Warhorse",
  "Demonic Gravehound",
  "Bigby's Hand",
];

const supportInsigniaPriority = [
  "Shepherd's Devotion",
  "Artificer's Persuasion",
  "Cavalry's Warning",
  "Gladiator's Guile",
  "Protector's Camaraderie",
  "Warlord's Motivation",
  "Combatant's Maneuver",
  "Survivalist's Expertise",
];

const damageInsigniaPriority = [
  "Combatant's Maneuver",
  "Predator's Instinct",
  "Master's Precision",
  "Master's Cruelty",
  "Executioner's Covenant",
  "Assassin's Covenant",
];

function getClassIdByName(name: string) {
  return classes.find((item) => item.name === name)?.id ?? "";
}

function getRecommendedArtifactIds(teamMode: TeamMode) {
  return Object.entries(artifactRecommendationsById)
    .map(([id, value]) => ({
      id,
      rank: teamMode === "trial" ? (value.trial?.rank ?? 999) : (value.dungeon?.rank ?? 999),
    }))
    .sort((left, right) => left.rank - right.rank)
    .map((item) => item.id);
}

function getRecommendedCompanionIds() {
  return Object.entries(companionRecommendationsById)
    .filter(([, value]) => Boolean(value))
    .sort((left, right) => (left[1]?.rank ?? 999) - (right[1]?.rank ?? 999))
    .map(([id]) => id);
}

function getRecommendedSupportCompanionIds(teamMode: TeamMode) {
  const mandatoryIds =
    teamMode === "trial"
      ? Object.entries(trialMandatoryCompanionById)
          .filter(([, value]) => Boolean(value))
          .map(([id]) => id)
      : [];

  const rankedIds = getRecommendedCompanionIds();
  return Array.from(new Set([...mandatoryIds, ...rankedIds]));
}

function getRecommendedDamageCompanionIds() {
  return Object.entries(singleTargetCompanionRecommendationsById)
    .filter(([, value]) => Boolean(value))
    .sort((left, right) => (left[1]?.rank ?? 999) - (right[1]?.rank ?? 999))
    .map(([id]) => id);
}

function getRecommendedEnhancementIds() {
  return Object.entries(enhancementRecommendationsById)
    .filter(([, value]) => Boolean(value))
    .sort((left, right) => (left[1]?.rank ?? 999) - (right[1]?.rank ?? 999))
    .map(([id]) => id);
}

function getMountPowerIdByPriority(priority: string[]) {
  return priority
    .map((name) => mountCombatPowers.find((item) => item.name === name)?.id)
    .filter(Boolean) as string[];
}

function getInsigniaIdsByPriority(priority: string[]) {
  return priority
    .map((name) => insigniaBonuses.find((item) => item.name === name)?.id)
    .filter(Boolean) as string[];
}

function getRotatedIds(priority: string[], startIndex: number, size = 3) {
  if (!priority.length) {
    return Array.from({ length: size }, () => "");
  }

  return Array.from({ length: size }, (_, offset) => priority[(startIndex + offset) % priority.length] ?? "");
}

function getSupportClassPlans() {
  return classes
    .flatMap((gameClass) =>
      gameClass.paragon_options.map((paragon) => {
        const loadout = getDefaultPowerLoadoutForClass(gameClass.id, paragon);
        const encounterScore = loadout.encounter_ids.reduce(
          (sum, id) => sum + (powers.find((item) => item.id === id)?.effect_ids.length ?? 0),
          0,
        );
        const featureScore = loadout.feature_ids.reduce(
          (sum, id) => sum + (powers.find((item) => item.id === id)?.effect_ids.length ?? 0),
          0,
        );
        const role = getRoleForClassParagon(gameClass.id, paragon);
        const roleBonus =
          role === "healer" || role === "tank" || role === "support"
            ? 4
            : role === "support_dps"
              ? 3
              : 1;

        return {
          classId: gameClass.id,
          className: gameClass.name,
          paragon,
          role,
          score: encounterScore * 3 + featureScore * 2 + roleBonus,
          loadout,
        };
      }),
    )
    .sort((left, right) => right.score - left.score);
}

function getPlannedRoleDistribution(mode: TeamMode, trialPreset: TrialCompositionPreset) {
  if (mode === "dungeon") {
    return ["tank", "healer", "dps", "dps", "dps"] as TeamMember["role"][];
  }

  if (trialPreset === "msod") {
    return ["tank", "tank", "healer", "dps", "dps", "dps", "dps", "dps", "dps", "dps"] as TeamMember["role"][];
  }

  return ["tank", "tank", "healer", "healer", "dps", "dps", "dps", "dps", "dps", "dps"] as TeamMember["role"][];
}

function getRolePlan(
  className: string,
  paragon: string,
  role: TeamMember["role"],
) {
  const classId = getClassIdByName(className);
  if (!classId) {
    return null;
  }

  return {
    classId,
    className,
    paragon,
    role,
    loadout: getDefaultPowerLoadoutForClass(classId, paragon),
  };
}

function formatRoleLabel(role: TeamMember["role"]) {
  return role === "support_dps"
    ? "Support DPS"
    : role === "boost"
      ? "Boost Person"
      : titleCase(role);
}

function getMemberTitle(member: TeamMember) {
  const className = classes.find((item) => item.id === member.class_id)?.name;
  return className ? `${className}${member.paragon ? ` / ${member.paragon}` : ""}` : `Empty Slot ${member.slot}`;
}

function getInitials(value: string) {
  return value
    .split(/[\s/&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getClassImage(classId: string) {
  return classes.find((item) => item.id === classId)?.image_url;
}

function getMemberSummary(member: TeamMember) {
  const parts = [
    member.race || "Race not set",
    formatRoleLabel(member.role),
    artifacts.find((item) => item.id === member.artifact_id)?.name,
    companionEnhancements.find((item) => item.id === member.enhancement_id)?.name,
  ].filter(Boolean);

  return parts.join(" • ");
}

function buildMemberSummary(member: TeamMember) {
  return getMemberSummary(member).replace("â€¢", "•");
}

function getParagonBadge(member: TeamMember) {
  return member.paragon ? getInitials(member.paragon).slice(0, 2) : "";
}

function getSummaryTotals(lines: { total: number; contributions: { id: string }[]; unresolved: { id: string }[] }[]) {
  return {
    resolvedTotal: lines.reduce((sum, line) => sum + line.total, 0),
    activeSources: lines.reduce((sum, line) => sum + line.contributions.length, 0),
    unresolvedSources: lines.reduce((sum, line) => sum + line.unresolved.length, 0),
  };
}

function getPickerItems(kind: PickerKind): PickerItem[] {
  if (kind === "artifact") {
    return artifacts.map((item) => {
      const recommendation = artifactRecommendationsById[item.id];
      return {
        id: item.id,
        name: item.name,
        subtitle: `${item.category} / ${item.team_or_personal}`,
        description:
          recommendation?.trial || recommendation?.dungeon
            ? [
                recommendation?.trial ? `Trial #${recommendation.trial.rank} (${recommendation.trial.damageBoost.toFixed(2)}%).` : null,
                recommendation?.dungeon ? `Dungeon #${recommendation.dungeon.rank} (${recommendation.dungeon.damageBoost.toFixed(2)}%).` : null,
              ]
                .filter(Boolean)
                .join(" ")
            : sanitizeUiText(item.notes, "Verified artifact entry."),
        imageUrl: item.image_url,
        sourceUrl: item.source_url,
        filters: ["all", item.category, recommendation?.trial || recommendation?.dungeon ? "recommended" : "other"],
        badges: [
          { label: item.category, variant: "gold" },
          ...(recommendation?.trial ? [{ label: `Trial #${recommendation.trial.rank}`, variant: "blue" as const }] : []),
          ...(recommendation?.dungeon ? [{ label: `Dungeon #${recommendation.dungeon.rank}`, variant: "purple" as const }] : []),
        ],
      };
    });
  }

  if (kind === "companion") {
    return companions.map((item) => {
      const supportRecommendation = companionRecommendationsById[item.id];
      const stRecommendation = singleTargetCompanionRecommendationsById[item.id];
      const trialMandatory = trialMandatoryCompanionById[item.id];
      return {
        id: item.id,
        name: item.name,
        subtitle: `${item.role_tag} / ${item.archetype}`,
        description: [
          trialMandatory ? `${trialMandatory.benefit}. Required trial utility coverage.` : null,
          supportRecommendation
            ? `${supportRecommendation.benefit} Rough damage boost ${supportRecommendation.roughDamageBoost?.toFixed(2) ?? "0.00"}%.`
            : null,
          stRecommendation
            ? `ST rank #${stRecommendation.rank}.${stRecommendation.stDps != null ? ` ST DPS ${stRecommendation.stDps.toLocaleString()}.` : ""}${stRecommendation.maxHit != null ? ` Max hit ${stRecommendation.maxHit.toLocaleString()}.` : ""}`
            : null,
          !trialMandatory && !supportRecommendation && !stRecommendation ? "Verified companion entry." : null,
        ]
          .filter(Boolean)
          .join(" "),
        sourceUrl: item.source_url,
        filters: [
          "all",
          item.role_tag,
          supportRecommendation ? "recommended" : "other",
          stRecommendation ? "st_recommended" : "other",
          trialMandatory ? "trial_mandatory" : "other",
        ],
        badges: [
          { label: item.role_tag, variant: "purple" },
          ...(trialMandatory ? [{ label: "Trial Must", variant: "red" as const }] : []),
          ...(supportRecommendation ? [{ label: `Support #${supportRecommendation.rank}`, variant: "teal" as const }] : []),
          ...(stRecommendation ? [{ label: `ST #${stRecommendation.rank}`, variant: "blue" as const }] : []),
        ],
      };
    });
  }

  if (kind === "mount") {
    return mountCombatPowers.map((item) => ({
      id: item.id,
      name: item.name,
      subtitle: item.damage_type,
      description: sanitizeUiText(item.notes, "Verified mount entry."),
      sourceUrl: item.source_url,
      filters: ["all", item.damage_type, item.effect_ids.length ? "debuff" : "other"],
      badges: [
        { label: item.damage_type, variant: "orange" },
        ...(item.effect_ids.length ? [{ label: "Debuff", variant: "red" as const }] : []),
      ],
    }));
  }

  return companionEnhancements.map((item) => {
    const recommendation = enhancementRecommendationsById[item.id];
    return {
      id: item.id,
      name: item.name,
      subtitle: "Companion enhancement",
      description: recommendation
        ? `${recommendation.benefit}${recommendation.damageBoost != null ? ` Damage boost ${recommendation.damageBoost.toFixed(2)}%.` : ""}`
        : "Verified enhancement entry. Exact live value is hidden until fully proven.",
      sourceUrl: item.source_url,
      filters: ["all", recommendation ? "recommended" : "other", item.effect_ids.length ? "mapped" : "other"],
      badges: [
        ...(recommendation ? [{ label: `Rank #${recommendation.rank}`, variant: "purple" as const }] : []),
        ...(item.effect_ids.length ? [{ label: "Mapped", variant: "red" as const }] : []),
      ],
    };
  });
}

function getPickerFilters(kind: PickerKind) {
  if (kind === "artifact") {
    return [
      { value: "all", label: "All" },
      { value: "recommended", label: "Recommended" },
      { value: "debuff", label: "Debuff" },
      { value: "support", label: "Support" },
      { value: "utility", label: "Utility" },
      { value: "personal_burst", label: "Burst" },
    ];
  }

  if (kind === "companion") {
    return [
      { value: "all", label: "All" },
      { value: "trial_mandatory", label: "Trial Must" },
      { value: "recommended", label: "Recommended" },
      { value: "st_recommended", label: "ST Best" },
      { value: "support", label: "Support" },
      { value: "st", label: "Damage" },
      { value: "augment", label: "Augment" },
    ];
  }

  if (kind === "mount") {
    return [
      { value: "all", label: "All" },
      { value: "debuff", label: "Debuff" },
      { value: "physical", label: "Physical" },
      { value: "magical", label: "Magical" },
      { value: "mixed", label: "Mixed" },
      { value: "utility", label: "Utility" },
    ];
  }

  return [
    { value: "all", label: "All" },
    { value: "recommended", label: "Recommended" },
    { value: "mapped", label: "Mapped" },
  ];
}

function getPickerLabel(kind: PickerKind) {
  switch (kind) {
    case "artifact":
      return "Artifacts";
    case "companion":
      return "Companions";
    case "mount":
      return "Mounts";
    case "enhancement":
      return "Enhancements";
    default:
      return "Selections";
  }
}

export function TeamBuilderPage() {
  const [mode, setMode] = useState<TeamMode | null>(null);
  const [trialPreset, setTrialPreset] = useState<TrialCompositionPreset>("standard");
  const [bossId, setBossId] = useState(bossPresets[0]?.id ?? "");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [autoSetupOpen, setAutoSetupOpen] = useState(false);
  const [pickerState, setPickerState] = useState<PickerState | null>(null);
  const [pickerQuery, setPickerQuery] = useState("");
  const [pickerFilter, setPickerFilter] = useState("all");
  const [mountBaseHitOverride, setMountBaseHitOverride] = useState(1000000);
  const [critAssumption, setCritAssumption] = useState(0.5);
  const [caAssumption, setCaAssumption] = useState(0.5);
  const [includePersonal, setIncludePersonal] = useState(true);
  const [includeTeam, setIncludeTeam] = useState(true);
  const [includeBoss, setIncludeBoss] = useState(true);

  const boss = bossPresets.find((item) => item.id === bossId) ?? bossPresets[0];
  const selectedMember = teamMembers.find((member) => member.id === selectedMemberId) ?? teamMembers[0];
  const selectedClass = classes.find((item) => item.id === selectedMember?.class_id);
  const carry = teamMembers.find((member) => member.is_carry);
  const teamState = useMemo(() => summarizeTeam(teamMembers, boss), [boss, teamMembers]);
  const bossTotals = useMemo(() => getSummaryTotals(teamState.bossSummary), [teamState.bossSummary]);
  const teamTotals = useMemo(() => getSummaryTotals(teamState.teamSummary), [teamState.teamSummary]);
  const carryTotals = useMemo(
    () => ({
      teamSources: teamTotals.activeSources,
      bossSources: bossTotals.activeSources,
      outgoingDamage: teamState.carryState.outgoing_damage_bonus,
      effectiveCa: teamState.carryState.effective_ca,
      effectivePower: teamState.carryState.effective_power,
    }),
    [bossTotals.activeSources, teamState.carryState, teamTotals.activeSources],
  );
  const pickerMember = teamMembers.find((member) => member.id === pickerState?.memberId);
  const pickerItems = useMemo(() => {
    if (!pickerState) {
      return [];
    }

    return getPickerItems(pickerState.kind).filter((item) => {
      const haystack = `${item.name} ${item.subtitle ?? ""} ${item.description}`.toLowerCase();
      const queryMatches = haystack.includes(pickerQuery.toLowerCase());
      const filterMatches = pickerFilter === "all" || item.filters.includes(pickerFilter);
      return queryMatches && filterMatches;
    });
  }, [pickerFilter, pickerQuery, pickerState]);

  const classEncounters = powers.filter(
    (power) =>
      power.class_name === selectedClass?.name &&
      power.power_type === "encounter" &&
      (!selectedMember?.paragon || !power.paragon_path || power.paragon_path === selectedMember.paragon),
  );
  const classDailies = powers.filter(
    (power) =>
      power.class_name === selectedClass?.name &&
      power.power_type === "daily" &&
      (!selectedMember?.paragon || !power.paragon_path || power.paragon_path === selectedMember.paragon),
  );
  const classFeatures = powers.filter(
    (power) =>
      power.class_name === selectedClass?.name &&
      power.power_type === "feature" &&
      (!selectedMember?.paragon || !power.paragon_path || power.paragon_path === selectedMember.paragon),
  );
  const recommendedDebuffEncounters = classEncounters.filter((power) => power.effect_ids.length > 0);
  const mountCalc = useMemo(
    () =>
      calculateMountHit({
        baseHit: mountBaseHitOverride,
        ownerDamageBonus: teamState.carryState.outgoing_damage_bonus,
        teamDamageBonus: teamState.teamSummary.find((line) => line.stat === "damage_bonus")?.total ?? 0,
        bossIncomingDamage: teamState.bossSummary.find((line) => line.stat === "incoming_damage")?.total ?? 0,
        includePersonal,
        includeTeam,
        includeBoss,
        critAssumption,
        caAssumption,
      }),
    [caAssumption, critAssumption, includeBoss, includePersonal, includeTeam, mountBaseHitOverride, teamState],
  );
  const mountTotals = useMemo(
    () => ({
      appliedStages:
        Number(includePersonal) + Number(includeTeam) + Number(includeBoss),
      personalBonus: includePersonal ? teamState.carryState.outgoing_damage_bonus : 0,
      teamBonus: includeTeam ? (teamState.teamSummary.find((line) => line.stat === "damage_bonus")?.total ?? 0) : 0,
      bossBonus: includeBoss ? (teamState.bossSummary.find((line) => line.stat === "incoming_damage")?.total ?? 0) : 0,
    }),
    [includeBoss, includePersonal, includeTeam, teamState],
  );

  function updateTeamMode(nextMode: TeamMode) {
    const nextMembers = createInitialTeamMembers(nextMode);
    setMode(nextMode);
    if (nextMode === "dungeon") {
      setTrialPreset("standard");
    }
    setTeamMembers(nextMembers);
    setSelectedMemberId(nextMembers[0]?.id ?? "");
    setPickerState(null);
    setPickerQuery("");
    setPickerFilter("all");
  }

  function updateMember(memberId: string, patch: Partial<TeamMember>) {
    setTeamMembers((members) =>
      members.map((member) => (member.id === memberId ? { ...member, ...patch } : member)),
    );
  }

  function handleClassChange(memberId: string, classId: string) {
    const classItem = classes.find((item) => item.id === classId);
    const defaultParagon = classItem?.paragon_options[0] ?? "";
    const powerLoadout = getDefaultPowerLoadoutForClass(classId, defaultParagon);

    updateMember(memberId, {
      class_id: classId,
      paragon: defaultParagon,
      encounter_ids: powerLoadout.encounter_ids,
      daily_ids: powerLoadout.daily_ids,
      feature_ids: powerLoadout.feature_ids,
      role: getRoleForClassParagon(classId, defaultParagon),
      label: classItem?.name ? `${classItem.name} Slot` : `Empty Slot ${memberId.replace("member-", "")}`,
    });
  }

  function handleParagonChange(memberId: string, paragon: string) {
    const member = teamMembers.find((item) => item.id === memberId);
    if (!member) {
      return;
    }

    const powerLoadout = getDefaultPowerLoadoutForClass(member.class_id, paragon);
    updateMember(memberId, {
      paragon,
      role: getRoleForClassParagon(member.class_id, paragon),
      encounter_ids: powerLoadout.encounter_ids,
      daily_ids: powerLoadout.daily_ids,
      feature_ids: powerLoadout.feature_ids,
    });
  }

  function updateCarry(memberId: string) {
    setTeamMembers((members) =>
      members.map((member) => ({ ...member, is_carry: member.id === memberId })),
    );
  }

  function assignEncounter(memberId: string, powerId: string) {
    const member = teamMembers.find((entry) => entry.id === memberId);
    if (!member) {
      return;
    }

    const nextEncounters = [...member.encounter_ids];
    const existingIndex = nextEncounters.indexOf(powerId);

    if (existingIndex >= 0) {
      nextEncounters.splice(existingIndex, 1);
    } else if (nextEncounters.length < 3) {
      nextEncounters.push(powerId);
    } else {
      nextEncounters[2] = powerId;
    }

    updateMember(memberId, { encounter_ids: nextEncounters });
  }

  function openPicker(memberId: string, kind: PickerKind) {
    setSelectedMemberId(memberId);
    setPickerState({ memberId, kind });
    setPickerQuery("");
    setPickerFilter("all");
  }

  function closePicker() {
    setPickerState(null);
    setPickerQuery("");
    setPickerFilter("all");
  }

  function applyPickerSelection(itemId: string) {
    if (!pickerState) {
      return;
    }

    if (pickerState.kind === "artifact") {
      updateMember(pickerState.memberId, { artifact_id: itemId });
    }

    if (pickerState.kind === "companion") {
      updateMember(pickerState.memberId, { companion_id: itemId });
    }

    if (pickerState.kind === "mount") {
      updateMember(pickerState.memberId, { mount_combat_power_id: itemId });
    }

    if (pickerState.kind === "enhancement") {
      updateMember(pickerState.memberId, { enhancement_id: itemId });
    }

    closePicker();
  }

  function applyAutoSetup(goal: AutoSetupGoal) {
    if (!mode) {
      return;
    }

    const currentMode = mode;
    const nextMembers = createInitialTeamMembers(currentMode);
    const recommendedArtifacts = getRecommendedArtifactIds(currentMode);
    const recommendedSupportCompanions = getRecommendedSupportCompanionIds(currentMode);
    const recommendedDamageCompanions = getRecommendedDamageCompanionIds();
    const fallbackCompanions = getRecommendedCompanionIds();
    const recommendedEnhancements = getRecommendedEnhancementIds();
    const supportMounts = getMountPowerIdByPriority(supportMountPriority);
    const damageMounts = getMountPowerIdByPriority(damageMountPriority);
    const supportInsignias = getInsigniaIdsByPriority(supportInsigniaPriority);
    const damageInsignias = getInsigniaIdsByPriority(damageInsigniaPriority);
    const supportPlans = getSupportClassPlans();
    const plannedRoles = getPlannedRoleDistribution(currentMode, trialPreset);

    const carryClassId = getClassIdByName("Rogue");
    const carryParagon = "Assassin";
    const carryLoadout = getDefaultPowerLoadoutForClass(carryClassId, carryParagon);
    const balancedDamagePlans = [
      getRolePlan("Rogue", "Assassin", "dps"),
      getRolePlan("Ranger", "Warden", "dps"),
      getRolePlan("Wizard", "Arcanist", "dps"),
      getRolePlan("Barbarian", "Blademaster", "dps"),
      getRolePlan("Fighter", "Dreadnought", "dps"),
      getRolePlan("Cleric", "Arbiter", "dps"),
      getRolePlan("Warlock", "Hellbringer", "dps"),
    ].filter(Boolean);

    const tankPlans = [
      getRolePlan("Fighter", "Vanguard", "tank"),
      getRolePlan("Paladin", "Justicar", "tank"),
    ].filter(Boolean);

    const healerPlans = [
      getRolePlan("Bard", "Minstrel", "healer"),
      getRolePlan("Cleric", "Devout", "healer"),
      getRolePlan("Warlock", "Soulweaver", "healer"),
      getRolePlan("Paladin", "Oathkeeper", "healer"),
    ].filter(Boolean);

    const dpsPlans = [
      getRolePlan("Rogue", "Assassin", "dps"),
      getRolePlan("Ranger", "Warden", "dps"),
      getRolePlan("Wizard", "Arcanist", "dps"),
      getRolePlan("Barbarian", "Blademaster", "dps"),
      getRolePlan("Fighter", "Dreadnought", "dps"),
      getRolePlan("Cleric", "Arbiter", "dps"),
      getRolePlan("Warlock", "Hellbringer", "dps"),
      getRolePlan("Bard", "Songblade", "dps"),
    ].filter(Boolean);

    const usedSupportPlans = new Set<string>();
    let supportInsigniaIndex = 0;
    let damageInsigniaIndex = 0;

    nextMembers.forEach((member, index) => {
      const artifactId = recommendedArtifacts[index % Math.max(recommendedArtifacts.length, 1)] ?? "";
      const enhancementId = recommendedEnhancements[index % Math.max(recommendedEnhancements.length, 1)] ?? "";
      const plannedRole = plannedRoles[index] ?? "dps";

      if (goal === "boost_one_dps" && index === 0) {
        member.class_id = carryClassId;
        member.paragon = carryParagon;
        member.role = "dps";
        member.label = "Carry DPS";
        member.is_carry = true;
        member.race = "Human";
        member.artifact_id = artifactId;
        member.companion_id = recommendedDamageCompanions[0] ?? fallbackCompanions[0] ?? "";
        member.enhancement_id = enhancementId;
        member.mount_combat_power_id = damageMounts[0] ?? supportMounts[0] ?? "";
        member.insignia_bonus_ids = getRotatedIds(damageInsignias, damageInsigniaIndex++);
        member.encounter_ids = carryLoadout.encounter_ids;
        member.daily_ids = carryLoadout.daily_ids;
        member.feature_ids = carryLoadout.feature_ids;
        return;
      }

      let selectedPlan = null as (ReturnType<typeof getRolePlan> | null);

      if (goal === "overall_team_damage" && plannedRole === "dps") {
        const dpsIndex = nextMembers.slice(0, index + 1).filter((_, currentIndex) => plannedRoles[currentIndex] === "dps").length - 1;
        selectedPlan = balancedDamagePlans[dpsIndex % Math.max(balancedDamagePlans.length, 1)] ?? null;
      } else if (goal === "boost_one_dps" && plannedRole === "dps") {
        const dpsIndex = nextMembers.slice(0, index + 1).filter((_, currentIndex) => plannedRoles[currentIndex] === "dps").length - 2;
        selectedPlan = dpsPlans[Math.max(dpsIndex, 0) % Math.max(dpsPlans.length, 1)] ?? null;
      } else if (plannedRole === "tank") {
        const tankIndex = nextMembers.slice(0, index + 1).filter((_, currentIndex) => plannedRoles[currentIndex] === "tank").length - 1;
        selectedPlan = tankPlans[tankIndex % Math.max(tankPlans.length, 1)] ?? null;
      } else if (plannedRole === "healer") {
        const healerIndex = nextMembers.slice(0, index + 1).filter((_, currentIndex) => plannedRoles[currentIndex] === "healer").length - 1;
        selectedPlan = healerPlans[healerIndex % Math.max(healerPlans.length, 1)] ?? null;
      }

      if (selectedPlan) {
        member.class_id = selectedPlan.classId;
        member.paragon = selectedPlan.paragon;
        member.role = selectedPlan.role;
        member.label = `${classes.find((item) => item.id === selectedPlan.classId)?.name ?? "Player"} ${formatRoleLabel(selectedPlan.role)}`;
        member.race = "Human";
        member.artifact_id = artifactId;
        member.companion_id =
          plannedRole === "dps"
            ? recommendedDamageCompanions[index % Math.max(recommendedDamageCompanions.length, 1)] ?? fallbackCompanions[index] ?? ""
            : recommendedSupportCompanions[index % Math.max(recommendedSupportCompanions.length, 1)] ?? fallbackCompanions[index] ?? "";
        member.enhancement_id = enhancementId;
        member.mount_combat_power_id =
          plannedRole === "dps"
            ? damageMounts[index % Math.max(damageMounts.length, 1)] ?? supportMounts[0] ?? ""
            : supportMounts[index % Math.max(supportMounts.length, 1)] ?? "";
        member.insignia_bonus_ids =
          plannedRole === "dps"
            ? getRotatedIds(damageInsignias, damageInsigniaIndex++)
            : getRotatedIds(supportInsignias, supportInsigniaIndex++);
        member.encounter_ids = selectedPlan.loadout.encounter_ids;
        member.daily_ids = selectedPlan.loadout.daily_ids;
        member.feature_ids = selectedPlan.loadout.feature_ids;
        member.is_carry = index === 0;
        return;
      }

      const supportPlan =
        supportPlans.find((plan) => {
          const key = `${plan.classId}:${plan.paragon}`;
          if (usedSupportPlans.has(key)) {
            return false;
          }

          usedSupportPlans.add(key);
          return true;
        }) ?? supportPlans[0];

      member.class_id = supportPlan.classId;
      member.paragon = supportPlan.paragon;
      member.role = goal === "boost_one_dps" ? "support" : supportPlan.role;
      member.label = `${supportPlan.className} ${supportPlan.paragon}`;
      member.race = "Human";
      member.artifact_id = artifactId;
      member.companion_id =
        recommendedSupportCompanions[(goal === "boost_one_dps" ? index - 1 : index) % Math.max(recommendedSupportCompanions.length, 1)] ??
        fallbackCompanions[index % Math.max(fallbackCompanions.length, 1)] ??
        "";
      member.enhancement_id = enhancementId;
      member.mount_combat_power_id = supportMounts[(goal === "boost_one_dps" ? index - 1 : index) % Math.max(supportMounts.length, 1)] ?? "";
      member.insignia_bonus_ids = getRotatedIds(supportInsignias, supportInsigniaIndex++);
      member.encounter_ids = supportPlan.loadout.encounter_ids;
      member.daily_ids = supportPlan.loadout.daily_ids;
      member.feature_ids = supportPlan.loadout.feature_ids;
      member.is_carry = false;
    });

    setTeamMembers(nextMembers);
    setSelectedMemberId(nextMembers[0]?.id ?? "");
    setAutoSetupOpen(false);
  }

  if (!mode) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Team Builder Start</p>
            <CardTitle className="text-[32px]">Choose party size</CardTitle>
            <CardDescription>
              Start with dungeon for 5 players or trial for 10 players. Every slot begins empty. Dungeon presets assume 1 tank and 1 healer. Trial presets assume 6 DPS, 2 healers, and 2 tanks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => updateTeamMode("dungeon")}
              className="border border-white/10 bg-white/[0.03] p-8 text-left transition hover:border-[rgba(162,210,255,0.9)]"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">5 players</p>
              <p className="mt-3 text-2xl font-semibold text-white">Dungeon</p>
              <p className="mt-3 text-sm text-white/75">Single party with 1 tank, 1 healer, and 3 DPS.</p>
            </button>
            <button
              type="button"
              onClick={() => updateTeamMode("trial")}
              className="border border-white/10 bg-white/[0.03] p-8 text-left transition hover:border-[rgba(162,210,255,0.9)]"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">10 players</p>
              <p className="mt-3 text-2xl font-semibold text-white">Trial</p>
              <p className="mt-3 text-sm text-white/75">Two groups of five with the default 2 tank, 2 healer, 6 DPS split.</p>
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <Card>
          <CardContent className="grid gap-4 p-6 xl:grid-cols-[auto_auto_auto_minmax(220px,1fr)_minmax(220px,1fr)]">
            <div className="flex flex-wrap gap-2">
              <Button variant={mode === "dungeon" ? "primary" : "secondary"} onClick={() => updateTeamMode("dungeon")}>
                Dungeon
            </Button>
            <Button variant={mode === "trial" ? "primary" : "secondary"} onClick={() => updateTeamMode("trial")}>
              Trial
            </Button>
            </div>
            {mode === "trial" ? (
              <Field label="Trial preset">
                <Select value={trialPreset} onChange={(event) => setTrialPreset(event.target.value as TrialCompositionPreset)}>
                  <option value="standard">Standard Trial: 6 DPS / 2 Healer / 2 Tank</option>
                  <option value="msod">MSOD: 7 DPS / 1 Bard Healer / 2 Tank</option>
                </Select>
              </Field>
            ) : null}
            <Button variant="secondary" onClick={() => updateTeamMode(mode)}>
              Reset
            </Button>
          <Button variant="secondary" onClick={() => setAutoSetupOpen(true)}>
            Best Setup
          </Button>
          <Field label="Boss preset">
            <Select value={bossId} onChange={(event) => setBossId(event.target.value)}>
              {bossPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Carry">
            <Select value={carry?.id ?? ""} onChange={(event) => updateCarry(event.target.value)}>
              <option value="">No carry selected</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.group}-{member.slot} {getMemberTitle(member)}
                </option>
              ))}
            </Select>
          </Field>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Roster</CardTitle>
            <CardDescription>Click a slot. Everything for that slot is visible immediately in the middle panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RosterGroup
              title="Group A"
              members={teamMembers.filter((member) => member.group === "A")}
              selectedMemberId={selectedMemberId}
              onSelect={setSelectedMemberId}
            />
            {mode === "trial" ? (
              <RosterGroup
                title="Group B"
                members={teamMembers.filter((member) => member.group === "B")}
                selectedMemberId={selectedMemberId}
                onSelect={setSelectedMemberId}
              />
            ) : null}
          </CardContent>
        </Card>

        <div className="space-y-6">
          {selectedMember ? (
            <>
              <Card>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <SelectionThumb
                          imageUrl={getClassImage(selectedMember.class_id)}
                          label={getMemberTitle(selectedMember)}
                          badgeText={getParagonBadge(selectedMember)}
                        />
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                            Selected slot {selectedMember.group}-{selectedMember.slot}
                          </p>
                          <CardTitle className="mt-2">{getMemberTitle(selectedMember)}</CardTitle>
                          <CardDescription>{buildMemberSummary(selectedMember)}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.is_carry ? <Badge variant="teal">Carry</Badge> : null}
                        <Badge variant="muted">{formatRoleLabel(selectedMember.role)}</Badge>
                      </div>
                  </div>
                </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                      <div className="space-y-4">
                        <Field label="Class">
                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {classes.map((item) => {
                              const active = selectedMember.class_id === item.id;

                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => handleClassChange(selectedMember.id, item.id)}
                                  className={`flex items-center gap-3 border p-3 text-left transition ${
                                    active
                                      ? "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.16)]"
                                      : "border-[var(--border)] bg-[rgba(205,180,219,0.1)] hover:border-[var(--pastel-petal)]"
                                  }`}
                                >
                                  <SelectionThumb imageUrl={item.image_url} label={item.name} />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-white">{item.name}</p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/80">
                                      {item.role_focus.map(formatRoleLabel).join(" / ")}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </Field>

                        <Field label="Paragon">
                          <div className="grid gap-3 sm:grid-cols-2">
                            {(selectedClass?.paragon_options ?? []).map((paragon) => {
                              const active = selectedMember.paragon === paragon;

                              return (
                                <button
                                  key={paragon}
                                  type="button"
                                  onClick={() => handleParagonChange(selectedMember.id, paragon)}
                                  className={`flex items-center gap-3 border p-3 text-left transition ${
                                    active
                                      ? "border-[var(--baby-pink)] bg-[rgba(255,175,204,0.16)]"
                                      : "border-[var(--border)] bg-[rgba(255,200,221,0.1)] hover:border-[var(--baby-pink)]"
                                  }`}
                                >
                                  <SelectionThumb imageUrl={selectedClass?.image_url} label={paragon} />
                                  <div>
                                    <p className="text-sm font-medium text-white">{paragon}</p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/80">
                                      {formatRoleLabel(getRoleForClassParagon(selectedClass?.id ?? "", paragon))}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                            {!selectedClass ? (
                              <div className="border border-[var(--border)] bg-[rgba(205,180,219,0.08)] p-4 text-sm text-white/80">
                                Select a class first to choose a paragon path.
                              </div>
                            ) : null}
                          </div>
                        </Field>
                      </div>

                      <div className="space-y-4">
                        <Field label="Role">
                          <Select
                            value={selectedMember.role}
                            onChange={(event) => updateMember(selectedMember.id, { role: event.target.value as TeamMember["role"] })}
                          >
                            {roleOptions.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </Select>
                        </Field>
                        <Field label="Race">
                          <Select value={selectedMember.race} onChange={(event) => updateMember(selectedMember.id, { race: event.target.value })}>
                            <option value="">Select race</option>
                            {raceOptions.map((race) => (
                              <option key={race} value={race}>
                                {race}
                              </option>
                            ))}
                          </Select>
                        </Field>
                        <Field label="Carry">
                          <Button variant={selectedMember.is_carry ? "primary" : "secondary"} onClick={() => updateCarry(selectedMember.id)}>
                            {selectedMember.is_carry ? "Selected carry" : "Mark as carry"}
                          </Button>
                        </Field>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field label="Artifact">
                        <PickerField
                          title={artifacts.find((item) => item.id === selectedMember.artifact_id)?.name ?? "Select artifact"}
                          subtitle="Ranked artifact list"
                          imageUrl={artifacts.find((item) => item.id === selectedMember.artifact_id)?.image_url}
                          onClick={() => openPicker(selectedMember.id, "artifact")}
                        />
                      </Field>
                      <Field label="Companion">
                        <PickerField
                          title={companions.find((item) => item.id === selectedMember.companion_id)?.name ?? "Select companion"}
                          subtitle="Support and damage companions"
                          imageLabel={companions.find((item) => item.id === selectedMember.companion_id)?.name ?? "Companion"}
                          onClick={() => openPicker(selectedMember.id, "companion")}
                        />
                      </Field>
                      <Field label="Enhancement">
                        <PickerField
                          title={companionEnhancements.find((item) => item.id === selectedMember.enhancement_id)?.name ?? "Select enhancement"}
                          subtitle="Only proven values shown"
                          imageLabel={companionEnhancements.find((item) => item.id === selectedMember.enhancement_id)?.name ?? "Enhancement"}
                          onClick={() => openPicker(selectedMember.id, "enhancement")}
                        />
                      </Field>
                      <Field label="Mount combat power">
                        <PickerField
                          title={mountCombatPowers.find((item) => item.id === selectedMember.mount_combat_power_id)?.name ?? "Select mount"}
                          subtitle="Mount power list"
                          imageLabel={mountCombatPowers.find((item) => item.id === selectedMember.mount_combat_power_id)?.name ?? "Mount"}
                          onClick={() => openPicker(selectedMember.id, "mount")}
                        />
                      </Field>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          updateMember(selectedMember.id, {
                          artifact_id: "",
                          companion_id: "",
                          enhancement_id: "",
                          mount_combat_power_id: "",
                          encounter_ids: [],
                          daily_ids: [],
                          feature_ids: [],
                        })
                      }
                    >
                      Clear slot loadout
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Power Loadout</CardTitle>
                  <CardDescription>
                    Class and paragon selection auto-fill the current support-oriented defaults. Adjust them here if needed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Recommended debuff encounters</p>
                    {recommendedDebuffEncounters.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {recommendedDebuffEncounters.map((power) => {
                          const isSelected = selectedMember.encounter_ids.includes(power.id);
                          return (
                            <button
                              key={power.id}
                              type="button"
                              onClick={() => assignEncounter(selectedMember.id, power.id)}
                              className={`border px-3 py-2 text-sm transition ${
                                isSelected
                                  ? "border-[rgba(162,210,255,0.9)] bg-[rgba(162,210,255,0.16)] text-white"
                                  : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/20"
                              }`}
                            >
                              {power.name}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-white/70">
                        {selectedMember.class_id ? "No mapped debuff encounters for this class and paragon." : "Select class and paragon first."}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <Field label="Encounter 1">
                      <Select
                        value={selectedMember.encounter_ids[0] ?? ""}
                        onChange={(event) =>
                          updateMember(selectedMember.id, {
                            encounter_ids: [
                              event.target.value,
                              selectedMember.encounter_ids[1] ?? "",
                              selectedMember.encounter_ids[2] ?? "",
                            ].filter(Boolean),
                          })
                        }
                      >
                        <option value="">{selectedClass ? "Select encounter" : "Select class first"}</option>
                        {classEncounters.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Encounter 2">
                      <Select
                        value={selectedMember.encounter_ids[1] ?? ""}
                        onChange={(event) =>
                          updateMember(selectedMember.id, {
                            encounter_ids: [
                              selectedMember.encounter_ids[0] ?? "",
                              event.target.value,
                              selectedMember.encounter_ids[2] ?? "",
                            ].filter(Boolean),
                          })
                        }
                      >
                        <option value="">{selectedClass ? "Select encounter" : "Select class first"}</option>
                        {classEncounters.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Encounter 3">
                      <Select
                        value={selectedMember.encounter_ids[2] ?? ""}
                        onChange={(event) =>
                          updateMember(selectedMember.id, {
                            encounter_ids: [
                              selectedMember.encounter_ids[0] ?? "",
                              selectedMember.encounter_ids[1] ?? "",
                              event.target.value,
                            ].filter(Boolean),
                          })
                        }
                      >
                        <option value="">{selectedClass ? "Select encounter" : "Select class first"}</option>
                        {classEncounters.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Daily">
                      <Select
                        value={selectedMember.daily_ids[0] ?? ""}
                        onChange={(event) => updateMember(selectedMember.id, { daily_ids: [event.target.value].filter(Boolean) })}
                      >
                        <option value="">{selectedClass ? "Select daily" : "Select class first"}</option>
                        {classDailies.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Feature 1">
                      <Select
                        value={selectedMember.feature_ids[0] ?? ""}
                        onChange={(event) =>
                          updateMember(selectedMember.id, {
                            feature_ids: [event.target.value, selectedMember.feature_ids[1] ?? ""].filter(Boolean),
                          })
                        }
                      >
                        <option value="">{selectedClass ? "Select feature" : "Select class first"}</option>
                        {classFeatures.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Feature 2">
                      <Select
                        value={selectedMember.feature_ids[1] ?? ""}
                        onChange={(event) =>
                          updateMember(selectedMember.id, {
                            feature_ids: [selectedMember.feature_ids[0] ?? "", event.target.value].filter(Boolean),
                          })
                        }
                      >
                        <option value="">{selectedClass ? "Select feature" : "Select class first"}</option>
                        {classFeatures.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Companion bonus">
                      <Select
                        value={selectedMember.companion_bonus_id}
                        onChange={(event) => updateMember(selectedMember.id, { companion_bonus_id: event.target.value })}
                      >
                        <option value="">Select bonus</option>
                        {companionBonuses.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Mount equip power">
                      <Select
                        value={selectedMember.mount_equip_power_id}
                        onChange={(event) => updateMember(selectedMember.id, { mount_equip_power_id: event.target.value })}
                      >
                        <option value="">None</option>
                        {mountEquipPowers.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {selectedMember.insignia_bonus_ids.map((value, index) => (
                      <Field key={index} label={`Insignia bonus ${index + 1}`}>
                        <Select
                          value={value ?? ""}
                          onChange={(event) => {
                            const next = [...selectedMember.insignia_bonus_ids];
                            next[index] = event.target.value;
                            updateMember(selectedMember.id, { insignia_bonus_ids: next });
                          }}
                        >
                          <option value="">None</option>
                          {insigniaBonuses.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Select>
                      </Field>
                    ))}
                  </div>

                  <Field label="Notes">
                    <Textarea
                      placeholder="Rotation or assignment notes"
                      value={selectedMember.notes}
                      onChange={(event) => updateMember(selectedMember.id, { notes: event.target.value })}
                    />
                  </Field>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>

        <div className="space-y-6">
          <SummaryPanel
            icon={Target}
            title="Boss Debuffs"
            highlights={[
              { label: "Resolved total", value: formatPercent(bossTotals.resolvedTotal) },
              { label: "Active sources", value: `${bossTotals.activeSources}` },
            ]}
            lines={teamState.bossSummary.map((line) => ({
              label: titleCase(line.stat),
              value: formatPercent(line.total),
              detail: `${line.contributions.length} active • ${line.unresolved.length} pending`,
            }))}
          />
          <SummaryPanel
            icon={Swords}
            title="Team Buffs"
            highlights={[
              { label: "Resolved total", value: formatPercent(teamTotals.resolvedTotal) },
              { label: "Active sources", value: `${teamTotals.activeSources}` },
            ]}
            lines={teamState.teamSummary.map((line) => ({
              label: titleCase(line.stat),
              value: formatPercent(line.total),
              detail: `${line.contributions.length} active • ${line.unresolved.length} pending`,
            }))}
          />
          <Card>
            <CardHeader>
              <CardTitle>Carry Summary</CardTitle>
              <CardDescription>{carry ? getMemberTitle(carry) : "No carry selected"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/80">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-[var(--border)] bg-[rgba(189,224,254,0.1)] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/80">Team buff sources</p>
                  <p className="mt-2 text-lg font-semibold text-white">{carryTotals.teamSources}</p>
                </div>
                <div className="border border-[var(--border)] bg-[rgba(255,200,221,0.1)] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/80">Boss debuff sources</p>
                  <p className="mt-2 text-lg font-semibold text-white">{carryTotals.bossSources}</p>
                </div>
              </div>
              <p>Damage bonus: {formatPercent(teamState.carryState.outgoing_damage_bonus)}</p>
              <p>Combat advantage: {formatPercent(teamState.carryState.effective_ca)}</p>
              <p>Power: {formatPercent(teamState.carryState.effective_power)}</p>
              <p>Crit strike: {formatPercent(teamState.carryState.effective_crit_strike)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-white" />
                <CardTitle>Mount Hit Calculator</CardTitle>
              </div>
              <CardDescription>Simple breakdown for the currently selected carry setup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Base hit">
                <Input
                  type="number"
                  value={mountBaseHitOverride}
                  onChange={(event) => setMountBaseHitOverride(Number(event.target.value) || 0)}
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Crit assumption">
                  <Input
                    type="number"
                    step="0.05"
                    value={critAssumption}
                    onChange={(event) => setCritAssumption(Number(event.target.value) || 0)}
                  />
                </Field>
                <Field label="CA assumption">
                  <Input
                    type="number"
                    step="0.05"
                    value={caAssumption}
                    onChange={(event) => setCaAssumption(Number(event.target.value) || 0)}
                  />
                </Field>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant={includePersonal ? "primary" : "secondary"} onClick={() => setIncludePersonal((value) => !value)}>
                  Personal
                </Button>
                <Button variant={includeTeam ? "primary" : "secondary"} onClick={() => setIncludeTeam((value) => !value)}>
                  Team
                </Button>
                <Button variant={includeBoss ? "primary" : "secondary"} onClick={() => setIncludeBoss((value) => !value)}>
                  Boss
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-[var(--border)] bg-[rgba(189,224,254,0.1)] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/80">Applied stages</p>
                  <p className="mt-2 text-lg font-semibold text-white">{mountTotals.appliedStages}</p>
                </div>
                <div className="border border-[var(--border)] bg-[rgba(205,180,219,0.1)] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/80">Resolved debuff total</p>
                  <p className="mt-2 text-lg font-semibold text-white">{formatPercent(bossTotals.resolvedTotal)}</p>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-white/80">
                <p>Personal bonus used: {formatPercent(mountTotals.personalBonus)}</p>
                <p>Team bonus used: {formatPercent(mountTotals.teamBonus)}</p>
                <p>Boss debuff used: {formatPercent(mountTotals.bossBonus)}</p>
                <p>After owner: {Math.round(mountCalc.afterOwnerScaling).toLocaleString()}</p>
                <p>After personal: {Math.round(mountCalc.afterPersonalBuffs).toLocaleString()}</p>
                <p>After team: {Math.round(mountCalc.afterTeamBuffs).toLocaleString()}</p>
                <p>After boss: {Math.round(mountCalc.afterBossDebuffs).toLocaleString()}</p>
                <p className="text-base font-semibold text-white">
                  Final estimated hit: {Math.round(mountCalc.finalEstimatedHit).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {autoSetupOpen ? (
        <AutoSetupOverlay
          onClose={() => setAutoSetupOpen(false)}
          onSelect={applyAutoSetup}
        />
      ) : null}

      {pickerState && pickerMember ? (
        <SelectionOverlay
          member={pickerMember}
          kind={pickerState.kind}
          query={pickerQuery}
          activeFilter={pickerFilter}
          filters={getPickerFilters(pickerState.kind)}
          items={pickerItems}
          onQueryChange={setPickerQuery}
          onFilterChange={setPickerFilter}
          onClose={closePicker}
          onSelect={applyPickerSelection}
        />
      ) : null}
    </div>
  );
}

function RosterGroup({
  title,
  members,
  selectedMemberId,
  onSelect,
}: {
  title: string;
  members: TeamMember[];
  selectedMemberId: string;
  onSelect: (memberId: string) => void;
}) {
  return (
    <section className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">{title}</p>
      <div className="space-y-2">
        {members.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => onSelect(member.id)}
            className={`block w-full border p-3 text-left transition ${
              member.id === selectedMemberId
                ? "border-[rgba(162,210,255,0.9)] bg-[rgba(162,210,255,0.12)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <SelectionThumb
                imageUrl={getClassImage(member.class_id)}
                label={getMemberTitle(member)}
                badgeText={getParagonBadge(member)}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-white">
                    {member.group}-{member.slot} {getMemberTitle(member)}
                  </p>
                  {member.is_carry ? <Badge variant="teal">Carry</Badge> : null}
                </div>
                <p className="mt-2 text-sm text-white/70">{buildMemberSummary(member)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.18em] text-white/60">{label}</span>
      {children}
    </label>
  );
}

function SelectionThumb({
  imageUrl,
  label,
  badgeText,
  size = "md",
}: {
  imageUrl?: string;
  label: string;
  badgeText?: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "h-12 w-12" : "h-14 w-14";

  if (imageUrl) {
    return (
      <div className={`relative shrink-0 ${sizeClass}`}>
        <Image
          src={imageUrl}
          alt={label}
          width={size === "sm" ? 48 : 56}
          height={size === "sm" ? 48 : 56}
          className={`${sizeClass} border border-[var(--border)] bg-[rgba(205,180,219,0.1)] object-cover`}
        />
        {badgeText ? (
          <span className="absolute -bottom-1 -right-1 border border-[var(--border)] bg-[rgba(162,210,255,0.92)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black">
            {badgeText}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`relative flex shrink-0 items-center justify-center border border-[var(--border)] bg-[rgba(205,180,219,0.12)] text-sm font-semibold text-white ${sizeClass}`}>
      {getInitials(label)}
      {badgeText ? (
        <span className="absolute -bottom-1 -right-1 border border-[var(--border)] bg-[rgba(162,210,255,0.92)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black">
          {badgeText}
        </span>
      ) : null}
    </div>
  );
}

function PickerField({
  title,
  subtitle,
  imageUrl,
  imageLabel,
  onClick,
}: {
  title: string;
  subtitle: string;
  imageUrl?: string;
  imageLabel?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-20 w-full items-center justify-between gap-3 border border-[var(--border)] bg-[rgba(205,180,219,0.1)] px-4 py-3 text-left transition hover:border-[var(--sky-blue)]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <SelectionThumb imageUrl={imageUrl} label={imageLabel ?? title} />
        <div className="min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-1 text-xs text-white/70">{subtitle}</p>
        </div>
      </div>
      <Search className="h-4 w-4 text-white" />
    </button>
  );
}

function SelectionOverlay({
  member,
  kind,
  query,
  activeFilter,
  filters,
  items,
  onQueryChange,
  onFilterChange,
  onClose,
  onSelect,
}: {
  member: TeamMember;
  kind: PickerKind;
  query: string;
  activeFilter: string;
  filters: Array<{ value: string; label: string }>;
  items: PickerItem[];
  onQueryChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[rgba(205,180,219,0.16)] backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-center px-5 py-8">
        <div className="flex max-h-full w-full flex-col overflow-hidden border border-[var(--border)] bg-[rgba(9,6,13,0.96)] shadow-[0_36px_90px_rgba(0,0,0,0.35)]">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-6 py-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                {getPickerLabel(kind)} for {member.group}-{member.slot}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{getPickerLabel(kind)}</h3>
              <p className="mt-2 text-sm text-white/70">Only concise, proven values are shown in this picker.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[rgba(205,180,219,0.12)] text-white transition hover:border-[var(--sky-blue)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4 border-b border-[var(--border)] px-6 py-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              <Input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder={`Search ${getPickerLabel(kind).toLowerCase()}...`}
                className="pl-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  size="sm"
                  variant={activeFilter === filter.value ? "primary" : "secondary"}
                  onClick={() => onFilterChange(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-3 overflow-y-auto p-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 border border-[var(--border)] bg-[rgba(205,180,219,0.08)] p-4 lg:grid-cols-[72px_minmax(0,1fr)_140px]"
                >
                  <div className="flex items-start">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 border border-[var(--border)] bg-[rgba(205,180,219,0.12)] object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center border border-[var(--border)] bg-[rgba(205,180,219,0.12)] text-sm font-semibold text-white">
                        {getInitials(item.name) || <ImageOff className="h-4 w-4 text-white/70" />}
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-base font-semibold text-white">{item.name}</p>
                      {item.subtitle ? <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">{item.subtitle}</p> : null}
                    </div>
                    {item.badges.length ? (
                      <div className="flex flex-wrap gap-2">
                        {item.badges.map((badge) => (
                          <Badge key={`${item.id}-${badge.label}`} variant={badge.variant}>
                            {badge.label}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                    <p className="text-sm leading-6 text-white/80">{item.description}</p>
                  </div>
                  <div className="flex flex-col items-stretch justify-between gap-3">
                    <Button variant="primary" onClick={() => onSelect(item.id)}>
                      Select
                    </Button>
                    {item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] text-white/80"
                      >
                        Source
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                title="No matching entries"
                description="Try a broader search or switch filters."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AutoSetupOverlay({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (goal: AutoSetupGoal) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.78)] backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[760px] items-center justify-center px-5 py-8">
        <div className="w-full border border-white/15 bg-black p-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Best setup</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Are you bossing one DPS or do you want overall team damage?
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                The first option stacks the group around one carry. The second spreads damage across multiple DPS slots and uses damage mounts on those DPS members.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border border-white/15 bg-black text-white transition hover:border-white/30"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => onSelect("boost_one_dps")}
              className="border border-[rgba(162,210,255,0.95)] bg-[rgba(162,210,255,0.15)] p-5 text-left transition hover:bg-[rgba(162,210,255,0.22)]"
            >
              <p className="text-lg font-semibold text-white">Boost one DPS</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                One carry DPS. The rest of the team is filled with support classes, debuff encounters, support mounts, support artifacts, and top support companions.
              </p>
            </button>
            <button
              type="button"
              onClick={() => onSelect("overall_team_damage")}
              className="border border-[rgba(205,180,219,0.95)] bg-[rgba(205,180,219,0.15)] p-5 text-left transition hover:bg-[rgba(205,180,219,0.22)]"
            >
              <p className="text-lg font-semibold text-white">Overall team damage</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Balanced damage lineup. Multiple DPS slots receive 4000-magnitude-style damage mounts while the rest of the team still carries support and debuff coverage.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
