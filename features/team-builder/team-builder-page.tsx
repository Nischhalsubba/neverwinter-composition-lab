"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calculator,
  Layers3,
  ShieldPlus,
  Swords,
  Target,
  Users,
} from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { SummaryPanel } from "@/components/summary-panel";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  artifacts,
  bossPresets,
  classes,
  companionBonuses,
  companionEnhancements,
  companions,
  createInitialTeamMembers,
  getDefaultPowerLoadoutForClass,
  getRoleForClassParagon,
  insigniaBonuses,
  mountCombatPowers,
  mountEquipPowers,
  powers,
} from "@/data/game-data";
import { calculateMountHit, summarizeTeam } from "@/lib/effect-engine";
import type { EffectStat, TeamMember, TeamMode } from "@/lib/types";
import { formatPercent, titleCase } from "@/lib/utils";

const leftTabs = ["Roster", "Classes", "Companions", "Artifacts", "Mounts", "Powers", "Effects"] as const;
const editorTabs = ["Identity", "Loadout", "Companion", "Mount", "Personal Buffs", "Notes"] as const;

const effectStats: EffectStat[] = [
  "damage_bonus",
  "power",
  "crit_strike",
  "crit_severity",
  "combat_advantage",
  "accuracy",
  "forte",
];

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

const seededEntityEffectMap: Record<string, string[]> = {
  "comp-tutor": ["effect-tutor-ca", "effect-tutor-coverage"],
  "comp-drizzt": ["effect-drizzt-damage"],
  "comp-portobello": ["effect-portobello-power", "effect-portobello-ca"],
  "combat-uni-party": ["effect-uni-ca"],
  "combat-red-dragon": [
    "effect-red-dragon-owner-damage",
    "effect-red-dragon-owner-crit",
    "effect-red-dragon-boss-crit-avoid",
  ],
};

const entityEffectMap: Record<string, string[]> = {
  ...seededEntityEffectMap,
  ...Object.fromEntries(artifacts.filter((item) => item.effect_ids.length).map((item) => [item.id, item.effect_ids])),
  ...Object.fromEntries(
    companionEnhancements.filter((item) => item.effect_ids.length).map((item) => [item.id, item.effect_ids]),
  ),
  ...Object.fromEntries(
    companionBonuses.filter((item) => item.effect_ids.length).map((item) => [item.id, item.effect_ids]),
  ),
  ...Object.fromEntries(powers.filter((item) => item.effect_ids.length).map((item) => [item.id, item.effect_ids])),
  ...Object.fromEntries(
    mountCombatPowers.filter((item) => item.effect_ids.length).map((item) => [item.id, item.effect_ids]),
  ),
  ...Object.fromEntries(
    mountEquipPowers.filter((item) => item.effect_ids.length).map((item) => [item.id, item.effect_ids]),
  ),
};

if (typeof globalThis !== "undefined") {
  (globalThis as unknown as { __NW_ENTITY_EFFECTS__?: Record<string, string[]> }).__NW_ENTITY_EFFECTS__ =
    entityEffectMap;
}

