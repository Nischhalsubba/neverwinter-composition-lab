import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  artifactRecommendationsById,
  artifacts,
  artifactSnapshots,
  bossPresets,
  classes,
  classSnapshots,
  companionBonuses,
  companionEnhancementSnapshots,
  companionEnhancements,
  companionPowerSnapshots,
  companionRecommendationsById,
  companions,
  companionSnapshots,
  dungeons,
  effectCatalog,
  enhancementRecommendationsById,
  events,
  glossaryTerms,
  mountCombatPowers,
  mountEquipPowers,
  mounts,
  patchChanges,
  powers,
  singleTargetCompanionRecommendationsById,
  trialMandatoryCompanionById,
  trials,
} from "@/data/game-data";
import { sanitizeUiText } from "@/lib/display-text";
import { findReferenceItem } from "@/lib/reference-index";
import { titleCase } from "@/lib/utils";

const listPageMap: Record<string, string> = {
  artifacts: "/artifacts",
  companions: "/companions",
  classes: "/classes",
  mounts: "/mounts",
  effects: "/buffs-debuffs",
  dungeons: "/dungeons",
  trials: "/trials",
  events: "/events",
  patches: "/patch-tracker",
  glossary: "/glossary",
  bosses: "/team-builder",
  enhancements: "/companions",
  "companion-powers": "/companions",
};

type DetailPayload = {
  sections: ReactNode[];
  sources: string[];
  imageUrl?: string;
};

function formatPercent(value: number | null | undefined) {
  return value == null ? "Pending" : `${(value * 100).toFixed(2)}%`;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function DetailStat({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/58">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value == null || value === "" ? "Not listed" : value}</p>
    </div>
  );
}

function DetailTextCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-white/82">{description}</p>
      </CardContent>
    </Card>
  );
}

function SourceLinkList({ urls }: { urls: string[] }) {
  void urls;
  return null;
}

