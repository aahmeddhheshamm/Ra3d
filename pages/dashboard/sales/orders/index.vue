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
        <span v-if="data.account" class="text-neural-300 font-medium text-[15px]">{{data.account?.domain}}</span>
        <span v-if="data.shell" class="text-neural-300 font-medium text-[15px]">{{data.shell?.shell_url}}</span>
        <span v-if="data.cpanel" class="text-neural-300 font-medium text-[15px]">{{data.cpanel?.host}}</span>
        <span v-if="data.rdp" class="text-neural-300 font-medium text-[15px]">{{data.rdp?.ip}}</span>
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