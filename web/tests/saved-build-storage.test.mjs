import assert from 'node:assert/strict';
import test from 'node:test';
import { readSavedBuilds } from '../lib/team-build-storage.ts';

function withStoredValue(value, callback) {
  const previous = globalThis.window;
  globalThis.window = { localStorage: { getItem: () => value } };
  try { callback(); } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
}

const member = {
  id: 'member-1', group: 'A', slot: 1, label: 'Test',
  class_id: '', paragon: '', race: '', role: 'dps',
  encounter_ids: [], daily_ids: [], feature_ids: [], artifact_id: '',
  companion_id: '', enhancement_id: '', companion_bonus_id: '',
  mount_id: '', mount_combat_power_id: '', mount_equip_power_id: '',
  insignia_bonus_ids: [], notes: '', is_carry: false,
  personal_overrides: {},
};
const valid = {
  id: 'saved-1', name: 'My trial', mode: 'trial', trialPreset: 'standard',
  bossId: '', teamMembers: [member], createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
};

test('saved builds ignore null and malformed entries instead of crashing consumers', () => {
  withStoredValue(JSON.stringify([null, {}, valid, { id: 'broken' }]), () => {
    assert.deepEqual(readSavedBuilds(), [valid]);
  });
});

test('saved builds with invalid nested members are ignored', () => {
  withStoredValue(JSON.stringify([{ ...valid, teamMembers: [null] }]), () => {
    assert.deepEqual(readSavedBuilds(), []);
  });
});

test('malformed storage and unavailable storage return empty results', () => {
  withStoredValue('not json', () => assert.deepEqual(readSavedBuilds(), []));
  const previous = globalThis.window;
  globalThis.window = { localStorage: { getItem: () => { throw new Error('blocked'); } } };
  try { assert.deepEqual(readSavedBuilds(), []); } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});
