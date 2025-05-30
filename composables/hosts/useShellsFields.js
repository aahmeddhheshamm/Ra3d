import { ref } from 'vue'
export default function useCoursesFields() {

  const fields = ref([

    {
      key: 'ssl',
      label: 'SSL',
    },
    {
      key: 'shell_type',
      label: 'Type'
    },
    {
      key: 'tld',
      label: 'TLD'
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
      key: 'buy',
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


  return { fields }
}
