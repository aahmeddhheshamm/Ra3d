import {tags} from "~/constants";
import useServices from "@/composables/useServices";

export default async function useAccountCountries() {
    const {apiGetStatisticsStats} = useServices();
    const statsStatistics = useState("statsStatistics", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetStatisticsStats(),
        key: tags.statsStatistics,
        options: {
            immediate: !statsStatistics.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const statsStatisticsResponse = data.value;
        if (statsStatisticsResponse && !statsStatistics.value?.length) {
            statsStatistics.value = statsStatisticsResponse;
        }
    });
    return {
        statsStatistics,
        pending,
    };
}
