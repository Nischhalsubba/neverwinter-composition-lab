import assert from 'node:assert/strict';
import test from 'node:test';
import { cacheSuccessfulAsyncValue } from '../lib/successful-async-cache.ts';

test('failed image loads are retried instead of cached indefinitely', async () => {
  const cache = new Map();
  let attempts = 0;
  const load = async () => (++attempts === 1 ? null : 'data:image/png;base64,ok');
  assert.equal(await cacheSuccessfulAsyncValue(cache, 'icon', load), null);
  assert.equal(await cacheSuccessfulAsyncValue(cache, 'icon', load), 'data:image/png;base64,ok');
  assert.equal(attempts, 2);
  assert.equal(await cacheSuccessfulAsyncValue(cache, 'icon', load), 'data:image/png;base64,ok');
  assert.equal(attempts, 2);
});

test('concurrent loads for the same image share one request', async () => {
  const cache = new Map();
  let calls = 0;
  const load = async () => { calls += 1; return 'image'; };
  assert.deepEqual(await Promise.all([
    cacheSuccessfulAsyncValue(cache, 'icon', load),
    cacheSuccessfulAsyncValue(cache, 'icon', load),
  ]), ['image', 'image']);
  assert.equal(calls, 1);
});

test('rejected loads are evicted so a retry can succeed', async () => {
  const cache = new Map();
  await assert.rejects(cacheSuccessfulAsyncValue(cache, 'icon', async () => { throw Error('offline'); }));
  assert.equal(cache.size, 0);
  assert.equal(await cacheSuccessfulAsyncValue(cache, 'icon', async () => 'restored'), 'restored');
});
