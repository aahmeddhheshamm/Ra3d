<template>
    <div class="flex flex-col items-center justify-center gap-2 mt-8">
      <div class='max-w-[350px] md:max-w-[500px] mb-4 mt-8'>
<!--        <Image :src="notFoundErrorImage" alt='not found' />-->
      </div>
      <h1 class='lg:text-2xl text-md text-primary font-medium mb-2'>ERROR 404</h1>
      <p class='text-balance font-semibold lg:text-xl text-xm text-gray-300 mb-2'>
        The page you’re looking for doesn’t exist.
      </p>
      <nuxt-link :to="localePath('/')" >
        <h4 class='text-primary-200 font-bold'>Go Home</h4>
      </nuxt-link>
    </div>
</template>

<script setup>
// import notFoundErrorImage from "~/assets/images/not-found.png";
import {useLocalePath} from "#i18n";
const localePath = useLocalePath()
const props = defineProps({
  error: Object,
});
</script>








