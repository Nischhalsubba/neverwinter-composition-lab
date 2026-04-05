import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { effectCatalog } from "@/data/game-data";
import { formatPercent, titleCase } from "@/lib/utils";

const grouped = {
  boss: effectCatalog.filter((effect) => effect.effect_category === "boss_debuff"),
  typed: effectCatalog.filter((effect) => effect.effect_category === "typed_vulnerability"),
  team: effectCatalog.filter((effect) => effect.effect_category === "team_buff"),
  carry: effectCatalog.filter((effect) => ["carry_only", "owner_only", "self_buff"].includes(effect.effect_category)),
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="Buff & Debuff Explorer"
      title="Inspect effect buckets instead of one flattened total"
      description="Boss debuffs, typed vulnerability, team buffs, and carry-only effects are modeled as separate layers with stack rules and source provenance."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(grouped).map(([key, effects]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{titleCase(key)}</CardTitle>
              <CardDescription>{effects.length} seeded effects currently tracked.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {effects.map((effect) => (
                <div key={effect.id} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/reference/effects/${effect.id}`} className="text-sm font-medium text-stone-100 hover:text-white">
                      {effect.name}
                    </Link>
                    <Badge variant="blue">{titleCase(effect.stat)}</Badge>
                    <Badge variant="muted">{effect.stack_rule.replaceAll("_", " ")}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-400">
                    {effect.value !== null ? formatPercent(effect.value) : "Pending verified value"} • {effect.notes}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentPage>
  );
}
