<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
// import useNotifications from "~/composables/useNotifications.js";
import useWalletBalance from "~/composables/wallet/useWalletBalance.js";
// const {notifications, pending} = await useNotifications();

const localePath = useLocalePath()
const {user, removeUserData} = useAuth()
const localPath = useLocalePath();
const {$intercept} = useNuxtApp()
const {walletBalance, pending: walletBalancePending} = await useWalletBalance();

const apiLogout = () => $intercept('oauth/logout/', {
  method: "POST",
})

const {mutate, isPending} = useMutate({
  mutationFn: apiLogout,
});

function logout() {
  mutate('' ,{
    onSuccess(res){
      removeUserData()
      setTimeout(()=>{
        navigateTo(localePath('/auth/login'));
      },3000)
    },
  });
}

</script>
<template>

  <header class="fixed top-0 !z-[999999] inset-0 w-full h-[80px] flex  items-center bg-white  shadow-sm">
    <div class="container flex justify-between items-center lg:justify-normal lg:gap-[32px]">
      <nuxt-link :to="localPath('/')">
        <IconsTheLogo class="w-[49px] h-[59px]" />
      </nuxt-link>
      <nav class="gap-[32px] items-end flex-1 hidden lg:flex">
        <LayoutsCustomerNavLinks />
      </nav>
      <div class="flex items-center gap-[12px]">
        <nuxt-link :to="localPath('/notifications')" class="">
          <IconsNotificationIcon  />
        </nuxt-link>
<!--        <Menu as="div">-->
<!--          <MenuButton class="relative" id="headlessui-menu-button-customer">-->
<!--            <div class="pt-[4px]">-->
<!--              <IconsNotificationIcon  />-->
<!--            </div>-->
<!--            <transition-->
<!--                enter-active-class="transition ease-out duration-100"-->
<!--                enter-from-class="transform opacity-0 scale-95"-->
<!--                enter-to-class="transform opacity-100 scale-100"-->
<!--                leave-active-class="transition ease-in duration-75"-->
<!--                leave-from-class="transform opacity-100 scale-100"-->
<!--                leave-to-class="transform opacity-0 scale-95"-->
<!--            >-->
<!--              <MenuItems-->
<!--                  class="absolute z-10 bg-white rounded-[10px] end-0 overflow-hidden menu-items"-->
<!--              >-->
<!--                <MenuItem-->
<!--                    v-slot="{ active }"-->
<!--                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap  text-gray-900 text-[14px] leading-normal font-medium justify-center"-->
<!--                    @click=""-->
<!--                >-->
<!--                  <div :class="{ 'bg-primary-600': active }">-->
<!--&lt;!&ndash;                    {{notifications.results}}&ndash;&gt;-->
<!--                    No notification-->
<!--                  </div>-->
<!--                </MenuItem>-->

<!--              </MenuItems>-->
<!--            </transition>-->
<!--          </MenuButton>-->
<!--        </Menu>-->
        <nuxt-link :to="localPath('/add-balance')" class="bg-red-600 rounded-[4px] px-[8px] pb-[4px] pt-[6px] cursor-pointer flex items-center justify-center">
          <span class="text-white text-[12px] font-medium leading-2">{{walletBalance.balance}}$</span>
        </nuxt-link>
        <nuxt-link :to="localPath('/tickets')">
          <div class="flex items-center gap-[4px]">
            <IconsTicketsIcon class="w-[24px] h-[24px]" />
            <span class=" text-[14px] leading-[48px] font-medium hidden lg:block">Tickets</span>
          </div>
        </nuxt-link>
