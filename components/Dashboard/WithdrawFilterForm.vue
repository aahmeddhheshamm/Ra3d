<script setup>


const filters = reactive({
  search: null,
})
const emit = defineEmits(['getFilter'])

const onSubmit = () => {
  //copy object because
  emit('getFilter', JSON.parse(JSON.stringify(filters)))
}

const resetFilter = () => {
  filters.search = null;

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

    </div>
    <div class="flex items-center gap-2">

      <UIButtonsResetButton @click="resetFilter()" type="button" :disabled="Object.values(filters).some((value) => value !== null && !Array.isArray(value)) === false"  />

    <UIButtonsFilterButton type="submit" :disabled="false"  />
    </div>
  </form>

</template>

<style scoped>

</style>