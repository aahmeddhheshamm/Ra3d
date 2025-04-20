import {tags} from "~/constants";
import useServices from "@/composables/useServices";

export default async function useAccountCountries() {
    const {apiGetStatisticsOrders} = useServices();
    const ordersStatistics = useState("ordersStatistics", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetStatisticsOrders(),
        key: tags.ordersStatistics,
        options: {
            immediate: !ordersStatistics.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const ordersStatisticsResponse = data.value;
        if (ordersStatisticsResponse && !ordersStatistics.value?.length) {
            ordersStatistics.value = ordersStatisticsResponse;
        }
    });
    return {
        ordersStatistics,
        pending,
    };
}
