<script setup>
import Spinner from "~/components/UI/LoaderSpinner.vue";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});
import useOrderDetails from "~/composables/orders/useOrderDetails.js";
const route = useRoute()

const {orderDetails, pending} = await useOrderDetails(route.params.id);

</script>

<template>
  <div class="container my-[40px]">
    <span v-if="pending" class="flex justify-center items-center">
      <Spinner></Spinner>
    </span>
    <UIBox v-else class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <div v-if="orderDetails?.host" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Host: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.host }} </p>
      </div>
      <div v-if="orderDetails?.username" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Username: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.username }} </p>
      </div>
      <div v-if="orderDetails?.password" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Password: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.password }} </p>
      </div>
      <div v-if="orderDetails?.price" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Price: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.price }} </p>
      </div>
      <div v-if="orderDetails?.cpanel_type" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Cpanel Type: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.cpanel_type }} </p>
      </div>
      <div v-if="orderDetails?.status" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Status: </p>
        <span
            class="text-[18px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px]"
            :class="[orderDetails?.status == 'Unsold' ? 'bg-blue-400' : orderDetails?.status == 'Sold' ? 'bg-error-200' : 'bg-error-200']"
        >{{ orderDetails?.status }}
          </span>
      </div>
      <div v-if="orderDetails?.details?.SSL" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">SSL: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.details.SSL }} </p>
      </div>
      <div v-if="orderDetails?.details?.TLD" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">TLD: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.details.TLD }} </p>
      </div>
      <div v-if="orderDetails?.details?.Hosting" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Hosting: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.details.Hosting }} </p>
      </div>
      <div v-if="orderDetails?.details?.Location" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">Location: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.details.Location }} </p>
      </div>
      <div v-if="orderDetails?.details?.IP" class="flex items-center gap-2">
        <p class="font-bold text-[18px]">IP: </p>
        <p class="font-medium text-[18px]">{{ orderDetails.details.IP }} </p>
      </div>

    </UIBox>
  </div>

</template>

<style scoped>

</style>