export function TeamBuilderPage() {
  const [mode, setMode] = useState<TeamMode | null>(null);
  const [activeTab, setActiveTab] = useState<(typeof leftTabs)[number]>("Roster");
  const [editorTab, setEditorTab] = useState<(typeof editorTabs)[number]>("Identity");
  const [bossId, setBossId] = useState(bossPresets[0]?.id ?? "");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [mountBaseHitOverride, setMountBaseHitOverride] = useState(1000000);
  const [critAssumption, setCritAssumption] = useState(0.5);
  const [caAssumption, setCaAssumption] = useState(0.5);
  const [includePersonal, setIncludePersonal] = useState(true);
  const [includeTeam, setIncludeTeam] = useState(true);
  const [includeBoss, setIncludeBoss] = useState(true);

  const boss = bossPresets.find((item) => item.id === bossId) ?? bossPresets[0];
  const selectedMember = teamMembers.find((member) => member.id === selectedMemberId) ?? teamMembers[0];
  const teamState = useMemo(() => summarizeTeam(teamMembers, boss), [boss, teamMembers]);
  const carry = teamState.carry;
  const bossDebuffSourceCount = useMemo(
    () => teamState.bossSummary.reduce((sum, line) => sum + line.contributions.length + line.unresolved.length, 0),
    [teamState.bossSummary],
  );
  const bossDebuffResolvedPercent = useMemo(
    () => teamState.bossSummary.reduce((sum, line) => sum + line.total, 0),
    [teamState.bossSummary],
  );

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
    setMode(nextMode);
    const nextMembers = createInitialTeamMembers(nextMode);
    setTeamMembers(nextMembers);
    setSelectedMemberId(nextMembers[0]?.id ?? "");
    setEditorTab("Identity");
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

  function updateCarry(memberId: string) {
    setTeamMembers((members) =>
      members.map((member) => ({ ...member, is_carry: member.id === memberId })),
    );
  }

  const leftPanelCards = {
    Roster: teamMembers.map((member) => ({
      key: member.id,
      title: member.label,
      meta: `${member.group}-${member.slot} / ${member.role.toUpperCase()}`,
      note: `${classes.find((item) => item.id === member.class_id)?.name ?? "No class"} / ${member.paragon || "Path pending"}`,
    })),
    Classes: classes.map((item) => ({
      key: item.id,
      title: item.name,
      meta: item.role_focus.join(", "),
      note: item.identity_note,
    })),
    Companions: companions.map((item) => ({
      key: item.id,
      title: item.name,
      meta: item.role_tag.toUpperCase(),
      note: item.notes,
    })),
    Artifacts: artifacts.map((item) => ({
      key: item.id,
      title: item.name,
      meta: `Rank ${item.rank_order ?? "-"}`,
      note: item.notes,
    })),
    Mounts: mountCombatPowers.map((item) => ({
      key: item.id,
      title: item.name,
      meta: item.damage_type,
      note: item.notes,
    })),
    Powers: [],
    Effects: [...teamState.bossSummary, ...teamState.teamSummary].map((item) => ({
      key: item.stat,
      title: titleCase(item.stat),
      meta: formatPercent(item.total),
      note:
        item.unresolved.length > 0
          ? `${item.unresolved.length} unresolved sources still tracked`
          : "Resolved from current team selections",
    })),
  };

  if (!mode) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/80">Team Builder Start</p>
            <CardTitle className="text-[32px]">Choose Dungeon or Trial</CardTitle>
            <CardDescription>
              Dungeon creates 5 empty slots. Trial creates 10 empty slots split into Group A and Group B. After that, click a slot to configure class, artifact, purple debuff, and encounter selections.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => updateTeamMode("dungeon")}
              className="border border-white/10 bg-[linear-gradient(180deg,rgba(205,180,219,0.14),rgba(189,224,254,0.1))] p-8 text-left transition hover:border-sky-200/40"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">5 slots</p>
              <p className="mt-3 text-2xl font-semibold text-stone-100">Dungeon</p>
              <p className="mt-4 text-sm leading-7 text-stone-400">
                Single party layout for fast 5-player planning with empty member slots.
              </p>
            </button>
            <button
              type="button"
              onClick={() => updateTeamMode("trial")}
              className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,200,221,0.16),rgba(162,210,255,0.1))] p-8 text-left transition hover:border-pink-200/40"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">10 slots</p>
              <p className="mt-3 text-2xl font-semibold text-stone-100">Trial</p>
              <p className="mt-4 text-sm leading-7 text-stone-400">
                Two groups of five with empty slots so the full composition starts from scratch.
              </p>
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="space-y-6 p-7 min-[1900px]:p-8">
          <div className="grid gap-5 min-[1500px]:grid-cols-[minmax(0,1.35fr)_360px]">
            <div className="max-w-4xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/80">Core feature</p>
              <h2 className="mt-2 text-[38px] font-semibold tracking-[-0.035em] text-stone-50 min-[1900px]:text-[46px]">Team Builder</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-stone-400">
                Build a dungeon shell for 5 players or a trial shell for 10 players in two groups of five. The layout now favors readable cards and breathable spacing instead of compressing the planner into one dense strip.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 min-[1500px]:grid-cols-1">
              <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.14),rgba(189,224,254,0.08))] p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Boss preset</p>
                <p className="mt-3 text-base font-medium text-stone-100">{boss.name}</p>
              </div>
              <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(255,200,221,0.14),rgba(162,210,255,0.08))] p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Selected carry</p>
                <p className="mt-3 text-base font-medium text-stone-100">{carry?.label ?? "Pending"}</p>
              </div>
            </div>
          </div>

          <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.12),rgba(189,224,254,0.06))] p-4 min-[1900px]:p-5">
            <div className="grid gap-3 min-[1500px]:grid-cols-[auto_auto_minmax(240px,1fr)_minmax(240px,1fr)_auto]">
            <div className="flex flex-wrap gap-2">
              <Button variant={mode === "dungeon" ? "primary" : "secondary"} onClick={() => updateTeamMode("dungeon")}>
                Dungeon
              </Button>
              <Button variant={mode === "trial" ? "primary" : "secondary"} onClick={() => updateTeamMode("trial")}>
                Trial
              </Button>
            </div>
            <Button variant="secondary" onClick={() => updateTeamMode(mode)}>
              Reset Layout
            </Button>
            <Select value={bossId} onChange={(event) => setBossId(event.target.value)}>
              {bossPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </Select>
            <Select value={carry?.id ?? ""} onChange={(event) => updateCarry(event.target.value)}>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  Carry: {member.label}
                </option>
              ))}
            </Select>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary">Save</Button>
              <Button variant="secondary">Load</Button>
              <Button variant="secondary">Share</Button>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)] min-[1950px]:grid-cols-[320px_minmax(0,1fr)_360px]">
        <Card className="h-fit xl:sticky xl:top-5">
          <CardHeader>
            <CardTitle>Library Sidebar</CardTitle>
            <CardDescription>Browse data separately from the active build so the main canvas keeps its space.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-2">
              {leftTabs.map((tab) => (
                <Button
                  key={tab}
                  size="sm"
                  variant={activeTab === tab ? "primary" : "secondary"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>
            <div className="space-y-3">
              {leftPanelCards[activeTab].length > 0 ? (
                leftPanelCards[activeTab].map((item) => (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => activeTab === "Roster" && setSelectedMemberId(item.key)}
                    className={`block w-full border p-5 text-left transition ${
                      item.key === selectedMemberId
                        ? "border-sky-200/30 bg-[linear-gradient(180deg,rgba(162,210,255,0.18),rgba(205,180,219,0.12))]"
                        : "border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.08),rgba(189,224,254,0.06))] hover:border-white/12"
                    }`}
                  >
                    <p className="text-sm font-medium text-stone-100">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">{item.meta}</p>
                    <p className="mt-3 text-sm leading-7 text-stone-400">{item.note}</p>
                  </button>
                ))
              ) : (
                <EmptyState
                  title="No structured entries yet"
                  description="This browse view is reserved for future verified data instead of guessed values."
                />
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <CardTitle>Team Canvas</CardTitle>
                <CardDescription>
                  Member cards stay readable first. The summary rail drops below until the viewport is truly wide enough for a third column.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="teal">{mode === "trial" ? "Trial layout" : "Dungeon layout"}</Badge>
                <Badge variant="muted">{teamMembers.length} members</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-10">
              <GroupSection
                title="Group A"
                members={teamMembers.filter((member) => member.group === "A")}
                selectedMemberId={selectedMemberId}
                onSelect={setSelectedMemberId}
              />
              {mode === "trial" ? (
                <GroupSection
                  title="Group B"
                  members={teamMembers.filter((member) => member.group === "B")}
                  selectedMemberId={selectedMemberId}
                  onSelect={setSelectedMemberId}
                />
              ) : null}
            </CardContent>
          </Card>

          {selectedMember ? (
            <Card>
              <CardHeader className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-sky-100" />
                      <p className="text-[11px] uppercase tracking-[0.22em] text-sky-100/80">Member Config Panel</p>
                    </div>
                    <CardTitle className="mt-2 text-[28px]">{selectedMember.label}</CardTitle>
                    <CardDescription>
                      The editor is now segmented so identity, loadout, support layers, and notes do not collapse into one long wall of fields.
                    </CardDescription>
                  </div>
                  {(() => {
                    const sourceItem =
                      companions.find((item) => item.id === selectedMember.companion_id) ??
                      artifacts.find((item) => item.id === selectedMember.artifact_id);
                    return sourceItem ? <SourceBadge {...sourceItem} /> : null;
                  })()}
                </div>
                <div className="flex flex-wrap gap-2">
                  {editorTabs.map((tab) => (
                    <Button
                      key={tab}
                      size="sm"
                      variant={editorTab === tab ? "primary" : "secondary"}
                      onClick={() => setEditorTab(tab)}
                    >
                      {tab}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>{renderEditorTab(editorTab, selectedMember, updateMember, updateCarry, handleClassChange)}</CardContent>
            </Card>
          ) : null}
        </div>

        <div className="grid gap-6 xl:col-span-2 xl:grid-cols-2 min-[1950px]:col-span-1 min-[1950px]:grid-cols-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-rose-200">
                <Layers3 className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.22em]">Boss debuff total</p>
              </div>
              <CardTitle>{bossDebuffSourceCount} applied or tracked sources</CardTitle>
              <CardDescription>
                Display aggregate for planning only. Internal debuff math still stays split by debuff type.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.12),rgba(189,224,254,0.08))] px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Total debuff sources</p>
                <p className="mt-2 text-2xl font-semibold text-stone-100">{bossDebuffSourceCount}</p>
              </div>
              <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(255,200,221,0.12),rgba(162,210,255,0.08))] px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">Resolved combined percent</p>
                <p className="mt-2 text-2xl font-semibold text-stone-100">{formatPercent(bossDebuffResolvedPercent)}</p>
              </div>
            </CardContent>
          </Card>
          <SummaryPanel
            icon={Layers3}
            title="Boss Debuff Summary"
            lines={teamState.bossSummary.map((line) => ({
              label: titleCase(line.stat),
              value: formatPercent(line.total),
              detail: `${line.contributions.length} resolved / ${line.unresolved.length} pending`,
            }))}
          />
          <SummaryPanel
            icon={ShieldPlus}
            title="Team Buff Summary"
            lines={teamState.teamSummary.map((line) => ({
              label: titleCase(line.stat),
              value: formatPercent(line.total),
              detail: `${line.contributions.length} resolved / ${line.unresolved.length} pending`,
            }))}
          />
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sky-100">
                <Users className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.22em]">Carry DPS State</p>
              </div>
              <CardTitle>{carry?.label ?? "Carry pending"}</CardTitle>
              <CardDescription>
                Personal buffs, team buffs, and boss-state coverage remain separated for the carry.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(teamState.carryState).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.34),rgba(17,0,28,0.82))] px-5 py-4"
                >
                  <span className="text-sm text-stone-400">{titleCase(key)}</span>
                  <span className="text-sm font-medium text-stone-100">{formatPercent(value)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-orange-200">
                <Calculator className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.22em]">Final Mount Hit Calculator</p>
              </div>
              <CardTitle>Mount-hit estimator</CardTitle>
              <CardDescription>
                Supports unresolved mount base data through a local base-hit override while keeping the rest of the stack visible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Mount owner">
                <Select value={carry?.id ?? ""} onChange={(event) => updateCarry(event.target.value)}>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Selected damage mount">
                <Select
                  value={carry?.mount_combat_power_id ?? ""}
                  onChange={(event) => carry && updateMember(carry.id, { mount_combat_power_id: event.target.value })}
                >
                  {mountCombatPowers.map((power) => (
                    <option key={power.id} value={power.id}>
                      {power.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Base hit override">
                <Input
                  type="number"
                  value={mountBaseHitOverride}
                  onChange={(event) => setMountBaseHitOverride(Number(event.target.value))}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Crit assumption">
                  <Input
                    type="number"
                    step="0.01"
                    value={critAssumption}
                    onChange={(event) => setCritAssumption(Number(event.target.value))}
                  />
                </Field>
                <Field label="CA assumption">
                  <Input
                    type="number"
                    step="0.01"
                    value={caAssumption}
                    onChange={(event) => setCaAssumption(Number(event.target.value))}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-3 gap-2">
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
              <div className="space-y-2 rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.44),rgba(17,0,28,0.9))] p-5">
                {Object.entries(mountCalc).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-stone-400">{titleCase(key)}</span>
                    <span className="font-medium text-stone-100">{Math.round(value).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-rose-200">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.22em]">Coverage</p>
              </div>
              <CardTitle>Missing & duplicate effects</CardTitle>
              <CardDescription>Warnings are scoped by effect type instead of one generic team score.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.34),rgba(17,0,28,0.82))] p-5">
                <p className="mb-3 text-sm font-medium text-stone-100">Missing effects</p>
                <div className="flex flex-wrap gap-2">
                  {teamState.missingBoss.length > 0 ? (
                    teamState.missingBoss.map((line) => (
                      <Badge key={line.stat} variant="red">
                        {titleCase(line.stat)}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="green">Core boss debuff categories covered or tracked</Badge>
                  )}
                </div>
              </div>
              <div className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.34),rgba(17,0,28,0.82))] p-5">
                <p className="mb-3 text-sm font-medium text-stone-100">Duplicate effects</p>
                <div className="space-y-2">
                  {teamState.duplicates.length > 0 ? (
                    teamState.duplicates.map((warning) => (
                      <div key={warning.stackKey} className="rounded-[20px] border border-amber-300/20 bg-amber-300/8 p-4">
                        <p className="text-sm font-medium text-amber-100">{warning.reason}</p>
                        <p className="mt-1 text-sm leading-6 text-stone-300">{warning.effectNames.join(", ")}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-6 text-stone-400">No strongest-only conflicts detected from the current seed selections.</p>
                  )}
                </div>
              </div>
              {selectedMember ? (
                <div className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.34),rgba(17,0,28,0.82))] p-5">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-stone-100">Selected member provenance</p>
                    {(() => {
                      const sourceItem =
                        companions.find((item) => item.id === selectedMember.companion_id) ??
                        artifacts.find((item) => item.id === selectedMember.artifact_id);
                      return sourceItem ? <SourceBadge {...sourceItem} /> : null;
                    })()}
                  </div>
                  <p className="text-sm leading-6 text-stone-400">
                    The UI keeps source and verification badges close to the selected loadout so unresolved live values stay visible during planning.
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function GroupSection({
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
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-stone-100">
          <Swords className="h-4 w-4 text-sky-100" />
          <p className="text-sm font-medium">{title}</p>
        </div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">{members.length} members</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            isSelected={member.id === selectedMemberId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

function MemberCard({
  member,
  isSelected,
  onSelect,
}: {
  member: TeamMember;
  isSelected: boolean;
  onSelect: (memberId: string) => void;
}) {
  const companion = companions.find((item) => item.id === member.companion_id);
  const artifact = artifacts.find((item) => item.id === member.artifact_id);
  const mountPower = mountCombatPowers.find((item) => item.id === member.mount_combat_power_id);
  const classItem = classes.find((item) => item.id === member.class_id);
  const encounterNames = member.encounter_ids
    .map((id) => powers.find((item) => item.id === id)?.name)
    .filter(Boolean);
  const featureNames = member.feature_ids
    .map((id) => powers.find((item) => item.id === id)?.name)
    .filter(Boolean);

  return (
    <button
      type="button"
      onClick={() => onSelect(member.id)}
      className={`border p-6 text-left transition ${
        isSelected
          ? "border-sky-200/30 bg-[linear-gradient(180deg,rgba(162,210,255,0.16),rgba(205,180,219,0.12))]"
          : "border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.08),rgba(189,224,254,0.06))] hover:border-white/14"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center border border-white/8 bg-white/[0.04] text-sm font-medium text-stone-300">
            {member.group}-{member.slot}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-lg font-semibold text-stone-50">{member.class_id ? member.label : `Empty Slot ${member.slot}`}</p>
              {member.is_carry ? <Badge variant="teal">Carry</Badge> : <Badge variant="muted">{member.role}</Badge>}
            </div>
            <p className="mt-2 text-sm text-stone-400">
              {classItem?.name ?? "Class not selected"} {member.paragon ? `/ ${member.paragon}` : ""}
            </p>
          </div>
        </div>
        <div className="hidden border border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.08),rgba(189,224,254,0.06))] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-stone-500 md:block">
          {member.race || "Race pending"}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <LoadoutCell label="Artifact" value={artifact?.name ?? "Missing artifact"} />
        <LoadoutCell label="Companion" value={companion?.name ?? "Missing companion"} />
        <LoadoutCell label="Mount" value={mountPower?.name ?? "Missing mount"} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {companion?.role_tag ? <Badge variant="purple">{companion.role_tag}</Badge> : null}
        {artifact?.category ? <Badge variant="gold">{artifact.category}</Badge> : null}
        {mountPower?.damage_type ? <Badge variant="orange">{mountPower.damage_type}</Badge> : null}
        {member.role === "support" ? <Badge variant="blue">Support contribution</Badge> : null}
        {encounterNames.map((name) => (
          <Badge key={name} variant="red">
            {name}
          </Badge>
        ))}
        {featureNames.map((name) => (
          <Badge key={name} variant="teal">
            {name}
          </Badge>
        ))}
      </div>
    </button>
  );
}

function LoadoutCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.08),rgba(189,224,254,0.06))] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-stone-200">{value}</p>
    </div>
  );
}

function renderEditorTab(
  editorTab: (typeof editorTabs)[number],
  selectedMember: TeamMember,
  updateMember: (memberId: string, patch: Partial<TeamMember>) => void,
  updateCarry: (memberId: string) => void,
  handleClassChange: (memberId: string, classId: string) => void,
) {
  const className = classes.find((item) => item.id === selectedMember.class_id)?.name;
  const classEncounters = powers.filter(
    (power) =>
      power.class_name === className &&
      power.power_type === "encounter" &&
      (!selectedMember.paragon || !power.paragon_path || power.paragon_path === selectedMember.paragon),
  );
  const classFeatures = powers.filter(
    (power) =>
      power.class_name === className &&
      power.power_type === "feature" &&
      (!selectedMember.paragon || !power.paragon_path || power.paragon_path === selectedMember.paragon),
  );

  switch (editorTab) {
    case "Identity":
      return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Slot Context">
            <Select
              value={`${selectedMember.group}-${selectedMember.slot}`}
              disabled
            >
              <option value={`${selectedMember.group}-${selectedMember.slot}`}>
                Group {selectedMember.group} / Slot {selectedMember.slot}
              </option>
            </Select>
          </Field>
          <Field label="Label">
            <Input
              value={selectedMember.label}
              onChange={(event) => updateMember(selectedMember.id, { label: event.target.value })}
            />
          </Field>
          <Field label="Class">
            <Select
              value={selectedMember.class_id}
              onChange={(event) => handleClassChange(selectedMember.id, event.target.value)}
            >
              <option value="">Select class</option>
              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Role">
            <Select
              value={selectedMember.role}
              onChange={(event) => updateMember(selectedMember.id, { role: event.target.value as TeamMember["role"] })}
            >
              <option value="dps">DPS</option>
              <option value="support">Support</option>
              <option value="healer">Healer</option>
              <option value="tank">Tank</option>
            </Select>
          </Field>
          <Field label="Paragon / Path">
            <Select
              value={selectedMember.paragon}
              onChange={(event) => {
                const paragon = event.target.value;
                const nextLoadout = getDefaultPowerLoadoutForClass(selectedMember.class_id, paragon);
                updateMember(selectedMember.id, {
                  paragon,
                  role: getRoleForClassParagon(selectedMember.class_id, paragon),
                  encounter_ids: nextLoadout.encounter_ids,
                  daily_ids: nextLoadout.daily_ids,
                  feature_ids: nextLoadout.feature_ids,
                });
              }}
            >
              <option value="">{selectedMember.class_id ? "Select paragon" : "Select class first"}</option>
              {(classes.find((item) => item.id === selectedMember.class_id)?.paragon_options ?? []).map((paragon) => (
                <option key={paragon} value={paragon}>
                  {paragon}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Race">
            <Select
              value={selectedMember.race}
              onChange={(event) => updateMember(selectedMember.id, { race: event.target.value })}
            >
              <option value="">Select race</option>
              {raceOptions.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Purple Debuff / Enhancement">
            <Select
              value={selectedMember.enhancement_id}
              onChange={(event) => updateMember(selectedMember.id, { enhancement_id: event.target.value })}
            >
              <option value="">Select debuff enhancement</option>
              {companionEnhancements.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Artifact">
            <Select
              value={selectedMember.artifact_id}
              onChange={(event) => updateMember(selectedMember.id, { artifact_id: event.target.value })}
            >
              <option value="">Select artifact</option>
              {artifacts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.18em] text-stone-500">Carry state</span>
            <Button
              className="w-full"
              variant={selectedMember.is_carry ? "primary" : "secondary"}
              onClick={() => updateCarry(selectedMember.id)}
            >
              {selectedMember.is_carry ? "Selected carry DPS" : "Mark as carry DPS"}
            </Button>
          </div>
        </div>
      );
    case "Loadout":
      return (
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
              <option value="">{className ? "Select encounter" : "Select class first"}</option>
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
              <option value="">{className ? "Select encounter" : "Select class first"}</option>
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
              <option value="">{className ? "Select encounter" : "Select class first"}</option>
              {classEncounters.map((item) => (
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
              <option value="">{className ? "Select feature" : "Select class first"}</option>
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
              <option value="">{className ? "Select feature" : "Select class first"}</option>
              {classFeatures.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Companion Bonus">
            <Select
              value={selectedMember.companion_bonus_id}
              onChange={(event) => updateMember(selectedMember.id, { companion_bonus_id: event.target.value })}
            >
              {companionBonuses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Mount Combat Power">
            <Select
              value={selectedMember.mount_combat_power_id}
              onChange={(event) => updateMember(selectedMember.id, { mount_combat_power_id: event.target.value })}
            >
              {mountCombatPowers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.08),rgba(189,224,254,0.06))] p-5 md:col-span-2 xl:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">Auto-slot rule</p>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              Changing class auto-fills the currently seeded encounter and feature loadout for that class. You can override each slot manually after that.
            </p>
          </div>
        </div>
      );
    case "Companion":
      return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Companion">
            <Select
              value={selectedMember.companion_id}
              onChange={(event) => updateMember(selectedMember.id, { companion_id: event.target.value })}
            >
              {companions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Enhancement">
            <Select
              value={selectedMember.enhancement_id}
              onChange={(event) => updateMember(selectedMember.id, { enhancement_id: event.target.value })}
            >
              {companionEnhancements.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(205,180,219,0.08),rgba(189,224,254,0.06))] p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">Support note</p>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              Companion records remain source-aware. Unresolved live values stay in the model instead of being guessed.
            </p>
          </div>
        </div>
      );
    case "Mount":
      return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Mount Equip Power">
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
          <Field label="Insignia Bonus 1">
            <Select
              value={selectedMember.insignia_bonus_ids[0] ?? ""}
              onChange={(event) =>
                updateMember(selectedMember.id, {
                  insignia_bonus_ids: [
                    event.target.value,
                    selectedMember.insignia_bonus_ids[1] ?? "",
                    selectedMember.insignia_bonus_ids[2] ?? "",
                  ],
                })
              }
            >
              {insigniaBonuses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Insignia Bonus 2">
            <Select
              value={selectedMember.insignia_bonus_ids[1] ?? ""}
              onChange={(event) =>
                updateMember(selectedMember.id, {
                  insignia_bonus_ids: [
                    selectedMember.insignia_bonus_ids[0] ?? "",
                    event.target.value,
                    selectedMember.insignia_bonus_ids[2] ?? "",
                  ],
                })
              }
            >
              {insigniaBonuses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Insignia Bonus 3">
            <Select
              value={selectedMember.insignia_bonus_ids[2] ?? ""}
              onChange={(event) =>
                updateMember(selectedMember.id, {
                  insignia_bonus_ids: [
                    selectedMember.insignia_bonus_ids[0] ?? "",
                    selectedMember.insignia_bonus_ids[1] ?? "",
                    event.target.value,
                  ],
                })
              }
            >
              {insigniaBonuses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      );
    case "Personal Buffs":
      return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {effectStats.map((stat) => (
            <Field key={stat} label={`Personal ${titleCase(stat)}`}>
              <Input
                type="number"
                step="0.01"
                value={selectedMember.personal_overrides[stat] ?? ""}
                onChange={(event) =>
                  updateMember(selectedMember.id, {
                    personal_overrides: {
                      ...selectedMember.personal_overrides,
                      [stat]: event.target.value === "" ? undefined : Number(event.target.value),
                    },
                  })
                }
              />
            </Field>
          ))}
        </div>
      );
    case "Notes":
      return (
        <Field label="Notes">
          <Textarea
            placeholder="Rotation assumptions, uptime notes, unresolved live values..."
            value={selectedMember.notes}
            onChange={(event) => updateMember(selectedMember.id, { notes: event.target.value })}
          />
        </Field>
      );
    default:
      return null;
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2.5">
      <span className="text-xs uppercase tracking-[0.18em] text-stone-500">{label}</span>
      {children}
    </label>
  );
}

