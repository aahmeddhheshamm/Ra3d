export function useSSRFetch({key, fn, options = {}}) {
  return useAsyncData(key, fn, {
    ...options,
  });
}
