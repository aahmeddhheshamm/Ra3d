<script setup>
import Spinner from "~/components/UI/LoaderSpinner.vue";

definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useOrderDetails from "~/composables/orders/useOrderDetails.js";
const route = useRoute()

const {orderDetails, pending} = await useOrderDetails(route.params.id);

</script>

<template>
  <UIPageHeader
      breadcrumb-title="All Orders"
      title="Order Details"
      back-route-name="/dashboard/sales/orders"
  >

  </UIPageHeader>

  <div class="">
    <span v-if="pending" class="flex justify-center items-center">
      <Spinner></Spinner>
    </span>
    <UIBox v-else class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <div v-if="orderDetails?.hasOwnProperty('host')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Host: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.host }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('username')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Username: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.username }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('password')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Password: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.password }} </p>
      </div>
      <div v-if="orderDetails?.price" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Price: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.price }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('cpanel_type')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Cpanel Type: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.cpanel_type }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('shell_type')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Shell Type: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.shell_type }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('shell_url')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Shell URL: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.shell_url }} </p>
      </div>
      <div v-if="orderDetails?.status" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Status: </p>
        <span class="text-[12px] md:text-[18px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px]"
            :class="[orderDetails?.status == 'Unsold' ? 'bg-blue-400' : orderDetails?.status == 'unsold' ? 'bg-blue-400' : orderDetails?.status == 'Sold' ? 'bg-error-200' : 'bg-error-200']"
        >{{ orderDetails?.status }}
          </span>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('ssl')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">SSL: </p>
        <div v-if="orderDetails.ssl == true">
          <IconsTrueIcon class="w-[22px] h-[22px]"/>
        </div>
        <div v-else>
          <IconsFalseIcon class="w-[22px] h-[22px]"/>
        </div>
<!--        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.ssl }} </p>-->
      </div>
      <div v-if="orderDetails?.hasOwnProperty('tld')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">TLD: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.tld }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('is_available')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Is Available: </p>
        <div v-if="orderDetails.is_available == true">
          <IconsTrueIcon class="w-[22px] h-[22px]"/>
        </div>
        <div v-else>
          <IconsFalseIcon class="w-[22px] h-[22px]"/>
        </div>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('is_deleted')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Is Deleted: </p>
        <div v-if="orderDetails.is_deleted == true">
          <IconsTrueIcon class="w-[22px] h-[22px]"/>
        </div>
        <div v-else>
          <IconsFalseIcon class="w-[22px] h-[22px]"/>
        </div>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('category')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Category: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.category }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('country')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Country: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.country }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('location')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Location: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.location }} </p>
      </div>
<!--      <div v-if="orderDetails?.hasOwnProperty('details')" class="flex items-center gap-2">-->
<!--        <p class="font-bold text-[12px] md:text-[18px]">Details: </p>-->
<!--        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.details }} </p>-->
<!--      </div>-->
      <div v-if="orderDetails?.hasOwnProperty('domain')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Domain: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.domain }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('proof')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Proof: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.proof }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('type')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Type: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.type }} </p>
      </div>
      <div v-if="orderDetails?.hasOwnProperty('notes')" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Notes: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.notes }} </p>
      </div>

      <div v-if="orderDetails?.details?.Hosting" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">Hosting: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.details.Hosting }} </p>
      </div>
      <div v-if="orderDetails?.details?.IP" class="flex items-center gap-2">
        <p class="font-bold text-[12px] md:text-[18px]">IP: </p>
        <p class="font-medium text-[12px] md:text-[18px]">{{ orderDetails.details.IP }} </p>
      </div>

    </UIBox>
  </div>

</template>

<style scoped>

</style>