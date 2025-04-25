import {tags} from "~/constants";

import useServices from "@/composables/useServices";

export default async function useCancelPayment() {
  const {apiGetVerifyPaymentCancel} = useServices();

  const paymentCancel = useState("paymentCancel", () => []);

  const {data, pending} = await useSSRFetch({
    fn: apiGetVerifyPaymentCancel,
    key: tags.paymentCancel,
    options: {
      immediate: !paymentCancel.value?.length,
      lazy: true,
      server: false,
    },
  });

  watchEffect(() => {
    const paymentCancelResponse = data.value;
    if (paymentCancelResponse && !paymentCancel.value.length) {
      paymentCancel.value = paymentCancelResponse;
    }
  });

  return {
    paymentCancel,
    pending,
  };
}
