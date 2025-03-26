export default function useCookies(name) {
  const cookie = useCookie(name);

  const state = useState(name, () => cookie.value);

  watch(
    state,
    () => {
      cookie.value = state.value;
    },
    {deep: true}
  );

  return {state};
}
