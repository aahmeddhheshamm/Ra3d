<script setup>
const status = ref([
  {
    title: 'Pending',
    id: 'PENDING'
  },
  {
    title: 'Approved',
    id: 'APPROVED'
  },
  {
    title: 'Rejected',
    id: 'REJECTED'
  },
])


const filters = reactive({
  search: null,
  status: null,
})
const emit = defineEmits(['getFilter'])

const onSubmit = () => {
  emit('getFilter', JSON.parse(JSON.stringify(filters)))
}

const resetFilter = () => {
  filters.search = null;
  filters.status = null;
  emit('getFilter', JSON.parse(JSON.stringify(filters)))

};

</script>

<template>
  <form @submit.prevent="onSubmit"   @click.stop  class="w-full flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
    <div class="flex items-center flex-wrap gap-[8px]">

      <UIFormInputField
          name="search"
          v-model="filters.search"
          type="text"
          label="Search"
          placeholder="Search"
          id="search"
      />
      <div class="">
        <UIFormLabelField label="Status" />
        <Dropdown
            v-model="filters.status"
            filter
            empty-filter-message="No result"
            empty-message="No available options"
            countryLoading
            :options="status"
            option-value="id"
            optionLabel="title"
            placeholder="Select status"
            :highlightOnSelect="true"
            class="bg-white lg:min-w-[222px] w-[122px]  font-medium text-sm !rounded-[8px]"
        />
      </div>

    </div>
    <div class="flex items-center gap-2">

      <UIButtonsResetButton @click="resetFilter()" type="button" :disabled="Object.values(filters).some((value) => value !== null && !Array.isArray(value)) === false"  />

    <UIButtonsFilterButton type="submit" :disabled="false"  />
    </div>
  </form>

</template>

<style scoped>

</style>