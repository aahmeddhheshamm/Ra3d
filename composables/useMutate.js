

export default function useMutate({mutationFn, mutationKey, queryKey}) {
  // Access the client
  const queryClient = useQueryClient();

  // mutation function
  const mutation = useMutation({
    mutationKey,
    mutationFn,
    onSuccess() {
      if (queryKey) {
        queryClient.invalidateQueries({
          queryKey: queryKey,
        });
      }
    },
  });

  return {...mutation, queryClient};
}
