<template>
  <div class="box-radius !bg-white !p-6 !transition-all !duration-500 box-shadow " v-bind="$attrs">
    <div v-if="$slots.header" class="">
      <div class=" border-black/10 pb-4 ">
        <slot name="header" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup></script>

<style scoped>
.box-shadow {
  -webkit-box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05) !important;
  -moz-box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05) !important;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05) !important;
}
.box-radius{
  border-radius: 12px !important;
}
</style>
