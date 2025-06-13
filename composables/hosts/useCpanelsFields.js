import { ref } from 'vue'
export default function useCoursesFields() {

  const fields = ref([
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'ssl',
      label: 'SSL',
    },
    {
      key: 'cpanel_type',
      label: 'Source'
    },
    {
      key: 'tld',
      label: 'TLD'
    },
    {
      key: 'hosting',
      label: 'Hosting',
    },
    {
      key: 'username',
      label: 'Username',
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
