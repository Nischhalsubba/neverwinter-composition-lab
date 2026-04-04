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

function getMemberSummary(member: TeamMember) {
  const parts = [
    member.race || "Race not set",
    formatRoleLabel(member.role),
    artifacts.find((item) => item.id === member.artifact_id)?.name,
    companionEnhancements.find((item) => item.id === member.enhancement_id)?.name,
  ].filter(Boolean);

  return parts.join(" • ");
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
      const recommendation = companionRecommendationsById[item.id];
      return {
        id: item.id,
        name: item.name,
        subtitle: `${item.role_tag} / ${item.archetype}`,
        description: recommendation
          ? `${recommendation.benefit} Rough damage boost ${recommendation.roughDamageBoost?.toFixed(2) ?? "0.00"}%.`
          : "Verified companion entry.",
        sourceUrl: item.source_url,
        filters: ["all", item.role_tag, recommendation ? "recommended" : "other"],
        badges: [
          { label: item.role_tag, variant: "purple" },
          ...(recommendation ? [{ label: `Support #${recommendation.rank}`, variant: "teal" as const }] : []),
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
      { value: "recommended", label: "Recommended" },
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
  const [bossId, setBossId] = useState(bossPresets[0]?.id ?? "");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
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

  function updateTeamMode(nextMode: TeamMode) {
    const nextMembers = createInitialTeamMembers(nextMode);
    setMode(nextMode);
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

  if (!mode) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <p className="text-[11px] uppercase tracking-[0.22em] text-sky-100/80">Team Builder Start</p>
            <CardTitle className="text-[32px]">Choose party size</CardTitle>
            <CardDescription>
              Start with dungeon for 5 players or trial for 10 players. Every slot begins empty.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => updateTeamMode("dungeon")}
              className="border border-white/10 bg-white/[0.03] p-8 text-left transition hover:border-sky-200/40"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">5 players</p>
              <p className="mt-3 text-2xl font-semibold text-stone-100">Dungeon</p>
              <p className="mt-3 text-sm text-stone-400">Single party. Best for standard 5-player group building.</p>
            </button>
            <button
              type="button"
              onClick={() => updateTeamMode("trial")}
              className="border border-white/10 bg-white/[0.03] p-8 text-left transition hover:border-sky-200/40"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">10 players</p>
              <p className="mt-3 text-2xl font-semibold text-stone-100">Trial</p>
              <p className="mt-3 text-sm text-stone-400">Two groups of five for endgame trial planning.</p>
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid gap-4 p-6 xl:grid-cols-[auto_auto_minmax(220px,1fr)_minmax(220px,1fr)]">
          <div className="flex flex-wrap gap-2">
            <Button variant={mode === "dungeon" ? "primary" : "secondary"} onClick={() => updateTeamMode("dungeon")}>
              Dungeon
            </Button>
            <Button variant={mode === "trial" ? "primary" : "secondary"} onClick={() => updateTeamMode("trial")}>
              Trial
            </Button>
          </div>
          <Button variant="secondary" onClick={() => updateTeamMode(mode)}>
            Reset
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
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-sky-100/80">
                        Selected slot {selectedMember.group}-{selectedMember.slot}
                      </p>
                      <CardTitle className="mt-2">{getMemberTitle(selectedMember)}</CardTitle>
                      <CardDescription>{getMemberSummary(selectedMember)}</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.is_carry ? <Badge variant="teal">Carry</Badge> : null}
                      <Badge variant="muted">{formatRoleLabel(selectedMember.role)}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Class">
                      <Select value={selectedMember.class_id} onChange={(event) => handleClassChange(selectedMember.id, event.target.value)}>
                        <option value="">Select class</option>
                        {classes.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Paragon">
                      <Select value={selectedMember.paragon} onChange={(event) => handleParagonChange(selectedMember.id, event.target.value)}>
                        <option value="">{selectedMember.class_id ? "Select paragon" : "Select class first"}</option>
                        {(selectedClass?.paragon_options ?? []).map((paragon) => (
                          <option key={paragon} value={paragon}>
                            {paragon}
                          </option>
                        ))}
                      </Select>
                    </Field>
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
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="Artifact">
                      <PickerField
                        title={artifacts.find((item) => item.id === selectedMember.artifact_id)?.name ?? "Select artifact"}
                        subtitle="Ranked artifact list"
                        onClick={() => openPicker(selectedMember.id, "artifact")}
                      />
                    </Field>
                    <Field label="Companion">
                      <PickerField
                        title={companions.find((item) => item.id === selectedMember.companion_id)?.name ?? "Select companion"}
                        subtitle="Support and damage companions"
                        onClick={() => openPicker(selectedMember.id, "companion")}
                      />
                    </Field>
                    <Field label="Enhancement">
                      <PickerField
                        title={companionEnhancements.find((item) => item.id === selectedMember.enhancement_id)?.name ?? "Select enhancement"}
                        subtitle="Only proven values shown"
                        onClick={() => openPicker(selectedMember.id, "enhancement")}
                      />
                    </Field>
                    <Field label="Mount combat power">
                      <PickerField
                        title={mountCombatPowers.find((item) => item.id === selectedMember.mount_combat_power_id)?.name ?? "Select mount"}
                        subtitle="Mount power list"
                        onClick={() => openPicker(selectedMember.id, "mount")}
                      />
                    </Field>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant={selectedMember.is_carry ? "primary" : "secondary"} onClick={() => updateCarry(selectedMember.id)}>
                      {selectedMember.is_carry ? "Selected carry" : "Mark as carry"}
                    </Button>
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
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Recommended debuff encounters</p>
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
                                  ? "border-sky-200/40 bg-[rgba(162,210,255,0.16)] text-stone-50"
                                  : "border-white/10 bg-white/[0.03] text-stone-300 hover:border-white/20"
                              }`}
                            >
                              {power.name}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-stone-400">
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
            lines={teamState.bossSummary.map((line) => ({
              label: titleCase(line.stat),
              value: formatPercent(line.total),
              detail: `${line.contributions.length} active sources`,
            }))}
          />
          <SummaryPanel
            icon={Swords}
            title="Team Buffs"
            lines={teamState.teamSummary.map((line) => ({
              label: titleCase(line.stat),
              value: formatPercent(line.total),
              detail: `${line.contributions.length} active sources`,
            }))}
          />
          <Card>
            <CardHeader>
              <CardTitle>Carry Summary</CardTitle>
              <CardDescription>{carry ? getMemberTitle(carry) : "No carry selected"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-stone-300">
              <p>Damage bonus: {formatPercent(teamState.carryState.outgoing_damage_bonus)}</p>
              <p>Combat advantage: {formatPercent(teamState.carryState.effective_ca)}</p>
              <p>Power: {formatPercent(teamState.carryState.effective_power)}</p>
              <p>Crit strike: {formatPercent(teamState.carryState.effective_crit_strike)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-sky-100" />
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
              <div className="grid gap-3 text-sm text-stone-300">
                <p>After owner: {Math.round(mountCalc.afterOwnerScaling).toLocaleString()}</p>
                <p>After personal: {Math.round(mountCalc.afterPersonalBuffs).toLocaleString()}</p>
                <p>After team: {Math.round(mountCalc.afterTeamBuffs).toLocaleString()}</p>
                <p>After boss: {Math.round(mountCalc.afterBossDebuffs).toLocaleString()}</p>
                <p className="text-base font-semibold text-stone-100">
                  Final estimated hit: {Math.round(mountCalc.finalEstimatedHit).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
      <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">{title}</p>
      <div className="space-y-2">
        {members.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => onSelect(member.id)}
            className={`block w-full border p-4 text-left transition ${
              member.id === selectedMemberId
                ? "border-sky-200/40 bg-[rgba(162,210,255,0.12)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-stone-100">
                {member.group}-{member.slot} {getMemberTitle(member)}
              </p>
              {member.is_carry ? <Badge variant="teal">Carry</Badge> : null}
            </div>
            <p className="mt-2 text-sm text-stone-400">{getMemberSummary(member)}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.18em] text-stone-500">{label}</span>
      {children}
    </label>
  );
}