function renderArtifactDetail(itemId: string): DetailPayload | null {
  const artifact = artifacts.find((item) => item.id === itemId);
  if (!artifact) {
    return null;
  }

  const snapshot = artifactSnapshots.find((item) => item.name === artifact.name);
  const trialRecommendation = artifactRecommendationsById[artifact.id]?.trial;
  const dungeonRecommendation = artifactRecommendationsById[artifact.id]?.dungeon;

  return {
    imageUrl: artifact.image_url,
    sections: [
      <Card key="artifact-overview">
        <CardHeader>
          <CardTitle>Artifact Record</CardTitle>
          <CardDescription>Imported artifact text and rank stats used by the builder.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DetailStat label="Category" value={artifact.category} />
            <DetailStat label="Quality" value={snapshot?.quality ?? "Mythic"} />
            <DetailStat label="Team / Personal" value={artifact.team_or_personal} />
            <DetailStat label="Exact value" value={formatPercent(artifact.exact_value)} />
          </div>
          {snapshot?.powertext ? (
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/58">Power text</p>
              <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                <p className="whitespace-pre-line text-sm leading-7 text-white/84">{snapshot.powertext}</p>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>,
      trialRecommendation || dungeonRecommendation ? (
        <Card key="artifact-recommendation">
          <CardHeader>
            <CardTitle>Recommendation Ranking</CardTitle>
            <CardDescription>Imported from the Aragon artifact ranking sheets linked in the repo.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <DetailStat
              label="Trial Rank"
              value={
                trialRecommendation
                  ? `#${trialRecommendation.rank} • ${trialRecommendation.damageBoost.toFixed(2)}% • ${trialRecommendation.duration}`
                  : "Not ranked"
              }
            />
            <DetailStat
              label="Dungeon Rank"
              value={
                dungeonRecommendation
                  ? `#${dungeonRecommendation.rank} • ${dungeonRecommendation.damageBoost.toFixed(2)}% • ${dungeonRecommendation.duration}`
                  : "Not ranked"
              }
            />
          </CardContent>
        </Card>
      ) : null,
      snapshot?.ranks ? (
        <Card key="artifact-ranks">
          <CardHeader>
            <CardTitle>Rank Stats</CardTitle>
            <CardDescription>Raw imported rank progression for this artifact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(snapshot.ranks).map(([rank, rankData]) => (
              <div key={rank} className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{rank}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/62">
                    Item level {rankData.itemLevel} • Combined {rankData.combinedRating}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(rankData.stats).map(([stat, value]) => (
                    <Badge key={stat} variant="muted">
                      {titleCase(stat)} {String(value)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null,
    ].filter(Boolean),
    sources: [artifact.source_url, snapshot?.source_url].filter(Boolean) as string[],
  };
}

function renderCompanionDetail(itemId: string): DetailPayload | null {
  const companion = companions.find((item) => item.id === itemId);
  if (!companion) {
    return null;
  }

  const snapshot = companionSnapshots.find((item) => item.name === companion.name);
  const supportRecommendation = companionRecommendationsById[companion.id];
  const stRecommendation = singleTargetCompanionRecommendationsById[companion.id];
  const trialMandatory = trialMandatoryCompanionById[companion.id];

  return {
    sections: [
      <Card key="companion-overview">
        <CardHeader>
          <CardTitle>Companion Record</CardTitle>
          <CardDescription>Player bonus and enhancement data imported into the app&apos;s companion dataset.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailStat label="Type" value={snapshot?.type ?? companion.archetype} />
          <DetailStat label="Role tag" value={companion.role_tag} />
          <DetailStat label="Player bonus" value={snapshot?.playerBonusName ?? "Not listed"} />
          <DetailStat label="Enhancement" value={snapshot?.enhancementPower ?? "Not listed"} />
        </CardContent>
      </Card>,
      supportRecommendation || stRecommendation || trialMandatory ? (
        <Card key="companion-ranking">
          <CardHeader>
            <CardTitle>Build Relevance</CardTitle>
            <CardDescription>Support and ST recommendations layered on top of the base companion entry.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <DetailStat
              label="Support ranking"
              value={
                supportRecommendation
                  ? `#${supportRecommendation.rank} • ${supportRecommendation.benefit}`
                  : "Not ranked"
              }
            />
            <DetailStat
              label="Single-target ranking"
              value={
                stRecommendation
                  ? `#${stRecommendation.rank}${stRecommendation.stDps != null ? ` • ${stRecommendation.stDps.toLocaleString()} ST DPS` : ""}`
                  : "Not ranked"
              }
            />
            <DetailStat
              label="Trial rule"
              value={trialMandatory ? `${trialMandatory.benefit} • ${trialMandatory.usage}` : "No forced trial rule"}
            />
          </CardContent>
        </Card>
      ) : null,
      <DetailTextCard key="companion-notes" title="Notes" description={companion.notes} />,
    ].filter(Boolean),
    sources: [companion.source_url, snapshot?.source_url].filter(Boolean) as string[],
  };
}

function renderClassDetail(itemId: string): DetailPayload | null {
  const paragonRecord = classSnapshots
    .flatMap((item) => item.paragons.map((paragon) => ({ className: item.className, emblem: item.emblem_url, sourceUrl: item.source_url, ...paragon })))
    .find((item) => `${slugify(item.className)}-${slugify(item.name)}` === itemId);
  const gameClass =
    classes.find((item) => item.id === itemId) ??
    classes.find((item) => item.name === paragonRecord?.className);

  if (!gameClass) {
    return null;
  }

  const snapshot = classSnapshots.find((item) => item.className === gameClass.name);
  const relevantPowers = powers.filter((power) => power.class_name === gameClass.name);
  const activeParagon = paragonRecord?.name ?? null;

  return {
    imageUrl: gameClass.image_url,
    sections: [
      <Card key="class-overview">
        <CardHeader>
          <CardTitle>Class Record</CardTitle>
          <CardDescription>Paragon paths and class emblem imported into the class dataset.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailStat label="Class" value={gameClass.name} />
          <DetailStat label="Paragons" value={snapshot?.paragons.map((item) => item.name).join(", ") ?? gameClass.paragon_options.join(", ")} />
          <DetailStat label="Role focus" value={gameClass.role_focus.map((role) => titleCase(role)).join(", ")} />
          <DetailStat label="Power records" value={String(relevantPowers.length)} />
        </CardContent>
      </Card>,
      <Card key="class-paragons">
        <CardHeader>
          <CardTitle>Paragon Paths</CardTitle>
          <CardDescription>Imported directly from the class metadata dataset.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {(snapshot?.paragons ?? []).map((paragon) => (
            <div
              key={paragon.name}
              className={`border px-4 py-4 ${activeParagon === paragon.name ? "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.08)]" : "border-[var(--border)] bg-[rgba(255,255,255,0.02)]"}`}
            >
              <p className="text-sm font-semibold text-white">{paragon.name}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/62">{paragon.role}</p>
            </div>
          ))}
        </CardContent>
      </Card>,
      <Card key="class-powers">
        <CardHeader>
          <CardTitle>{activeParagon ? `${activeParagon} Power List` : "Class Power List"}</CardTitle>
          <CardDescription>Encounter, daily, and feature entries available from the class import.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {relevantPowers
            .filter((power) => !activeParagon || !power.paragon_path || power.paragon_path === activeParagon)
            .slice(0, 18)
            .map((power) => (
              <div key={power.id} className="border border-[var(--border)] bg-[rgba(255,255,255,0.02)] px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-white">{power.name}</p>
                  <Badge variant="muted">{power.power_type}</Badge>
                  {power.paragon_path ? <Badge variant="purple">{power.paragon_path}</Badge> : null}
                </div>
                <p className="mt-2 text-sm text-white/76">{sanitizeUiText(power.notes, "Imported class power record.")}</p>
              </div>
            ))}
        </CardContent>
      </Card>,
    ],
    sources: [gameClass.source_url, snapshot?.source_url, "https://nw-hub.com/classes"].filter(Boolean) as string[],
  };
}

function renderMountDetail(itemId: string): DetailPayload | null {
  const mount = mounts.find((item) => item.id === itemId);
  const combat = mountCombatPowers.find((item) => item.id === itemId);
  const equip = mountEquipPowers.find((item) => item.id === itemId);

  if (combat) {
    return {
      sections: [
        <Card key="mount-combat">
          <CardHeader>
            <CardTitle>Mount Combat Power</CardTitle>
            <CardDescription>Imported from the support/damage mount sheet and mounted to the typed app model.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DetailStat label="Mount" value={mounts.find((item) => item.id === combat.mount_id)?.name ?? "Unknown"} />
            <DetailStat label="Damage type" value={combat.damage_type} />
            <DetailStat label="Can crit" value={combat.can_crit ? "Yes" : "No"} />
            <DetailStat label="Boss debuff mapped" value={combat.effect_ids.length ? "Yes" : "No"} />
          </CardContent>
        </Card>,
        <DetailTextCard key="mount-notes" title="Notes" description={combat.notes} />,
      ],
      sources: [combat.source_url],
    };
  }

  if (equip) {
    return {
      sections: [
        <Card key="mount-equip">
          <CardHeader>
            <CardTitle>Mount Equip Power</CardTitle>
            <CardDescription>Imported from the mount equip bonus sheet.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <DetailStat label="Mount" value={mounts.find((item) => item.id === equip.mount_id)?.name ?? "Unknown"} />
            <DetailStat label="Equip power" value={equip.name} />
          </CardContent>
        </Card>,
        <DetailTextCard key="equip-notes" title="Notes" description={equip.notes} />,
      ],
      sources: [equip.source_url],
    };
  }

  if (!mount) {
    return null;
  }

  return {
    sections: [
      <Card key="mount-overview">
        <CardHeader>
          <CardTitle>Mount Overview</CardTitle>
          <CardDescription>Combined combat and equip power coverage for this mount family.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailStat label="Mount type" value={mount.mount_type} />
          <DetailStat label="Combat powers" value={String(mount.combat_power_ids.length)} />
          <DetailStat label="Equip powers" value={String(mount.equip_power_ids.length)} />
          <DetailStat label="Verification" value={mount.verification_status} />
        </CardContent>
      </Card>,
      <DetailTextCard key="mount-notes" title="Notes" description={mount.notes} />,
    ],
    sources: [mount.source_url],
  };
}

function renderEffectDetail(itemId: string): DetailPayload | null {
  const effect = effectCatalog.find((item) => item.id === itemId);
  if (!effect) {
    return null;
  }

  return {
    sections: [
      <Card key="effect-detail">
        <CardHeader>
          <CardTitle>Effect Definition</CardTitle>
          <CardDescription>Internal typed effect used by the Team Builder calculation engine.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailStat label="Category" value={effect.effect_category} />
          <DetailStat label="Scope" value={effect.scope} />
          <DetailStat label="Stat" value={effect.stat} />
          <DetailStat label="Value" value={formatPercent(effect.value)} />
          <DetailStat label="Stack rule" value={effect.stack_rule} />
          <DetailStat label="Verification" value={effect.verification_status} />
        </CardContent>
      </Card>,
      <DetailTextCard key="effect-notes" title="Notes" description={effect.notes} />,
    ],
    sources: [effect.source_url],
  };
}

function renderSimpleEntityDetail(entityType: string, itemId: string): DetailPayload | null {
  if (entityType === "dungeons") {
    const item = dungeons.find((entry) => entry.id === itemId);
    if (!item) return null;
    return { sections: [<DetailTextCard key="dungeon" title="Dungeon Notes" description={item.notes} />], sources: [] as string[] };
  }
  if (entityType === "trials") {
    const item = trials.find((entry) => entry.id === itemId);
    if (!item) return null;
    return { sections: [<DetailTextCard key="trial" title="Trial Notes" description={item.notes} />], sources: [] as string[] };
  }
  if (entityType === "events") {
    const item = events.find((entry) => entry.id === itemId);
    if (!item) return null;
    return { sections: [<DetailTextCard key="event" title="Event Notes" description={item.notes} />], sources: [] as string[] };
  }
  if (entityType === "patches") {
    const item = patchChanges.find((entry) => entry.id === itemId);
    if (!item) return null;
    return {
      sections: [
        <Card key="patch-overview">
          <CardHeader>
            <CardTitle>Patch Record</CardTitle>
            <CardDescription>Typed patch note entry used by the app.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DetailStat label="Date" value={item.date} />
            <DetailStat label="Category" value={item.category} />
            <DetailStat label="Importance" value={item.importance} />
            <DetailStat label="Affected entity" value={item.affected_entity} />
          </CardContent>
        </Card>,
        <DetailTextCard key="patch-before" title="Before" description={item.before} />,
        <DetailTextCard key="patch-after" title="After" description={item.after} />,
        <DetailTextCard key="patch-notes" title="Notes" description={item.notes} />,
      ],
      sources: [item.source_url],
    };
  }
  if (entityType === "glossary") {
    const item = glossaryTerms.find((entry) => slugify(entry.term) === itemId);
    if (!item) return null;
    return { sections: [<DetailTextCard key="glossary" title={item.term} description={item.definition} />], sources: [] as string[] };
  }
  if (entityType === "bosses") {
    const item = bossPresets.find((entry) => entry.id === itemId);
    if (!item) return null;
    return {
      sections: [
        <Card key="boss-overview">
          <CardHeader>
            <CardTitle>Boss Preset</CardTitle>
            <CardDescription>Typed boss shell used by the calculator and effect engine.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DetailStat label="Defense" value={formatPercent(item.defense)} />
            <DetailStat label="Awareness" value={formatPercent(item.awareness)} />
            <DetailStat label="Crit avoidance" value={formatPercent(item.critical_avoidance)} />
            <DetailStat label="Deflect" value={formatPercent(item.deflect)} />
          </CardContent>
        </Card>,
        <DetailTextCard key="boss-notes" title="Notes" description={item.notes} />,
      ],
      sources: [item.source_url],
    };
  }
  if (entityType === "enhancements") {
    const snapshot = companionEnhancementSnapshots.find((entry) => slugify(entry.name) === itemId);
    const typed = companionEnhancements.find((entry) => slugify(entry.name) === itemId);
    if (!snapshot && !typed) return null;
    const recommendation = typed ? enhancementRecommendationsById[typed.id] : null;
    return {
      sections: [
        <Card key="enh-overview">
          <CardHeader>
            <CardTitle>Companion Enhancement</CardTitle>
            <CardDescription>Imported base text with ranking overlays where available.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DetailStat label="Name" value={typed?.name ?? snapshot?.name ?? "Unknown"} />
            <DetailStat label="Recommendation" value={recommendation ? `#${recommendation.rank}` : "Not ranked"} />
            <DetailStat label="Mapped effect ids" value={typed ? String(typed.effect_ids.length) : "0"} />
            <DetailStat label="Verification" value={typed?.verification_status ?? "verified"} />
          </CardContent>
        </Card>,
        <DetailTextCard
          key="enh-text"
          title="Verified Detail"
          description={
            recommendation?.benefit ??
            sanitizeUiText(snapshot?.text ?? typed?.notes ?? "No verified detail recovered.", "Imported text is shown only when unresolved placeholders are removed.")
          }
        />,
      ],
      sources: [typed?.source_url, snapshot?.source_url].filter(Boolean) as string[],
    };
  }
  if (entityType === "companion-powers") {
    const snapshot = companionPowerSnapshots.find((entry) => slugify(entry.name) === itemId);
    const typed = companionBonuses.find((entry) => slugify(entry.name) === itemId);
    if (!snapshot && !typed) return null;
    return {
      sections: [
        <Card key="comp-power">
          <CardHeader>
            <CardTitle>Companion Bonus Power</CardTitle>
            <CardDescription>Imported from the companion powers dataset.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <DetailStat label="Name" value={typed?.name ?? snapshot?.name ?? "Unknown"} />
            <DetailStat label="Roles" value={snapshot?.roles.join(", ") ?? "Not listed"} />
          </CardContent>
        </Card>,
        <DetailTextCard
          key="comp-power-text"
          title="Power Text"
          description={sanitizeUiText(snapshot?.text ?? typed?.notes ?? "No imported text available.", "No proven text available.")}
        />,
      ],
      sources: [typed?.source_url, snapshot?.source_url].filter(Boolean) as string[],
    };
  }

  return null;
}

function getDetailPayload(entityType: string, itemId: string): DetailPayload | null {
  return (
    renderArtifactDetail(itemId) ??
    renderCompanionDetail(itemId) ??
    renderClassDetail(itemId) ??
    renderMountDetail(itemId) ??
    (entityType === "effects" ? renderEffectDetail(itemId) : null) ??
    renderSimpleEntityDetail(entityType, itemId)
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ entityType: string; itemId: string }>;
}) {
  const { entityType, itemId } = await params;
  const item = findReferenceItem(entityType, itemId);

  if (!item) {
    notFound();
  }

  const detail = getDetailPayload(entityType, itemId);
  if (!detail) {
    notFound();
  }

  return (
    <ContentPage
      eyebrow={item.subtitle}
      title={item.title}
      description={item.description}
      metadata={item.source}
      rightRail={
        <div className="space-y-6">
          {detail.imageUrl ? (
            <Card>
              <CardHeader>
                <CardTitle>Visual Reference</CardTitle>
                <CardDescription>Imported image asset used by the app where available.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
                  <Image src={detail.imageUrl} alt={item.title} fill className="object-contain p-6" />
                </div>
              </CardContent>
            </Card>
          ) : null}
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Move between the list view and related search results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href={listPageMap[entityType] ?? "/reference"}>
                <Card className="transition hover:border-[var(--sky-blue)]">
                  <CardContent className="p-4 text-sm text-white/80">Back to list page</CardContent>
                </Card>
              </Link>
              <Link href={`/search?q=${encodeURIComponent(item.title)}`}>
                <Card className="transition hover:border-[var(--sky-blue)]">
                  <CardContent className="p-4 text-sm text-white/80">Find related results</CardContent>
                </Card>
              </Link>
            </CardContent>
          </Card>
          <SourceLinkList urls={Array.from(new Set(detail.sources))} />
        </div>
      }
    >
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge variant="teal">{item.entityType}</Badge>
            {(item.badges ?? []).map((badge) => (
              <Badge key={badge} variant="muted">
                {badge}
              </Badge>
            ))}
          </div>
          <CardTitle>Reference Detail</CardTitle>
          <CardDescription>
            This page uses typed app data plus imported gameplay content where available, instead of a blank generic shell.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-7 text-white/82">{item.description}</p>
          {item.source ? <SourceBadge {...item.source} /> : null}
        </CardContent>
      </Card>
      {detail.sections}
    </ContentPage>
  );
}
