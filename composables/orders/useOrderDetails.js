import {tags} from "~/constants";
import useServices from "../useServices";

export default async function useOrderDetails(orderId) {
    const {apiGetOrderDetails} = useServices();
    const orderDetails = useState("orderDetails", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetOrderDetails(orderId),
        key: tags.orderDetails,
        options: {
            immediate: !orderDetails.value?.length,
            lazy: true,
            watch: [orderId],
        },
    });

    watchEffect(() => {
        const orderResponse = data.value;
        if (orderResponse && !orderDetails.value?.length) {
            orderDetails.value = orderResponse;
        }
    });
    return {
        orderDetails,
        pending,
    };
}
