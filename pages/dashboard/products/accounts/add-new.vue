<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useAccountCountries from "~/composables/accounts/useAccountCountries.js";
const {accountCountries, pending} = await useAccountCountries();

const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const newItem = ref({
  username: "",
  password: "",
  domain: "",
  price: "",
  source: "",
  category: "",
  status: "",
  country: "",
  details: "",
  proof: "",
})

const AccountsType = ref([
  "created",
  "hacked"
])

const AccountsCategory = ref([
  "email_marketing",
  "webmail_business",
  "marketing_tools",
  "hosting_domain",
  "games",
  "graphic_developer",
  "vpn_socks_proxy",
  "shopping",
  "program",
  "stream",
  "dating",
  "learning",
  "torent",
  "voip",
  "other"
])

const AccountStatus = ref([
  "sold",
  "unsold",
  "deleted"
])

const apiAddNewItem = (data) => $intercept('accounts/seller/accounts/', {
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
        navigateTo(localePath('/dashboard/products/accounts'));
      },1000)
    },
  });
}

</script>

<template>
  <UIPageHeader
      breadcrumb-title="All Accounts"
      title="Add New"
      back-route-name="/dashboard/products/accounts"
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
            name="domain"
            v-model="newItem.domain"
            validation="required"
            type="text"
            label="Domain"
            placeholder="Enter domain"
            id="domain"
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


        <div class="col-span-2 grid grid-cols-4 gap-x-2">

          <div class="">
            <UIFormLabelField label="Type" />
            <Dropdown
                v-model="newItem.source"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="AccountsType"
                option-value=""
                optionLabel=""
                placeholder="Select type"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Category" />
            <Dropdown
                v-model="newItem.category"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="AccountsCategory"
                option-value=""
                optionLabel=""
                placeholder="Select category"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Niche" />
            <Dropdown
                v-model="newItem.niche"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="AccountStatus"
                option-value=""
                optionLabel=""
                placeholder="Select niche"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Country" />
            <Dropdown
                v-model="newItem.country"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="accountCountries"
                option-value=""
                optionLabel=""
                placeholder="Select country"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
        </div>

        <UIFormInputField
            name="details"
            v-model="newItem.details"
            validation="required"
            type="text"
            label="Details"
            placeholder="Enter details"
            id="details"
        />
        <UIFormInputField
            name="proof"
            v-model="newItem.proof"
            validation="required"
            type="text"
            label="Proof"
            placeholder="Enter proof"
            id="proof"
        />
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