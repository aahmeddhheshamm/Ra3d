<script setup>
import Spinner from "~/components/UI/LoaderSpinner.vue";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});
import useCancelPayment from "~/composables/payment/useCancelPayment.js";

const {paymentCancel, pending} = await useCancelPayment();
</script>

<template>
  <div class="container my-[40px]">
    <span v-if="pending" class="flex justify-center items-center">
      <Spinner></Spinner>
    </span>
    <UIBox v-else>
      {{paymentCancel}}
    </UIBox>
  </div>
</template>

<style scoped>

</style>