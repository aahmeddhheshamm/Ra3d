import { ref } from 'vue'
export default function useRdpFields(markSoldAction, markUnSoldAction, deleteAction) {
  const router = useRouter()
  const localePath = useLocalePath()

  const fields = ref([
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'ip',
      label: 'IP',
    },
    {
      key: 'username',
      label: 'Username'
    },
    {
      key: 'rdp_type',
      label: 'Type'
    },
    {
      key: 'access_type',
      label: 'Access Type'
    },
    {
      key: 'windows_type',
      label: 'Window Type'
    },
    {
      key: 'cpu_cores',
      label: 'CPU Cores'
    },
    {
      key: 'ram_size',
      label: 'RAM Size'
    },
    {
      key: 'hosting',
      label: 'Hosting',
    },
    {
      key: 'price',
      label: 'Price',
    },
    {
      key: 'user',
      label: 'Seller',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'total',
      label: 'Buy',
    },
    {
      key: 'created_at',
      label: 'Date Created',
      type: 'date'
    },
    // {
    //   label: 'actions',
    //   type: 'actions',
    // }
  ])

  const actions = ref([
    {
      icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">\n' +
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M1.06794 1.44152L2.13655 0.84082L6.47272 8.15332L6.16817 10.0418L4.33651 9.35456L0 2.04189L1.06794 1.44152ZM5.44863 2.71737V3.56181H10.2498C10.7346 3.56181 11.1327 3.94957 11.1327 4.42156V12.1366C11.1327 12.6086 10.7346 12.9964 10.2498 12.9964H2.32564C1.84086 12.9964 1.44277 12.6086 1.44277 12.1366V7.15981H0.575469V12.1366C0.575469 13.0748 1.36212 13.8408 2.32564 13.8408H10.2498C11.2134 13.8408 12 13.0748 12 12.1366V4.42139C12 3.48328 11.2134 2.71721 10.2498 2.71721L5.44863 2.71737Z" fill="#606075"/>\n' +
          '</svg>',
      text: 'Sold',
      action: (data) => {
        markSoldAction(data)
      }
    },
    {
      icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">\n' +
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M1.06794 1.44152L2.13655 0.84082L6.47272 8.15332L6.16817 10.0418L4.33651 9.35456L0 2.04189L1.06794 1.44152ZM5.44863 2.71737V3.56181H10.2498C10.7346 3.56181 11.1327 3.94957 11.1327 4.42156V12.1366C11.1327 12.6086 10.7346 12.9964 10.2498 12.9964H2.32564C1.84086 12.9964 1.44277 12.6086 1.44277 12.1366V7.15981H0.575469V12.1366C0.575469 13.0748 1.36212 13.8408 2.32564 13.8408H10.2498C11.2134 13.8408 12 13.0748 12 12.1366V4.42139C12 3.48328 11.2134 2.71721 10.2498 2.71721L5.44863 2.71737Z" fill="#606075"/>\n' +
          '</svg>',
      text: 'Unsold',
      action: (data) => {
        markUnSoldAction(data)
      }
    },

    {
      icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">\n' +
          '<path d="M0.0293579 1.68502H0.0505345L0.673475 10.6966C0.721123 11.4275 1.32642 12.0002 2.05348 12.0002H7.53465C8.26171 12.0002 8.867 11.4275 8.91465 10.6966L9.53759 1.68502H9.55877V0.973633H0.0293579V1.68502ZM6.3823 3.28566C6.3823 3.09002 6.54112 2.92996 6.73524 2.92996C6.92936 2.92996 7.08818 3.09002 7.08818 3.28566V9.86603C7.08818 10.0617 6.92936 10.2217 6.73524 10.2217C6.54112 10.2217 6.3823 10.0617 6.3823 9.86603V3.28566ZM4.44112 3.28566C4.44112 3.09002 4.59995 2.92996 4.79406 2.92996C4.98818 2.92996 5.147 3.09002 5.147 3.28566V9.86603C5.147 10.0617 4.98818 10.2217 4.79406 10.2217C4.59995 10.2217 4.44112 10.0617 4.44112 9.86603V3.28566ZM2.49995 3.28566C2.49995 3.09002 2.65877 2.92996 2.85289 2.92996C3.047 2.92996 3.20583 3.09002 3.20583 3.28566V9.86603C3.20583 10.0617 3.047 10.2217 2.85289 10.2217C2.65877 10.2217 2.49995 10.0617 2.49995 9.86603V3.28566Z" fill="#606075"/>\n' +
          '</svg>',
      text: 'Delete',
      action: (data) => {
        deleteAction(data)
      }
    }
  ])
  return { fields, actions }
}
