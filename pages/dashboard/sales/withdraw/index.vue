<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useWithdrawFields from "~/composables/dashboard/withdraw/useWithdrawFields.js";

const {$intercept} = useNuxtApp()

const filters = ref({
  search: '',
})

const getFilters = (values) => {
  filters.value = values
}


const apiApproveRequest = (id) => $intercept(`wallet/withdrawal-requests/${id}/approve/`, {
  method: "GET",
})

const {mutate, isPending} = useMutate({
  mutationFn: apiApproveRequest,
});

function approveAction(data) {
  mutate(data.id,{
    onSuccess(res){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });
}

const apiCompleteRequest = ({id, ...data}) => $intercept(`wallet/withdrawal-requests/${id}/complete/`, {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate: mutateCompleteRequest, isPending: pendingCompleteRequest} = useMutate({
  mutationFn: apiCompleteRequest,
});

const completeAction = (data) => {
  mutateCompleteRequest({id: data.id, transaction_id: data.transaction_id},{
    onSuccess(res){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });

}

const apiRejectRequest = (id) => $intercept(`wallet/withdrawal-requests/${id}/reject/`, {
  method: "GET",
})

const {mutate: mutateRejectRequest, isPending: pendingReject} = useMutate({
  mutationFn: apiRejectRequest,
});


const rejectAction = (data) => {
  mutateRejectRequest(data.id, {
    onSuccess(res){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });

}
//
// function deleteItem() {
//   deleteCpanel( deleteData.value.id, {
//     onSuccess(){
//       setTimeout(()=>{
//         location.reload()
//       },1000)
//     },
//   });
//   openDeleteModal.value = false
//
// }


const { fields, actions } = useWithdrawFields(approveAction, completeAction, rejectAction)
</script>

<template>

  <div class="">
    <UITitle title="Withdraw" />
    <UIFormTable
        title="Withdraw"
        :columns="fields"
        :actions
        list-url="wallet/withdrawal-requests"
        :url-params="filters"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
      <template #filterOptions>
        <DashboardWithdrawFilterForm @getFilter="(values) => getFilters(values)"/>
      </template>

      <template #user="data">
        <span class="text-neural-300 font-medium text-[15px]">{{data.user?.username}}</span>
      </template>

      <template #status="data">
          <span
              class="text-[12px] font-semibold text-white leading-5 px-3 pt-2 pb-2 rounded-[4px] "
              :class="[data?.status == 'PENDING' ? 'bg-orange-400' : data?.status == 'APPROVED' ? 'bg-primary-500' : data?.status == 'COMPLETE' ? 'bg-primary-500' : 'bg-error-200']"
          >{{ data?.status }}
          </span>
      </template>
    </UIFormTable>

  </div>

</template>

<style scoped>

</style>