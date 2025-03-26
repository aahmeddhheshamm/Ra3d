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
    class="bg-green-700 rounded-[8px] py-[8px] px-[28px] min-h-[40px] flex items-center justify-center gap-[6px] outline-0 text-white font-semibold overflow-hidden"
    :class="[disabled ? `${disabledClass} cursor-not-allowed` : '']"
    :type="type"
    :disabled="disabled"
    v-bind="$attrs"
  >

    <IconsSearchIcon class="w-[14px] lg:w-[20px] h-[14px] lg:h-[20px] stroke-white"/>
      <span class=" ltr:text-[14px] rtl:text-[16px] leading-[21px] font-bold capitalize">Filter</span>
  </button>
</template>
