<script setup>
import Spinner from "~/components/UI/LoaderSpinner.vue";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});
import useSuccessPayment from "~/composables/payment/useSuccessPayment.js";

const {paymentSuccess, pending} = await useSuccessPayment();
</script>

<template>
  <div class="container my-[40px]">
    <span v-if="pending" class="flex justify-center items-center">
      <Spinner></Spinner>
    </span>
    <UIBox v-else>
      {{paymentSuccess}}
    </UIBox>
  </div>
</template>

<style scoped>

</style>