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
    <UIBox v-else class="flex items-center gap-4 justify-center">
      <div class="flex flex-col items-center gap-2">
        <div class="w-[150px] h-[150px]">
          <img class="lds-roller w-full h-full" src="~/assets/cancel.gif" alt="Loading..." />
        </div>
        <span class="text-black font-bold text-2xl">Payment was cancelled</span>
      </div>
    </UIBox>
  </div>
</template>

<style scoped>

</style>