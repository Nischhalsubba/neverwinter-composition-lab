import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { searchReferenceIndex } from "@/lib/reference-index";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const results = searchReferenceIndex(query);

  return (
    <ContentPage
      eyebrow="Search"
      title={query ? `Search results for "${query}"` : "Search the app data"}
      description="Search now covers the app’s typed entities so header search resolves to actual list and detail destinations."
    >
      <div className="grid gap-4">
        {results.map((item) => (
          <Link key={`${item.entityType}-${item.id}`} href={item.href}>
            <Card className="transition hover:border-[var(--sky-blue)]">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle>{item.title}</CardTitle>
                  <Badge variant="blue">{item.subtitle}</Badge>
                  {(item.badges ?? []).slice(0, 3).map((badge) => (
                    <Badge key={badge} variant="muted">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-black/76">Open detail page</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
