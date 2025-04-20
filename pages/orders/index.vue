<script setup>
import useOrdersFields from "~/composables/orders/useOrdersFields.js";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});

const filters = ref({
  search: '',
})

const getFilters = (values) => {
  filters.value = values
}
const { fields, actions } = useOrdersFields()

</script>

<template>

  <div class="container my-[40px]">
    <UITitle title="My Orders" />
    <UIFormTable
        title="orders"
        :columns="fields"
        :actions
        list-url="orders/orders"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #filterOptions>
        <OrdersFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>
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