<script setup>
import { ref } from 'vue'
import { useMenuItems } from '@/composables/dashboard/useSideBar.js'

const { menuItems, selectedAccordion, icons } = useMenuItems()
const sidebarMinimized = ref(false)
const sidebarOpen = ref(true)

const toggleSidebarMinimize = () => {
  sidebarMinimized.value = !sidebarMinimized.value
}

</script>

<template>

  <aside
    class="bg-gray-800 transition-all duration-[800ms] ease-in-out relative sidebar w-[264px] h-full"
  >
    <div class="sticky top-0">
      <div class="logo-with-line pt-[20px] w-full relative">
        <div class="mx-3 max-w-full overflow-hidden">
          <div class="flex items-center gap-4"
          >
            <IconsTheLogo class=" h-[40px] "/>
            <span
                class="text-white text-[14px] leading-[48px] font-medium"
            >Ra3d</span>
          </div>

        </div>
      </div>
      <layoutsSellerNavLinks
        :selectedAccordion="selectedAccordion"
        :menuItems="menuItems"
        :icons="icons"
      />
    </div>
  </aside>
</template>