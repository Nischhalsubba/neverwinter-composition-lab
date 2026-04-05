"use client";

import { useState } from "react";
import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteSavedBuild, readSavedBuilds, type SavedTeamBuild } from "@/lib/team-build-storage";

export default function Page() {
  const [builds, setBuilds] = useState<SavedTeamBuild[]>(() => readSavedBuilds());

  return (
    <ContentPage
      eyebrow="Saved Builds"
      title="Local saved build workspace"
      description="Saved builds are stored in this browser for fast reloads during theorycrafting and roster planning."
    >
      {builds.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {builds.map((build) => (
            <Card key={build.id}>
              <CardHeader>
                <CardTitle>{build.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-black/74">
                  {build.mode} / {build.trialPreset} / {build.teamMembers.length} members
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-black/56">Updated {new Date(build.updatedAt).toLocaleString()}</p>
                <div className="flex gap-3">
                  <Link href="/team-builder" className="inline-flex">
                    <Button variant="primary">Open Builder</Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setBuilds(deleteSavedBuild(build.id));
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No saved builds yet"
          description="Save a build from Team Builder and it will appear here."
        />
      )}
    </ContentPage>
  );
}
