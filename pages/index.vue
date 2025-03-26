<script setup>
definePageMeta({
  layout: "customer",
  middleware:'auth'
});
const { isAuthenticated } = useAuth()
//
// console.log('isAuthenticated', tokenCookies, isAuthenticated())
console.log('isAuthenticated', isAuthenticated())
</script>

<template>
  <LazyHomeAboutSection />
</template>

<style>
</style>