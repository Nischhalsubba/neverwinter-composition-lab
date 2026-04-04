import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { artifacts } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Artifact Library"
      title="Debuff artifacts stay separated from personal burst tools"
      description="The artifact library starts with the verified and partially recovered debuff ranking, along with explicit labels for unresolved exact values."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {artifacts.map((artifact) => (
          <Card key={artifact.id}>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold">Rank {artifact.rank_order ?? "-"}</Badge>
                <Badge variant="blue">{artifact.category}</Badge>
              </div>
              <CardTitle>{artifact.name}</CardTitle>
              <CardDescription>
                Exact value {artifact.exact_value !== null ? `${artifact.exact_value * 100}%` : "pending"}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SourceBadge {...artifact} />
              <p className="text-sm leading-6 text-stone-400">{artifact.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
