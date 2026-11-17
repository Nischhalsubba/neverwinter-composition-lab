/** Reuse successful in-flight loads without pinning failures in the cache. */
export async function cacheSuccessfulAsyncValue<Key, Value>(
  cache: Map<Key, Promise<Value | null>>,
  key: Key,
  loader: () => Promise<Value | null>,
): Promise<Value | null> {
  const existing = cache.get(key);
  if (existing) return existing;

  const pending = Promise.resolve().then(loader);
  cache.set(key, pending);
  try {
    const result = await pending;
    if (result === null && cache.get(key) === pending) cache.delete(key);
    return result;
  } catch (error) {
    if (cache.get(key) === pending) cache.delete(key);
    throw error;
  }
}
