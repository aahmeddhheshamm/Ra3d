<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const newCpanel = ref({
  host: "",
  username: "",
  password: "",
  price: "",
  cpanel_type: "",
})

const CpanelType = ref([
  {
    title: 'Created',
    id: 'Created'
  },
  {
    title: 'Hacked / Cracked',
    id: 'Hacked / Cracked'
  }
])


const apiAddNewCpanel = (data) => $intercept('cpanel/seller/cpanel/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiAddNewCpanel,
});



 function createNewCpanel() {
  mutate(newCpanel.value, {
    onSuccess(res){
      setTimeout(()=>{
        navigateTo(localePath('/dashboard/products/cpanel'));
      },1000)
    },
  });
}

</script>

<template>
  <UIPageHeader
      breadcrumb-title="All Cpanels"
      title="Add New"
      back-route-name="/dashboard/products/cpanel"
  >

  </UIPageHeader>

  <UIBox>
    <div class="flex items-center justify-between">
      <UITitle title="Add New" />

    </div>
    <ValidationForm class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createNewCpanel" autocomplete="off" >
      <div class="grid grid-cols-2 gap-x-4 gap-y-2">
        <UIFormInputField
            name="username"
            v-model="newCpanel.username"
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
            v-model="newCpanel.password"
        />

        <UIFormInputField
            name="host"
            v-model="newCpanel.host"
            validation="required"
            type="text"
            label="Host"
            placeholder="Enter Host"
            id="host"
        />
        <UIFormInputField
            name="price"
            v-model="newCpanel.price"
            validation="required|integer"
            type="text"
            label="Price"
            placeholder="Enter price"
            id="price"
        />

        <div class="col-span-2 grid grid-cols-3 gap-x-2">

          <div class="">
            <UIFormLabelField label="Type" />
            <Dropdown
                v-model="newCpanel.cpanel_type"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="CpanelType"
                option-value="id"
                optionLabel="title"
                placeholder="Select type"
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