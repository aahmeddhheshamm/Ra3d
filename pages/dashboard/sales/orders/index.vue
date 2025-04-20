<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useOrdersFields from "~/composables/dashboard/orders/useOrdersFields.js";

const filters = ref({
  search: '',
})

const getFilters = (values) => {
  filters.value = values
}

const { fields, actions } = useOrdersFields()
</script>

<template>

  <div class="">
    <UITitle title="My Orders" />
    <UIFormTable
        title="orders"
        :columns="fields"
        :actions
        list-url="orders/orders"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #filterOptions>
        <OrdersFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>

      <template #domain="data">
        <span class="text-neural-300 font-medium text-[15px]">{{data.account?.domain}}</span>
      </template>

      <template #status="data">
          <span
              class="text-[12px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px] "
              :class="[data?.status == 'Unsold' ? 'bg-blue-400' : data?.status == 'Sold' ? 'bg-green-700' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>
    </UIFormTable>

  </div>

</template>

<style scoped>

</style>