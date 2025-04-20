import {tags} from "~/constants";
import useServices from "@/composables/useServices";

export default async function useAccountCountries() {
    const {apiGetStatisticsTickets} = useServices();
    const ticketsStatistics = useState("ticketsStatistics", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetStatisticsTickets(),
        key: tags.ticketsStatistics,
        options: {
            immediate: !ticketsStatistics.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const ticketsStatisticsResponse = data.value;
        if (ticketsStatisticsResponse && !ticketsStatistics.value?.length) {
            ticketsStatistics.value = ticketsStatisticsResponse;
        }
    });
    return {
        ticketsStatistics,
        pending,
    };
}
