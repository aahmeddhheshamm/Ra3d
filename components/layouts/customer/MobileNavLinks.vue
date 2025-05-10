
<template>

  <div class="dashboard-nav-links overflow-auto ">
    <div class="">
      <div class="!bg-transparent !my-5 !mx-3">
        <Accordion :value="items">
          <AccordionPanel v-for="(tab, index) in items" :key="tab.label" :value="index">
            <AccordionHeader v-if="tab?.items">
              <span class="flex items-center gap-2 panel-item">
                <component :is="icons[tab.icon]" class="" />
                <span class="font-bold flex-1 text-[14px]">{{
                    tab.label
                  }}</span>
              </span>
            </AccordionHeader>
            <div v-else>
              <nuxt-link
                  :to="localePath(tab.route)"
                  class="text-[#9A9CAE] hover:text-white"
                  exact-active-class="!text-white"
                  active-class="link-is-active"
              >
                <div class="flex items-center cursor-pointer px-[13px] py-[8px] panel-item">
                  <component :is="icons[tab.icon]" class="" />
                  <span class="mx-2 text-[14px] font-bold">{{
                      tab.label
                    }}</span>
                </div>
              </nuxt-link>
            </div>
            <AccordionContent v-for="items in tab.items" :key="tab.label">
              <nuxt-link
                  :to="localePath(items.route)"
                  class="text-[#9A9CAE] hover:text-white"
                  exact-active-class="!text-white"
                  active-class="link-is-active"
              >
                <div class="flex items-center cursor-pointer px-[13px] py-[8px] panel-item">
                  <component :is="icons[items.icon]" />
                  <span class="mx-2 text-[14px] font-semibold">{{
                      items.label
                    }}</span>
                </div>
              </nuxt-link>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </div>

<!--  <Accordion :value="selectedAccordion">-->
<!--    <AccordionPanel v-for="(tab, index) in items" :key="tab.label" :value="index">-->
<!--      <AccordionHeader>-->
<!--              <span class="flex items-center gap-2 panel-item">-->
<!--                <component :is="icons[tab.icon]" class="" />-->
<!--                <span class="ml-2 text-[15px] font-medium">{{ tab.label }}</span>-->
<!--              </span>-->
<!--      </AccordionHeader>-->

<!--      <AccordionContent v-for="items in tab?.items" :key="tab?.label">-->
<!--        <nuxt-link-->
<!--            :to="localePath(items?.route)"-->
<!--            class=""-->
<!--            exact-active-class=" "-->
<!--            active-class="link-is-active"-->
<!--        >-->
<!--          <div class="flex items-center cursor-pointer px-[13px] py-[8px] panel-item">-->
<!--            <component :is="icons[items?.icon]" class="" />-->
<!--            <span class="ml-2 text-[14px] font-medium">{{ items.label }}</span>-->
<!--          </div>-->
<!--        </nuxt-link>-->
<!--      </AccordionContent>-->
<!--    </AccordionPanel>-->
<!--  </Accordion>-->


</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const localePath = useLocalePath()

const router = useRouter();

import HostsIcon from '@/components/icons/Hosts.vue';
import SendIcon from '@/components/icons/Send.vue';
import LeadsIcon from '@/components/icons/Leads.vue';
import BusinessIcon from '@/components/icons/Business.vue';
import AccountsIcon from '@/components/icons/Accounts.vue';
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";


const icons = {
  HostsIcon,
  SendIcon,
  LeadsIcon,
  BusinessIcon,
  AccountsIcon
};

const items = ref([
  {
    label: 'Hosts',
    icon: 'HostsIcon',
    items: [
      {
        label: 'Cpanels',
        route: '/hosts/cpanels'
      },
      {
        label: 'Shells',
        route: '/hosts/shells'
      },
      // {
      //   label: 'SSH/WHM',
      //   route: '/hosts/ssh'
      // },
      {
        label: 'RDP',
        route: '/hosts/rdp'
      }
    ]
  },
  {
    label: 'Send',
    icon: 'SendIcon',
    items: [
      {
        label: 'SMTP',
        route: `/send/smtp`
      },
      // {
      //   label: 'Mailers',
      //   url: `/send/mailers`
      // }
    ]
  },
  // {
  //   label: 'Leads',
  //   icon: 'LeadsIcon',
  //   items: [
  //     {
  //       label: '100% Checked Email List',
  //       url: '/leads/checked-email-list'
  //     },
  //     {
  //       label: 'Email Only',
  //       url: '/leads/email-only'
  //     },
  //     {
  //       label: 'Combo Email:Password',
  //       url: '/leads/combo-email-password'
  //     },
  //     {
  //       label: 'Combo Username:Password',
  //       url: '/leads/combo-username-password'
  //     },
  //     {
  //       label: 'Email Access',
  //       url: '/leads/email-access'
  //     },
  //     {
  //       label: 'Combo Email:Hash',
  //       url: '/leads/combo-email-hash'
  //     },
  //     {
  //       label: 'Phone Number Only',
  //       url: '/leads/phone-number-only'
  //     },
  //     {
  //       label: 'Combo Phone:Password',
  //       url: '/leads/combo-phone-password'
  //     },
  //     {
  //       label: 'Full Data',
  //       url: '/leads/full-data'
  //     },
  //     {
  //       label: 'Social Media Data',
  //       url: '/leads/social-media-data'
  //     },
  //   ]
  // },
  {
    label: 'Business',
    icon: 'BusinessIcon',
    items: [
      {
        label: 'Cpanel Webmail',
        route: `/business/cPanel Webmail`
      },
      {
        label: 'Godaddy Webmail',
        route: `/business/GoDaddy Webmail`
      },
      {
        label: 'Office365 Webmail',
        route: `/business/Office 365`
      },
      {
        label: 'Google Workspace',
        route: `/business/Google Workspace`
      },
      {
        label: 'Zoho Mail',
        route: `/business/Zoho Mail`
      },
      {
        label: 'Rackspace Webmail',
        route: `/business/Rackspace Email`
      },
      {
        label: 'Ionos Webmail',
        route: `/business/IONOS Webmail`
      }
    ]
  },
  {
    label: 'Accounts',
    icon: 'AccountsIcon',
    items: [
      {
        label: 'Email Marketing',
        route: `/accounts/email_marketing`
      },
      {
        label: 'Webmail Business',
        route: `/accounts/webmail_business`
      },
      {
        label: 'Marketing Tools',
        route: `/accounts/marketing_tools`
      },
      {
        label: 'Hosting/Domain',
        route: `/accounts/hosting_domain`
      },
      {
        label: 'Games',
        route: `/accounts/games`
      },
      {
        label: 'Graphic/Developer',
        route: `/accounts/graphic_developer`
      },
      {
        label: 'VPN/Socks Proxy',
        route: `/accounts/vpn_socks_proxy`
      },
      {
        label: 'Shopping',
        route: `/accounts/shopping`
      },
      {
        label: 'Program { antivirus, Adobe .... etc }',
        route: `/accounts/program`
      },
      {
        label: 'Stream',
        route: `/accounts/stream`
      },
      {
        label: 'dating',
        route: `/accounts/dating`
      },
      {
        label: 'learning',
        route: `/accounts/learning`
      },
      {
        label: 'Torrent / File Host',
        route: `/accounts/torent`
      },
      {
        label: 'Voip / Sip',
        route: `/accounts/voip`
      },
      {
        label: 'Other',
        route: `/accounts/other`
      },
    ]
  }
]);
</script>
