import { ref } from 'vue'
export default function useCoursesFields() {

  const fields = ref([
    {
      key: 'domain',
      label: 'Website Domain',
    },
    {
      key: 'source',
      label: 'Source',
    },
    {
      key: 'location',
      label: 'Country',
    },
    {
      key: 'niche',
      label: 'Niche'
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

  ])


  return { fields }
}
