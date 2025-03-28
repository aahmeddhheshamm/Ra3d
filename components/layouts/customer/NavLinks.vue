<template>
  <Menubar :model="items" class="">
      <template #item="{ item, props, hasSubmenu }">
        <nuxt-link v-if="item.route" v-slot="{ href, navigate }" :to="localePath(item.route)" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <component :is="icons[item.icon]" class="" />

<!--            <span :class="item.icon" />-->
            <span class="ml-2 text-[14px] font-medium">{{ item.label }}</span>
          </a>
        </nuxt-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <component :is="icons[item.icon]" class="" />
          <span class="ml-2 text-[14px] font-medium">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
    </Menubar>
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
        url: `/business/cPanel Webmail`
      },
      {
        label: 'Godaddy Webmail',
        url: `/business/GoDaddy Webmail`
      },
      {
        label: 'Office365 Webmail',
        url: `/business/Office 365`
      },
      {
        label: 'Google Workspace',
        url: `/business/Google Workspace`
      },
      {
        label: 'Zoho Mail',
        url: `/business/Zoho Mail`
      },
      {
        label: 'Rackspace Webmail',
        url: `/business/Rackspace Email`
      },
      {
        label: 'Ionos Webmail',
        url: `/business/IONOS Webmail`
      }
    ]
  },
  {
    label: 'Accounts',
    icon: 'AccountsIcon',
    items: [
      {
        label: 'Email Marketing',
        url: `/accounts/email_marketing`
      },
      {
        label: 'Webmail Business',
        url: `/accounts/webmail_business`
      },
      {
        label: 'Marketing Tools',
        url: `/accounts/marketing_tools`
      },
      {
        label: 'Hosting/Domain',
        url: `/accounts/hosting_domain`
      },
      {
        label: 'Games',
        url: `/accounts/games`
      },
      {
        label: 'Graphic/Developer',
        url: `/accounts/graphic_developer`
      },
      {
        label: 'VPN/Socks Proxy',
        url: `/accounts/vpn_socks_proxy`
      },
      {
        label: 'Shopping',
        url: `/accounts/shopping`
      },
      {
        label: 'Program { antivirus, Adobe .... etc }',
        url: `/accounts/program`
      },
      {
        label: 'Stream',
        url: `/accounts/stream`
      },
      {
        label: 'dating',
        url: `/accounts/dating`
      },
      {
        label: 'learning',
        url: `/accounts/learning`
      },
      {
        label: 'Torrent / File Host',
        url: `/accounts/torent`
      },
      {
        label: 'Voip / Sip',
        url: `/accounts/voip`
      },
      {
        label: 'Other',
        url: `/accounts/other`
      },
    ]
  }
]);
</script>
