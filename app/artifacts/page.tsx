import Image from "next/image";

import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { artifactSnapshots } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Artifact Library"
      title="NW Hub artifact snapshot with icons, power text, and rank data"
      description="This page now lists the full locally stored NW Hub artifact snapshot captured on April 4, 2026, including icon images, activation text, and mythic rank values."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {artifactSnapshots.map((artifact) => {
          const rankEntries = Object.entries(artifact.ranks);
          const topRankEntry = rankEntries[rankEntries.length - 1];
          const topRankLabel = topRankEntry?.[0];
          const topRank = topRankEntry?.[1];

          return (
            <Card key={artifact.name}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  {artifact.image_url ? (
                    <Image
                      src={artifact.image_url}
                      alt={artifact.name}
                      width={56}
                      height={56}
                      className="border border-[rgba(205,180,219,0.55)] bg-[rgba(255,200,221,0.18)]"
                    />
                  ) : null}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="gold">{artifact.quality}</Badge>
                      {topRank ? <Badge variant="blue">{topRankLabel} IL {topRank.itemLevel}</Badge> : null}
                    </div>
                    <CardTitle>{artifact.name}</CardTitle>
                    <CardDescription>{artifact.powertext}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <SourceBadge
                  source_type="community_reference"
                  source_url={artifact.source_url}
                  source_version="nw-hub-2026-04-04"
                  verification_status="verified"
                  notes="Direct NW Hub artifact snapshot."
                />
                {topRank ? (
                  <div className="grid gap-2 text-sm text-[rgba(205,180,219,0.92)]">
                    <p>{topRankLabel} combined rating: {topRank.combinedRating}</p>
                    <p>{topRankLabel} stats: {Object.entries(topRank.stats).map(([key, value]) => `${key} ${value}`).join(", ")}</p>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ContentPage>
  );
}
