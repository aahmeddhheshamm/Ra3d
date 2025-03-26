import { useQuery,  keepPreviousData } from '@tanstack/vue-query'

export default function useFetch({queryFn, queryKey, enabled = true}) {
  return useQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    enabled,
    keepPreviousData: true, // ✅ Prevents reloading of the entire dataset during pagination
    placeholderData: keepPreviousData,
  });
}
