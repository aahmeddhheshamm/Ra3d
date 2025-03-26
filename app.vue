<script setup>
const {locale} = useI18n()
const nuxtApp = useNuxtApp();

const loading = ref(true);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});

nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>
<template>
  <Html :dir="locale == 'ar' ? 'rtl' : 'ltr' ">
  <main>
    <transition name="page-loading" mode="out-in">
    <SharedLodersLoadingPage v-if="loading"/>
    </transition>

    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </main>
  </Html>
</template>
<style>
.page-loading-enter-active,
.page-loading-leave-active {
  transition: opacity 0.5s ease;
}

.page-loading-enter-from,
.page-loading-leave-to {
  opacity: 0;
}
</style>