<template>
  <label class="block text-[14px] leading-6 text-black mb-[0.5rem] font-normal">
    {{$t(label)}} :
  </label>
</template>

<script 
setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style>
</style>