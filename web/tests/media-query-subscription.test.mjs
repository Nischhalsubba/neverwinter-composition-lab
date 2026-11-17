import assert from 'node:assert/strict';
import test from 'node:test';
import { subscribeMediaQueryChanges } from '../lib/media-query-subscription.ts';

test('modern media query listeners subscribe and clean up', () => {
  const calls = [];
  const query = {
    addEventListener: (event, callback) => calls.push(['add', event, callback]),
    removeEventListener: (event, callback) => calls.push(['remove', event, callback]),
  };
  const listener = () => {};
  subscribeMediaQueryChanges(query, listener)();
  assert.deepEqual(calls, [['add', 'change', listener], ['remove', 'change', listener]]);
});

test('legacy media query listeners subscribe and clean up', () => {
  const calls = [];
  const query = {
    addListener: (callback) => calls.push(['add', callback]),
    removeListener: (callback) => calls.push(['remove', callback]),
  };
  const listener = () => {};
  subscribeMediaQueryChanges(query, listener)();
  assert.deepEqual(calls, [['add', listener], ['remove', listener]]);
});

test('unsupported listeners remain safe no-ops', () => {
  assert.doesNotThrow(() => subscribeMediaQueryChanges({}, () => {})());
});
