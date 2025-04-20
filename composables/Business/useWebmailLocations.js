import {tags} from "~/constants";
import useServices from "../useServices";

export default async function useAccountCountries() {
    const {apiGetWebmailLocations} = useServices();
    const webmailLocations = useState("webmailLocations", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetWebmailLocations(),
        key: tags.webmailLocations,
        options: {
            immediate: !webmailLocations.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const webmailLocationsResponse = data.value;
        if (webmailLocationsResponse && !webmailLocations.value?.length) {
            webmailLocations.value = webmailLocationsResponse;
        }
    });
    return {
        webmailLocations,
        pending,
    };
}
