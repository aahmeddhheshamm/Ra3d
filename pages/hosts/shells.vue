<script setup>
definePageMeta({
  layout: "customer",
  middleware:'auth'
});
import useShellsFields from "~/composables/hosts/useShellsFields.js";
const {$intercept} = useNuxtApp()

const apiCreateOrder = (data) => $intercept(`orders/orders/`, {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate: mutate, isPending: pendingOrder} = useMutate({
  mutationFn: apiCreateOrder,
});

const filters = ref({
  search: '',
  cpanel_type: '',
  status: '',
  tld: '',
  price__gte: '',
  price__lte: ''
})

function createOrder(data){
  mutate({shell: data.id, cryptocurrency: "BTC"},{
    onSuccess(res){
      window.open(res?.payment_url, '_self')
    },
  });
}
const getFilters = (values) => {
  filters.value = values
}

const { fields } = useShellsFields()

</script>

<template>
  <div class="container my-[40px]">

  <UITitle title="Shells" />


    <UIFormTable
        title="shells"
        :columns="fields"
        list-url="shells/shell"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #filterOptions>
        <HostsShellsFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>

      <template #ssl="data">
          <span
              class="text-[14px] font-medium"
              :class="[data?.ssl === true ? 'text-green-700' : 'text-neural-300']"
          >{{ data?.ssl === true ? 'Https' : 'Http' }}
          </span>
      </template>

      <template #user="data">
        <span class="text-neural-300 font-medium text-[15px]">{{data.user?.username}}</span>
      </template>

      <template #status="data">
          <span
              class="text-[12px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px]"
              :class="[data?.status == 'Unsold' ? 'bg-blue-400' : data?.status == 'Sold' ? 'bg-error-200' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>
      <template #buy="data">
        <button
            @click="createOrder(data)"
            class="text-[14px] font-bold underline text-green-700 leading-5 px-3 pt-2 pb-2 rounded-[4px]"
        >Buy
        </button>
      </template>
    </UIFormTable>

  </div>

</template>

<style scoped>

</style>