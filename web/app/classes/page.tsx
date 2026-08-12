"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { classes, classSnapshots, effectCatalog, powers } from "@/data/game-data";
import { sanitizeUiText } from "@/lib/display-text";

type PowerFocus = "all" | "debuff" | "buff" | "support";

function getPowerFocus(powerIdList: string[]) {
  const effects = powerIdList
    .map((id) => effectCatalog.find((effect) => effect.id === id))
    .filter((effect): effect is NonNullable<typeof effect> => Boolean(effect));

  if (effects.some((effect) => effect.scope === "boss")) {
    return "debuff" as const;
  }

  if (effects.some((effect) => effect.scope === "team" || effect.scope === "carry" || effect.scope === "targeted_ally")) {
    return "buff" as const;
  }

  if (
    effects.some((effect) => effect.scope === "self" || effect.scope === "owner") ||
    effects.length === 0
  ) {
    return "support" as const;
  }

  return "support" as const;
}

function getPowerFocusLabel(focus: PowerFocus) {
  switch (focus) {
    case "debuff":
      return "Debuff";
    case "buff":
      return "Buff";
    case "support":
      return "Support";
    default:
      return "All";
  }
}

function getPowerFocusVariant(focus: PowerFocus) {
  switch (focus) {
    case "debuff":
      return "red" as const;
    case "buff":
      return "teal" as const;
    case "support":
      return "blue" as const;
    default:
      return "muted" as const;
  }
}

