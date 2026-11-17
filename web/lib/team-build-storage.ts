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

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isSavedTeamBuild) : [];
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

function isSavedTeamBuild(value: unknown): value is SavedTeamBuild {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.bossId === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string" &&
    (value.mode === "trial" || value.mode === "dungeon") &&
    (value.trialPreset === "standard" || value.trialPreset === "msod") &&
    Array.isArray(value.teamMembers) &&
    value.teamMembers.every(isValidTeamMember)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isValidTeamMember(value: unknown): value is TeamMember {
  if (!isRecord(value)) return false;

  const requiredStrings = [
    "id", "label", "class_id", "paragon", "race", "artifact_id",
    "companion_id", "enhancement_id", "companion_bonus_id", "mount_id",
    "mount_combat_power_id", "mount_equip_power_id", "notes",
  ];
  const listFields = ["encounter_ids", "daily_ids", "feature_ids", "insignia_bonus_ids"];
  const validRoles = ["dps", "healer", "tank", "support", "boost", "support_dps"];

  return (
    requiredStrings.every((key) => typeof value[key] === "string") &&
    listFields.every((key) => isStringArray(value[key])) &&
    (value.group === "A" || value.group === "B") &&
    typeof value.slot === "number" && Number.isInteger(value.slot) && value.slot > 0 &&
    typeof value.role === "string" && validRoles.includes(value.role) &&
    typeof value.is_carry === "boolean" &&
    isRecord(value.personal_overrides) &&
    Object.values(value.personal_overrides).every(
      (amount) => typeof amount === "number" && Number.isFinite(amount),
    )
  );
}

export function parseSharedBuildPayload(raw: string): SharedTeamBuildPayload | null {
  try {
    if (raw.length > 1_000_000) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !isRecord(parsed.build)) return null;

    const build = parsed.build;
    if (
      parsed.schema !== "neverwinter-composition-lab-build" ||
      parsed.version !== 1 ||
      typeof parsed.exportedAt !== "string" ||
      typeof build.name !== "string" ||
      (build.mode !== "dungeon" && build.mode !== "trial") ||
      (build.trialPreset !== "standard" && build.trialPreset !== "msod") ||
      typeof build.bossId !== "string" ||
      !Array.isArray(build.teamMembers) ||
      !build.teamMembers.every(isValidTeamMember)
    ) {
      return null;
    }

    return parsed as unknown as SharedTeamBuildPayload;
  } catch {
    return null;
  }
}
