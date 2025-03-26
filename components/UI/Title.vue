<template>
  <div class="flex  gap-2">
<!--  <svg width="7" height="20" viewBox="0 0 7 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.668945 3C0.668945 1.34315 2.01209 0 3.66895 0C5.3258 0 6.66895 1.34315 6.66895 3V10H0.668945V3Z" class="fill-black"></path><path d="M0.668945 10H6.66895V17C6.66895 18.6569 5.3258 20 3.66895 20C2.01209 20 0.668945 18.6569 0.668945 17V10Z" fill="#E3F2FF"></path></svg>-->
    <h6 class="capitalize lg:text-[2rem] text-[1.5rem] font-semibold text-black mb-6">{{ title?.split('_')?.join(' ') }}</h6>
  </div>
</template>

<script setup>
defineProps(["title"]);
</script>
<style></style>