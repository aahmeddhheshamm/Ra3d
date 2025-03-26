
<template>
<!--  <Menubar :model="items">-->
<!--    <template #item="{ item, props, hasSubmenu }">-->
<!--      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="localePath(item.route)" custom>-->
<!--        <a v-ripple :href="href" v-bind="props.action" @click="navigate">-->
<!--          <component :is="icons[item.icon]" class="w-[18px] h-[18px]" />-->

<!--          <span class="ml-2 text-[14px] font-medium">{{ item.label }}</span>-->
<!--        </a>-->
<!--      </router-link>-->
<!--      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">-->
<!--        <component :is="icons[item.icon]" class="" />-->
<!--        <span class="ml-2 text-[14px] font-medium">{{ item.label }}</span>-->
<!--        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />-->
<!--      </a>-->
<!--    </template>-->
<!--  </Menubar>-->

  <Menu as="div">
    <MenuButton class="relative" id="headlessui-menu-button-guest">
      <div class="flex items-center gap-[12px]">
        <!--              <IconsUserLogo class="w-[24px] h-[24px]" />-->
        <span
            class=" text-[14px] leading-[48px] font-medium hidden lg:block"
        >Tickets</span
        >
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
            <div :class="{ 'bg-primary-600': active }">
              My Tickets
            </div>
          </MenuItem>
          <MenuItem
              v-slot="{ active }"
              class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
              @click=""
          >
            <div :class="{ 'bg-primary-600': active }">
              My Reports
            </div>
          </MenuItem>
        </MenuItems>
      </transition>
    </MenuButton>
  </Menu>
  <Menu as="div">
    <MenuButton class="relative" id="headlessui-menu-button-guest">
      <div class="flex items-center gap-[12px]">
        <IconsUserLogo class="w-[24px] h-[24px]" />
        <span
            class=" text-[14px] leading-[48px] font-medium hidden lg:block"
        >Account</span
        >
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
            <div :class="{ 'bg-primary-600': active }">
              Settings
            </div>
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
        </MenuItems>
      </transition>
    </MenuButton>
  </Menu></template>

<script setup>
import { useRouter } from 'vue-router';
const localePath = useLocalePath()

const router = useRouter();

// import AccountIcon from '@/components/icons/UserLogo.vue';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";

// const icons = {
//   AccountIcon,
// };
//
// const items = ref([
//   {
//     label: 'Tickets',
//     items: [
//       {
//         label: 'My Tickets',
//         route: '/hosts/cpanels'
//       },
//       {
//         label: 'My Reports',
//         route: '/hosts/shells'
//       }
//     ]
//   },
//   {
//     label: 'Account',
//     icon: 'AccountIcon',
//     items: [
//       {
//         label: 'Settings',
//         route: '/hosts/cpanels'
//       },
//       {
//         label: 'Orders',
//         route: '/hosts/shells'
//       },
//       {
//         label: 'Add Balance',
//         route: '/add-balance'
//       },
//       {
//         label: 'Logout',
//         route: ''
//       }
//     ]
//   },
// ]);
</script>
