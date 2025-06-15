import {tags} from "~/constants";

import useServices from "./useServices";

export default async function useCountries() {
  const {apiGetCountries} = useServices();

  const countries = useState("countries", () => []);

  const {data, pending} = await useSSRFetch({
    fn: apiGetCountries,
    key: tags.countriesList,
    options: {
      immediate: !countries.value?.length,
      lazy: true,
      server: false,
    },
  });

  watchEffect(() => {
    const countriesResponse = data.value?.data.data;
    if (countriesResponse && !countries.value.length) {
      countries.value = countriesResponse;
    }
  });


  return {
    countries,
    pending,
  };
}
