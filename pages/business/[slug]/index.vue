<script setup>
import useBusinessFields from "~/composables/Business/useBusinessFields.js";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const route = useRoute()

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
  price__gte: '',
  price__lte: ''
})

const getFilters = (values) => {
  filters.value = values
}

function createOrder(data){
  mutate({webmail: data.id, cryptocurrency: "BTC"},{
    onSuccess(res){
      window.open(res?.payment_url, '_self')
    },
  });
}

const { fields } = useBusinessFields()

</script>

<template>
  <div class="container my-[40px]">
    <UITitle :title="route?.params.slug" />
    <UIFormTable
        title="webmails"
        :columns="fields"
        :list-url="`webmail/webmail?category=${route?.params.slug}`"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >

      <template #filterOptions>
        <BusinessWebmailFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>


      <template #user="data">
        <span class="text-neural-300 font-medium text-[15px]">{{data.user?.username}}</span>
      </template>
      <template #is_available="data">

        <div v-if="data.is_available === true">
          <IconsTrueIcon class="w-[22px] h-[22px] ms-2"/>
        </div>
        <div v-else>
          <IconsFalseIcon class="w-[22px] h-[22px] ms-2"/>
        </div>
      </template>
      <template #status="data">
          <span
              class="text-[12px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px]"
              :class="[data?.status == 'unsold' ? 'bg-blue-400' : data?.status == 'Unsold' ? 'bg-blue-400' : data?.status == 'sold' ? 'bg-error-200' : 'bg-error-200']"
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