import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_APP_SETTINGS, parseAppSettingsPayload, readAppSettings } from '../lib/app-settings.ts';

test('settings import keeps only allowed field types and values', () => {
  const parsed = parseAppSettingsPayload(JSON.stringify({
    interfaceDensity: 'wide',
    defaultTeamMode: 'dungeon',
    defaultTrialPreset: 'unknown',
    rememberLastBoss: 'false',
    reducedMotion: true,
    defaultCritAssumption: -5,
    defaultCaAssumption: '1.2',
    unrelatedField: 'should not be persisted',
  }));
  assert.deepEqual(parsed, {
    ...DEFAULT_APP_SETTINGS,
    defaultTeamMode: 'dungeon',
    reducedMotion: true,
  });
});

test('settings import rejects non-object payloads', () => {
  for (const raw of ['null', '[]', '"settings"', '123', '{invalid']) {
    assert.equal(parseAppSettingsPayload(raw), null);
  }
});

test('settings import retains valid customizations', () => {
  assert.deepEqual(parseAppSettingsPayload(JSON.stringify({
    interfaceDensity: 'compact',
    defaultTrialPreset: 'msod',
    exportIncludeImages: false,
    defaultCritAssumption: 0.75,
    defaultCaAssumption: 1.5,
  })), {
    ...DEFAULT_APP_SETTINGS,
    interfaceDensity: 'compact',
    defaultTrialPreset: 'msod',
    exportIncludeImages: false,
    defaultCritAssumption: 0.75,
    defaultCaAssumption: 1.5,
  });
});

test('stored preferences fall back safely when malformed', () => {
  const previous = globalThis.window;
  try {
    globalThis.window = { localStorage: { getItem: () => JSON.stringify({
      interfaceDensity: ['compact'],
      defaultTeamMode: 'dungeon',
      rememberLastBuild: null,
      defaultCaAssumption: -1,
    }) } };
    assert.deepEqual(readAppSettings(), {
      ...DEFAULT_APP_SETTINGS,
      defaultTeamMode: 'dungeon',
    });
    globalThis.window = { localStorage: { getItem: () => '[]' } };
    assert.deepEqual(readAppSettings(), DEFAULT_APP_SETTINGS);
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});
