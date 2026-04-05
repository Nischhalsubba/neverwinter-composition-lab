import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { moduleTimeline, patchChanges } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Patch Tracker"
      title="Patch-aware notes with provenance"
      description="The tracker starts with app-relevant changes: buff category rules, companion shield standardization, support companion overhauls, and the current module line."
      rightRail={
        <Card>
          <CardHeader>
            <CardTitle>Visible module timeline</CardTitle>
            <CardDescription>Current visible module line for 2026-focused planning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {moduleTimeline.map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-stone-300">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      }
    >
      <div className="space-y-6">
        {patchChanges.map((patch) => (
          <Card key={patch.id}>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="teal">{patch.date}</Badge>
                <Badge variant="blue">{patch.category}</Badge>
                <Badge variant="orange">{patch.importance}</Badge>
              </div>
              <CardTitle>
                <Link href={`/reference/patches/${patch.id}`}>{patch.name}</Link>
              </CardTitle>
              <CardDescription>{patch.affected_entity}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <SourceBadge {...patch} />
              <p className="text-sm leading-6 text-stone-400">
                <strong className="text-stone-200">Before:</strong> {patch.before}
              </p>
              <p className="text-sm leading-6 text-stone-400">
                <strong className="text-stone-200">After:</strong> {patch.after}
              </p>
              <p className="text-sm leading-6 text-stone-400">{patch.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
