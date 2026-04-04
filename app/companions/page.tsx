import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { companions } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Companion Library"
      title="ST rankings and support seeds in one companion library"
      description="Companions remain grouped by role tag, with ST figures, support notes, and verification metadata pulled from the source docs."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {companions.map((companion) => (
          <Card key={companion.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant={companion.role_tag === "support" ? "purple" : "teal"}>{companion.role_tag}</Badge>
                {companion.st_dps ? <Badge variant="blue">{companion.st_dps.toLocaleString()} ST</Badge> : null}
              </div>
              <CardTitle>{companion.name}</CardTitle>
              <CardDescription>{companion.archetype}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SourceBadge {...companion} />
              <p className="text-sm leading-6 text-stone-400">{companion.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
