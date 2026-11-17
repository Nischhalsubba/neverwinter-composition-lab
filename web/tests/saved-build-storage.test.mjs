import assert from 'node:assert/strict';
import test from 'node:test';
import { readSavedBuilds, upsertSavedBuild, parseSharedBuildPayload } from '../lib/team-build-storage.ts';

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

test('saved builds reject repeated team member IDs and occupied roster slots', () => {
  const duplicateId = { ...member, group: 'B', slot: 1 };
  const duplicateSlot = { ...member, id: 'member-2' };
  for (const roster of [[member, duplicateId], [member, duplicateSlot]]) {
    withStoredValue(JSON.stringify([{ ...valid, teamMembers: roster }]), () => {
      assert.deepEqual(readSavedBuilds(), []);
    });
  }
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

test('shared-build import rejects duplicate member IDs and roster positions', () => {
  const payload = {
    schema: 'neverwinter-composition-lab-build', version: 1,
    exportedAt: '2026-11-17T00:00:00Z',
    build: { name: 'Trial', mode: 'trial', trialPreset: 'standard', bossId: '', teamMembers: [member] },
  };
  assert.ok(parseSharedBuildPayload(JSON.stringify(payload)));
  for (const duplicate of [
    { ...member, group: 'B', slot: 1 },
    { ...member, id: 'member-2', group: 'A', slot: 1 },
  ]) {
    assert.equal(parseSharedBuildPayload(JSON.stringify({
      ...payload, build: { ...payload.build, teamMembers: [member, duplicate] },
    })), null);
  }
});

test('saved-build loading ignores duplicate IDs without overwriting stored JSON', () => {
  const duplicate = { ...valid, name: 'Stale duplicate', updatedAt: '2026-01-02' };
  const raw = JSON.stringify([valid, duplicate]);
  withStoredValue(raw, () => {
    assert.deepEqual(readSavedBuilds(), [valid]);
  });
});

test('saving does not overwrite malformed or partly invalid existing builds', () => {
  const previous = globalThis.window;
  let writes = 0;
  try {
    for (const raw of ['not json', JSON.stringify({ invalid: true }), JSON.stringify([valid, null]), JSON.stringify([valid, valid])]) {
      globalThis.window = { localStorage: {
        getItem: () => raw,
        setItem: () => { writes += 1; },
      } };
      assert.throws(() => upsertSavedBuild({ name: valid.name, mode: valid.mode, trialPreset: valid.trialPreset, bossId: valid.bossId, teamMembers: valid.teamMembers }));
      assert.equal(writes, 0);
    }
    globalThis.window = { localStorage: {
      getItem: () => JSON.stringify([valid]),
      setItem: () => { writes += 1; },
    } };
    assert.doesNotThrow(() => upsertSavedBuild({ ...valid, id: valid.id }));
    assert.equal(writes, 1);
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});

