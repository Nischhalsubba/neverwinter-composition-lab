import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  companionEnhancementSnapshots,
  companionPowerSnapshots,
  companionRecommendationsById,
  companions,
  enhancementRecommendationsById,
} from "@/data/game-data";

export default function Page() {
  const recommendedCompanions = companions
    .filter((item) => companionRecommendationsById[item.id])
    .sort((left, right) => {
      return (companionRecommendationsById[left.id]?.rank ?? 999) - (companionRecommendationsById[right.id]?.rank ?? 999);
    });

  return (
    <ContentPage
      eyebrow="Companions"
      title="Support companion and enhancement reference"
      description="The companion reference now combines the NW Hub snapshot with the imported Google Sheet support and enhancement rankings used by Team Builder."
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recommended support companions</CardTitle>
            <CardDescription>Top 10 recommendations from the imported support companion sheet, still shown against the full local companion roster.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SourceBadge
              source_type="user_sheet"
              source_url="https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1245615469#gid=1245615469"
              source_version="aragon-support-companion-sheet-2026-03-02"
              verification_status="verified"
              notes="Top 10 support companion recommendations imported from the Google Sheet."
            />
            <div className="grid gap-3">
              {recommendedCompanions.map((companion) => {
                const recommendation = companionRecommendationsById[companion.id];
                return (
                  <div key={companion.id} className="border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-stone-100">{companion.name}</p>
                      <Badge variant="teal">Rank #{recommendation?.rank}</Badge>
                      <Badge variant="purple">{companion.role_tag}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-300">{recommendation?.benefit}</p>
                    <p className="mt-2 text-sm text-stone-400">
                      Rough damage boost: {recommendation?.roughDamageBoost?.toFixed(2) ?? "pending"}% | ST DPS: {recommendation?.stDps ?? "pending"}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Companion Slot Bonuses</CardTitle>
              <CardDescription>{companionPowerSnapshots.length} imported companion player bonuses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <SourceBadge
                source_type="community_reference"
                source_url="https://nw-hub.com/companions/powers"
                source_version="nw-hub-2026-04-04"
                verification_status="verified"
                notes="Direct NW Hub companion power snapshot."
              />
              <div className="grid gap-3">
                {companionPowerSnapshots.slice(0, 48).map((item) => (
                  <div key={item.name} className="border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex flex-wrap gap-2">
                      {item.roles.map((role) => (
                        <Badge key={role} variant="blue">
                          {role}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-3 text-sm font-medium text-stone-100">{item.name}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enhancement Powers</CardTitle>
              <CardDescription>{companionEnhancementSnapshots.length} imported enhancement entries with sheet ranking overlays.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <SourceBadge
                source_type="user_sheet"
                source_url="https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=839734160#gid=839734160"
                source_version="aragon-enhancement-sheet-2025-03-26"
                verification_status="verified"
                notes="Google Sheet enhancement ranking merged onto the NW Hub enhancement snapshot."
              />
              <div className="grid gap-3">
                {companionEnhancementSnapshots.map((item) => {
                  const recommendation = Object.values(enhancementRecommendationsById).find((entry) => entry?.name === item.name);
                  return (
                    <div key={item.name} className="border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-stone-100">{item.name}</p>
                        {recommendation ? <Badge variant="teal">Rank #{recommendation.rank}</Badge> : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-stone-400">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
