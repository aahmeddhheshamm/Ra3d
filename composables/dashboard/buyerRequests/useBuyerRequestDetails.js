import {tags} from "~/constants";
import useServices from "@/composables/useServices";

export default async function useBuyerRequestDetails(requestId) {
    const {apiGetBuyerRequestDetails} = useServices();
    const buyerRequestDetails = useState("buyerRequestDetails", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetBuyerRequestDetails(requestId),
        key: tags.buyerRequest,
        options: {
            immediate: !buyerRequestDetails.value?.length,
            lazy: true,
            watch: [requestId],
        },
    });

    watchEffect(() => {
        const buyerRequestResponse = data.value;
        if (buyerRequestResponse && !buyerRequestDetails.value?.length) {
            buyerRequestDetails.value = buyerRequestResponse;
        }
    });
    return {
        buyerRequestDetails,
        pending,
    };
}
