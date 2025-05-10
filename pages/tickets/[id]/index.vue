<script setup>
import Spinner from "~/components/UI/LoaderSpinner.vue";

definePageMeta({
  layout: "customer",
  middleware:'auth'
});
import useTicketDetails from "~/composables/tickets/useTicketDetails.js";
const route = useRoute()
const {$intercept} = useNuxtApp()
const message = ref()
const {ticketDetails, pending} = await useTicketDetails(route.params.id);

const apiAddReply = (data) => $intercept(`tickets/tickets/${route.params.id}/responses/`, {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiAddReply,
});

function submitReply () {
  mutate({message: message.value}, {
    onSuccess(){
      location.reload()
    },
  });
}


</script>

<template>
  <div class="container my-[40px]">
    <UITitle title="Ticket Details" />

    <span v-if="pending" class="flex justify-center items-center">
      <Spinner></Spinner>
    </span>
    <div v-else>
      <UIBox class="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div class="flex items-center gap-2">

          <p class="font-bold text-[12px] md:text-[18px]">Title: </p>
          <p class="font-medium text-[12px] md:text-[18px]">{{ ticketDetails.title }} </p>

          <p class="font-bold text-[12px] md:text-[18px]">By user: </p>
          <p class="font-medium text-[12px] md:text-[18px]">{{ ticketDetails.user }} </p>
        </div>
        <div class="flex items-center gap-2">
          <p class="font-bold text-[12px] md:text-[18px]">Reason: </p>
          <p class="font-medium text-[12px] md:text-[18px]">{{ ticketDetails.reason }} </p>
        </div>
        <div class="flex items-center gap-2">
          <p class="font-bold text-[12px] md:text-[18px]">Status: </p>
          <span
              class="text-[12px] md:text-[18px] font-medium text-white leading-5 px-3 pt-2 pb-2 rounded-[4px]"
              :class="[ticketDetails?.status == 'Opened' ? 'bg-blue-400' : ticketDetails?.status == 'Closed' ? 'bg-error-200' : 'bg-error-200']"
          >{{ ticketDetails?.status }}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <p class="font-bold text-[12px] md:text-[18px]">Message: </p>
          <p class="font-medium text-[12px] md:text-[18px]">{{ ticketDetails.message }} </p>
        </div>

      </UIBox>
      <UITitle title="Comments" class="mt-6" />
      <div v-if="ticketDetails.responses?.length">
        <div v-for="(comment, key) in ticketDetails.responses "  class="flex flex-col gap-4 mb-4">
          <UIBox class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <p class="font-bold text-[12px] md:text-[18px]">By user: </p>
              <p class="font-medium text-[12px] md:text-[18px]">{{ comment?.user }} </p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="font-bold text-[12px] md:text-[18px]">Message: </p>
              <p class="font-medium text-[12px] md:text-[18px]">{{ comment?.message }} </p>
            </div>
          </UIBox>

        </div>
      </div>
      <UIBox v-else class="flex items-center justify-center">
        <span class="text-lg text-black" >No Comments Found</span>
      </UIBox>

      <ValidationForm v-if="ticketDetails?.status == 'Opened'" class="flex flex-col gap-7 mt-6" @submit="submitReply">
        <Textarea v-model="message" placeholder="Enter Message Reply" autoResize rows="5"  class="w-full" />
<!--        <Editor-->
<!--            class="py-2 h-[200px]"-->
<!--            name="reply"-->
<!--            v-model="message"-->
<!--        />-->
        <div class="flex items-center justify-end gap-2 mt-4" >
          <UIButtonsPrimaryButton
              type="submit"
              :loading="isPending"
              :disabled="isPending"
              submitTitle="Send Reply"
              :class="[{ 'btn-disabled': isPending }, '!bg-primary-500 !w-fit !px-4 !py-[9px] !text-[14px] !rounded-[4px]']"

          />
        </div>
      </ValidationForm>
    </div>

  </div>

</template>

<style scoped>

</style>