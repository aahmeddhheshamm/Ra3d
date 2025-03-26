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
      label: 'Location',
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


  return { fields }
}
