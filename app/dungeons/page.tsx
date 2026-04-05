import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dungeons } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Dungeons"
      title="5-player planning shells"
      description="Dungeon mode is active in the Team Builder today. Dungeon-specific mechanics remain ready for future verified ingestion instead of being guessed."
    >
      <div className="grid gap-6">
        {dungeons.map((dungeon) => (
          <Card key={dungeon.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/reference/dungeons/${dungeon.id}`}>{dungeon.name}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-stone-400">
              <p>Party size: {dungeon.size}</p>
              <p>{dungeon.current_relevance}</p>
              <p>{dungeon.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
