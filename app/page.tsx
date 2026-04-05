import { ArrowRight, Clock3, Gem, MountainSnow, Sparkles, WandSparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  artifactRecommendationsById,
  artifacts,
  companionRecommendationsById,
  knowledgeSections,
  moduleTimeline,
  patchChanges,
  singleTargetCompanionRecommendationsById,
} from "@/data/game-data";

const savedLoadouts = [
  { title: "Trial Carry Shell", tags: ["Trial", "Carry", "Meta"], href: "/team-builder" },
  { title: "Balanced Trial Core", tags: ["Trial", "Balanced", "Damage"], href: "/team-builder" },
  { title: "Dungeon Burst Squad", tags: ["Dungeon", "Boss", "Burst"], href: "/team-builder" },
];

export default function Page() {
  const topArtifacts = artifacts
    .map((artifact) => ({
      artifact,
      rank: artifactRecommendationsById[artifact.id]?.trial?.rank ?? 999,
      boost: artifactRecommendationsById[artifact.id]?.trial?.damageBoost ?? 0,
    }))
    .sort((left, right) => left.rank - right.rank)
    .slice(0, 3);

  const topSupportCompanions = Object.entries(companionRecommendationsById)
    .map(([id, value]) => ({ id, value }))
    .filter((entry) => entry.value)
    .sort((left, right) => (left.value?.rank ?? 999) - (right.value?.rank ?? 999))
    .slice(0, 3);

  const topDamageCompanions = Object.entries(singleTargetCompanionRecommendationsById)
    .map(([id, value]) => ({ id, value }))
    .filter((entry) => entry.value)
    .sort((left, right) => (left.value?.rank ?? 999) - (right.value?.rank ?? 999))
    .slice(0, 3);

  return (
    <div className="grid gap-8 px-6 py-8 xl:grid-cols-[minmax(0,1fr)_288px] xl:px-8 xl:py-10">
      <div className="min-w-0 space-y-8">
        <section className="relative overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-10 py-10">
          <div className="absolute inset-0 bg-[rgba(162,210,255,0.04)]" />
          <div className="relative max-w-3xl space-y-6">
            <Badge variant="teal">Active Protocol</Badge>
            <div className="space-y-3">
              <h1 className="text-[42px] font-semibold uppercase leading-[0.95] tracking-[-0.08em] text-white">
                Endgame Planning
                <br />
                Without Spreadsheet Fatigue
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/76">
                Team Builder, support coverage, artifact rankings, mount choices, and verified planning notes in one layout that stays readable under real endgame use.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Current module</p>
                <p className="text-[28px] font-semibold tracking-[-0.06em] text-white">32.5</p>
              </div>
              <div className="space-y-1 border-l border-[var(--border)] pl-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Verified artifacts</p>
                <p className="text-[28px] font-semibold tracking-[-0.06em] text-white">{artifacts.length}</p>
              </div>
              <div className="space-y-1 border-l border-[var(--border)] pl-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Patch notes loaded</p>
                <p className="text-[28px] font-semibold tracking-[-0.06em] text-white">{patchChanges.length}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <Card>
            <CardContent className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/58">Meta trends</p>
                  <h2 className="mt-2 text-xl font-semibold uppercase tracking-[-0.05em] text-white">
                    Trial Artifacts
                  </h2>
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/48">Global data</p>
              </div>
              <div className="space-y-5">
                {topArtifacts.map(({ artifact, rank, boost }) => (
                  <div key={artifact.id} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center border border-[var(--border)] bg-[rgba(255,255,255,0.04)]">
                      <Gem className="h-5 w-5 text-[var(--pastel-petal)]" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold uppercase tracking-[-0.03em] text-white">{artifact.name}</p>
                        <p className="text-sm font-semibold text-white">{boost.toFixed(2)}%</p>
                      </div>
                      <div className="h-1 bg-[rgba(255,255,255,0.08)]">
                        <div
                          className="h-full bg-[var(--sky-blue)]"
                          style={{ width: `${Math.max(12, 100 - (rank - 1) * 12)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--sky-blue)]">Strategic briefing</p>
                  <h2 className="mt-2 text-[34px] font-semibold tracking-[-0.06em] text-white">
                    Patch-aware endgame guidance
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Release line</p>
                  <p className="mt-1 text-sm text-white">{moduleTimeline[0] ?? "Module 32.5"}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--pastel-petal)]">What to prioritize</p>
                  {knowledgeSections.slice(0, 2).map((section) => (
                    <div key={section.title} className="border-l-2 border-[var(--pastel-petal)] bg-black/30 px-4 py-4">
                      <p className="text-sm font-semibold text-white">{section.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/74">{section.points[0]}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--baby-pink)]">Live patch pressure</p>
                  {patchChanges.slice(0, 2).map((patch) => (
                    <div key={patch.id} className="border-l-2 border-[var(--baby-pink)] bg-black/30 px-4 py-4">
                      <p className="text-sm font-semibold text-white">{patch.name}</p>
                      <p className="mt-2 text-sm leading-6 text-white/74">{patch.after}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/58">Saved loadouts</p>
              <h2 className="mt-2 text-xl font-semibold uppercase tracking-[-0.05em] text-white">Fast entry points</h2>
            </div>
            <Link href="/team-builder" className="text-xs uppercase tracking-[0.16em] text-[var(--sky-blue)]">
              Open builder
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {savedLoadouts.map((loadout, index) => (
              <Link key={loadout.title} href={loadout.href}>
                <Card className="h-full transition hover:border-[var(--sky-blue)]">
                  <CardContent className="space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">2026.04.{index + 11}</p>
                    <div>
                      <p className="text-lg font-semibold uppercase tracking-[-0.05em] text-white">{loadout.title}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {loadout.tags.map((tag) => (
                          <span key={tag} className="border border-[var(--border)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/75">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm text-white/76">
                      <span>Open loadout</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <Card>
          <CardContent className="space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--pastel-petal)]">Real-time data</p>
              <h2 className="mt-1 text-sm font-semibold uppercase tracking-[0.04em] text-white">Intelligence feed</h2>
            </div>
            <div className="border border-[var(--border)] bg-black/50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Estimated raid value</p>
                <p className="text-2xl font-semibold tracking-[-0.05em] text-white">428.4K</p>
              </div>
              <div className="mt-4 h-1 bg-[rgba(255,255,255,0.08)]">
                <div className="h-full w-[82%] bg-[var(--sky-blue)]" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/56">Support companions</p>
                <p className="mt-2 text-xl font-semibold text-white">{topSupportCompanions.length}</p>
              </div>
              <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/56">ST companion lines</p>
                <p className="mt-2 text-xl font-semibold text-white">{topDamageCompanions.length}</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">Current focus</p>
              <div className="border-l-2 border-[var(--sky-blue)] bg-[rgba(255,255,255,0.02)] px-4 py-3">
                <p className="text-sm text-white">Trial support coverage is live and patch-aware.</p>
              </div>
              <div className="border-l-2 border-[var(--pastel-petal)] bg-[rgba(255,255,255,0.02)] px-4 py-3">
                <p className="text-sm text-white">Artifact and companion rankings are available in local typed data.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[var(--sky-blue)]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/58">Module timeline</p>
            </div>
            {moduleTimeline.slice(0, 4).map((item) => (
              <div key={item} className="border border-[var(--border)] px-4 py-3 text-sm text-white/78">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--pastel-petal)]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/58">Quick destinations</p>
            </div>
            <Link href="/team-builder" className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-white transition hover:border-[var(--sky-blue)]">
              Team Builder
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/reference" className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-white transition hover:border-[var(--sky-blue)]">
              Reference Hub
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/mounts" className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-white transition hover:border-[var(--sky-blue)]">
              Mount Notes
              <MountainSnow className="h-4 w-4" />
            </Link>
            <Link href="/companions" className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-white transition hover:border-[var(--sky-blue)]">
              Companion Notes
              <WandSparkles className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
