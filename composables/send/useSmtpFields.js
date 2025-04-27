import { ref } from 'vue'
export default function useCoursesFields() {

  const fields = ref([
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'smtp_type',
      label: 'Type'
    },
    {
      key: 'username',
      label: 'username'
    },
    {
      key: 'hosting',
      label: 'Hosting',
    },
    {
      key: 'ip',
      label: 'IP'
    },
    {
      key: 'port',
      label: 'Port'
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
