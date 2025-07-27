// src/stores/useUserCardsStore.ts
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Card } from '@/models/card'

export const useUserCardsStore = defineStore('userCards', {
  state: () => ({
    cards: [] as Card[],
    page: 1,         // valor padrão
    rpp: 10          // valor padrão
  }),
  actions: {
    /**
     * @param reset se true, volta a paginação para 1
     */
    async fetchUserCards(reset = false) {
      if (reset) this.page = 1

      const res = await api.get('/user/cards', {
        params: {
          page: this.page,
          rpp: this.rpp
        }
      })
      this.cards = res.data
    },
    // opcional: nextPage(), prevPage(), etc.
  }
})
