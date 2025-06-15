<script setup>
import useOrdersFields from "~/composables/orders/useOrdersFields.js";
import useSellerRequest from "~/composables/useSellerRequest.js";
import Spinner from "~/components/UI/LoaderSpinner.vue";
definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const visibleJoinSeller = ref(false);
const {sellerRequestDetails, pending} = await useSellerRequest();
const { fields, actions } = useOrdersFields()

</script>

<template>
  <Dialog
      v-model:visible="visibleJoinSeller"
      :draggable="false"
      header="Join as seller"
      :closable="true"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :modal="true"
  >
    <ModelsJoinAsSellerModel  />
  </Dialog>

  <div class="container my-[40px]">
    <div class="flex items-center justify-between">
      <UITitle title="Request" />

      <UIButtonsPrimaryButton
          v-if="sellerRequestDetails.status == 'Not Found'"
          type="button"
          :isAddBtn="true"
          submitTitle="Join as seller"
          :class="[{ 'btn-disabled': false }, 'mb-6 w-fit !py-[12px] !text-[16px] !font-medium rounded-[8px]']"
          @click="visibleJoinSeller = true"
      />
    </div>
    <UIBox>
      <div v-if="pending">
        <span class="">
          <Spinner></Spinner>
        </span>
      </div>
      <div v-else-if="!sellerRequestDetails.status == 'Not Found'">
        <p class="font-bold text-[18px] mb-4">Your Request Status: </p>
        <p class="w-fit text-[12px] font-semibold text-white leading-5 px-3 pt-2 pb-2 rounded-[4px] " :class="[sellerRequestDetails?.status == 'PENDING' ? 'bg-orange-400' : sellerRequestDetails?.status == 'APPROVED' ? 'bg-primary-500' : 'bg-error-200']">{{sellerRequestDetails.status}}</p>
      </div>
      <p v-else class="font-bold text-[18px] mb-4">There is no any request here.</p>
    </UIBox>

  </div>
</template>

<style scoped>

</style>