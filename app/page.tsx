"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock3, ExternalLink, Gem, Shield, Swords, WandSparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  artifactRecommendationsById,
  artifacts,
  companionRecommendationsById,
  companions,
  singleTargetCompanionRecommendationsById,
  trialMandatoryCompanionById,
} from "@/data/game-data";
import {
  dashboardLastVerifiedDate,
  dashboardLiveFeed,
  dashboardModuleTimeline,
  dashboardRoleRules,
} from "@/data/dashboard-live";

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
    .slice(0, 5);
}

function getTopTrialSupportCompanions() {
  return Object.entries(companionRecommendationsById)
    .map(([id, recommendation]) => ({
      companion: companions.find((item) => item.id === id),
      recommendation,
      mandatory: trialMandatoryCompanionById[id],
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

function getTopDungeonDamageCompanions() {
  return Object.entries(singleTargetCompanionRecommendationsById)
    .map(([id, recommendation]) => ({
      companion: companions.find((item) => item.id === id),
      recommendation,
    }))
    .filter((entry) => entry.companion && entry.recommendation)
    .sort((left, right) => (left.recommendation?.rank ?? 999) - (right.recommendation?.rank ?? 999))
    .slice(0, 5);
}

export default function Page() {
  const [mode, setMode] = useState<DashboardMode>("trial");
  const [trialPreset, setTrialPreset] = useState<TrialPreset>("standard");

  const topArtifacts = useMemo(() => getTopArtifacts(mode), [mode]);
  const topTrialSupportCompanions = useMemo(() => getTopTrialSupportCompanions(), []);
  const topDungeonDamageCompanions = useMemo(() => getTopDungeonDamageCompanions(), []);

  const modeArtifactsLabel = mode === "trial" ? "Trial Artifacts" : "Dungeon Artifacts";
  const roleRule =
    mode === "dungeon"
      ? dashboardRoleRules.dungeon
      : trialPreset === "msod"
        ? dashboardRoleRules.trialMsod
        : dashboardRoleRules.trialStandard;

  const companionRows =
    mode === "trial"
      ? topTrialSupportCompanions.map((entry) => ({
          id: entry.companion?.id ?? entry.recommendation?.name ?? "unknown",
          name: entry.companion?.name ?? "Unknown companion",
          badge: entry.mandatory ? "Trial must" : `Support #${entry.recommendation?.rank ?? "?"}`,
          detail: entry.mandatory
            ? "Black Death Scorpion is forced in trial planning for CA uptime coverage."
            : entry.recommendation?.benefit ?? "Recovered support benefit.",
        }))
      : topDungeonDamageCompanions.map((entry) => ({
          id: entry.companion?.id ?? entry.recommendation?.name ?? "unknown",
          name: entry.companion?.name ?? "Unknown companion",
          badge: `ST #${entry.recommendation?.rank ?? "?"}`,
          detail: `ST DPS ${(entry.recommendation?.stDps ?? 0).toLocaleString()} • Max hit ${(entry.recommendation?.maxHit ?? 0).toLocaleString()}`,
        }));

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <Card className="border-[var(--border-strong)]">
          <CardContent className="space-y-8 p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <Badge variant="teal">Dashboard verified through April 5, 2026</Badge>
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--sky-blue)]">
                    Neverwinter live command board
                  </p>
                  <h1 className="text-4xl font-semibold uppercase tracking-[-0.08em] text-white sm:text-5xl">
                    {mode === "trial" ? "Trial command" : "Dungeon command"}
                  </h1>
                  <p className="max-w-3xl text-sm leading-7 text-white/76 sm:text-base">
                    Live module focus, current support priorities, ranked artifacts, and practical team rules in one
                    planning surface. The dashboard content below is grounded in current official Neverwinter news and
                    the imported patch-aware data already in this repo.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px]">
                <button
                  type="button"
                  onClick={() => setMode("trial")}
                  className={`border px-4 py-3 text-left transition ${
                    mode === "trial"
                      ? "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.14)] text-white"
                      : "border-[var(--border)] bg-[rgba(255,255,255,0.02)] text-white/84 hover:border-[var(--border-strong)]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Mode</p>
                  <p className="mt-2 text-lg font-semibold uppercase tracking-[-0.04em]">Trial</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("dungeon")}
                  className={`border px-4 py-3 text-left transition ${
                    mode === "dungeon"
                      ? "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.14)] text-white"
                      : "border-[var(--border)] bg-[rgba(255,255,255,0.02)] text-white/84 hover:border-[var(--border-strong)]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Mode</p>
                  <p className="mt-2 text-lg font-semibold uppercase tracking-[-0.04em]">Dungeon</p>
                </button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Current live line</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white">Module 32.5</p>
                  <p className="mt-2 text-sm text-white/68">Tempus Arena - The Slaughterhouse</p>
                </div>
                <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Last verified</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white">Apr 5</p>
                  <p className="mt-2 text-sm text-white/68">{dashboardLastVerifiedDate}</p>
                </div>
                <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Live feed items</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.06em] text-white">{dashboardLiveFeed.length}</p>
                  <p className="mt-2 text-sm text-white/68">Current event, module, and patch checkpoints</p>
                </div>
              </div>

              <div className="border border-[var(--border-strong)] bg-[rgba(255,255,255,0.02)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--pastel-petal)]">Role split</p>
                    <h2 className="mt-2 text-lg font-semibold uppercase tracking-[-0.04em] text-white">
                      {roleRule.label}
                    </h2>
                  </div>
                  {mode === "trial" ? (
                    <div className="flex gap-2">
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
                    </div>
                  ) : null}
                </div>
                <p className="mt-4 text-2xl font-semibold tracking-[-0.06em] text-white">{roleRule.composition}</p>
                <p className="mt-3 text-sm leading-6 text-white/72">{roleRule.notes}</p>
                <div className="mt-4">
                  <Link href="/team-builder" className="inline-flex items-center gap-2 text-sm text-[var(--sky-blue)]">
                    Open Team Builder
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[var(--sky-blue)]" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/56">Intelligence feed</p>
              </div>
              {dashboardLiveFeed.slice(0, 3).map((item) => (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4 transition hover:border-[var(--border-strong)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">{item.date}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
                    </div>
                    <Badge variant={item.status === "live" ? "teal" : item.status === "recent" ? "blue" : "purple"}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/72">{item.summary}</p>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/56">Quick destinations</p>
              <Link href="/team-builder" className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-white transition hover:border-[var(--border-strong)]">
                Team Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/patch-tracker" className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-white transition hover:border-[var(--border-strong)]">
                Patch Tracker
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/reference" className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-white transition hover:border-[var(--border-strong)]">
                Reference Hub
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--pastel-petal)]">{modeArtifactsLabel}</p>
                <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[-0.05em] text-white">
                  Ranked damage support
                </h2>
              </div>
              <Link href="/artifacts" className="text-xs uppercase tracking-[0.18em] text-[var(--sky-blue)]">
                Full list
              </Link>
            </div>

            <div className="space-y-4">
              {topArtifacts.map(({ artifact, recommendation }) => (
                <Link
                  key={artifact.id}
                  href={`/reference/artifacts/${artifact.id}`}
                  className="flex items-center gap-4 border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4 transition hover:border-[var(--border-strong)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-[var(--border)] bg-[rgba(255,255,255,0.04)]">
                    <Gem className="h-5 w-5 text-[var(--pastel-petal)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-white">{artifact.name}</p>
                      <Badge variant="teal">#{recommendation?.rank}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-white/72">
                      {(recommendation?.damageBoost ?? 0).toFixed(2)}% estimated damage boost • {mode === "trial" ? "trial" : "dungeon"} planning rank
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--sky-blue)]">
                  {mode === "trial" ? "Trial companions" : "Dungeon companions"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[-0.05em] text-white">
                  {mode === "trial" ? "Party buff coverage" : "Damage summon picks"}
                </h2>
              </div>
              <Link href="/companions" className="text-xs uppercase tracking-[0.18em] text-[var(--sky-blue)]">
                Full list
              </Link>
            </div>

            <div className="space-y-4">
              {companionRows.map((row) => (
                <Link
                  key={row.id}
                  href={`/reference/companions/${row.id}`}
                  className="flex items-start gap-4 border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4 transition hover:border-[var(--border-strong)]"
                >
                  <div className="mt-1 flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[rgba(255,255,255,0.04)]">
                    {mode === "trial" ? <Shield className="h-4 w-4 text-[var(--sky-blue)]" /> : <Swords className="h-4 w-4 text-[var(--baby-pink)]" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-white">{row.name}</p>
                      <Badge variant={row.badge === "Trial must" ? "teal" : "purple"}>{row.badge}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/72">{row.detail}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--baby-pink)]">Real-time data</p>
                <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[-0.05em] text-white">Live intelligence feed</h2>
              </div>
              <a
                href="https://steamcommunity.com/app/109600/allnews/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--sky-blue)]"
              >
                Open news source
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {dashboardLiveFeed.map((item) => (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-5 transition hover:border-[var(--border-strong)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">{item.date}</p>
                      <p className="mt-2 text-base font-semibold text-white">{item.title}</p>
                    </div>
                    <Badge variant={item.status === "live" ? "teal" : item.status === "recent" ? "blue" : "purple"}>
                      {item.category}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/72">{item.summary}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/48">{item.sourceLabel}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-2">
              <WandSparkles className="h-4 w-4 text-[var(--pastel-petal)]" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/56">Module timeline</p>
            </div>
            {dashboardModuleTimeline.map((item) => (
              <a
                key={item.id}
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="block border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4 transition hover:border-[var(--border-strong)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/48">{item.releaseDate}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/72">{item.summary}</p>
                {item.previewDate ? (
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/48">Preview surfaced {item.previewDate}</p>
                ) : null}
              </a>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
