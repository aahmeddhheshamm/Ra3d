import {tags} from "~/constants";
import useServices from "../useServices";
import useAuthLocation from "~/composables/useAuth.js";

export default async function useTicketDetails(ticketId) {
    const {apiGetTicketDetails} = useServices();
    const ticketDetails = useState("ticketDetails", () => []);

    const {data, pending} = await useSSRFetch({
        fn: () => apiGetTicketDetails(ticketId),
        key: tags.ticketDetails,
        options: {
            immediate: !ticketDetails.value?.length,
            lazy: true,
            watch: [ticketId],
        },
    });

    watchEffect(() => {
        const ticketResponse = data.value;
        if (ticketResponse && !ticketDetails.value?.length) {
            ticketDetails.value = ticketResponse;
        }
    });
    return {
        ticketDetails,
        pending,
    };
}
