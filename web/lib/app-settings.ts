export type InterfaceDensity = "comfortable" | "compact";
export type TeamModePreference = "dungeon" | "trial";
export type AutoSetupPreference = "boost_one_dps" | "overall_team_damage";

export interface AppSettings {
  interfaceDensity: InterfaceDensity;
  defaultTeamMode: TeamModePreference;
  defaultTrialPreset: "standard" | "msod";
  defaultAutoSetupGoal: AutoSetupPreference;
  rememberLastBuild: boolean;
  rememberLastBoss: boolean;
  openInspectorOnCardClick: boolean;
  showPendingEffects: boolean;
  reducedMotion: boolean;
  highContrastMode: boolean;
  defaultCritAssumption: number;
  defaultCaAssumption: number;
  exportIncludeImages: boolean;
}

export const DEFAULT_APP_SETTINGS: AppSettings = {
  interfaceDensity: "comfortable",
  defaultTeamMode: "trial",
  defaultTrialPreset: "standard",
  defaultAutoSetupGoal: "boost_one_dps",
  rememberLastBuild: true,
  rememberLastBoss: true,
  openInspectorOnCardClick: true,
  showPendingEffects: true,
  reducedMotion: false,
  highContrastMode: true,
  defaultCritAssumption: 0.9,
  defaultCaAssumption: 1.2,
  exportIncludeImages: true,
};

const STORAGE_KEY = "nw-composition-lab:app-settings";

const booleanKeys = [
  "rememberLastBuild", "rememberLastBoss", "openInspectorOnCardClick",
  "showPendingEffects", "reducedMotion", "highContrastMode", "exportIncludeImages",
] as const;

function normalizeAppSettings(value: unknown): AppSettings | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;

  const input = value as Record<string, unknown>;
  const settings: AppSettings = { ...DEFAULT_APP_SETTINGS };
  if (input.interfaceDensity === "comfortable" || input.interfaceDensity === "compact") settings.interfaceDensity = input.interfaceDensity;
  if (input.defaultTeamMode === "trial" || input.defaultTeamMode === "dungeon") settings.defaultTeamMode = input.defaultTeamMode;
  if (input.defaultTrialPreset === "standard" || input.defaultTrialPreset === "msod") settings.defaultTrialPreset = input.defaultTrialPreset;
  if (input.defaultAutoSetupGoal === "boost_one_dps" || input.defaultAutoSetupGoal === "overall_team_damage") settings.defaultAutoSetupGoal = input.defaultAutoSetupGoal;
  for (const key of booleanKeys) {
    if (typeof input[key] === "boolean") settings[key] = input[key] as boolean;
  }
  if (typeof input.defaultCritAssumption === "number" && Number.isFinite(input.defaultCritAssumption) && input.defaultCritAssumption >= 0) {
    settings.defaultCritAssumption = input.defaultCritAssumption;
  }
  if (typeof input.defaultCaAssumption === "number" && Number.isFinite(input.defaultCaAssumption) && input.defaultCaAssumption >= 0) {
    settings.defaultCaAssumption = input.defaultCaAssumption;
  }
  return settings;
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function readAppSettings(): AppSettings {
  if (!isBrowser()) {
    return DEFAULT_APP_SETTINGS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_APP_SETTINGS;
    }

    return normalizeAppSettings(JSON.parse(raw)) ?? DEFAULT_APP_SETTINGS;
  } catch {
    return DEFAULT_APP_SETTINGS;
  }
}

export function writeAppSettings(settings: AppSettings) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function resetAppSettings() {
  writeAppSettings(DEFAULT_APP_SETTINGS);
  return DEFAULT_APP_SETTINGS;
}

export function parseAppSettingsPayload(raw: string): AppSettings | null {
  try {
    return normalizeAppSettings(JSON.parse(raw));
  } catch {
    return null;
  }
}
