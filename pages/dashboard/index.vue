<script setup>
import Spinner from "~/components/UI/LoaderSpinner.vue";

definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useOrders from "~/composables/dashboard/statistics/useOrders.js";
import useStats from "~/composables/dashboard/statistics/useStats.js";
import useTickets from "~/composables/dashboard/statistics/useTickets.js";
import useWallet from "~/composables/dashboard/statistics/useWallet.js";
const {ordersStatistics, pending: ordersStatisticsPending} = await useOrders();
const {statsStatistics, pending: statsStatisticsPending} = await useStats();
const {ticketsStatistics, pending: ticketsStatisticsPending} = await useTickets();
const {walletStatistics, pending: walletStatisticsPending} = await useWallet();

</script>

<template>
  <div v-if="ordersStatisticsPending || statsStatisticsPending || ticketsStatisticsPending || walletStatisticsPending ">
          <span class="flex justify-center items-center">
                <Spinner></Spinner>
              </span>
  </div>
  <div v-else class="flex flex-col gap-8">
     <div class="flex items-center gap-8 flex-wrap">
    <DashboardStatisticsCard
        title="Orders"
        :item="ordersStatistics.count"
    />
    <DashboardStatisticsCard
        title="Tickets"
        :item="ticketsStatistics.count"
    />
    <DashboardStatisticsCard
        title="Wallet"
        :item="walletStatistics.balance"
    />
  </div>

      <div class="w-full mt-8">
        <DashboardStatisticsBarChart
            :xData="Object.keys(statsStatistics)"
            :yData="Object.values(statsStatistics)"
        ></DashboardStatisticsBarChart>
      </div>

  </div>
<!--  </div>-->
</template>

<style scoped>

</style>