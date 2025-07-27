// src/composables/useTrades.ts
import { ref } from 'vue'
import { toast } from '@/main'             // ← importe o toast do main.ts
import { useMarketplaceStore } from '@/stores/useMarketplaceStore'

export function useTrades() {
  const marketplace = useMarketplaceStore()
  const loading     = ref(false)
  const error       = ref<string | null>(null)

  // expõe diretamente o array do store (cache)
  const trades = marketplace.trades

  // função unificada: cache + tratamento de erro + toast
  async function fetchTrades(forceReload = false) {
    loading.value = true
    error.value   = null

    try {
      await marketplace.fetchTrades(forceReload)
    } catch (err: any) {
      // monta a mensagem
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Falha ao carregar trocas.'

      // dispara o toast de erro
      toast.error(msg)

      // grava no ref para exibir no template, se quiser
      error.value = msg
    } finally {
      loading.value = false
    }
  }

  return { trades, loading, error, fetchTrades }
}
