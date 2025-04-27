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
              class="text-[12px] font-semibold text-white leading-5 px-3 pt-2 pb-2 rounded-[4px] "
              :class="[data?.status == 'PENDING' ? 'bg-orange-400' : data?.status == 'COMPLETED' ? 'bg-primary-500' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>

    </UIFormTable>
  </div>
</template>

<style scoped>

</style>