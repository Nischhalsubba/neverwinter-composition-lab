"use client";

import Link from "next/link";
import { useState } from "react";

import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { sanitizeUiText } from "@/lib/display-text";
import {
  companionRecommendationsById,
  companions,
  recommendedCompanionEnhancements,
  singleTargetCompanionRecommendationsById,
  trialMandatoryCompanionById,
} from "@/data/game-data";

type CompanionFocusFilter =
  | "all"
  | "group_buff"
  | "debuff"
  | "top_support"
  | "top_st"
  | "trial_must";

type CompanionRoleFilter = "all" | "support" | "st" | "healing" | "augment" | "aoe";

type EnhancementFilter = "all" | "recommended" | "debuff" | "source_only";

function getCompanionFocus(companionId: string) {
  const supportRecommendation = companionRecommendationsById[companionId];
  const stRecommendation = singleTargetCompanionRecommendationsById[companionId];
  const trialMandatory = trialMandatoryCompanionById[companionId];
  const benefit = `${supportRecommendation?.benefit ?? ""} ${trialMandatory?.benefit ?? ""}`.toLowerCase();

  return {
    supportRecommendation,
    stRecommendation,
    trialMandatory,
    isGroupBuff:
      /all allies|full party|within 50ft|within 60ft|within 80ft|allies gain|to all allies/.test(benefit),
    isDebuff:
      /target take|damage debuff|incoming damage|reduce|reduction|defense|awareness|critical avoidance|deflect/.test(
        benefit,
      ),
  };
}

