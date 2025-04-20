<script setup>
definePageMeta({
  layout: "customer",
  middleware:'auth'
});
import useTicketDetails from "~/composables/tickets/useTicketDetails.js";
const route = useRoute()

const {ticketDetails, pending} = await useTicketDetails(route.params.id);

</script>

<template>
  <div class="container my-[40px]">
    {{ticketDetails}}
  </div>
</template>

<style scoped>

</style>