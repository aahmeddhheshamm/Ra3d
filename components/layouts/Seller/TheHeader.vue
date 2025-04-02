<script setup>

import { useMenuItems } from '@/composables/dashboard/useSideBar.js';
import { useLocalePath } from "#i18n";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";

const localPath = useLocalePath();
const { icons, menuItems, selectedAccordion } = useMenuItems();
</script>

<template>
  <header
      class="px-[20px] lg:px-[30px] flex items-center justify-between lg:justify-end w-full h-[59px] lg:h-[74px] bg-white border-b border-gray-300 flex-shrink-0"
  >
    <div class="flex lg:hidden items-center gap-2">
      <LayoutsCustomerSideBar>
        <template #buttonContent>
          <IconsMenuIcon class="w-[24px] h-[24px] fill-bsTextMuted cursor-pointer" />
        </template>
        <template #sideBarLinks>
          <layoutsSellerNavLinks
              :sidebarMinimized="false"
              :selectedAccordion="selectedAccordion"
              :menuItems="menuItems"
              :icons="icons"
          />
        </template>
      </LayoutsCustomerSideBar>

      <nuxt-link :to="localPath('/')">
        <IconsTheLogo class="h-[30px]" />
      </nuxt-link>
    </div>
    <div class="flex items-center gap-4">
      <Menu as="div">
        <MenuButton class="relative" id="headlessui-menu-button-guest">
          <div class="flex items-center gap-[4px]">
            <IconsUserLogo class="w-[22px] h-[22px] lg:mt-0 mt-1" />
            <span
                class=" text-[14px] leading-[48px] font-medium hidden lg:block"
            >Account</span>
          </div>
          <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
                class="absolute z-10 bg-white rounded-[10px] end-0 overflow-hidden menu-items"
            >
              <MenuItem
                  v-slot="{ active }"
                  class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                  @click=""
              >
                <nuxt-link :to="localPath('/settings')" :class="{ 'bg-primary-600': active }">
                  Settings
                </nuxt-link>
              </MenuItem>
              <MenuItem
                  v-slot="{ active }"
                  class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                  @click=""
              >
                <div :class="{ 'bg-primary-600': active }">
                  Orders
                </div>
              </MenuItem>
              <MenuItem
                  v-slot="{ active }"
                  class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                  @click=""
              >
                <div :class="{ 'bg-primary-600': active }">
                  Add balance
                </div>
              </MenuItem>
              <MenuItem
                  v-slot="{ active }"
                  class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                  @click=""
              >
                <nuxt-link :to="localPath('/')" :class="{ 'bg-primary-600': active }">
                  Website
                </nuxt-link>
              </MenuItem>
              <MenuItem
                  v-slot="{ active }"
                  class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                  @click=""
              >
                <div :class="{ 'bg-primary-600': active }">
                  Logout
                </div>
              </MenuItem>
            </MenuItems>
          </transition>
        </MenuButton>
      </Menu>

    </div>
  </header>
</template>

<style scoped></style>
