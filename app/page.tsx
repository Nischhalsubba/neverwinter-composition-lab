"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Gem, Shield, Sparkles, Swords } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  artifactRecommendationsById,
  artifacts,
  companionEnhancements,
  companionRecommendationsById,
  companions,
  enhancementRecommendationsById,
  singleTargetCompanionRecommendationsById,
  trialMandatoryCompanionById,
} from "@/data/game-data";
import { dashboardRoleRules } from "@/data/dashboard-live";

type DashboardMode = "trial" | "dungeon";
type TrialPreset = "standard" | "msod";

function getTopArtifacts(mode: DashboardMode) {
  return artifacts
    .map((artifact) => ({
      artifact,
      recommendation:
        mode === "trial"
          ? artifactRecommendationsById[artifact.id]?.trial ?? null
          : artifactRecommendationsById[artifact.id]?.dungeon ?? null,
    }))
    .filter((entry) => entry.recommendation)
    .sort((left, right) => (left.recommendation?.rank ?? 999) - (right.recommendation?.rank ?? 999))
    .slice(0, 6);
}

function getTopEnhancements() {
  return companionEnhancements
    .map((enhancement) => ({
      enhancement,
      recommendation: enhancementRecommendationsById[enhancement.id] ?? null,
    }))
    .filter((entry) => entry.recommendation)
    .sort((left, right) => (left.recommendation?.rank ?? 999) - (right.recommendation?.rank ?? 999))
    .slice(0, 6);
}

function getTopTrialSupportCompanions() {
  return Object.entries(companionRecommendationsById)
    .map(([id, recommendation]) => ({
      companion: companions.find((item) => item.id === id),
      recommendation,
      mandatory: Boolean(trialMandatoryCompanionById[id]),
    }))
    .filter((entry) => entry.companion && (entry.recommendation || entry.mandatory))
    .sort((left, right) => {
      if (left.mandatory && !right.mandatory) {
        return -1;
      }

      if (!left.mandatory && right.mandatory) {
        return 1;
      }

      return (left.recommendation?.rank ?? 999) - (right.recommendation?.rank ?? 999);
    })
    .slice(0, 6);
}

function getTopDungeonCompanions() {
  return Object.entries(singleTargetCompanionRecommendationsById)
    .map(([id, recommendation]) => ({
      companion: companions.find((item) => item.id === id),
      recommendation,
    }))
    .filter((entry) => entry.companion && entry.recommendation)
    .sort((left, right) => (left.recommendation?.rank ?? 999) - (right.recommendation?.rank ?? 999))
    .slice(0, 6);
}

function DashboardStatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-black/62">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-black">{value}</p>
      <p className="mt-3 text-sm leading-6 text-black/76">{note}</p>
    </div>
  );
}

