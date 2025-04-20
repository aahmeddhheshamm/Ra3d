<script setup>
definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const attachement = ref()


const apiAddNewRequest = (data) => $intercept('sellers/seller-requests/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiAddNewRequest,
});


function createRequest() {
  const payload = new FormData();
  if (typeof attachement.value ==="object" && attachement.value != null) {
    payload.append('national_id',attachement.value)
  }
  console.log('payload', payload)
  // payload.append('national_id',attachement.value)
  mutate(payload, {
    onSuccess: (res) => {
      setTimeout(()=>{
        location.reload()
      },1000)
    },
    onError: () => {
    }
  });
}
</script>

<template>
  <div>
    <ValidationForm class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createRequest" autocomplete="off" >
      <div class="grid grid-cols-1 gap-x-4 gap-y-2">
        <UIFormLabelField label="Your National ID" />
        <div class="w-full flex items-center justify-center">
          <UIFormUploadImage class="w-full h-56 rounded-md bg-gray-400 " v-model="attachement"/>
        </div>

      </div>
      <UIButtonsPrimaryButton
          type="submit"
          :loading="isPending"
          :disabled="isPending"
          submitTitle="Add"
          :class="[{ 'btn-disabled': isPending }, '!px-4 !py-[9px] !text-[14px] mt-4 !rounded-[4px] w-full']"
      />

    </ValidationForm>
  </div>
</template>