function getCompanionRoleLabel(roleTag: CompanionRoleFilter) {
  switch (roleTag) {
    case "st":
      return "Single Target";
    case "aoe":
      return "AOE";
    default:
      return roleTag.charAt(0).toUpperCase() + roleTag.slice(1);
  }
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<CompanionRoleFilter>("all");
  const [focusFilter, setFocusFilter] = useState<CompanionFocusFilter>("all");
  const [enhancementFilter, setEnhancementFilter] = useState<EnhancementFilter>("recommended");

  const filteredCompanions = companions
    .map((companion) => ({
      companion,
      ...getCompanionFocus(companion.id),
    }))
    .filter(({ companion, supportRecommendation, stRecommendation, trialMandatory, isGroupBuff, isDebuff }) => {
      const haystack = `${companion.name} ${companion.archetype} ${supportRecommendation?.benefit ?? ""} ${
        stRecommendation?.archetype ?? ""
      }`.toLowerCase();
      const queryMatch = !query.trim() || haystack.includes(query.trim().toLowerCase());
      const roleMatch = roleFilter === "all" || companion.role_tag === roleFilter;
      const focusMatch =
        focusFilter === "all" ||
        (focusFilter === "group_buff" && isGroupBuff) ||
        (focusFilter === "debuff" && isDebuff) ||
        (focusFilter === "top_support" && Boolean(supportRecommendation)) ||
        (focusFilter === "top_st" && Boolean(stRecommendation)) ||
        (focusFilter === "trial_must" && Boolean(trialMandatory));

      return queryMatch && roleMatch && focusMatch;
    })
    .sort((left, right) => {
      const leftMandatory = left.trialMandatory ? 0 : 1;
      const rightMandatory = right.trialMandatory ? 0 : 1;
      if (leftMandatory !== rightMandatory) {
        return leftMandatory - rightMandatory;
      }

      const leftSupportRank = left.supportRecommendation?.rank ?? 999;
      const rightSupportRank = right.supportRecommendation?.rank ?? 999;
      if (leftSupportRank !== rightSupportRank) {
        return leftSupportRank - rightSupportRank;
      }

      const leftStRank = left.stRecommendation?.rank ?? 999;
      const rightStRank = right.stRecommendation?.rank ?? 999;
      return leftStRank - rightStRank;
    });

  const filteredEnhancements = recommendedCompanionEnhancements.filter((item) => {
    const text = `${item.name} ${item.benefit}`.toLowerCase();
    const queryMatch = !query.trim() || text.includes(query.trim().toLowerCase());
    const focusMatch =
      enhancementFilter === "all" ||
      (enhancementFilter === "recommended" && item.rank <= 10) ||
      (enhancementFilter === "debuff" && /defense|awareness|critical avoidance|deflect|combat advantage/.test(item.benefit.toLowerCase())) ||
      (enhancementFilter === "source_only" && item.damageBoost == null);
    return queryMatch && focusMatch;
  });

  return (
    <ContentPage
      eyebrow="Companions"
      title="Companion planning board"
      description="Filter companions by support rank, trial-must utility, ST value, role tag, and enhancement priority. This page is aligned to the same recommendation logic used in Team Builder."
    >
      <Card>
        <CardHeader>
          <CardTitle>Companion filters</CardTitle>
          <CardDescription>
            Search by name or effect text, then narrow by role and planning focus such as strongest group buff or strongest debuff.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_240px_260px]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search companions, effects, or archetypes"
          />
          <Select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as CompanionRoleFilter)}>
            <option value="all">All role tags</option>
            <option value="support">Support</option>
            <option value="st">Single Target</option>
            <option value="aoe">AOE</option>
            <option value="healing">Healing</option>
            <option value="augment">Augment</option>
          </Select>
          <Select value={focusFilter} onChange={(event) => setFocusFilter(event.target.value as CompanionFocusFilter)}>
            <option value="all">All planning focuses</option>
            <option value="group_buff">Strongest group buff</option>
            <option value="debuff">Strongest debuff</option>
            <option value="top_support">Top support list</option>
            <option value="top_st">Top ST list</option>
            <option value="trial_must">Trial must-pick</option>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.8fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Companion library</CardTitle>
            <CardDescription>{filteredCompanions.length} companions match the current filters.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {filteredCompanions.map(({ companion, supportRecommendation, stRecommendation, trialMandatory, isGroupBuff, isDebuff }) => (
              <div key={companion.id} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <Link
                      href={`/reference/companions/${companion.id}`}
                      className="text-base font-semibold text-black transition hover:text-black/82"
                    >
                      {companion.name}
                    </Link>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="purple">{getCompanionRoleLabel(companion.role_tag)}</Badge>
                      {trialMandatory ? <Badge variant="blue">Trial Must</Badge> : null}
                      {supportRecommendation ? <Badge variant="teal">Support #{supportRecommendation.rank}</Badge> : null}
                      {stRecommendation ? <Badge variant="gold">ST #{stRecommendation.rank}</Badge> : null}
                      {isGroupBuff ? <Badge variant="blue">Group Buff</Badge> : null}
                      {isDebuff ? <Badge variant="red">Debuff</Badge> : null}
                    </div>
                  </div>
                  <div className="text-right text-sm text-black/72">
                    <p>{companion.archetype}</p>
                    <p>{companion.st_dps != null ? `ST DPS ${companion.st_dps.toLocaleString()}` : "ST DPS pending"}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="border border-[var(--border)] bg-[var(--panel)] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-black/62">Support value</p>
                    <p className="mt-2 text-sm leading-6 text-black/82">
                      {supportRecommendation
                        ? supportRecommendation.benefit
                        : "Not in the current top support list."}
                    </p>
                  </div>
                  <div className="border border-[var(--border)] bg-[var(--panel)] px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-black/62">ST value</p>
                    <p className="mt-2 text-sm leading-6 text-black/82">
                      {stRecommendation
                        ? `${stRecommendation.archetype}. ${stRecommendation.stDps != null ? `ST DPS ${stRecommendation.stDps.toLocaleString()}.` : ""}`
                        : "Not in the current recovered ST ranking."}
                    </p>
                  </div>
                </div>
                {trialMandatory ? (
                  <p className="mt-3 text-sm leading-6 text-black/82">{trialMandatory.usage}</p>
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enhancement planning</CardTitle>
            <CardDescription>Focus on the top debuff enhancements already used by the builder logic.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={enhancementFilter} onChange={(event) => setEnhancementFilter(event.target.value as EnhancementFilter)}>
              <option value="recommended">Top 10 enhancements</option>
              <option value="all">All ranked enhancements</option>
              <option value="debuff">Debuff-focused enhancements</option>
              <option value="source_only">Entries with unresolved damage boost</option>
            </Select>
            <div className="grid gap-3">
              {filteredEnhancements.map((item) => (
                <div key={item.name} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/reference/enhancements/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                      className="text-sm font-semibold text-black transition hover:text-black/82"
                    >
                      {item.name}
                    </Link>
                    <Badge variant="teal">Rank #{item.rank}</Badge>
                    {item.damageBoost != null ? <Badge variant="gold">{item.damageBoost.toFixed(2)}%</Badge> : null}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-black/82">{sanitizeUiText(item.benefit, "Recovered enhancement effect.")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentPage>
  );
}
