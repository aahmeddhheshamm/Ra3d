<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
// import useCpanelLocations from "~/composables/hosts/useCpanelLocations.js";
// const {cpanelLocations, pending} = await useCpanelLocations();
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()


const formValues = ref({
  newItems: [{
    host: "",
    username: "",
    password: "",
  }]
})

const newCpanel = ref({
  price: "",
  cpanel_type: "",
  // location: "",
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



 function createNewCpanel(values) {

   const cpanelData = values.newItems.map(item => ({
     ...item,
     ...newCpanel.value
   }))
  mutate(cpanelData, {
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
    <ValidationForm   v-slot="{ values }"
                      class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createNewCpanel" autocomplete="off"
                    :initial-values="formValues"
    >
      <div class="grid grid-cols-2 gap-x-4 gap-y-4">
<!--        <UIFormInputField-->
<!--            name="username"-->
<!--            v-model="newCpanel.username"-->
<!--            validation="required"-->
<!--            type="text"-->
<!--            label="Username"-->
<!--            placeholder="Enter username"-->
<!--            id="username"-->
<!--        />-->
<!--        <UIFormPasswordField-->
<!--            name="password"-->
<!--            id="password"-->
<!--            placeholder="Enter password"-->
<!--            label="password"-->
<!--            validation="required|password"-->
<!--            v-model="newCpanel.password"-->
<!--        />-->

<!--        <UIFormInputField-->
<!--            name="host"-->
<!--            v-model="newCpanel.host"-->
<!--            validation="required"-->
<!--            type="text"-->
<!--            label="Host"-->
<!--            placeholder="Enter Host"-->
<!--            id="host"-->
<!--        />-->
        <UIFormInputField
            name="price"
            v-model="newCpanel.price"
            validation="required|integer"
            type="text"
            label="Price"
            placeholder="Enter price"
            id="price"
        />
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
<!--        <div class="">-->
<!--          <UIFormLabelField label="Locations" />-->
<!--          <Dropdown-->
<!--              v-model="newCpanel.location"-->
<!--              filter-->
<!--              empty-filter-message="No result"-->
<!--              empty-message="No available options"-->
<!--              pending-->
<!--              :options="cpanelLocations"-->
<!--              option-value=""-->
<!--              optionLabel=""-->
<!--              placeholder="Select locations"-->
<!--              :highlightOnSelect="true"-->
<!--              class="bg-white w-full  font-medium text-sm !rounded-[8px]"-->
<!--          />-->
<!--        </div>-->

<!--        <div class="col-span-2 grid grid-cols-2 gap-x-2">-->

<!--          <div class="">-->
<!--            <UIFormLabelField label="Type" />-->
<!--            <Dropdown-->
<!--                v-model="newCpanel.cpanel_type"-->
<!--                filter-->
<!--                empty-filter-message="No result"-->
<!--                empty-message="No available options"-->
<!--                countryLoading-->
<!--                :options="CpanelType"-->
<!--                option-value="id"-->
<!--                optionLabel="title"-->
<!--                placeholder="Select type"-->
<!--                :highlightOnSelect="true"-->
<!--                class="bg-white w-full  font-medium text-sm !rounded-[8px]"-->
<!--            />-->
<!--          </div>-->
<!--          <div class="">-->
<!--            <UIFormLabelField label="Locations" />-->
<!--            <Dropdown-->
<!--                v-model="newCpanel.location"-->
<!--                filter-->
<!--                empty-filter-message="No result"-->
<!--                empty-message="No available options"-->
<!--                pending-->
<!--                :options="cpanelLocations"-->
<!--                option-value=""-->
<!--                optionLabel=""-->
<!--                placeholder="Select locations"-->
<!--                :highlightOnSelect="true"-->
<!--                class="bg-white w-full  font-medium text-sm !rounded-[8px]"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->


        <div class="col-span-3">
          <UIFormUseFormArray name="newItems">
            <template #default="{ push: pushValues, remove: removeValues, fields: items }">
              <div
                  v-for="(field, index) in items"
                  :key="field.key"
                  class="mb-6 border p-4 rounded-md flex gap-x-2 items-start"
              >
                <div class="flex-1 grid md:grid-cols-3 gap-4">
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
                      :name="`newItems[${index}].host`"
                      validation="required"
                      label="Host"
                      placeholder="Enter Host"
                      type="text"
                      id="host"
                  />

                </div>

                <div class="flex flex-col gap-2 mt-4">
                  <button
                      v-if="index === 0"
                      @click="pushValues({
                    username: '',
                    password: '',
                    host: '',
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

<style scoped>

</style>