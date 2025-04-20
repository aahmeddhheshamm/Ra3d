import {tags} from "~/constants";
import useServices from "@/composables/useServices.js";

export default async function useSellerRequestDetails() {
    const {apiGetSellerRequestDetails} = useServices();
    const sellerRequestDetails = useState("sellerRequestDetails", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetSellerRequestDetails(),
        key: tags.sellerRequest,
        options: {
            immediate: !sellerRequestDetails.value?.length,
            lazy: true,
        },
    });

    watchEffect(() => {
        const sellerRequestResponse = data.value;
        if (sellerRequestResponse && !sellerRequestDetails.value?.length) {
            sellerRequestDetails.value = sellerRequestResponse;
        }
    });
    return {
        sellerRequestDetails,
        pending,
    };
}
