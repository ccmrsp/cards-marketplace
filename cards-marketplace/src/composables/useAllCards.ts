import { ref } from 'vue'
import api from '@/services/api'

export function useAllCards() {
  const cards   = ref<any[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)
  const page    = ref(1)
  const rpp     = ref(10)

  /** Busca **todas** as cartas do sistema, paginadas */
  async function fetchAllCards(reset = false) {
    if (reset) page.value = 1
    loading.value = true
    error.value   = null
    try {
      // GET /cards?page=…&rpp=…
      const res = await api.get('/cards', {
        params: { page: page.value, rpp: rpp.value }
      })
      // a API devolve { list: [...], page, rpp, more }
      cards.value = res.data.list
    } catch (e: any) {
      error.value = e.response?.data?.message || e.message
    } finally {
      loading.value = false
    }
  }

  return { cards, loading, error, fetchAllCards }
}
