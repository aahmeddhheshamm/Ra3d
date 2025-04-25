import {tags} from "~/constants";

import useServices from "@/composables/useServices";

export default async function useSuccessPayment() {
  const {apiGetVerifyPaymentSuccess} = useServices();

  const paymentSuccess = useState("paymentSuccess", () => []);

  const {data, pending} = await useSSRFetch({
    fn: apiGetVerifyPaymentSuccess,
    key: tags.paymentSuccess,
    options: {
      immediate: !paymentSuccess.value?.length,
      lazy: true,
      server: false,
    },
  });

  watchEffect(() => {
    const paymentSuccessResponse = data.value;
    if (paymentSuccessResponse && !paymentSuccess.value.length) {
      paymentSuccess.value = paymentSuccessResponse;
    }
  });

  return {
    paymentSuccess,
    pending,
  };
}
