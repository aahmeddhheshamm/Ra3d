<script setup>

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabledClass: {
    type: String,
    default: "!bg-mutedColor",
  },
  type: {
    type: String,
    default: "button",
  },
  submitTitle: {
    type: String,
    default: "",
  },
  classContent: {
    type: String,
    default: "px-4",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isAddBtn: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="[
      'bg-blue-400  text-white border rounded-[3.75px] min-w-[112px] min-h-[31px] font-semibold text-[15px]  py-[8.5px] px-[16px]',
      disabled ? `${disabledClass} cursor-not-allowed` : '',
    ]"
    :type="type"
    :disabled="disabled"
    v-bind="$attrs"
  >

    <UILodersLoaderButton v-if="loading" />
    <slot v-else>
      <div class="flex items-center justify-center gap-2">
      <slot name="addNew" v-if="isAddBtn">
        <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.793945" width="20" height="20" rx="10" fill="white" />
          <path
              d="M15.1575 8.90953H11.8848V5.63681C11.8848 5.34748 11.7699 5.07 11.5653 4.86542C11.3607 4.66083 11.0832 4.5459 10.7939 4.5459C10.5046 4.5459 10.2271 4.66083 10.0225 4.86542C9.81793 5.07 9.70299 5.34748 9.70299 5.63681V8.90953H6.43026C6.14094 8.90953 5.86346 9.02447 5.65888 9.22905C5.45429 9.43364 5.33936 9.71112 5.33936 10.0004C5.33936 10.2898 5.45429 10.5672 5.65888 10.7718C5.86346 10.9764 6.14094 11.0914 6.43026 11.0914H9.70299V14.3641C9.70299 14.6534 9.81793 14.9309 10.0225 15.1355C10.2271 15.3401 10.5046 15.455 10.7939 15.455C11.0832 15.455 11.3607 15.3401 11.5653 15.1355C11.7699 14.9309 11.8848 14.6534 11.8848 14.3641V11.0914H15.1575C15.4469 11.0914 15.7243 10.9764 15.9289 10.7718C16.1335 10.5672 16.2484 10.2898 16.2484 10.0004C16.2484 9.71112 16.1335 9.43364 15.9289 9.22905C15.7243 9.02447 15.4469 8.90953 15.1575 8.90953Z"
              fill="#0376F9"
          />
        </svg>
      </slot>
      <span>{{ submitTitle }}</span>
      </div>
    </slot>
  </button>
</template>

<style scoped></style>
