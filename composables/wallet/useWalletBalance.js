import {tags} from "~/constants";

import useServices from "@/composables/useServices";

export default async function useWalletBalance() {
  const {apiGetWalletBalance} = useServices();

  const walletBalance = useState("walletBalance", () => []);

  const {data, pending} = await useSSRFetch({
    fn: apiGetWalletBalance,
    key: tags.walletBalance,
    options: {
      immediate: !walletBalance.value?.length,
      lazy: true,
      server: false,
    },
  });

  watchEffect(() => {
    const walletBalanceResponse = data.value;
    if (walletBalanceResponse && !walletBalance.value.length) {
      walletBalance.value = walletBalanceResponse;
    }
  });

  return {
    walletBalance,
    pending,
  };
}
