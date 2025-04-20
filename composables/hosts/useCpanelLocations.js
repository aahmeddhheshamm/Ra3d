import {tags} from "~/constants";
import useServices from "../useServices";

export default async function useAccountCountries() {
    const {apiGetCpanelLocations} = useServices();
    const cpanelLocations = useState("cpanelLocations", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetCpanelLocations(),
        key: tags.cpanelLocations,
        options: {
            immediate: !cpanelLocations.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const cpanelLocationsResponse = data.value;
        if (cpanelLocationsResponse && !cpanelLocations.value?.length) {
            cpanelLocations.value = cpanelLocationsResponse;
        }
    });
    return {
        cpanelLocations,
        pending,
    };
}
