<script setup lang="ts">
const menuIsOpen = ref(false);
const currentRoute = computed(() => route.path)
const route = useRoute()
watch(currentRoute, () => {
  menuIsOpen.value = false;
})

function toggleMenu() {
  menuIsOpen.value = !menuIsOpen.value;
}
</script>

<template>
  <button
      type="button"
      class="block lg:hidden text-gray-500 "
      @click="toggleMenu"
  >
    <slot name="buttonContent"></slot>
  </button>
  <teleport to="body">
    <div
        class="fixed top-0 bottom-0 mobile-menu lg:hidden rtl:left-full ltr:right-full w-[100vw] !h-[100vh] z-[9999999]  transition-all "
        :class="{ 'menu-open rtl:!left-0 ltr:!right-0': menuIsOpen }"
    >
      <div class="absolute inset-0 bg-black/70" @click="toggleMenu"></div>
      <div class="absolute top-[22px] end-[30px]  z-50 w-[20px] h-[20px] drop-shadow-xl" @click="toggleMenu">
        <IconsExitIcon/>
      </div>
      <nav
          class="flex flex-col gap-[24px] relative z-10  w-[300px] h-full p-4 bg-gray-800"
      >
        <slot name="sideBarLinks"></slot>
      </nav>
    </div>
  </teleport>
</template>
