import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { companionEnhancementSnapshots, companionPowerSnapshots } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Companions"
      title="Companion slot bonuses and enhancements from the NW Hub snapshot"
      description="The companion library now surfaces the imported player-bonus and enhancement records that power the Team Builder selectors."
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
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
                <div key={item.name} className="border border-[rgba(205,180,219,0.3)] bg-[rgba(255,200,221,0.12)] p-4">
                  <div className="flex flex-wrap gap-2">
                    {item.roles.map((role) => (
                      <Badge key={role} variant="blue">
                        {role}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-medium text-[rgba(205,180,219,0.96)]">{item.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[rgba(205,180,219,0.82)]">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enhancement Powers</CardTitle>
            <CardDescription>{companionEnhancementSnapshots.length} imported enhancement entries.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <SourceBadge
              source_type="community_reference"
              source_url="https://nw-hub.com/companions/enhancements"
              source_version="nw-hub-2026-04-04"
              verification_status="verified"
              notes="Direct NW Hub companion enhancement snapshot."
            />
            <div className="grid gap-3">
              {companionEnhancementSnapshots.map((item) => (
                <div key={item.name} className="border border-[rgba(162,210,255,0.34)] bg-[rgba(162,210,255,0.12)] p-4">
                  <p className="text-sm font-medium text-[rgba(205,180,219,0.96)]">{item.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[rgba(205,180,219,0.82)]">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentPage>
  );
}
