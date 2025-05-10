<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useShellsFields from "~/composables/dashboard/useShellsFields.js";
const {$intercept} = useNuxtApp()
const router = useRouter()
const localePath = useLocalePath()
const openDeleteModal = ref(false);
const deleteData = ref();
const filters = ref({
  search: '',
  shell_type: '',
  status: '',
  tld: '',
  price__gte: '',
  price__lte: ''
})

const getFilters = (values) => {
  filters.value = values
}

const apiMarkAsSold = (id) => $intercept(`shells/seller/shell/${id}/mark_as_sold/`, {
  method: "POST",
})

const {mutate, isPending} = useMutate({
  mutationFn: apiMarkAsSold,
});

const apiMarkUnSold = (id) => $intercept(`shells/seller/shell/${id}/mark_as_unsold/`, {
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

const apiDeleteItem = (id) => $intercept(`shells/seller/shell/${id}/mark_as_delete/`, {
  method: "POST",
})

const {mutate: deleteShells, isPending: pendingDelete} = useMutate({
  mutationFn: apiDeleteItem,
});


function deleteItem() {
  deleteShells( deleteData.value.id, {
    onSuccess(){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });
  openDeleteModal.value = false

}

const { fields, actions } = useShellsFields(markSoldAction, markUnSoldAction, deleteAction)

</script>

<template>
  <ModelsDeleteModel
      deleteHeader="Shells"
      :deleteData="deleteData"
      v-model="openDeleteModal"
      @deleteItem="deleteItem"
  />
  <div class="">
<div class="flex items-center justify-between">
    <UITitle title="Shells" />
    <UIButtonsPrimaryButton
        type="button"
        :isAddBtn="true"
        submitTitle="New Shells"
        :class="[{ 'btn-disabled': false }, 'mb-6 w-fit !py-[12px] !text-[16px] !font-medium rounded-[8px]']"
        @click="router.push(localePath('/dashboard/products/shells/add-new'))"
    />
</div>
    <UIFormTable
        title="shells"
        :columns="fields"
        :actions
        list-url="shells/seller/shell"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #filterOptions>
        <HostsShellsFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>

      <template #user="data">
        <span class="text-neural-300 font-medium text-[15px]">{{data.user?.username}}</span>
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