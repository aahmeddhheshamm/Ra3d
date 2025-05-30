<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const formValues = ref({
  newItems: [{
    shell_url: "",
  }]
})

const newItem = ref({
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


 function createNewItem(values) {
   const shellData = values.newItems.map(item => ({
     ...item,
     ...newItem.value
   }))
  mutate(shellData, {
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
    <ValidationForm
        v-slot="{ values }"
        class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createNewItem" autocomplete="off"
                    :initial-values="formValues"
    >
      <div class="grid grid-cols-2 gap-x-4 gap-y-4">


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


        <div class="col-span-2">
          <UIFormUseFormArray name="newItems">
            <template #default="{ push: pushValues, remove: removeValues, fields: items }">
              <div
                  v-for="(field, index) in items"
                  :key="field.key"
                  class="mb-6 border p-4 rounded-md flex gap-x-2 items-start"
              >
                <div class="flex-1  gap-4">
                  <UIFormInputField
                      :name="`newItems[${index}].shell_url`"
                      validation="required"
                      type="text"
                      label="Shell Url"
                      placeholder="Enter Shell Url"
                      id="shell_url"
                  />
                </div>

                <div class="flex flex-col gap-2 mt-4">
                  <button
                      v-if="index === 0"
                      @click="pushValues({
                    shell_url: '',

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