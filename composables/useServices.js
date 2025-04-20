export default function useServices() {
  const {$intercept} = useNuxtApp();

    const apiGetTicketDetails = (ticketId) => $intercept(`tickets/tickets/${ticketId}`);

    const apiGetOrderDetails = (orderId) => $intercept(`orders/orders/${orderId}`);

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

  return {apiGetTicketDetails, apiGetOrderDetails, apiGetAccountCountries, apiGetRdpLocations, apiGetSmtpLocations, apiGetWebmailLocations, apiGetCpanelLocations, apiGetStatisticsOrders, apiGetStatisticsStats, apiGetStatisticsTickets, apiGetStatisticsWallet};
}
