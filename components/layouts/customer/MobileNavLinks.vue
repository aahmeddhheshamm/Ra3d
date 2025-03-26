
<template>


  <Accordion :value="selectedAccordion">
    <AccordionPanel v-for="(tab, index) in items" :key="tab.label" :value="index">
      <AccordionHeader>
              <span class="flex items-center gap-2 panel-item">
                <component :is="icons[tab.icon]" class="" />
                <span class="ml-2 text-[15px] font-medium">{{ tab.label }}</span>
              </span>
      </AccordionHeader>

      <AccordionContent v-for="items in tab?.items" :key="tab?.label">
        <router-link
            :to="localePath(items?.route)"
            class=""
            exact-active-class=" "
            active-class="link-is-active"
        >
          <div class="flex items-center cursor-pointer px-[13px] py-[8px] panel-item">
            <component :is="icons[items?.icon]" class="" />
            <span class="ml-2 text-[14px] font-medium">{{ items.label }}</span>
          </div>
        </router-link>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>


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
      {
        label: 'SSH/WHM',
        route: '/hosts/ssh'
      },
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
        url: `/send/smtp`
      },
      {
        label: 'Mailers',
        url: `/send/mailers`
      }
    ]
  },
  {
    label: 'Leads',
    icon: 'LeadsIcon',
    items: [
      {
        label: '100% Checked Email List',
        url: '/leads/checked-email-list'
      },
      {
        label: 'Email Only',
        url: '/leads/email-only'
      },
      {
        label: 'Combo Email:Password',
        url: '/leads/combo-email-password'
      },
      {
        label: 'Combo Username:Password',
        url: '/leads/combo-username-password'
      },
      {
        label: 'Email Access',
        url: '/leads/email-access'
      },
      {
        label: 'Combo Email:Hash',
        url: '/leads/combo-email-hash'
      },
      {
        label: 'Phone Number Only',
        url: '/leads/phone-number-only'
      },
      {
        label: 'Combo Phone:Password',
        url: '/leads/combo-phone-password'
      },
      {
        label: 'Full Data',
        url: '/leads/full-data'
      },
      {
        label: 'Social Media Data',
        url: '/leads/social-media-data'
      },
    ]
  },
  {
    label: 'Business',
    icon: 'BusinessIcon',
    items: [
      {
        label: 'Cpanel Webmail',
        url: 'https://vuejs.org/'
      },
      {
        label: 'Godaddy Webmail',
        url: 'https://vitejs.dev/'
      },
      {
        label: 'Office Godaddy Webmail',
        url: 'https://vitejs.dev/'
      },
      {
        label: 'Office365 Webmail',
        url: 'https://vitejs.dev/'
      },
      {
        label: 'Rackspace Webmail',
        url: 'https://vitejs.dev/'
      },
      {
        label: 'Ionos Webmail',
        url: 'https://vitejs.dev/'
      }
    ]
  },
  {
    label: 'Accounts',
    icon: 'AccountsIcon',
    items: [
      {
        label: 'Vue.js',
        url: 'https://vuejs.org/'
      },
      {
        label: 'Vite.js',
        url: 'https://vitejs.dev/'
      }
    ]
  },
  {
    label: 'Tickets',
    items: [
      {
        label: 'My Tickets',
        url: 'https://vuejs.org/'
      },
      {
        label: 'My Reports',
        url: 'https://vitejs.dev/'
      }
    ]
  }
]);
</script>
