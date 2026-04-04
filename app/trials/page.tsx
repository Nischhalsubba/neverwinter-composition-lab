import { ContentPage } from "@/components/content-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trials } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Trials"
      title="10-player two-group trial support"
      description="Trial mode is structurally complete in the Team Builder, with two groups of five and carry-aware summaries. Trial pages are seeded with current module context first."
    >
      <div className="grid gap-6">
        {trials.map((trial) => (
          <Card key={trial.id}>
            <CardHeader>
              <CardTitle>{trial.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-stone-400">
              <p>Raid size: {trial.size}</p>
              <p>{trial.current_relevance}</p>
              <p>{trial.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
