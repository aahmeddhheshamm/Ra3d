<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useAccountCountries from "~/composables/accounts/useAccountCountries.js";
const {accountCountries, pending} = await useAccountCountries();

const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const selectOptions = ref({
  type: "",
  category: "",
  // status: "",
  country: "",
})
// Initialize with one empty item
const formValues = ref({
  newItems: [{
    username: "",
    password: "",
    domain: "",
    price: "",
    details: "",
    proof: "",
    notes: "",
  }]
})

const AccountsType = ref(["created", "hacked"])
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
  console.log('values', values)

  const accountData = values.newItems.map(item => ({
    ...item,
    ...selectOptions.value
  }))
  console.log('values', accountData)
  mutate(accountData, {
    onSuccess(res) {
      console.log('res', res)
      setTimeout(() => {
        navigateTo(localePath('/dashboard/products/accounts'));
      }, 1000)
    },
  });
}

function getRandomKey() {
  return Math.random().toString(36).slice(2, 9)
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
        <div class="col-span-2 grid grid-cols-3 gap-x-2">
          <div class="">
            <UIFormLabelField label="Type" />
            <Dropdown
                v-model="selectOptions.type"
                :options="AccountsType"
                placeholder="Select type"
                class="bg-white w-full font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Category" />
            <Dropdown
                v-model="selectOptions.category"
                :options="AccountsCategory"
                placeholder="Select category"
                class="bg-white w-full font-medium text-sm !rounded-[8px]"
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
          <div class="">
            <UIFormLabelField label="Country" />
            <Dropdown
                v-model="selectOptions.country"
                :options="accountCountries"
                placeholder="Select country"
                class="bg-white w-full font-medium text-sm !rounded-[8px]"
            />
          </div>
        </div>

        <div class="col-span-2">
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
                      :name="`newItems[${index}].price`"
                      validation="required|integer"
                      label="Price"
                      placeholder="Enter price"
                  />

                  <UIFormInputField
                      :name="`newItems[${index}].details`"
                      validation="required"
                      label="Details"
                      placeholder="Enter details"
                  />

                  <UIFormInputField
                      :name="`newItems[${index}].proof`"
                      validation="required|urlSource"
                      label="Proof"
                      placeholder="Enter proof (ex: https://prnt.sc/example.jpg)"
                  />

                  <div class="col-span-2">
<!--                    <UIFormLabelField label="Notes" />-->
                    <UIFormTextAreaInput
                        label="Notes"
                        required
                        :rows="5"
                        :label="'Notes'"
                        :name="`newItems[${index}].notes`"  class="w-full"
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
                    price: '',
                    details: '',
                    proof: '',
                    notes: '',
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