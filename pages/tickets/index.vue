<script setup>
import useTicketsFields from "~/composables/tickets/useTicketsFields.js";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const {$intercept} = useNuxtApp()
const router = useRouter()
const localePath = useLocalePath()
const openDeleteModal = ref(false);
const visibleCreateTicket = ref(false);
const deleteData = ref();
const apiMarkAsClose = (id) => $intercept(`tickets/tickets/${id}/close/`, {
  method: "POST",
})

const {mutate, isPending} = useMutate({
  mutationFn: apiMarkAsClose,
});

const apiMarkReOpen = (id) => $intercept(`tickets/tickets/${id}/reopen/`, {
  method: "POST",
})

const {mutate: mutateReOpen, isPending: pendingReOpen} = useMutate({
  mutationFn: apiMarkReOpen,
});

const closeAction = (data) => {
  mutate(data.id,{
    onSuccess(res){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });

}

const reopenAction = (data) => {
  mutateReOpen(data.id,{
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

const apiDeleteItem = (id) => $intercept(`tickets/tickets/${id}/`, {
  method: "Delete",
})

const {mutate: deleteTicket, isPending: pendingDelete} = useMutate({
  mutationFn: apiDeleteItem,
});


function deleteItem() {
  deleteTicket( deleteData.value.id, {
    onSuccess(){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });
  openDeleteModal.value = false

}
const { fields, actions } = useTicketsFields(closeAction, reopenAction, deleteAction)

</script>

<template>
  <Dialog
      v-model:visible="visibleCreateTicket"
      :draggable="false"
      header="Add Ticket"
      :closable="true"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :modal="true"
  >
    <ModelsAddTicketModel  />
  </Dialog>
  <ModelsDeleteModel
      deleteHeader="Tickets"
      :deleteData="deleteData"
      v-model="openDeleteModal"
      @deleteItem="deleteItem"
  />
  <div class="container my-[40px]">
    <div class="flex items-center justify-between">
      <UITitle title="My Tickets" />
      <UIButtonsPrimaryButton
          type="button"
          :isAddBtn="true"
          submitTitle="Create New Ticket"
          :class="[{ 'btn-disabled': false }, 'mb-6 w-fit !py-[12px] !text-[16px] !font-medium rounded-[8px]']"
          @click="visibleCreateTicket = true"
      />
    </div>
    <UIFormTable
        title="tickets"
        :columns="fields"
        :actions
        list-url="tickets/tickets"
        :has-filter-btn="true"
        :has-search-btn="true"
        class="text-neural-300 font-normal text-xs !p-0 !bg-transparent !rounded-none !shadow-none"
    >
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