<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useSmtpLocations from "~/composables/send/useSmtpLocations.js";
const {smtpLocations, pending} = await useSmtpLocations();
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const newItem = ref({
  username: "",
  password: "",
  ip: "",
  port: "",
  price: "",
  smtp_type: "",
  location: "",
})

const SmtpType = ref([
  {
    title: 'Created',
    id: 'Created'
  },
  {
    title: 'Cracked',
    id: 'Cracked'
  }
])

const apiAddNewItem = (data) => $intercept('smtp/seller/smtp/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiAddNewItem,
});


 function createNewItem() {
  mutate(newItem.value, {
    onSuccess(res){
      console.log('res', res)
      setTimeout(()=>{
        navigateTo(localePath('/dashboard/products/smtp'));
      },1000)
    },
  });
}

</script>

<template>
  <UIPageHeader
      breadcrumb-title="All SMTP"
      title="Add New"
      back-route-name="/dashboard/products/smtp"
  >

  </UIPageHeader>

  <UIBox>
    <div class="flex items-center justify-between">
      <UITitle title="Add New" />

    </div>
    <ValidationForm class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createNewItem" autocomplete="off" >
      <div class="grid grid-cols-2 gap-x-4 gap-y-2">
        <UIFormInputField
            name="username"
            v-model="newItem.username"
            validation="required"
            type="text"
            label="Username"
            placeholder="Enter username"
            id="username"
        />
        <UIFormPasswordField
            name="password"
            id="password"
            placeholder="Enter password"
            label="password"
            validation="required|password"
            v-model="newItem.password"
        />

        <UIFormInputField
            name="ip"
            v-model="newItem.ip"
            validation="required"
            type="text"
            label="IP"
            placeholder="Enter Ip"
            id="ip"
        />
        <UIFormInputField
            name="port"
            v-model="newItem.port"
            validation="required"
            type="text"
            label="Port"
            placeholder="Enter port"
            id="port"
        />


        <div class="col-span-2 grid grid-cols-3 gap-x-2">
          <UIFormInputField
              name="price"
              v-model="newItem.price"
              validation="required|integer"
              type="text"
              label="Price"
              placeholder="Enter price"
              id="price"
          />

          <div class="">
            <UIFormLabelField label="Type" />
            <Dropdown
                v-model="newItem.smtp_type"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="SmtpType"
                option-value="id"
                optionLabel="title"
                placeholder="Select type"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Locations" />
            <Dropdown
                v-model="newItem.location"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                pending
                :options="smtpLocations"
                option-value=""
                optionLabel=""
                placeholder="Select locations"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
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

  </UIBox>

</template>

<style scoped>

</style>