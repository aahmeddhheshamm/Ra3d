import { ref } from 'vue'
export default function useTransactionsHistoryFields() {
  const transactionsFields = ref([
    {
      key: 'amount',
      label: 'Amount',
    },
    {
      key: 'cryptocurrency',
      label: 'Currency'
    },
    {
      key: 'payment_status',
      label: 'Status'
    },
    {
      key: 'created_at',
      label: 'Date Created',
      type: 'date'
    },
  ])

  return { transactionsFields }
}
