<script setup>
import {useLocalePath} from "#i18n";

definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useBuyerRequestFields from "~/composables/dashboard/buyerRequests/useBuyerRequestFields.js";
const {$intercept} = useNuxtApp()
const router = useRouter()
const localPath = useLocalePath();
const openDeleteModal = ref(false);
const deleteData = ref();
const filters = ref({
  search: '',
  status: '',
})

const getFilters = (values) => {
  filters.value = values
}
//
// const apiMarkAsSold = (id) => $intercept(`rdp/seller/rdp/${id}/mark_as_sold/`, {
//   method: "POST",
// })
//
// const {mutate, isPending} = useMutate({
//   mutationFn: apiMarkAsSold,
// });
//
// const apiMarkUnSold = (id) => $intercept(`rdp/seller/rdp/${id}/mark_as_unsold/`, {
//   method: "POST",
// })
//
// const {mutate: mutateUnsold, isPending: pendingUnsold} = useMutate({
//   mutationFn: apiMarkUnSold,
// });
//
// const markSoldAction = (data) => {
//   mutate(data.id,{
//     onSuccess(res){
//       setTimeout(()=>{
//         location.reload()
//       },1000)
//     },
//   });
//
// }
//
// const markUnSoldAction = (data) => {
//   mutateUnsold(data.id,{
//     onSuccess(res){
//       setTimeout(()=>{
//         location.reload()
//       },1000)
//     },
//   });
//
// }
//
// const deleteAction = (data) => {
//   openDeleteModal.value = true
//   deleteData.value = data
// }
//
// const apiDeleteItem = (id) => $intercept(`rdp/seller/rdp/${id}/mark_as_delete/`, {
//   method: "POST",
// })
//
// const {mutate: deleteRdp, isPending: pendingDelete} = useMutate({
//   mutationFn: apiDeleteItem,
// });
//
//
// function deleteItem() {
//   deleteRdp( deleteData.value.id, {
//     onSuccess(){
//       setTimeout(()=>{
//         location.reload()
//       },1000)
//     },
//   });
//   openDeleteModal.value = false
//
// }

const { fields, actions } = useBuyerRequestFields()

</script>

<template>
  <ModelsDeleteModel
      deleteHeader="rdp"
      :deleteData="deleteData"
      v-model="openDeleteModal"
      @deleteItem="deleteItem"
  />
  <div class="">
    <UITitle title="Buyer Request" />
    <UIFormTable
        title="buyer request"
        :columns="fields"
        :actions
        list-url="sellers/seller-requests"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #filterOptions>
        <DashboardBuyerRequestsFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>

      <template #national_id="data">
        <div class="w-10 h-10 rounded-[10px] overflow-hidden">
          <img :src="data.national_id" class="w-full h-full object-cover"  />
        </div>
      </template>

      <template #status="data">
          <span
              class="text-[12px] font-semibold text-white leading-5 px-3 pt-2 pb-2 rounded-[4px] "
              :class="[data?.status == 'PENDING' ? 'bg-orange-400' : data?.status == 'APPROVED' ? 'bg-primary-500' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>

      <template #action="data">
        <nuxt-link tooltip-value="view request"  :to="localPath(`/dashboard/buyer-requests/${data.id}`)" >
          <IconsEyeIcon class=""/>
        </nuxt-link>
      </template>
    </UIFormTable>

  </div>

</template>

<style scoped>

</style>