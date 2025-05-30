import { ref } from 'vue'
export default function useCoursesFields() {

  const fields = ref([
    {
      key: 'proof',
      label: 'Website Domain',
    },
    {
      key: 'type',
      label: 'Type',
    },
    {
      key: 'country',
      label: 'Country',
    },
    {
      key: 'details',
      label: 'details'
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
