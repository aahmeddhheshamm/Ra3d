import { ref } from 'vue'
export default function useOrdersFields() {
  const router = useRouter()
  const localePath = useLocalePath()

  const fields = ref([
    {
      key: 'type_of_order',
      label: 'Type of Order',
    },
    {
      key: 'cryptocurrency',
      label: 'Crypto Currency',
    },
    {
      key: 'total_price',
      label: 'Total Price'
    },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'created_at',
      label: 'Date Created',
      type: 'date'
    },
  ])

  const actions = ref([
    {
      icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">\n' +
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M1.06794 1.44152L2.13655 0.84082L6.47272 8.15332L6.16817 10.0418L4.33651 9.35456L0 2.04189L1.06794 1.44152ZM5.44863 2.71737V3.56181H10.2498C10.7346 3.56181 11.1327 3.94957 11.1327 4.42156V12.1366C11.1327 12.6086 10.7346 12.9964 10.2498 12.9964H2.32564C1.84086 12.9964 1.44277 12.6086 1.44277 12.1366V7.15981H0.575469V12.1366C0.575469 13.0748 1.36212 13.8408 2.32564 13.8408H10.2498C11.2134 13.8408 12 13.0748 12 12.1366V4.42139C12 3.48328 11.2134 2.71721 10.2498 2.71721L5.44863 2.71737Z" fill="#606075"/>\n' +
          '</svg>',
      text: 'View',
      action: (data) => {
        router.push(localePath({ path: `orders/${data.id}` }))
      }
    }
  ])
  return { fields, actions }
}