function SelectionThumb({
  imageUrl,
  label,
}: {
  imageUrl?: string;
  label: string;
}) {
  if (imageUrl) {
    return (
      <div className="relative h-14 w-14 overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
        <Image src={imageUrl} alt={label} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold uppercase tracking-[0.16em] text-black">
      {label.slice(0, 2)}
    </div>
  );
}

export default function Page() {
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id ?? "");
  const [selectedParagon, setSelectedParagon] = useState("");
  const [selectedFocus, setSelectedFocus] = useState<PowerFocus>("all");

  const selectedClass = classes.find((entry) => entry.id === selectedClassId) ?? classes[0];
  const selectedSnapshot = classSnapshots.find((entry) => entry.className === selectedClass?.name);
  const availableParagons = selectedSnapshot?.paragons ?? [];
  const activeParagon =
    availableParagons.find((item) => item.name === selectedParagon)?.name ??
    availableParagons[0]?.name ??
    selectedClass?.paragon_options[0] ??
    "";

  const relevantPowers = !selectedClass
    ? []
    : powers
        .filter(
          (power) =>
            power.class_name === selectedClass.name &&
            (!activeParagon || !power.paragon_path || power.paragon_path === activeParagon),
        )
        .map((power) => ({
          power,
          focus: getPowerFocus(power.effect_ids),
        }))
        .filter((entry) => selectedFocus === "all" || entry.focus === selectedFocus)
        .sort((left, right) => {
          if (left.focus !== right.focus) {
            return left.focus.localeCompare(right.focus);
          }

          if (left.power.power_type !== right.power.power_type) {
            return left.power.power_type.localeCompare(right.power.power_type);
          }

          return left.power.name.localeCompare(right.power.name);
        });

  const focusCounts = !selectedClass
    ? { debuff: 0, buff: 0, support: 0 }
    : powers
        .filter(
          (power) =>
            power.class_name === selectedClass.name &&
            (!activeParagon || !power.paragon_path || power.paragon_path === activeParagon),
        )
        .reduce(
          (acc, power) => {
            const focus = getPowerFocus(power.effect_ids);
            acc[focus] += 1;
            return acc;
          },
          { debuff: 0, buff: 0, support: 0 },
        );

  return (
    <ContentPage
      eyebrow="Classes"
      title="Class and paragon power browser"
      description="Browse classes with the imported emblems, paragon paths, encounter art, and builder-relevant power sorting for debuffs, buffs, and support utility."
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {classes.map((entry) => {
                const snapshot = classSnapshots.find((item) => item.className === entry.name);
                const active = entry.id === selectedClassId;

                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => {
                      setSelectedClassId(entry.id);
                      setSelectedParagon(snapshot?.paragons[0]?.name ?? entry.paragon_options[0] ?? "");
                    }}
                    className={`flex items-center gap-4 border px-4 py-4 text-left transition ${
                      active
                        ? "border-[var(--thistle)] bg-[var(--thistle)] text-[var(--sky-blue)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-black hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <SelectionThumb imageUrl={entry.image_url} label={entry.name} />
                    <div className="min-w-0">
                      <p className={`truncate text-sm font-semibold ${active ? "text-[var(--sky-blue)]" : "text-black"}`}>{entry.name}</p>
                      <p className={`mt-1 text-[10px] uppercase tracking-[0.16em] ${active ? "text-[var(--sky-blue)]/76" : "text-black/62"}`}>
                        {(snapshot?.paragons ?? []).map((item) => item.name).join(" / ")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedClass && selectedSnapshot ? (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 border border-[var(--border)] bg-[var(--surface)] p-5">
                    <SelectionThumb imageUrl={selectedClass.image_url} label={selectedClass.name} />
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-[-0.05em] text-black">{selectedClass.name}</h2>
                      <p className="text-sm leading-7 text-black/78">{selectedClass.identity_note}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.18em] text-black/62">Paragon path</label>
                      <Select value={activeParagon} onChange={(event) => setSelectedParagon(event.target.value)}>
                        {availableParagons.map((paragon) => (
                          <option key={paragon.name} value={paragon.name}>
                            {paragon.name} / {paragon.role}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.18em] text-black/62">Power filter</label>
                      <Select value={selectedFocus} onChange={(event) => setSelectedFocus(event.target.value as PowerFocus)}>
                        <option value="all">All powers</option>
                        <option value="debuff">Debuff powers</option>
                        <option value="buff">Buff powers</option>
                        <option value="support">Support powers</option>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  <div className="border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-black/62">Debuff powers</p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-black">{focusCounts.debuff}</p>
                  </div>
                  <div className="border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-black/62">Buff powers</p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-black">{focusCounts.buff}</p>
                  </div>
                  <div className="border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-black/62">Support powers</p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-black">{focusCounts.support}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {selectedClass && selectedSnapshot ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <Card>
              <CardHeader>
                <CardTitle>{selectedClass.name} / {activeParagon} powers</CardTitle>
                <CardDescription>
                  Image-led encounter, daily, and feature browser sorted for builder use.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {relevantPowers.length > 0 ? (
                  relevantPowers.map(({ power, focus }) => (
                    <div key={power.id} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                      <div className="flex items-start gap-3">
                        <SelectionThumb imageUrl={power.image_url || selectedClass.image_url} label={power.name} />
                        <div className="min-w-0 space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant={getPowerFocusVariant(focus)}>{getPowerFocusLabel(focus)}</Badge>
                            <Badge variant="muted">{power.power_type}</Badge>
                            {power.paragon_path ? <Badge variant="purple">{power.paragon_path}</Badge> : null}
                          </div>
                          <p className="text-sm font-semibold text-black">{power.name}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-black/78">
                        {sanitizeUiText(power.description || power.notes, "Imported class power record.")}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 2xl:col-span-3 border border-[var(--border)] bg-[var(--surface)] px-4 py-5 text-sm text-black/74">
                    No powers match this paragon and filter combination.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paragon overview</CardTitle>
                <CardDescription>Quick jump to the imported class detail route.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedSnapshot.paragons.map((paragon) => {
                  const active = paragon.name === activeParagon;
                  const href = `/reference/classes/${selectedClass.id}`;

                  return (
                    <Link
                      key={paragon.name}
                      href={href}
                      className={`block border px-4 py-4 transition ${
                        active
                          ? "border-[var(--thistle)] bg-[var(--thistle)] text-[var(--sky-blue)]"
                          : "border-[var(--border)] bg-[var(--surface)] text-black hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${active ? "text-[var(--sky-blue)]" : "text-black"}`}>{paragon.name}</p>
                      <p className={`mt-2 text-[10px] uppercase tracking-[0.16em] ${active ? "text-[var(--sky-blue)]/78" : "text-black/62"}`}>
                        {paragon.role}
                      </p>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </ContentPage>
  );
}
