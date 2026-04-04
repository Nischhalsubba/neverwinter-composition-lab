"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Calculator, Layers3, ShieldPlus, Swords, Users } from "lucide-react";

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
  insigniaBonuses,
  mountCombatPowers,
  mountEquipPowers,
} from "@/data/game-data";
import { calculateMountHit, summarizeTeam } from "@/lib/effect-engine";
import type { EffectStat, TeamMember, TeamMode } from "@/lib/types";
import { formatPercent, titleCase } from "@/lib/utils";

const leftTabs = ["Roster", "Classes", "Companions", "Artifacts", "Mounts", "Powers", "Effects"] as const;

const effectStats: EffectStat[] = [
  "damage_bonus",
  "power",
  "crit_strike",
  "crit_severity",
  "combat_advantage",
  "accuracy",
  "forte",
];

const entityEffectMap: Record<string, string[]> = {
  "comp-tutor": ["effect-tutor-ca", "effect-tutor-coverage"],
  "comp-drizzt": ["effect-drizzt-damage"],
  "comp-portobello": ["effect-portobello-power", "effect-portobello-ca"],
  "enh-armor-break": ["effect-armor-break-defense"],
  "enh-dulled-senses": ["effect-dulled-senses-awareness"],
  "enh-vulnerability": ["effect-vulnerability-crit-avoid"],
  "enh-slowed-reactions": ["effect-slowed-reactions-deflect"],
  "artifact-mythallar": ["effect-mythallar-defense"],
  "artifact-halaster": ["effect-halaster-defense"],
  "artifact-wyvern": ["effect-wyvern-incoming"],
  "artifact-charm": ["effect-charm-serpent-incoming"],
  "artifact-lantern": ["effect-lantern-incoming"],
  "combat-uni-party": ["effect-uni-ca"],
  "combat-red-dragon": [
    "effect-red-dragon-owner-damage",
    "effect-red-dragon-owner-crit",
    "effect-red-dragon-boss-crit-avoid",
  ],
};

if (typeof globalThis !== "undefined") {
  (globalThis as unknown as { __NW_ENTITY_EFFECTS__?: Record<string, string[]> }).__NW_ENTITY_EFFECTS__ =
    entityEffectMap;
}

