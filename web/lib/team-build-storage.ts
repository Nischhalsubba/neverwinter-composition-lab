import type { TeamMember, TeamMode } from "@/lib/types";

export interface SavedTeamBuild {
  id: string;
  name: string;
  mode: TeamMode;
  trialPreset: "standard" | "msod";
  bossId: string;
  teamMembers: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface SharedTeamBuildPayload {
  schema: "neverwinter-composition-lab-build";
  version: 1;
  exportedAt: string;
  build: {
    name: string;
    mode: TeamMode;
    trialPreset: "standard" | "msod";
    bossId: string;
    teamMembers: TeamMember[];
  };
}

const STORAGE_KEY = "nw-composition-lab:saved-builds";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readSavedBuilds(): SavedTeamBuild[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as SavedTeamBuild[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeSavedBuilds(builds: SavedTeamBuild[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
}

export function upsertSavedBuild(
  build: Omit<SavedTeamBuild, "id" | "createdAt" | "updatedAt"> & { id?: string },
) {
  const now = new Date().toISOString();
  const current = readSavedBuilds();
  const existing = build.id ? current.find((item) => item.id === build.id) : null;
  const nextBuild: SavedTeamBuild = {
    ...build,
    id: build.id ?? `build-${crypto.randomUUID()}`,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  const next = existing
    ? current.map((item) => (item.id === nextBuild.id ? nextBuild : item))
    : [nextBuild, ...current];

  writeSavedBuilds(next);
  return nextBuild;
}

export function deleteSavedBuild(buildId: string) {
  const next = readSavedBuilds().filter((build) => build.id !== buildId);
  writeSavedBuilds(next);
  return next;
}

export function createSharedBuildPayload(
  build: Pick<SavedTeamBuild, "name" | "mode" | "trialPreset" | "bossId" | "teamMembers">,
): SharedTeamBuildPayload {
  return {
    schema: "neverwinter-composition-lab-build",
    version: 1,
    exportedAt: new Date().toISOString(),
    build: {
      name: build.name,
      mode: build.mode,
      trialPreset: build.trialPreset,
      bossId: build.bossId,
      teamMembers: build.teamMembers,
    },
  };
}

export function parseSharedBuildPayload(raw: string): SharedTeamBuildPayload | null {
  try {
    const parsed = JSON.parse(raw) as SharedTeamBuildPayload;
    if (
      parsed?.schema !== "neverwinter-composition-lab-build" ||
      parsed?.version !== 1 ||
      !parsed.build ||
      !Array.isArray(parsed.build.teamMembers)
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
