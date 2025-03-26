<template>
  <div
    :style="{
      backgroundColor: filled ? color : '#ffffff',
      color: filled ? '#ffffff' : color,
      border: filled ? 'none' : '1px solid ' + color,
    }"
    class="badge  text-[13px] font-semibold px-[10px] py-[5px] w-fit	 h-fit uppercase flex justify-center items-center"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "#000000",
  },
  filled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>

</style>