export default function Page() {
  const [mode, setMode] = useState<DashboardMode>("trial");
  const [trialPreset, setTrialPreset] = useState<TrialPreset>("standard");

  const roleRule =
    mode === "dungeon"
      ? dashboardRoleRules.dungeon
      : trialPreset === "msod"
        ? dashboardRoleRules.trialMsod
        : dashboardRoleRules.trialStandard;

  const topArtifacts = useMemo(() => getTopArtifacts(mode), [mode]);
  const topEnhancements = useMemo(() => getTopEnhancements(), []);
  const companionRows = useMemo(
    () =>
      mode === "trial"
        ? getTopTrialSupportCompanions().map((entry) => ({
            id: entry.companion?.id ?? "unknown",
            name: entry.companion?.name ?? "Unknown companion",
            badge: entry.mandatory ? "Trial must" : `Support #${entry.recommendation?.rank ?? "?"}`,
            detail: entry.mandatory
              ? "Required CA coverage for trial planning."
              : entry.recommendation?.benefit ?? "Recovered support companion benefit.",
          }))
        : getTopDungeonCompanions().map((entry) => ({
            id: entry.companion?.id ?? "unknown",
            name: entry.companion?.name ?? "Unknown companion",
            badge: `ST #${entry.recommendation?.rank ?? "?"}`,
            detail: `ST DPS ${(entry.recommendation?.stDps ?? 0).toLocaleString()} • Max hit ${(entry.recommendation?.maxHit ?? 0).toLocaleString()}`,
          })),
    [mode],
  );

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
        <Card className="border-[var(--border-strong)]">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-4">
                <Badge variant="teal">Builder command board</Badge>
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sky-blue)]">Neverwinter team planner</p>
                  <h1 className="text-4xl font-semibold uppercase tracking-[-0.08em] text-black sm:text-5xl">
                    {mode === "trial" ? "Trial setup" : "Dungeon setup"}
                  </h1>
                  <p className="max-w-3xl text-sm leading-7 text-black/82 sm:text-base">
                    Keep only the planning signals that feed the builder: role shell, top debuff artifacts, top support
                    companions, and the strongest purple debuffs.
                  </p>
                </div>
              </div>

              <div className="grid w-full gap-3 sm:grid-cols-2 xl:max-w-[360px]">
                <button
                  type="button"
                  onClick={() => setMode("trial")}
                  className={`border px-4 py-4 text-left transition ${
                    mode === "trial"
                      ? "border-[var(--border-strong)] bg-[var(--panel-2)] text-black"
                      : "border-[var(--border)] bg-[var(--surface)] text-black hover:border-[var(--border-strong)]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] opacity-70">Mode</p>
                  <p className="mt-2 text-lg font-semibold uppercase tracking-[-0.04em]">Trial</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("dungeon")}
                  className={`border px-4 py-4 text-left transition ${
                    mode === "dungeon"
                      ? "border-[var(--border-strong)] bg-[var(--panel-2)] text-black"
                      : "border-[var(--border)] bg-[var(--surface)] text-black hover:border-[var(--border-strong)]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] opacity-70">Mode</p>
                  <p className="mt-2 text-lg font-semibold uppercase tracking-[-0.04em]">Dungeon</p>
                </button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <DashboardStatCard
                label="Shell"
                value={roleRule.composition}
                note={roleRule.notes}
              />
              <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-black/62">Role split</p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-black">
                      {mode === "trial" && trialPreset === "msod" ? "MSOD" : mode === "trial" ? "Standard trial" : "Dungeon"}
                    </p>
                  </div>
                  {mode === "trial" ? <Badge variant="purple">10 slots</Badge> : <Badge variant="blue">5 slots</Badge>}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {mode === "trial" ? (
                    <>
                      <Button
                        variant={trialPreset === "standard" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setTrialPreset("standard")}
                      >
                        Standard
                      </Button>
                      <Button
                        variant={trialPreset === "msod" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setTrialPreset("msod")}
                      >
                        MSOD
                      </Button>
                    </>
                  ) : (
                    <Badge variant="muted">Fixed shell</Badge>
                  )}
                </div>
              </div>
              <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-black/62">Builder actions</p>
                <div className="mt-4 grid gap-3">
                  <Link
                    href="/team-builder"
                    className="flex items-center justify-between border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-sm font-medium text-black transition hover:border-[var(--border-strong)]"
                  >
                    Open Team Builder
                    <ArrowRight className="h-4 w-4 text-[var(--sky-blue)]" />
                  </Link>
                  <Link
                    href="/reference"
                    className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-black transition hover:border-[var(--border-strong)]"
                  >
                    Open Reference Hub
                    <ArrowRight className="h-4 w-4 text-[var(--sky-blue)]" />
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Builder shortcuts</CardTitle>
            <CardDescription>Only the routes that directly support planning and slot decisions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link
              href="/artifacts"
              className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-black transition hover:border-[var(--border-strong)]"
            >
              Artifact list
              <ArrowRight className="h-4 w-4 text-[var(--sky-blue)]" />
            </Link>
            <Link
              href="/companions"
              className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-black transition hover:border-[var(--border-strong)]"
            >
              Companion list
              <ArrowRight className="h-4 w-4 text-[var(--sky-blue)]" />
            </Link>
            <Link
              href="/buffs-debuffs"
              className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-black transition hover:border-[var(--border-strong)]"
            >
              Buff and debuff library
              <ArrowRight className="h-4 w-4 text-[var(--sky-blue)]" />
            </Link>
            <Link
              href="/classes"
              className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-black transition hover:border-[var(--border-strong)]"
            >
              Class and paragon list
              <ArrowRight className="h-4 w-4 text-[var(--sky-blue)]" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gem className="h-4 w-4 text-[var(--pastel-petal)]" />
              <CardTitle>Top Debuff Artifacts</CardTitle>
            </div>
            <CardDescription>Highest-value artifacts for the selected planning mode.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topArtifacts.map(({ artifact, recommendation }) => (
              <Link
                key={artifact.id}
                href={`/reference/artifacts/${artifact.id}`}
                className="flex items-start justify-between gap-3 border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--border-strong)]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-black">{artifact.name}</p>
                  <p className="mt-2 text-sm text-black/78">
                    {(recommendation?.damageBoost ?? 0).toFixed(2)}% estimated damage gain
                  </p>
                </div>
                <Badge variant="teal">#{recommendation?.rank}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {mode === "trial" ? (
                <Shield className="h-4 w-4 text-[var(--icy-blue)]" />
              ) : (
                <Swords className="h-4 w-4 text-[var(--baby-pink)]" />
              )}
              <CardTitle>{mode === "trial" ? "Top Support Companions" : "Top DPS Companions"}</CardTitle>
            </div>
            <CardDescription>
              {mode === "trial"
                ? "Trial support coverage, including mandatory CA support."
                : "Single-target companion picks for dungeon DPS planning."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {companionRows.map((row) => (
              <Link
                key={row.id}
                href={`/reference/companions/${row.id}`}
                className="flex items-start justify-between gap-3 border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--border-strong)]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-black">{row.name}</p>
                  <p className="mt-2 text-sm leading-6 text-black/78">{row.detail}</p>
                </div>
                <Badge variant={row.badge === "Trial must" ? "teal" : "purple"}>{row.badge}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--baby-pink)]" />
              <CardTitle>Top Purple Debuffs</CardTitle>
            </div>
            <CardDescription>Highest-value companion enhancements for builder setup and boss debuff coverage.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {topEnhancements.map(({ enhancement, recommendation }) => (
              <Link
                key={enhancement.id}
                href={`/reference/enhancements/${enhancement.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                className="flex items-start justify-between gap-3 border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--border-strong)]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-black">{enhancement.name}</p>
                  <p className="mt-2 text-sm leading-6 text-black/78">{enhancement.notes}</p>
                </div>
                <Badge variant="red">#{recommendation?.rank}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