<!--        <div class="hidden lg:flex">-->
<!--          <Menu as="div">-->
<!--          <MenuButton class="relative" id="headlessui-menu-button-guest">-->
<!--            <div class="flex items-center gap-[12px]">-->
<!--              <IconsTicketsIcon class="w-[24px] h-[24px]" />-->
<!--              <span-->
<!--                  class=" text-[14px] leading-[48px] font-medium hidden lg:block"-->
<!--              >Tickets</span>-->
<!--            </div>-->
<!--            <transition-->
<!--                enter-active-class="transition ease-out duration-100"-->
<!--                enter-from-class="transform opacity-0 scale-95"-->
<!--                enter-to-class="transform opacity-100 scale-100"-->
<!--                leave-active-class="transition ease-in duration-75"-->
<!--                leave-from-class="transform opacity-100 scale-100"-->
<!--                leave-to-class="transform opacity-0 scale-95"-->
<!--            >-->
<!--              <MenuItems-->
<!--                  class="absolute z-10 bg-white rounded-[10px] end-0 overflow-hidden menu-items"-->
<!--              >-->
<!--                <MenuItem-->
<!--                    v-slot="{ active }"-->
<!--                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"-->
<!--                    @click=""-->
<!--                >-->
<!--                  <nuxt-link :to="localPath('/tickets')" exact-active-class="bg-blue-400 text-white" >-->
<!--                      <span  class=" text-[14px] leading-[48px] font-medium hidden lg:block"> My Tickets</span>-->
<!--                  </nuxt-link>-->
<!--                </MenuItem>-->
<!--                <MenuItem-->
<!--                    v-slot="{ active }"-->
<!--                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"-->
<!--                    @click=""-->
<!--                >-->
<!--                  <nuxt-link :to="localPath('/reports')" exact-active-class="bg-blue-400 text-white" >-->
<!--                    <span  class=" text-[14px] leading-[48px] font-medium hidden lg:block">My Reports</span>-->
<!--                  </nuxt-link>-->

<!--                </MenuItem>-->
<!--              </MenuItems>-->
<!--            </transition>-->
<!--          </MenuButton>-->
<!--        </Menu>-->
<!--        </div>-->
        <Menu as="div">
          <MenuButton class="relative" id="headlessui-menu-button-guest">
            <div class="flex items-center gap-[4px]">
              <IconsUserLogo class="w-[22px] h-[22px] lg:mt-0 mt-1" />
              <span
                  class=" text-[14px] leading-[48px] font-semibold hidden lg:block capitalize"
              >{{user?.username}}</span
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
                  <nuxt-link :to="localPath('/settings')" :class="{ 'bg-primary-600': active }">
                    Settings
                  </nuxt-link>
                </MenuItem>
                <MenuItem
                    v-slot="{ active }"
                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                    @click=""
                >
                  <nuxt-link :to="localPath('/orders')" :class="{ 'bg-primary-600': active }">
                    Orders
                  </nuxt-link>
                </MenuItem>
                <MenuItem
                    v-slot="{ active }"
                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                    @click=""
                >
                  <nuxt-link :to="localPath('/add-balance')" :class="{ 'bg-primary-600': active }">
                    Withdraw
                  </nuxt-link>
                </MenuItem>
                <MenuItem
                    v-if="user?.status == 'SELLER' || user?.status == 'ADMIN'"
                    v-slot="{ active }"
                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                >
                    <nuxt-link :to="localPath('/dashboard')" :class="{ 'bg-primary-600': active }">
                    Dashboard
                  </nuxt-link>
                </MenuItem>
                <MenuItem
                    v-if="user?.status === 'BUYER'"
                    v-slot="{ active }"
                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                >
                  <nuxt-link :to="localPath('/join-as-seller')" :class="{ 'bg-primary-600': active }">
                    Join As Seller
                  </nuxt-link>
                </MenuItem>
                <MenuItem
                    v-slot="{ active }"
                    class="px-[32px] py-[8px] w-[125px] h-[41px] flex items-center text-nowrap border-b-[0.8px] border-gray-10 text-gray-900 text-[14px] leading-normal font-medium justify-center"
                    @click="logout"
                >
                  <div :class="{ 'bg-primary-600': active }">
                    Logout
                  </div>
                </MenuItem>
              </MenuItems>
            </transition>
          </MenuButton>
        </Menu>

<!--        <LayoutsCustomerUserAccount />-->

        <LayoutsCustomerSideBar>
          <template #buttonContent>
            <IconsMenuIcon class="fill-black w-[22px] h-[22px]" />
          </template>
          <template #sideBarLinks>
            <LayoutsCustomerMobileNavLinks />
<!--            <LayoutsCustomerNavLinks />-->
<!--            <LayoutsCustomerUserAccount />-->
          </template>
        </LayoutsCustomerSideBar>
      </div>
    </div>
  </header>

</template>
<style scoped lang="scss">
@media (max-width: 1023px) {
  .menu-items {
    top: 32px;
  }
}
html:has(.loading-indicator-special) header{
  @apply ltr:pe-[5px] rtl:ps-[5px];

}
</style>