function PickerField({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-14 w-full items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:border-sky-200/40"
    >
      <div>
        <p className="text-sm font-medium text-stone-100">{title}</p>
        <p className="mt-1 text-xs text-stone-400">{subtitle}</p>
      </div>
      <Search className="h-4 w-4 text-sky-100" />
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
    <div className="fixed inset-0 z-50 bg-[rgba(16,19,26,0.82)] backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-center px-5 py-8">
        <div className="flex max-h-full w-full flex-col overflow-hidden border border-white/10 bg-[rgba(30,32,46,0.96)] shadow-[0_36px_90px_rgba(0,0,0,0.35)]">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-100/80">
                {getPickerLabel(kind)} for {member.group}-{member.slot}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-stone-50">{getPickerLabel(kind)}</h3>
              <p className="mt-2 text-sm text-stone-400">Only concise, proven values are shown in this picker.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.04] text-stone-200 transition hover:border-sky-200/40"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4 border-b border-white/10 px-6 py-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-100/80" />
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
                  className="grid gap-4 border border-white/10 bg-white/[0.03] p-4 lg:grid-cols-[72px_minmax(0,1fr)_140px]"
                >
                  <div className="flex items-start">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 border border-white/10 bg-white/[0.04] object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center border border-white/10 bg-white/[0.04]">
                        <ImageOff className="h-4 w-4 text-stone-500" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-base font-semibold text-stone-50">{item.name}</p>
                      {item.subtitle ? <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">{item.subtitle}</p> : null}
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
                    <p className="text-sm leading-6 text-stone-300">{item.description}</p>
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
                        className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] text-sky-100/90"
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
