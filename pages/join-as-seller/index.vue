<script setup>
import useOrdersFields from "~/composables/orders/useOrdersFields.js";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const visibleJoinSeller = ref(false);
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
          type="button"
          :isAddBtn="true"
          submitTitle="Join as seller"
          :class="[{ 'btn-disabled': false }, 'mb-6 w-fit !py-[12px] !text-[16px] !font-medium rounded-[8px]']"
          @click="visibleJoinSeller = true"
      />
    </div>
    <UIFormTable
        title="requests"
        :columns="fields"
        :actions
        list-url="sellers/seller-requests/status/"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >

      <template #id="data">
        <span>#{{data.id}}</span>
      </template>

      <template #status="data">
          <span
              class="text-[14px] font-medium text-merchant-tableContent leading-5 px-3 pt-2 pb-1 rounded-[4px]"
              :class="[data?.status === 'pending' ? 'bg-secondary-950' : data?.status === 'requested' ? 'bg-secondary-450' : data?.status === 'preparation' ? 'bg-secondary-550' : data?.status === 'shipping' ? 'bg-secondary-650' : data?.status === 'delivered' ? 'bg-secondary-950' : data?.status === 'canceled' ? 'bg-error-600' : data?.status === 'refund' ? 'bg-gray-150' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>

    </UIFormTable>
  </div>
</template>

<style scoped>

</style>