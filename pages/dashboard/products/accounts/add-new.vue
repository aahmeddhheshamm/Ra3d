<script setup>
import {toast} from "vue3-toastify";

definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useAccountCountries from "~/composables/accounts/useAccountCountries.js";
const {accountCountries, pending} = await useAccountCountries();

const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

// Initialize with one empty item
const formValues = ref({
  newItems: [{
    username: "",
    password: "",
    domain: "",
    details: "",
    proof: "",
  }]
})

const newItem = ref({
  price: "",
  notes: "",
  type: "",
  category: "",
  country: ""
})

const AccountsType = ref([
  {
    title: 'Created',
    id: 'Created'
  },
  {
    title: 'Hacked',
    id: 'hacked'
  },
])
// const AccountsType = ref(["created", "hacked"])
const AccountsCategory = ref([
  "email_marketing", "webmail_business", "marketing_tools",
  "hosting_domain", "games", "graphic_developer",
  "vpn_socks_proxy", "shopping", "program",
  "stream", "dating", "learning",
  "torent", "voip", "other"
])
const AccountStatus = ref(["sold", "unsold", "deleted"])

const apiAddNewItem = (data) => $intercept('accounts/seller/accounts/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiAddNewItem,
});

function createNewItem(values) {
  if(!newItem.value.notes){
    toast.error("Please enter a new note")
  }else{
    const accountData = values.newItems.map(item => ({
      ...item,
      ...newItem.value
    }))
    mutate(accountData, {
      onSuccess(res) {
        setTimeout(() => {
          navigateTo(localePath('/dashboard/products/accounts'));
        }, 1000)
      },
    });
  }
}

</script>

<template>

  <UIPageHeader
      breadcrumb-title="All Accounts"
      title="Add New"
      back-route-name="/dashboard/products/accounts"
  />

  <UIBox>
    <div class="flex items-center justify-between">
      <UITitle title="Add New" />
    </div>

    <ValidationForm
        v-slot="{ values }"
        class="w-full flex flex-col gap-[8px] mt-[12px]"
        @submit="createNewItem"
        autocomplete="off"
        :initial-values="formValues"
    >
      <div class="grid grid-cols-2 gap-x-4 gap-y-4">
        <div class="col-span-2 grid grid-cols-4 gap-2">
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
            <UIFormLabelField label="Country" />
            <Dropdown
                v-model="newItem.country"
                :options="accountCountries"
                placeholder="Select country"
                class="bg-white w-full font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Type" />
            <Dropdown
                v-model="newItem.type"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="AccountsType"
                option-value="id"
                optionLabel="title"
                placeholder="Select type"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
<!--            <Dropdown-->
<!--                v-model="selectOptions.type"-->
<!--                :options="AccountsType"-->
<!--                placeholder="Select type"-->
<!--                class="bg-white w-full font-medium text-sm !rounded-[8px]"-->
<!--            />-->
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
          <div class="col-span-4">

            <UIFormTextAreaInput
                v-model="newItem.notes"
              label="Notes"
              validation="required"
              :rows="5"
              name="notes"
              placeholder="Notes.."

          />
          </div>
<!--          <div class="">-->
<!--            <UIFormLabelField label="Niche" />-->
<!--            <Dropdown-->
<!--                v-model="selectOptions.status"-->
<!--                :options="AccountStatus"-->
<!--                placeholder="Select niche"-->
<!--                class="bg-white w-full font-medium text-sm !rounded-[8px]"-->
<!--            />-->
<!--          </div>-->
<!--          <div class="">-->
<!--            <UIFormLabelField label="Country" />-->
<!--            <Dropdown-->
<!--                v-model="selectOptions.country"-->
<!--                :options="accountCountries"-->
<!--                placeholder="Select country"-->
<!--                class="bg-white w-full font-medium text-sm !rounded-[8px]"-->
<!--            />-->
<!--          </div>-->
        </div>

        <div class="col-span-4">
          <UIFormUseFormArray name="newItems">
            <template #default="{ push: pushValues, remove: removeValues, fields: items }">
              <div
                  v-for="(field, index) in items"
                  :key="field.key"
                  class="mb-6 border p-4 rounded-md flex gap-x-2 items-start"
              >
                <div class="flex-1 grid grid-cols-2 gap-4">
                  <UIFormInputField
                      :name="`newItems[${index}].username`"
                      validation="required"
                      label="Username"
                      placeholder="Enter username"
                  />

                  <UIFormPasswordField
                      :name="`newItems[${index}].password`"
                      validation="required|password"
                      label="Password"
                      placeholder="Enter password"
                  />

                  <UIFormInputField
                      :name="`newItems[${index}].domain`"
                      validation="required|url"
                      label="Domain"
                      placeholder="Enter domain"
                  />
                  <UIFormInputField
                      :name="`newItems[${index}].proof`"
                      validation="required|urlSource"
                      label="Proof"
                      placeholder="Enter proof (ex: https://prnt.sc/example.jpg)"
                  />
                  <div class="col-span-2">
                  <UIFormInputField
                      :name="`newItems[${index}].details`"
                      validation="required"
                      label="Details"
                      placeholder="Enter details"
                  />
                  </div>

                </div>

                <div class="flex flex-col gap-2 mt-4">
                  <button
                      v-if="index === 0"
                      @click="pushValues({
                    username: '',
                    password: '',
                    domain: '',
                    details: '',
                    proof: '',

                  })"
                      type="button"
                      class="bg-green-700 text-white rounded-full h-[30px] w-[30px] flex items-center justify-center"
                  >
                    +
                  </button>

                  <button
                      v-if="items.length > 1"
                      @click="removeValues(index)"
                      type="button"
                      class="bg-red-600 text-white rounded-full h-[30px] w-[30px] flex items-center justify-center"
                  >
                    -
                  </button>
                </div>
              </div>
            </template>
          </UIFormUseFormArray>
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