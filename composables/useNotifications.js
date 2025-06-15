import { tags } from "~/constants";
import useServices from "@/composables/useServices";

export default async function useNotifications() {
  const { apiGetNotifications } = useServices();
  const notifications = useState("notifications", () => null);
  const page = useState("notificationsPage", () => 1);
  const perPage = useState("notificationsPerPage", () => 10);

  const { data, pending, refresh } = await useSSRFetch({
    fn: () => apiGetNotifications({
      page: page.value,
      per_page: perPage.value
    }),
    key: `${tags.notificationsList}-${page.value}-${perPage.value}`,
    options: {
      immediate: true,
      lazy: false,
      server: false,
    },
  });

  watchEffect(() => {
    if (data.value) {
      notifications.value = data.value;
    }
  });

  return {
    notifications,
    pending,
    refresh,
    page,
    perPage
  };
}