// src/stores/useMarketplaceStore.ts
import { defineStore } from 'pinia'
import axios from '@/services/api'

export const useMarketplaceStore = defineStore('marketplace', {
  state: () => ({
    trades: [] as any[],
    loaded: false,
    lastFetched: 0
  }),
  actions: {
    async fetchTrades(forceReload = false) {
      const now = Date.now()
      const cacheDuration = 60 * 1000 // 1 minuto

      // Se já carregado, não tiver forçado reload e cache ainda válido:
      if (this.loaded && !forceReload && (now - this.lastFetched < cacheDuration)) {
        return
      }

      try {
        const response = await axios.get('/trades')  // ajuste a rota se precisar
        this.trades = response.data
        this.loaded = true
        this.lastFetched = now
      } catch (err) {
        console.error('Erro ao buscar trocas:', err)
      }
    }
  }
})
