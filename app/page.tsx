import { ArrowRight, Compass, Gem, MountainSnow, ScrollText, Users, WandSparkles } from "lucide-react";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { artifacts, companions, knowledgeSections, moduleTimeline, mounts, patchChanges } from "@/data/game-data";

const dashboardLinks = [
  { href: "/team-builder", title: "Team Builder", copy: "Build 5-player dungeons and 10-player trials with carry-aware summaries.", icon: Users },
  { href: "/buffs-debuffs", title: "Buff & Debuff Explorer", copy: "Inspect team buffs, boss debuffs, typed vulnerability, and stack rules.", icon: Compass },
  { href: "/companions", title: "Companion Library", copy: "ST rankings, support seeds, and verification-aware companion records.", icon: WandSparkles },
  { href: "/mounts", title: "Mount Library", copy: "Support mounts, damage mounts, and final mount-hit integration.", icon: MountainSnow },
];

export default function Page() {
  return (
    <ContentPage
      eyebrow="Home / Dashboard"
      title="Premium endgame planning without spreadsheet blindness"
      description="This first pass already includes the product shell, typed local data, source-aware content, a functional Team Builder, and seeded pages that stay honest about what is verified versus pending."
      rightRail={
        <>
          <Card>
            <CardHeader>
              <CardTitle>Current module line</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {moduleTimeline.map((item) => (
                <div key={item} className="border border-[var(--border)] bg-[rgba(205,180,219,0.1)] px-4 py-3 text-sm text-white">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Patch-aware guardrail</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-white/80">
                Unresolved values remain in the data model with `verification_status`, `source_type`, `source_url`, and `notes`.
              </p>
            </CardContent>
          </Card>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-4">
        {dashboardLinks.map((item) => (
          <Card key={item.href}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <item.icon className="h-5 w-5 text-[var(--sky-blue)]" />
                <Badge variant="teal">Live</Badge>
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.copy}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={item.href} className="flex items-center justify-between border border-[var(--sky-blue)] bg-[rgba(162,210,255,0.16)] px-4 py-3 text-sm text-white transition hover:bg-[rgba(162,210,255,0.22)]">
                Open page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
            <div className="flex items-center gap-2 text-white">
              <ScrollText className="h-4 w-4 text-[var(--pastel-petal)]" />
              <p className="text-xs uppercase tracking-[0.22em] text-white">Useful real content</p>
            </div>
            <CardTitle>Knowledge hub seeds</CardTitle>
            <CardDescription>The app is seeded with meaningful guidance instead of blank placeholders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {knowledgeSections.map((section) => (
              <div key={section.title} className="border border-[var(--border)] bg-[rgba(205,180,219,0.1)] p-4">
                <p className="text-sm font-medium text-white">{section.title}</p>
                <div className="mt-3 space-y-2">
                  {section.points.map((point) => (
                    <p key={point} className="text-sm leading-6 text-white/80">
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Companion snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {companions.slice(0, 4).map((companion) => (
                <div key={companion.id} className="flex items-center justify-between border border-[var(--border)] bg-[rgba(189,224,254,0.12)] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">{companion.name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/80">{companion.role_tag}</p>
                  </div>
                  <p className="text-sm text-white">{companion.st_dps?.toLocaleString() ?? "Pending"}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Artifacts and mounts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              <div className="border border-[var(--border)] bg-[rgba(255,200,221,0.12)] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Gem className="h-4 w-4 text-[var(--pastel-petal)]" />
                  <p className="text-sm font-medium text-white">Top debuff artifacts</p>
                </div>
                <p className="text-sm leading-6 text-white/80">
                  {artifacts.slice(0, 3).map((item) => item.name).join(", ")}
                </p>
              </div>
              <div className="border border-[var(--border)] bg-[rgba(162,210,255,0.12)] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <MountainSnow className="h-4 w-4 text-[var(--sky-blue)]" />
                  <p className="text-sm font-medium text-white">Support mounts</p>
                </div>
                <p className="text-sm leading-6 text-white/80">
                  {mounts.slice(0, 3).map((item) => item.name).join(", ")}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Patch tracker preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patchChanges.slice(0, 3).map((patch) => (
                <div key={patch.id} className="border border-[var(--border)] bg-[rgba(205,180,219,0.1)] p-4">
                  <p className="text-sm font-medium text-white">{patch.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{patch.after}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
