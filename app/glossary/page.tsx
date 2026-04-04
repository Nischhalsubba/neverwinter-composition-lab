import { ContentPage } from "@/components/content-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { glossaryTerms } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Glossary"
      title="Neverwinter planning language, clarified"
      description="The glossary page keeps key endgame terms close to the planner so the product stays readable for users who do not live inside spreadsheets or Discord shorthand."
    >
      <div className="grid gap-6">
        {glossaryTerms.map((entry) => (
          <Card key={entry.term}>
            <CardHeader>
              <CardTitle>{entry.term}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-stone-400">{entry.definition}</CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
