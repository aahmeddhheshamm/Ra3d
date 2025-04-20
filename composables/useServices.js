export default function useServices() {
  const {$intercept} = useNuxtApp();

  const apiGetSellerRequestDetails = () => $intercept('sellers/seller-requests/status/');
    const apiGetTicketDetails = (ticketId) => $intercept(`tickets/tickets/${ticketId}`);

    const apiGetOrderDetails = (orderId) => $intercept(`orders/orders/${orderId}`);

    const apiGetBuyerRequestDetails = (requestId) => $intercept(`sellers/seller-requests/${requestId}`);
    const apiGetAccountCountries = () => $intercept('accounts/countries');
    const apiGetRdpLocations = () => $intercept('rdp/locations');
    const apiGetSmtpLocations = () => $intercept('smtp/locations');
    const apiGetWebmailLocations = () => $intercept('webmail/locations');
    const apiGetCpanelLocations = () => $intercept('cpanel/locations');

    //statistics
    const apiGetStatisticsOrders = () => $intercept('dashboard/statistics/orders');
    const apiGetStatisticsStats = () => $intercept('dashboard/statistics/stats');
    const apiGetStatisticsTickets = () => $intercept('dashboard/statistics/tickets');
    const apiGetStatisticsWallet = () => $intercept('dashboard/statistics/wallet');

  return {apiGetSellerRequestDetails, apiGetTicketDetails, apiGetBuyerRequestDetails, apiGetOrderDetails, apiGetAccountCountries, apiGetRdpLocations, apiGetSmtpLocations, apiGetWebmailLocations, apiGetCpanelLocations, apiGetStatisticsOrders, apiGetStatisticsStats, apiGetStatisticsTickets, apiGetStatisticsWallet};
}
