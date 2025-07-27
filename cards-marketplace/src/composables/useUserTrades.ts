import { ref } from 'vue'
import api from '@/services/api'

export function useUserTrades() {
  const trades  = ref<any[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)
  const page    = ref(1)
  const rpp     = ref(10)

  async function fetchUserTrades(reset = false, filterByUser = true) {
    if (reset) page.value = 1
    loading.value = true
    error.value = null

    try {
      const res = await api.get('/trades', {
        params: { page: page.value, rpp: rpp.value }
      })

      const list = res.data.list || []
      if (filterByUser) {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const userId = String(user?.id)
        trades.value = list.filter((trade: any) =>
  String(trade.user?.id || trade.userId) === userId
)
      } else {
        trades.value = list
      }
    } catch (e: any) {
      error.value = e.response?.data?.message || e.message
    } finally {
      loading.value = false
    }
  }

  return { trades, loading, error, fetchUserTrades }
}
