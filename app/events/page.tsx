import { ContentPage } from "@/components/content-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Events"
      title="Event-aware content hooks"
      description="The event page is seeded with current-era official references and leaves room for event-specific exclusions, Tempus Arena modifiers, and seasonal content later."
    >
      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-stone-400">{event.notes}</CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
