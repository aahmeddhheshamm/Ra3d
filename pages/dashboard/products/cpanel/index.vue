<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useCpanelsFields from "~/composables/dashboard/useCpanelsFields.js";
const {$intercept} = useNuxtApp()
const router = useRouter()
const localePath = useLocalePath()
const openDeleteModal = ref(false);
const deleteData = ref();
const filters = ref({
  search: '',
  cpanel_type: '',
  status: '',
  tld: '',
  price__gte: '',
  price__lte: ''
})

const getFilters = (values) => {
  filters.value = values
}

const apiMarkAsSold = (id) => $intercept(`cpanel/seller/cpanel/${id}/mark_as_sold/`, {
  method: "POST",
})

const {mutate, isPending} = useMutate({
  mutationFn: apiMarkAsSold,
});

const apiMarkUnSold = (id) => $intercept(`cpanel/seller/cpanel/${id}/mark_as_unsold/`, {
  method: "POST",
})

const {mutate: mutateUnsold, isPending: pendingUnsold} = useMutate({
  mutationFn: apiMarkUnSold,
});

const markSoldAction = (data) => {
  mutate(data.id,{
    onSuccess(res){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });

}

const markUnSoldAction = (data) => {
  mutateUnsold(data.id,{
    onSuccess(res){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });

}

const deleteAction = (data) => {
  openDeleteModal.value = true
  deleteData.value = data
}

const apiDeleteItem = (id) => $intercept(`cpanel/seller/cpanel/${id}/mark_as_delete/`, {
  method: "POST",
})

const {mutate: deleteCpanel, isPending: pendingDelete} = useMutate({
  mutationFn: apiDeleteItem,
});


function deleteItem() {
  deleteCpanel( deleteData.value.id, {
    onSuccess(){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });
  openDeleteModal.value = false

}

const { fields, actions } = useCpanelsFields(markSoldAction, markUnSoldAction, deleteAction)

</script>

<template>
  <ModelsDeleteModel
      deleteHeader="Cpanel"
      :deleteData="deleteData"
      v-model="openDeleteModal"
      @deleteItem="deleteItem"
  />
  <div class="">
<div class="flex items-center justify-between">
    <UITitle title="Cpanels" />
    <UIButtonsPrimaryButton
        type="button"
        :isAddBtn="true"
        submitTitle="New Cpanel"
        :class="[{ 'btn-disabled': false }, 'mb-6 w-fit !py-[12px] !text-[16px] !font-medium rounded-[8px]']"
        @click="router.push(localePath('/dashboard/products/cpanel/add-new'))"
    />
</div>
    <UIFormTable
        title="cpanel"
        :columns="fields"
        :actions
        list-url="cpanel/seller/cpanel"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #filterOptions>
        <HostsCpanelsFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>
      <template #ssl="data">
          <span
              class="text-[14px] font-medium"
              :class="[data?.ssl === true ? 'text-green-700' : 'text-neural-300']"
          >{{ data?.ssl === true ? 'Https' : 'Http' }}
          </span>
      </template>
      <template #status="data">
          <span
              class="text-[12px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px]"
              :class="[data?.status == 'Unsold' ? 'bg-blue-400' : data?.status == 'Sold' ? 'bg-green-700' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>
    </UIFormTable>

  </div>

</template>

<style scoped>

</style>