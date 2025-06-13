import {tags} from "~/constants";

import useServices from "@/composables/useServices";

export default async function useNotifications() {
  const {apiGetNotifications} = useServices();

  const notifications = useState("notifications", () => []);

  const {data, pending} = await useSSRFetch({
    fn: apiGetNotifications,
    key: tags.notificationsList,
    options: {
      immediate: !notifications.value?.length,
      lazy: true,
      server: false,
    },
  });

  watchEffect(() => {
    const notificationsResponse = data.value;
    if (notificationsResponse && !notifications.value.length) {
      notifications.value = notificationsResponse;
    }
  });

  return {
    notifications,
    pending,
  };
}