export function TeamBuilderPage() {
  const [mode, setMode] = useState<TeamMode>("dungeon");
  const [activeTab, setActiveTab] = useState<(typeof leftTabs)[number]>("Roster");
  const [bossId, setBossId] = useState(bossPresets[0]?.id ?? "");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(createInitialTeamMembers("dungeon"));
  const [selectedMemberId, setSelectedMemberId] = useState("member-1");
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
  }

  function updateMember(memberId: string, patch: Partial<TeamMember>) {
    setTeamMembers((members) =>
      members.map((member) => (member.id === memberId ? { ...member, ...patch } : member)),
    );
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
      meta: `${member.group}-${member.slot} • ${member.role.toUpperCase()}`,
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

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-teal-200/80">Core feature</p>
            <CardTitle className="mt-1 text-2xl">Team Builder</CardTitle>
            <CardDescription className="mt-2 max-w-3xl">
              Dungeon mode supports 5 players. Trial mode supports 10 players split into Group A and Group B. All unresolved values stay source-aware instead of being flattened away.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant={mode === "dungeon" ? "primary" : "secondary"} onClick={() => updateTeamMode("dungeon")}>
              Dungeon
            </Button>
            <Button variant={mode === "trial" ? "primary" : "secondary"} onClick={() => updateTeamMode("trial")}>
              Trial
            </Button>
            <Select value={bossId} onChange={(event) => setBossId(event.target.value)} className="w-[240px]">
              {bossPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </Select>
            <Select value={carry?.id ?? ""} onChange={(event) => updateCarry(event.target.value)} className="w-[220px]">
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  Carry: {member.label}
                </option>
              ))}
            </Select>
            <Button variant="secondary">Save Build</Button>
            <Button variant="secondary">Load Build</Button>
            <Button variant="secondary">Share Build</Button>
            <Button variant="danger" onClick={() => updateTeamMode(mode)}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Library Sidebar</CardTitle>
            <CardDescription>Reusable left-navigation and selector panel pattern.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
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
                  <div key={item.key} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                    <p className="text-sm font-medium text-stone-100">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">{item.meta}</p>
                    <p className="mt-3 text-sm leading-6 text-stone-400">{item.note}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-4 text-sm leading-6 text-stone-400">
                  No structured entries for this tab yet. The page is still patch-aware and ready for future verified ingestion.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Center Team Layout</CardTitle>
              <CardDescription>Member cards stay contribution-focused and image-ready.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <GroupLayout
                title="Group A"
                members={teamMembers.filter((member) => member.group === "A")}
                selectedMemberId={selectedMemberId}
                onSelect={setSelectedMemberId}
              />
              {mode === "trial" ? (
                <GroupLayout
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
              <CardHeader>
                <CardTitle>Member Configuration Panel</CardTitle>
                <CardDescription>
                  Every member supports class, role, loadout, artifact, companion, mount, insignias, notes, and carry state.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Field label="Label">
                  <Input
                    value={selectedMember.label}
                    onChange={(event) => updateMember(selectedMember.id, { label: event.target.value })}
                  />
                </Field>
                <Field label="Carry Flag">
                  <Button
                    className="w-full"
                    variant={selectedMember.is_carry ? "primary" : "secondary"}
                    onClick={() => updateCarry(selectedMember.id)}
                  >
                    {selectedMember.is_carry ? "Selected carry DPS" : "Mark as carry DPS"}
                  </Button>
                </Field>
                <Field label="Class">
                  <Select
                    value={selectedMember.class_id}
                    onChange={(event) => updateMember(selectedMember.id, { class_id: event.target.value })}
                  >
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
                  <Input
                    placeholder="Enter verified or working path"
                    value={selectedMember.paragon}
                    onChange={(event) => updateMember(selectedMember.id, { paragon: event.target.value })}
                  />
                </Field>
                <Field label="Race">
                  <Input
                    placeholder="Optional race"
                    value={selectedMember.race}
                    onChange={(event) => updateMember(selectedMember.id, { race: event.target.value })}
                  />
                </Field>
                <Field label="Artifact">
                  <Select
                    value={selectedMember.artifact_id}
                    onChange={(event) => updateMember(selectedMember.id, { artifact_id: event.target.value })}
                  >
                    {artifacts.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Field>
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
                        insignia_bonus_ids: [event.target.value, selectedMember.insignia_bonus_ids[1] ?? "", selectedMember.insignia_bonus_ids[2] ?? ""],
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
                        insignia_bonus_ids: [selectedMember.insignia_bonus_ids[0] ?? "", event.target.value, selectedMember.insignia_bonus_ids[2] ?? ""],
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
                        insignia_bonus_ids: [selectedMember.insignia_bonus_ids[0] ?? "", selectedMember.insignia_bonus_ids[1] ?? "", event.target.value],
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
                <div className="md:col-span-2">
                  <Field label="Notes">
                    <Textarea
                      placeholder="Rotation assumptions, uptime notes, unresolved live values..."
                      value={selectedMember.notes}
                      onChange={(event) => updateMember(selectedMember.id, { notes: event.target.value })}
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <div className="space-y-6">
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
              <div className="flex items-center gap-2 text-violet-200">
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
                <div key={key} className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
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
              <div className="space-y-2 rounded-[20px] border border-white/8 bg-black/25 p-4">
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
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
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
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="mb-3 text-sm font-medium text-stone-100">Duplicate effects</p>
                <div className="space-y-2">
                  {teamState.duplicates.length > 0 ? (
                    teamState.duplicates.map((warning) => (
                      <div key={warning.stackKey} className="rounded-2xl border border-amber-300/20 bg-amber-300/8 p-3">
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
                <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
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

function GroupLayout({
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-stone-200">
          <Swords className="h-4 w-4 text-teal-200" />
          <p className="text-sm font-medium">{title}</p>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{members.length} members</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-5">
        {members.map((member) => {
          const companion = companions.find((item) => item.id === member.companion_id);
          const artifact = artifacts.find((item) => item.id === member.artifact_id);
          const mountPower = mountCombatPowers.find((item) => item.id === member.mount_combat_power_id);
          const classItem = classes.find((item) => item.id === member.class_id);

          return (
            <button
              type="button"
              key={member.id}
              onClick={() => onSelect(member.id)}
              className={`rounded-[24px] border p-4 text-left transition ${
                selectedMemberId === member.id
                  ? "border-teal-300/40 bg-teal-300/8"
                  : "border-white/8 bg-black/20 hover:border-white/14"
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    {member.group}-{member.slot}
                  </p>
                  <p className="mt-1 text-base font-medium text-stone-100">{member.label}</p>
                </div>
                {member.is_carry ? <Badge variant="teal">Carry</Badge> : <Badge variant="muted">{member.role}</Badge>}
              </div>
              <div className="space-y-2 text-sm text-stone-400">
                <p>{classItem?.name ?? "Class pending"}</p>
                <p>{companion?.name ?? "Companion missing"}</p>
                <p>{artifact?.name ?? "Artifact missing"}</p>
                <p>{mountPower?.name ?? "Mount missing"}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {companion?.role_tag ? <Badge variant="purple">{companion.role_tag}</Badge> : null}
                {artifact?.category ? <Badge variant="gold">{artifact.category}</Badge> : null}
                {mountPower?.damage_type ? <Badge variant="orange">{mountPower.damage_type}</Badge> : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
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
