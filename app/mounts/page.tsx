import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mounts, mountCombatPowers } from "@/data/game-data";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Mount Library"
      title="Support mounts, damage mounts, and calculator hooks"
      description="Mount entries distinguish combat powers, equip powers, support roles, and unresolved live values. The final mount-hit calculator uses this layer instead of a generic mount number."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Mount library</CardTitle>
            <CardDescription>Support and damage mount seeds from the product docs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mounts.map((mount) => (
              <div key={mount.id} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/reference/mounts/${mount.id}`} className="text-sm font-medium text-black hover:text-black/84">
                    {mount.name}
                  </Link>
                  <Badge variant="orange">{mount.mount_type}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-black/74">{mount.notes}</p>
                <div className="mt-3">
                  <SourceBadge {...mount} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Combat powers</CardTitle>
            <CardDescription>Structured mount combat powers and what is still unresolved.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mountCombatPowers.map((power) => (
              <div key={power.id} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/reference/mounts/${power.id}`} className="text-sm font-medium text-black hover:text-black/84">
                    {power.name}
                  </Link>
                  <Badge variant="blue">{power.damage_type}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-black/74">
                  Base hit: {power.base_hit ? power.base_hit.toLocaleString() : "Pending verification"}.
                </p>
                <p className="mt-2 text-sm leading-6 text-black/74">{power.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ContentPage>
  );
}
