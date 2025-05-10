<script setup>
import {useLocalePath} from "#i18n";

definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useBuyerRequestDetails from "~/composables/dashboard/buyerRequests/useBuyerRequestDetails.js";
import Spinner from "~/components/UI/LoaderSpinner.vue";
const route = useRoute()
const localPath = useLocalePath();
const {$intercept} = useNuxtApp()

const {buyerRequestDetails, pending} = await useBuyerRequestDetails(route.params.id);

const apiApprovedRequest = (id) => $intercept(`sellers/seller-requests/${id}/approve/`, {
  method: "GET",
})

const {mutate: mutateApproved, isPending: pendingApproved} = useMutate({
  mutationFn: apiApprovedRequest,
});

function approvedRequest() {
  mutateApproved(route.params.id,{
    onSuccess(res){
      setTimeout(()=>{
        navigateTo(localPath('/dashboard/buyer-requests'))
      },1000)
    },
  });
}
const apiRejectRequest = (id) => $intercept(`sellers/seller-requests/${id}/reject/`, {
  method: "GET",
})

const {mutate: mutateReject, isPending: pendingReject} = useMutate({
  mutationFn: apiRejectRequest,
});

const rejectRequest = () => {
  mutateReject(route.params.id,{
    onSuccess(res){
      setTimeout(()=>{
        navigateTo(localPath('/dashboard/buyer-requests'))
      },1000)
    },
  });
}
</script>


<template>
  <UIPageHeader
      breadcrumb-title="All requests"
      title="Request details"
      back-route-name="/dashboard/buyer-requests"
  >

  </UIPageHeader>
  <UIBox>
    <div v-if="pending">
        <span class="">
          <Spinner></Spinner>
        </span>
    </div>
    <div v-else>
      <div class="flex gap-4 items-start">

      <div class="w-80 h-60 rounded-[10px] overflow-hidden">
        <img :src="buyerRequestDetails.national_id" class="w-full h-full object-cover"  />
      </div>
        <div class="flex flex-col gap-2">
          <p class="text-[18px] font-bold text-black">{{buyerRequestDetails.user}}</p>
          <span
          class="w-fit text-[12px] font-semibold text-white leading-5 px-3 pt-2 pb-2 rounded-[4px] "
          :class="[buyerRequestDetails?.status == 'PENDING' ? 'bg-orange-400' : buyerRequestDetails?.status == 'APPROVED' ? 'bg-primary-500' : 'bg-error-200']"
      >{{ buyerRequestDetails?.status }}
            </span>
        </div>

      </div>

      <div class="flex items-center justify-end gap-5 flex-wrap mt-6">

        <UIButtonsPrimaryButton
            :loading="pendingReject"
            :disabled="pendingReject"
            submitTitle="Reject"
            @click="rejectRequest('REJECTED')"
            :class="[{ 'btn-disabled': pendingReject }, '!bg-error-600 !px-4 !py-[9px] !text-[14px] !rounded-[4px] w-fit']"
        />

        <UIButtonsPrimaryButton
            v-if="!buyerRequestDetails?.status == 'APPROVED'"
            :loading="pendingApproved"
            :disabled="pendingApproved"
            submitTitle="Approved"
            @click="approvedRequest()"
            :class="[{ 'btn-disabled': pendingApproved }, '!bg-primary-500 !px-4 !py-[9px] !text-[14px] !rounded-[4px] w-fit']"
        />

  <!--      <button @click="changeStatus('active')">-->
  <!--        <p>Approved</p>-->
  <!--      </button>-->

      </div>
    </div>

  </UIBox>
</template>

<style scoped>

</style>