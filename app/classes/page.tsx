import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { classes } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Classes"
      title="Class roster seeds for composition planning"
      description="The first pass keeps class records light and patch-aware. Specific power values remain open until they are verified, but class identity and roster roles are already usable in the Team Builder."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.identity_note}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SourceBadge {...item} />
              <p className="text-sm leading-6 text-stone-400">Role focus: {item.role_focus.join(", ")}</p>
              <p className="text-sm leading-6 text-stone-400">{item.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
