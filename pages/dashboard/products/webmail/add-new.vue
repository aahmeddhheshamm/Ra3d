<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useWebmailLocations from "~/composables/Business/useWebmailLocations.js";
const {webmailLocations, pending} = await useWebmailLocations();
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const newItem = ref({
  username: "",
  password: "",
  domain: "",
  price: "",
  source: "",
  category: "",
  niche: "",
  location: "",
})

const WebmailType = ref([
  {
    title: 'Created',
    id: 'Created'
  },
  {
    title: 'Cracked',
    id: 'Cracked'
  },
  {
    title: 'Logs',
    id: 'Logs'
  },
])

const WebMailCategory = ref([
  "cPanel Webmail",
  "GoDaddy Webmail",
  "Office 365",
  "Google Workspace",
  "Zoho Mail",
  "Rackspace Email",
  "IONOS Webmail"
])

const WebMailNiche = ref([
  "Real State",
  "Health - Fitness",
  "Hobbies - Interest",
  "Relationship - Dating",
  "Wealth - Money",
  "Education",
  "Prepping",
  "Self-Improvement",
  "Wealth Building Through Investing",
  "Pets",
  "Beauty",
  "Gadgets - Technology",
  "Personal Finance",
  "Home Security",
  "Babies",
  "Other"
])

const apiAddNewItem = (data) => $intercept('webmail/seller/webmail/', {
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
        navigateTo(localePath('/dashboard/products/webmail'));
      },1000)
    },
  });
}

</script>

<template>
  <UIPageHeader
      breadcrumb-title="All Webmail"
      title="Add New"
      back-route-name="/dashboard/products/webmail"
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
                :options="WebmailType"
                option-value="id"
                optionLabel="title"
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
                :options="WebMailCategory"
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
                :options="WebMailNiche"
                option-value=""
                optionLabel=""
                placeholder="Select niche"
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
                :options="webmailLocations"
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