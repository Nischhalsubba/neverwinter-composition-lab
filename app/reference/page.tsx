import Link from "next/link";

import { referenceRoutes } from "@/config/navigation";
import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  artifacts,
  classes,
  companionEnhancements,
  companions,
  effectCatalog,
  mountCombatPowers,
  patchChanges,
} from "@/data/game-data";

const routeSummaries: Record<string, { count: string; preview: string }> = {
  "/buffs-debuffs": {
    count: `${effectCatalog.length} mapped effects`,
    preview: "Live effect catalog with boss debuffs, team buffs, and typed support coverage.",
  },
  "/classes": {
    count: `${classes.length} classes`,
    preview: classes
      .slice(0, 3)
      .map((item) => item.name)
      .join(" / "),
  },
  "/companions": {
    count: `${companions.length} companions / ${companionEnhancements.length} enhancements`,
    preview: companions
      .slice(0, 3)
      .map((item) => item.name)
      .join(" / "),
  },
  "/mounts": {
    count: `${mountCombatPowers.length} mount powers`,
    preview: mountCombatPowers
      .slice(0, 3)
      .map((item) => item.name)
      .join(" / "),
  },
  "/artifacts": {
    count: `${artifacts.length} artifacts`,
    preview: artifacts
      .slice(0, 3)
      .map((item) => item.name)
      .join(" / "),
  },
  "/patch-tracker": {
    count: `${patchChanges.length} patch notes`,
    preview: patchChanges
      .slice(0, 2)
      .map((item) => item.name)
      .join(" / "),
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="Reference Hub"
      title="Support data, rankings, and system pages"
      description="Every page here is functional and tied to the local typed data model. Use Team Builder for planning, then jump here when you need deeper reference detail."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {referenceRoutes.map((route) => {
          const summary = routeSummaries[route.href] ?? {
            count: "Reference page",
            preview: `Open ${route.label.toLowerCase()} for the current supporting dataset.`,
          };

          return (
            <Link key={route.href} href={route.href}>
              <Card className="h-full transition hover:border-[var(--sky-blue)]">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{route.label}</CardTitle>
                    <Badge variant="blue">{summary.count}</Badge>
                  </div>
                  <CardDescription>{summary.preview}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-white/78">
                  Open the live reference page for {route.label.toLowerCase()}.
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </ContentPage>
  );
}
