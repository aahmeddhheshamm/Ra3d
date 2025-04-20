import {tags} from "~/constants";
import useServices from "../useServices";

export default async function useAccountCountries() {
    const {apiGetRdpLocations} = useServices();
    const rdpLocations = useState("rdpLocations", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetRdpLocations(),
        key: tags.rdpLocations,
        options: {
            immediate: !rdpLocations.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const rdpLocationsResponse = data.value;
        if (rdpLocationsResponse && !rdpLocations.value?.length) {
            rdpLocations.value = rdpLocationsResponse;
        }
    });
    return {
        rdpLocations,
        pending,
    };
}
