import { ref } from 'vue'
import api from '@/services/api'

export function useUserCards() {
  const cards   = ref<any[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  /** Busca **todas** as cartas do usuário logado */
  async function fetchUserCards() {
    loading.value = true
    error.value   = null
    try {
      // GET /me/cards retorna diretamente o array de cartas do usuário
      const res = await api.get('/me/cards')
      cards.value = res.data
    } catch (e: any) {
      error.value = e.response?.data?.message || e.message
    } finally {
      loading.value = false
    }
  }

  return { cards, loading, error, fetchUserCards }
}
