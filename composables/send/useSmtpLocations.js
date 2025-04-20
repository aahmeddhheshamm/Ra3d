import {tags} from "~/constants";
import useServices from "../useServices";

export default async function useAccountCountries() {
    const {apiGetSmtpLocations} = useServices();
    const smtpLocations = useState("smtpLocations", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetSmtpLocations(),
        key: tags.smtpLocations,
        options: {
            immediate: !smtpLocations.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const smtpLocationsResponse = data.value;
        if (smtpLocationsResponse && !smtpLocations.value?.length) {
            smtpLocations.value = smtpLocationsResponse;
        }
    });
    return {
        smtpLocations,
        pending,
    };
}
