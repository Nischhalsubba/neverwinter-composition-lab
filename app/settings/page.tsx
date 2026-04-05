"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Download, RotateCcw, Trash2, Upload } from "lucide-react";

import { ContentPage } from "@/components/content-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  parseAppSettingsPayload,
  readAppSettings,
  resetAppSettings,
  writeAppSettings,
  type AppSettings,
} from "@/lib/app-settings";
import { deleteSavedBuild, readSavedBuilds } from "@/lib/team-build-storage";

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-sm leading-6 text-white/78">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-1 h-7 w-14 border transition ${
          checked
            ? "border-[var(--sky-blue)] bg-[var(--sky-blue)]"
            : "border-[var(--border-strong)] bg-[rgba(255,255,255,0.08)]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 bg-white transition ${checked ? "left-8" : "left-1"}`}
        />
      </button>
    </div>
  );
}

export default function Page() {
  const [settings, setSettings] = useState<AppSettings>(() => readAppSettings());
  const [importText, setImportText] = useState("");
  const [status, setStatus] = useState("Settings are stored locally in this browser.");
  const [savedBuildCount, setSavedBuildCount] = useState(() => readSavedBuilds().length);

  useEffect(() => {
    writeAppSettings(settings);
  }, [settings]);

  const settingsJson = useMemo(() => JSON.stringify(settings, null, 2), [settings]);

  function updateSettings<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setStatus("Settings saved locally.");
  }

  async function copySettings() {
    await navigator.clipboard.writeText(settingsJson);
    setStatus("Settings JSON copied to clipboard.");
  }

  function importSettings() {
    const parsed = parseAppSettingsPayload(importText);
    if (!parsed) {
      setStatus("Import failed. Paste a valid settings JSON payload.");
      return;
    }

    setSettings(parsed);
    setStatus("Settings imported successfully.");
  }

  function handleReset() {
    const next = resetAppSettings();
    setSettings(next);
    setStatus("Settings reset to defaults.");
  }

  function clearSavedBuilds() {
    const builds = readSavedBuilds();
    builds.forEach((build) => deleteSavedBuild(build.id));
    setSavedBuildCount(0);
    setStatus("All saved builds were removed from this browser.");
  }

  return (
    <ContentPage
      eyebrow="Settings"
      title="App preferences, accessibility, and storage"
      description="Use this page to control builder defaults, export behavior, accessibility, and local browser storage. Every section here is functional and persists locally."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.9fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>Builder Defaults</CardTitle>
                  <CardDescription>These values define the first state of the Team Builder when you start a new session.</CardDescription>
                </div>
                <Badge variant="teal">Persistent</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/62">Default mode</label>
                <Select value={settings.defaultTeamMode} onChange={(event) => updateSettings("defaultTeamMode", event.target.value as AppSettings["defaultTeamMode"])}>
                  <option value="dungeon">Dungeon</option>
                  <option value="trial">Trial</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/62">Default trial preset</label>
                <Select value={settings.defaultTrialPreset} onChange={(event) => updateSettings("defaultTrialPreset", event.target.value as AppSettings["defaultTrialPreset"])}>
                  <option value="standard">Standard trial</option>
                  <option value="msod">MSOD</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/62">Best setup default</label>
                <Select value={settings.defaultAutoSetupGoal} onChange={(event) => updateSettings("defaultAutoSetupGoal", event.target.value as AppSettings["defaultAutoSetupGoal"])}>
                  <option value="boost_one_dps">Boost one DPS</option>
                  <option value="overall_team_damage">Overall team damage</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/62">Interface density</label>
                <Select value={settings.interfaceDensity} onChange={(event) => updateSettings("interfaceDensity", event.target.value as AppSettings["interfaceDensity"])}>
                  <option value="comfortable">Comfortable</option>
                  <option value="compact">Compact</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculator Defaults</CardTitle>
              <CardDescription>Saved assumptions for the mount-hit panel and damage-planning workflow.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/62">Default crit assumption</label>
                <Input
                  type="number"
                  step="0.05"
                  value={settings.defaultCritAssumption}
                  onChange={(event) => updateSettings("defaultCritAssumption", Number(event.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/62">Default CA assumption</label>
                <Input
                  type="number"
                  step="0.05"
                  value={settings.defaultCaAssumption}
                  onChange={(event) => updateSettings("defaultCaAssumption", Number(event.target.value) || 0)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility And Interaction</CardTitle>
              <CardDescription>Use the toggles below to keep the interface readable and predictable.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingToggle
                label="High contrast mode"
                description="Keep stronger panel contrast, brighter form fields, and clearer borders across the app."
                checked={settings.highContrastMode}
                onChange={(value) => updateSettings("highContrastMode", value)}
              />
              <SettingToggle
                label="Reduced motion"
                description="Prefers simpler transitions and calmer interaction feedback."
                checked={settings.reducedMotion}
                onChange={(value) => updateSettings("reducedMotion", value)}
              />
              <SettingToggle
                label="Open slot editor on card click"
                description="Keeps the left slot editor drawer opening immediately when you click a roster card."
                checked={settings.openInspectorOnCardClick}
                onChange={(value) => updateSettings("openInspectorOnCardClick", value)}
              />
              <SettingToggle
                label="Show pending effects"
                description="Keeps unresolved or partially recovered effects visible in breakdown panels."
                checked={settings.showPendingEffects}
                onChange={(value) => updateSettings("showPendingEffects", value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export And Storage</CardTitle>
              <CardDescription>Move preferences between browsers and control local planning data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingToggle
                label="Remember last loaded build"
                description="Preserves the last working build state for the next session."
                checked={settings.rememberLastBuild}
                onChange={(value) => updateSettings("rememberLastBuild", value)}
              />
              <SettingToggle
                label="Remember last boss preset"
                description="Keeps your last boss preset selection when you reopen the planner."
                checked={settings.rememberLastBoss}
                onChange={(value) => updateSettings("rememberLastBoss", value)}
              />
              <SettingToggle
                label="Include images in workbook export"
                description="Keeps artwork in the exported spreadsheet where the local dataset already has recoverable image URLs."
                checked={settings.exportIncludeImages}
                onChange={(value) => updateSettings("exportIncludeImages", value)}
              />
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={copySettings}>
                  <Download className="mr-2 h-4 w-4" />
                  Copy settings JSON
                </Button>
                <Button variant="ghost" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset defaults
                </Button>
                <Button variant="danger" onClick={clearSavedBuilds}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear saved builds
                </Button>
              </div>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
                <Textarea
                  value={importText}
                  onChange={(event) => setImportText(event.target.value)}
                  placeholder="Paste settings JSON here to import another machine's preferences."
                  className="min-h-[160px]"
                />
                <Button variant="primary" className="h-fit" onClick={importSettings}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>Current browser state for settings and saved builds.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-white/80">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/62">Saved builds</p>
                  <p className="mt-2 text-lg font-semibold text-white">{savedBuildCount}</p>
                </div>
                <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/62">Contrast mode</p>
                  <p className="mt-2 text-lg font-semibold text-white">{settings.highContrastMode ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
              <div className="border border-[var(--border)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                <p className="text-sm leading-6 text-white">{status}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Routes</CardTitle>
              <CardDescription>Jump to the pages that are most often used together.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Link href="/team-builder" className="block border border-[var(--border)] px-4 py-3 text-white transition hover:border-[var(--sky-blue)]">
                Team Builder
              </Link>
              <Link href="/saved-builds" className="block border border-[var(--border)] px-4 py-3 text-white transition hover:border-[var(--sky-blue)]">
                Saved Builds
              </Link>
              <Link href="/reference" className="block border border-[var(--border)] px-4 py-3 text-white transition hover:border-[var(--sky-blue)]">
                Reference Hub
              </Link>
              <Link href="/about" className="block border border-[var(--border)] px-4 py-3 text-white transition hover:border-[var(--sky-blue)]">
                Data Notes
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Settings Payload</CardTitle>
              <CardDescription>Readable export of the current preferences for backup or sharing.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea value={settingsJson} readOnly className="min-h-[240px]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentPage>
  );
}
