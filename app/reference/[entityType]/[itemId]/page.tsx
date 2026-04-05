import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { findReferenceItem } from "@/lib/reference-index";

const listPageMap: Record<string, string> = {
  artifacts: "/artifacts",
  companions: "/companions",
  classes: "/classes",
  mounts: "/mounts",
  effects: "/buffs-debuffs",
  dungeons: "/dungeons",
  trials: "/trials",
  events: "/events",
  patches: "/patch-tracker",
  glossary: "/glossary",
  bosses: "/team-builder",
  enhancements: "/companions",
  "companion-powers": "/companions",
};

export default async function Page({
  params,
}: {
  params: Promise<{ entityType: string; itemId: string }>;
}) {
  const { entityType, itemId } = await params;
  const item = findReferenceItem(entityType, itemId);

  if (!item) {
    notFound();
  }

  return (
    <ContentPage
      eyebrow={item.subtitle}
      title={item.title}
      description={item.description}
      metadata={item.source}
      rightRail={
        <Card>
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
            <CardDescription>Move between the list view and related search results.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href={listPageMap[entityType] ?? "/reference"}>
              <Card className="transition hover:border-[var(--sky-blue)]">
                <CardContent className="p-4 text-sm text-white/80">Back to list page</CardContent>
              </Card>
            </Link>
            <Link href={`/search?q=${encodeURIComponent(item.title)}`}>
              <Card className="transition hover:border-[var(--sky-blue)]">
                <CardContent className="p-4 text-sm text-white/80">Find related results</CardContent>
              </Card>
            </Link>
          </CardContent>
        </Card>
      }
    >
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge variant="teal">{item.entityType}</Badge>
            {(item.badges ?? []).map((badge) => (
              <Badge key={badge} variant="muted">
                {badge}
              </Badge>
            ))}
          </div>
          <CardTitle>Entity Detail</CardTitle>
          <CardDescription>This detail view is generated from the app&apos;s shared typed reference index.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-7 text-white/82">{item.description}</p>
          {item.source ? <SourceBadge {...item.source} /> : null}
        </CardContent>
      </Card>
    </ContentPage>
  );
}
