import Image from "next/image";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { artifactRecommendationsById, artifacts } from "@/data/game-data";

export default function Page() {
  const rankedArtifacts = [...artifacts].sort((left, right) => {
    const leftTrial = artifactRecommendationsById[left.id]?.trial?.rank ?? 999;
    const rightTrial = artifactRecommendationsById[right.id]?.trial?.rank ?? 999;
    return leftTrial - rightTrial || left.name.localeCompare(right.name);
  });

  return (
    <ContentPage
      eyebrow="Artifact Library"
      title="Artifact rankings with trial and dungeon recommendations"
      description="Artifacts now show imported recommendation ranks alongside the local artifact snapshot. Trial and dungeon rankings remain separate so the builder stays mode-aware."
    >
      <Card>
        <CardHeader>
          <CardTitle>Recommended artifacts</CardTitle>
          <CardDescription>
            Trial and dungeon rankings are imported from the Google Sheet tab and matched against the local artifact dataset.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SourceBadge
            source_type="user_sheet"
            source_url="https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1200006036#gid=1200006036"
            source_version="aragon-artifact-sheet-2026-01-25"
            verification_status="verified"
            notes="Trial and dungeon recommendation ranks were extracted from the artifact tab and merged into the local artifact records."
          />
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.18em] text-white/54">
                  <th className="px-4 py-3">Artifact</th>
                  <th className="px-4 py-3">Recommended Artifact</th>
                  <th className="px-4 py-3">Trial Rank</th>
                  <th className="px-4 py-3">Dungeon Rank</th>
                  <th className="px-4 py-3">Damage Boost</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rankedArtifacts.map((artifact) => {
                  const recommendation = artifactRecommendationsById[artifact.id];
                  const trial = recommendation?.trial;
                  const dungeon = recommendation?.dungeon;

                  return (
                    <tr key={artifact.id} className="border-b border-[var(--border)] align-top">
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-3">
                          {artifact.image_url ? (
                            <Image
                              src={artifact.image_url}
                              alt={artifact.name}
                              width={48}
                              height={48}
                              className="border border-[var(--border)] bg-[var(--surface)]"
                            />
                          ) : null}
                          <div>
                            <Link href={`/reference/artifacts/${artifact.id}`} className="font-medium text-white hover:text-white/84">
                              {artifact.name}
                            </Link>
                            <p className="mt-1 text-sm text-white/70">{artifact.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {trial ? <Badge variant="blue">Trial</Badge> : null}
                          {dungeon ? <Badge variant="purple">Dungeon</Badge> : null}
                          {!trial && !dungeon ? <Badge variant="muted">Not ranked</Badge> : null}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-white/82">{trial ? `#${trial.rank}` : "-"}</td>
                      <td className="px-4 py-4 text-sm text-white/82">{dungeon ? `#${dungeon.rank}` : "-"}</td>
                      <td className="px-4 py-4 text-sm text-white/82">
                        <div className="space-y-1">
                          <p>{trial ? `Trial ${trial.damageBoost.toFixed(2)}%` : "Trial -"}</p>
                          <p>{dungeon ? `Dungeon ${dungeon.damageBoost.toFixed(2)}%` : "Dungeon -"}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm leading-6 text-white/74">{artifact.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </ContentPage>
  );
}
