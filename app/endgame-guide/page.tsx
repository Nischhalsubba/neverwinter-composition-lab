import { ContentPage } from "@/components/content-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { knowledgeSections } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Endgame Guide"
      title="What endgame players should care about in 2026"
      description="The guide page is seeded from the source docs with high-value recommendations, patch-aware notes, and support-package priorities."
    >
      <div className="grid gap-6">
        {knowledgeSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>Seeded from verified and partially recovered source material.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.points.map((point) => (
                <p key={point} className="text-sm leading-6 text-stone-400">
                  {point}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
