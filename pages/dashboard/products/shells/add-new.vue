<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const newItem = ref({
  username: "",
  password: "",
  shell_url: "",
  price: "",
  shell_type: "",
})

const ShellsType = ref([
  {
    title: 'Created',
    id: 'Created'
  },
  {
    title: 'Cracked',
    id: 'Cracked'
  }
])

const apiAddNewItem = (data) => $intercept('shells/seller/shell/', {
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
        navigateTo(localePath('/dashboard/products/shells'));
      },1000)
    },
  });
}

</script>

<template>
  <UIPageHeader
      breadcrumb-title="All Shells"
      title="Add New"
      back-route-name="/dashboard/products/shells"
  >

  </UIPageHeader>

  <UIBox>
    <div class="flex items-center justify-between">
      <UITitle title="Add New" />

    </div>
    <ValidationForm class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createNewItem" autocomplete="off" >
      <div class="grid grid-cols-2 gap-x-4 gap-y-4">
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
            name="shell_url"
            v-model="newItem.shell_url"
            validation="required"
            type="text"
            label="Shell Url"
            placeholder="Enter Shell Url"
            id="shell_url"
        />
        <UIFormInputField
            name="price"
            v-model="newItem.price"
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
                v-model="newItem.shell_type"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="ShellsType"
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