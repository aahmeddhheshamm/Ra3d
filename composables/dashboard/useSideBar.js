import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Dashboard from '@/components/icons/DashboardIcon.vue';
import RolesPermissions from '@/components/icons/RolesPermissions.vue';
import Orders from '@/components/icons/OrdersIcon.vue';
import Wallet from '@/components/icons/WalletIcon.vue';
import Withdraw from '@/components/icons/WithdrawIcon.vue';
import Sales from '@/components/icons/SalesIcon.vue';
import User from '@/components/icons/User.vue';
import Tags from '@/components/icons/Tags.vue';
import Products from '@/components/icons/ProductsIcon.vue';
const {user} = useAuth()
const icons = {
  Dashboard,
  RolesPermissions,
  Orders,
  Wallet,
  Withdraw,
  Sales,
  User,
  Tags,
  Products,
};

export function useMenuItems() {
  const route = useRoute();
  const rawMenuItems = computed(() => [
    {
      label: 'Dashboard',
      icon: 'Dashboard',
      route: '/dashboard',
      permission: ['ADMIN', 'SELLER']
    },
    {
      label: 'Buyer Requests',
      icon: 'RolesPermissions',
      route: '/dashboard/buyer-requests',
      permission: ['ADMIN']
    },
    {
      label: 'My Sales',
      icon: 'Sales',
      items: [
        {
          label: 'Orders',
          icon: 'Orders',
          route: '/dashboard/sales/orders',
        },
        {
          label: 'Wallet',
          icon: 'Wallet',
          route: '/dashboard/sales/wallet',
        },
        {
          label: 'Withdraw',
          icon: 'Withdraw',
          route: '/dashboard/sales/withdraw',
        },
        {
          label: 'Tickets',
          icon: 'Tags',
          route: '/dashboard/sales/tickets',
        }
      ],
      permission: ['ADMIN', 'SELLER']
    },

    {
      label: 'My Products',
      icon: 'Products',
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
      ],
      permission: ['ADMIN', 'SELLER']
    },

  ]);

  const menuItems = computed(() => {
    return rawMenuItems.value.filter(item => {
      if (!item.permission) return true;
      return item.permission.includes(user.value?.status);
    });
  });

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

  // const selectedAccordion = computed(() => {
  //   return menuItems.value.findIndex((menuItem) => {
  //     if (menuItem?.items) {
  //       return menuItem?.items.some((subItem) => {
  //         if (subItem.route === route.name) {
  //           return true;
  //         } else if (route.matched.length > 1 && route.matched[0].name === subItem.route) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     } else {
  //       return menuItem?.route === route.name;
  //     }
  //   });
  // });

  return { icons, selectedAccordion, menuItems };
}
