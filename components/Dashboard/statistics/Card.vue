<template>
  <UIBox
      class="bg-white  box-shadow flex flex-1 flex-col rounded-lg  gap-4  items-stretch  *:text-nowrap"
  >
    <div class="flex flex-col items-start gap-4 mt-2">
      <span class="text-base font-bold capitalize text-black">{{ title }}</span>

      <span class="text-[2rem] font-medium text-black">{{ item ? item : '0' }}</span>
    </div>

    <span class="w-full h-[0.125rem] mb-2 bg-gray-300/90"></span>
  </UIBox>
</template>

<script setup lang="ts">
defineProps(['title','item'])
</script>

<style scoped>

</style>
