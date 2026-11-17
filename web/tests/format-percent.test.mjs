import assert from 'node:assert/strict';
import test from 'node:test';
import { formatPercent } from '../lib/utils.ts';

test('formatPercent supports fractional and already-scaled values', () => {
  assert.equal(formatPercent(0.125), '12.5%');
  assert.equal(formatPercent(35), '35%');
  assert.equal(formatPercent(0), '0%');
  assert.equal(formatPercent(-0.25), '-25%');
  assert.equal(formatPercent(-5), '-5%');
  assert.equal(formatPercent(-1), '-100%');
});

test('formatPercent renders unavailable and nonfinite values as pending', () => {
  for (const value of [null, undefined, NaN, Infinity, -Infinity]) {
    assert.equal(formatPercent(value), 'Pending');
  }
});
