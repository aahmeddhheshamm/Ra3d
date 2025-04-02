<template>
  <h5 class="font-normal flex items-center gap-2 text-black text-base capitalize">

    <span v-if="breadcrumbTitle" class="!text-black flex items-center gap-3">
      <span class="cursor-pointer font-medium" @click="router.push(localePath(`${routeName}`))"
      >{{breadcrumbTitle}}</span>
      <svg
        width="10"
        height="13"
        viewBox="0 0 10 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0255843 0.528423L5.90197 6.48787L0 12.47C0.793113 12.47 1.58623 12.476 2.37934 12.4879C2.20345 12.4879 2.99656 12.4733 3.65855 12.4879L9.57492 6.48787L3.67454 0.512207C2.45769 0.523558 1.25043 0.526802 0.0255843 0.528423Z"
          fill="#606075"
        />
      </svg>
    </span>

    <span class="!text-blue-600 font-medium">{{ title }}</span>
  </h5>
</template>

<script setup>
const router = useRouter()
const localePath = useLocalePath()
const props = defineProps({
  title: {
    type: String
  },
  breadcrumbTitle: {
    type: String,
    default: ''
  },
  routeName: {
    type: String
  },
  extra: {
    type: String
  }
})
</script>

<style scoped></style>
