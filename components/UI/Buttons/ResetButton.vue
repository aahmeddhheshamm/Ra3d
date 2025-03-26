<script setup>

defineProps({
  disabledClass: {
    type: String,
    default: "!bg-mutedColor"
  },
  type: {
    type: String,
    default:"button",
  },
  classContent: {
    type: String,
    default: "px-4",
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

</script>
<template>
  <button
      class="bg-error-200 rounded-[8px] py-[8px] px-[28px] min-h-[40px] flex items-center justify-center gap-[6px] outline-0 text-white font-semibold overflow-hidden"
    :class="[disabled ? `${disabledClass} cursor-not-allowed bg-gray-500` : '']"
    :type="type"
    :disabled="disabled"
    v-bind="$attrs"
  >
     <span class=" underline text-[16px] font-semibold  capitalize">Reset</span>
  </button>
</template>
