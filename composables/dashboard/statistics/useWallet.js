import {tags} from "~/constants";
import useServices from "@/composables/useServices";

export default async function useAccountCountries() {
    const {apiGetStatisticsWallet} = useServices();
    const walletStatistics = useState("walletStatistics", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetStatisticsWallet(),
        key: tags.walletStatistics,
        options: {
            immediate: !walletStatistics.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const walletStatisticsResponse = data.value;
        if (walletStatisticsResponse && !walletStatistics.value?.length) {
            walletStatistics.value = walletStatisticsResponse;
        }
    });
    return {
        walletStatistics,
        pending,
    };
}
