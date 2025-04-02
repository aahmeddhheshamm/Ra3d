import { computed } from 'vue';
import { useRoute } from 'vue-router';

import RolesPermissions from '@/components/icons/RolesPermissions.vue';
import Lock from '@/components/icons/Lock.vue';
import User from '@/components/icons/User.vue';
import Tags from '@/components/icons/Tags.vue';

const icons = {
  RolesPermissions,
  Lock,
  User,
  Tags,
};

export function useMenuItems() {
  const route = useRoute();
  const menuItems = computed(() => [
    {
      label: 'Dashboard',
      icon: 'RolesPermissions',
      route: '/dashboard',
    },
    {
      label: 'My Sales',
      icon: 'RolesPermissions',
      items: [
        {
          label: 'Sales',
          icon: 'Lock',
          route: '/dashboard/products/smil',
        },
        {
          label: 'Withdraw',
          icon: 'User',
          route: '/dashboard/products/rdp',
        },
        {
          label: 'Reports',
          icon: 'User',
          route: '/dashboard/products/rdp',
        }
      ]
    },

    {
      label: 'My Products',
      icon: 'Tags',
      items: [
        {
          label: 'RDP',
          route: '/dashboard/products/rdp',
        },
        {
          label: 'cPanels',
          route: '/dashboard/products/cpanel',
        },
        {
          label: 'Shells',
          route: '/dashboard/products/shells',
        },
        {
          label: 'SMTP',
          route: '/dashboard/products/smtp',
        },
        {
          label: 'Webmail',
          route: '/dashboard/products/webmail',
        },
        {
          label: 'Accounts',
          route: '/dashboard/products/accounts',
        },
      ]
    },

  ]);

  const selectedAccordion = computed(() => {
    return menuItems.value.findIndex((menuItem) => {
      if (menuItem?.items) {
        return menuItem?.items.some((subItem) => {
          if (subItem.route === route.name) {
            return true;
          } else if (route.matched.length > 1 && route.matched[0].name === subItem.route) {
            return true;
          }
          return false;
        });
      } else {
        return menuItem?.route === route.name;
      }
    });
  });

  return { icons, selectedAccordion, menuItems };
}
