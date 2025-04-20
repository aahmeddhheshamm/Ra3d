<script setup>
definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const newItem = ref({
  title: "",
  reason: "",
  message: "",
})

const ReasonType = ref([
    "Payment",
    "Item Problem",
    "Report Problem",
    "Become Seller Request",
    "Other"
])

const apiAddNewItem = (data) => $intercept('tickets/tickets/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiAddNewItem,
});


function createNewItem() {
  mutate(newItem.value, {
    onSuccess(res){
      setTimeout(()=>{
        location.reload()
      },1000)
    },
  });
}
</script>

<template>
  <div>
    <ValidationForm class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createNewItem" autocomplete="off" >
      <div class="grid grid-cols-1 gap-x-4 gap-y-2">
        <UIFormInputField
            name="title"
            v-model="newItem.title"
            validation="required"
            type="text"
            label="Title"
            placeholder="Enter title"
            id="title"
        />

        <div class="">
          <UIFormLabelField label="Reason" />
          <Dropdown
              v-model="newItem.reason"
              filter
              empty-filter-message="No result"
              empty-message="No available options"
              countryLoading
              :options="ReasonType"
              option-value=""
              optionLabel=""
              placeholder="Select reason"
              :highlightOnSelect="true"
              class="bg-white w-full  font-medium text-sm !rounded-[8px]"
          />
        </div>
        <div class="">
          <UIFormLabelField label="Message" />
          <Textarea v-model="newItem.message" autoResize rows="5"  class="w-full" />

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
