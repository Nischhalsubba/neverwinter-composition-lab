"use client";

import Link from "next/link";
import { useState } from "react";

import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { mountCombatPowers, mountEquipPowers, mounts } from "@/data/game-data";
import { mountSupportDungeonRows, mountSupportTrialRows } from "@/data/google-sheet/mounts";

type MountModeFilter = "all" | "trial" | "dungeon" | "any";
type MountTypeFilter = "all" | "group_support" | "damage" | "equip";
type MountEffectFilter = "all" | "incoming_damage" | "team_buff" | "owner_scaled" | "utility";

const trialRankMap = new Map<string, (typeof mountSupportTrialRows)[number]>(mountSupportTrialRows.map((row) => [row.name, row]));
const dungeonRankMap = new Map<string, (typeof mountSupportDungeonRows)[number]>(mountSupportDungeonRows.map((row) => [row.name, row]));

function getMountEffectFocus(note: string) {
  const normalized = note.toLowerCase();
  if (/incoming damage|damage taken/.test(normalized)) {
    return "incoming_damage" as const;
  }
  if (/all allies gain|all allies|team|party/.test(normalized)) {
    return "team_buff" as const;
  }
  if (/caster|owner gains|\+15% damage to cast|\+15% damage buff to caster/.test(normalized)) {
    return "owner_scaled" as const;
  }
  return "utility" as const;
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [modeFilter, setModeFilter] = useState<MountModeFilter>("all");
  const [typeFilter, setTypeFilter] = useState<MountTypeFilter>("group_support");
  const [effectFilter, setEffectFilter] = useState<MountEffectFilter>("all");

  const supportRows = mounts
    .map((mount) => {
      const power = mountCombatPowers.find((item) => item.mount_id === mount.id);
      const trialRow = trialRankMap.get(mount.name);
      const dungeonRow = dungeonRankMap.get(mount.name);
      const note = power?.notes ?? mount.notes;

      return {
        mount,
        power,
        trialRow,
        dungeonRow,
        note,
        focus: getMountEffectFocus(note),
        hasTrialSupport: Boolean(trialRow),
        hasDungeonSupport: Boolean(dungeonRow),
      };
    })
    .filter(({ mount, note, focus, hasTrialSupport, hasDungeonSupport }) => {
      const searchText = `${mount.name} ${note}`.toLowerCase();
      const queryMatch = !query.trim() || searchText.includes(query.trim().toLowerCase());
      const modeMatch =
        modeFilter === "all" ||
        (modeFilter === "trial" && hasTrialSupport) ||
        (modeFilter === "dungeon" && hasDungeonSupport) ||
        (modeFilter === "any" && (hasTrialSupport || hasDungeonSupport));
      const typeMatch =
        typeFilter === "all" ||
        (typeFilter === "group_support" && (hasTrialSupport || hasDungeonSupport)) ||
        (typeFilter === "damage" && mount.mount_type === "damage") ||
        (typeFilter === "equip" && mount.equip_power_ids.length > 0);
      const effectMatch = effectFilter === "all" || focus === effectFilter;

      return queryMatch && modeMatch && typeMatch && effectMatch;
    })
    .sort((left, right) => {
      const leftRank = left.trialRow?.rank ?? left.dungeonRow?.rank ?? 999;
      const rightRank = right.trialRow?.rank ?? right.dungeonRow?.rank ?? 999;
      return leftRank - rightRank;
    });

  return (
    <ContentPage
      eyebrow="Mount Library"
      title="Mount support and damage board"
      description="Filter the strongest group support mounts for trial, dungeon, or mixed setups, then compare them against ST damage mounts and equip powers."
    >
      <Card>
        <CardHeader>
          <CardTitle>Mount filters</CardTitle>
          <CardDescription>Use planning mode, mount type, and effect focus to isolate the strongest support package for your setup.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 2xl:grid-cols-[minmax(0,1.2fr)_220px_220px_220px]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mounts or benefits" />
          <Select value={modeFilter} onChange={(event) => setModeFilter(event.target.value as MountModeFilter)}>
            <option value="all">All modes</option>
            <option value="trial">Trial support</option>
            <option value="dungeon">Dungeon support</option>
            <option value="any">Any support setup</option>
          </Select>
          <Select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as MountTypeFilter)}>
            <option value="group_support">Strongest group support</option>
            <option value="all">All mount entries</option>
            <option value="damage">Damage mounts</option>
            <option value="equip">Equip powers</option>
          </Select>
          <Select value={effectFilter} onChange={(event) => setEffectFilter(event.target.value as MountEffectFilter)}>
            <option value="all">All effect focuses</option>
            <option value="incoming_damage">Incoming damage</option>
            <option value="team_buff">Team buff</option>
            <option value="owner_scaled">Owner scaled</option>
            <option value="utility">Utility</option>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.8fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Support mount rankings</CardTitle>
            <CardDescription>{supportRows.length} mounts match the current filters.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {supportRows.map(({ mount, power, trialRow, dungeonRow, note, focus }) => (
              <div key={mount.id} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <Link href={`/reference/mounts/${mount.id}`} className="text-base font-semibold text-black transition hover:text-black/82">
                      {mount.name}
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="orange">{mount.mount_type}</Badge>
                      {trialRow ? <Badge variant="teal">Trial #{trialRow.rank}</Badge> : null}
                      {dungeonRow ? <Badge variant="blue">Dungeon #{dungeonRow.rank}</Badge> : null}
                      <Badge variant="purple">{focus.replace("_", " ")}</Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-black/72">
                    <p>{power?.damage_type ? `${power.damage_type} power` : "Utility entry"}</p>
                    <p>
                      {trialRow?.damageBoostAt150Debuffs90Buffs != null
                        ? `Trial ${trialRow.damageBoostAt150Debuffs90Buffs.toFixed(2)}%`
                        : dungeonRow?.damageBoostAtMythic100Bolster != null
                          ? `Dungeon ${dungeonRow.damageBoostAtMythic100Bolster.toFixed(2)}%`
                          : "Value pending"}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-black/82">{note}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Best ST damage mounts</CardTitle>
              <CardDescription>Recovered single-target mount powers used when the setup is spreading damage instead of stacking group support.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {mountCombatPowers
                .filter((item) => item.mount_id && mounts.find((mount) => mount.id === item.mount_id)?.mount_type === "damage")
                .map((power) => (
                  <div key={power.id} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/reference/mounts/${power.id}`} className="text-sm font-semibold text-black transition hover:text-black/82">
                        {power.name}
                      </Link>
                      <Badge variant="gold">{power.damage_type}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-black/82">{power.notes}</p>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equip powers</CardTitle>
              <CardDescription>Useful mount equip bonuses for carry scaling and stat routing.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {mountEquipPowers.map((power) => (
                <div key={power.id} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                  <Link href={`/reference/mounts/${power.id}`} className="text-sm font-semibold text-black transition hover:text-black/82">
                    {power.name}
                  </Link>
                  <p className="mt-3 text-sm leading-6 text-black/82">{power.notes}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
