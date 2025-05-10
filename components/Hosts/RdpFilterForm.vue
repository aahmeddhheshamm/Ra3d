<script setup>
// const countries = ref([
//   {
//     title: 'egypt',
//     id: 1
//   },
//   {
//     title: 'sa',
//     id: 2
//   },
// ])

const ssl = ref([
  {
    title: 'https',
    id: 'https'
  },
  {
    title: 'http',
    id: 'http'
  },
])
const cpanelType = ref([
  {
    title: 'Created',
    id: 'Created'
  },
  {
    title: 'Hacked / Cracked',
    id: 'Hacked / Cracked'
  }
])
const status = ref([
  {
    title: 'Sold',
    id: 'Sold'
  },
  {
    title: 'Unsold',
    id: 'Unsold'
  },
  {
    title: 'Deleted',
    id: 'Deleted'
  },
])


const filters = reactive({
  search: null,
  rdp_type: null,
  status: null,
  tld: null,
  price__gte: null,
  price__lte: null
})
const emit = defineEmits(['getFilter'])

const onSubmit = () => {
  //copy object because
  emit('getFilter', JSON.parse(JSON.stringify(filters)))
}

const resetFilter = () => {
  filters.search = null;
  filters.rdp_type = null;
  filters.status = null;
  filters.tld = null;
  filters.price__gte = null;
  filters.price__lte = null;
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
      <UIFormInputField
          name="tld"
          v-model="filters.tld"
          type="text"
          label="Tld"
          placeholder="Tld"
          id="tld"
      />
      <div class="">
        <UIFormLabelField label="Type" />
        <Dropdown
            v-model="filters.rdp_type"
            filter
            empty-filter-message="No result"
            empty-message="No available options"
            countryLoading
            :options="cpanelType"
            option-value="id"
            optionLabel="title"
            placeholder="Select type"
            :highlightOnSelect="true"
            class="bg-white lg:min-w-[222px] w-[122px]  font-medium text-sm !rounded-[8px]"
        />
      </div>
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
      <div>

      <UIFormLabelField label="Price" />
    <div class="flex items-center gap-2">
      <UIFormInputField
          class="!w-[80px]"
          name="min"
          v-model="filters.price__gte"
          type="text"
          placeholder="Min"
          id="min"
      />
      <UIFormInputField
          class="!w-[80px]"
          name="max"
          v-model="filters.price__lte"
          type="text"
          placeholder="Max"
          id="max"
      />
    </div>
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