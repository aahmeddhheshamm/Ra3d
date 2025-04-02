<template>
  <div class="flex items-center justify-between pb-4 border-b mb-6 w-full">
  <div class="flex flex-col md:flex-row gap-5 justify-between md:items-center  w-full">
    <div class="flex gap-2">
      <UIBreadCrumbTitle
        class="text-primary-700"
        :title
        :breadcrumb-title="breadcrumbTitle"
        :route-name="backRouteName"
      />

    </div>

  </div>
  <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  breadcrumbTitle: {
    type: String,
    default: '',
  },
  backRouteName: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped></style>
