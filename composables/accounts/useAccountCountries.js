import {tags} from "~/constants";
import useServices from "../useServices";

export default async function useAccountCountries() {
    const {apiGetAccountCountries} = useServices();
    const accountCountries = useState("accountCountries", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetAccountCountries(),
        key: tags.accountCountries,
        options: {
            immediate: !accountCountries.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const countriesResponse = data.value;
        if (countriesResponse && !accountCountries.value?.length) {
            accountCountries.value = countriesResponse;
        }
    });
    return {
        accountCountries,
        pending,
    };
}
