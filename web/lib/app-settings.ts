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

    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return { ...DEFAULT_APP_SETTINGS, ...parsed };
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
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return { ...DEFAULT_APP_SETTINGS, ...parsed };
  } catch {
    return null;
  }
}
