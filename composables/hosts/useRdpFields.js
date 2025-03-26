import { ref } from 'vue'
export default function useCoursesFields() {

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


  return { fields }
}
