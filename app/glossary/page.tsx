import Link from "next/link";

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
              <CardTitle>
                <Link href={`/reference/glossary/${entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}>{entry.term}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-white/74">{entry.definition}</CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
