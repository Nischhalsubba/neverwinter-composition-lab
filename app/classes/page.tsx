import Image from "next/image";

import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { classSnapshots, powers } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Classes"
      title="NW Hub class roster with paragon paths and imported power trees"
      description="The class page now reflects the locally stored NW Hub class snapshot, including emblems, paragons, and the count of imported class powers/features used by the Team Builder."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {classSnapshots.map((item) => {
          const classPowerCount = powers.filter((power) => power.class_name === item.className).length;

          return (
            <Card key={item.className}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Image
                    src={item.emblem_url}
                    alt={item.className}
                    width={56}
                    height={56}
                    className="border border-[rgba(205,180,219,0.55)] bg-[rgba(162,210,255,0.18)]"
                  />
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {item.paragons.map((paragon) => (
                        <Badge key={paragon.name} variant="teal">
                          {paragon.name} / {paragon.role}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle>{item.className}</CardTitle>
                    <CardDescription>{classPowerCount} imported powers and features available locally.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <SourceBadge
                  source_type="community_reference"
                  source_url={item.source_url}
                  source_version="nw-hub-2026-04-04"
                  verification_status="verified"
                  notes="Direct NW Hub class snapshot."
                />
                <p className="text-sm leading-6 text-[rgba(205,180,219,0.92)]">
                  Paragon paths: {item.paragons.map((paragon) => `${paragon.name} (${paragon.role})`).join(", ")}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ContentPage>
  );
}
