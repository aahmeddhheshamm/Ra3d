<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useOrderDetails from "~/composables/orders/useOrderDetails.js";
const route = useRoute()

const {orderDetails, pending} = await useOrderDetails(route.params.id);

</script>

<template>
  <div class="container my-[40px]">
    {{orderDetails}}
  </div>
</template>

<style scoped>

</style>