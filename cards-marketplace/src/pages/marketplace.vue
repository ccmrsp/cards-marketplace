<template>
  <div class="bg-[#242424] min-h-screen text-white text-center p-6">

  

    <!-- Solicitações de Troca -->
    <div class="mt-10">
      <h2 class="text-4xl font-bold mb-6">Solicitações de Troca</h2>
      <div v-if="loadingSolicitacoes" class="text-gray-400">Carregando solicitações…</div>
      <div v-else-if="errorSolicitacoes" class="text-red-500">{{ errorSolicitacoes }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="s in solicitacoes"
          :key="s.id"
          class="bg-[#1e1e1e] p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h3 class="text-xl font-bold mb-4">Solicitação de {{ s.user.name }}</h3>

          <div class="flex justify-center gap-8">
            <!-- Oferecendo -->
            <div class="flex flex-col items-center">
              <p class="font-semibold text-sm mb-1">Oferecendo</p>
              <img
                class="w-28 h-40 object-cover rounded border border-gray-500"
                :src="s.tradeCards.find((c: any) => c.type === 'OFFERING')?.card.imageUrl"
                alt="Carta Oferecida"
              />
              <p class="mt-2 text-sm font-medium">
                {{ s.tradeCards.find((c: any) => c.type === 'OFFERING')?.card.name }}
              </p>
            </div>

            <!-- Desejando -->
            <div class="flex flex-col items-center">
              <p class="font-semibold text-sm mb-1">Desejando</p>
              <img
                class="w-28 h-40 object-cover rounded border border-gray-500"
                :src="s.tradeCards.find((c: any) => c.type === 'RECEIVING')?.card.imageUrl"
                alt="Carta Desejada"
              />
              <p class="mt-2 text-sm font-medium">
                {{ s.tradeCards.find((c: any) => c.type === 'RECEIVING')?.card.name }}
              </p>
            </div>
          </div>

          <!-- Botão Quero Trocar -->
          <button
            class="mt-6 px-6 py-2 !bg-purple-800 !text-gray-300 shadow-md transition-all hover:!bg-gray-200 hover:shadow-purple-800 hover:!text-purple-800 rounded-full font-semibold"
            @click="queroTrocar(s)"
          >
            Quero trocar
          </button>
        </div>
      </div>
    </div>

    <!-- Botão para recarregar trocas -->
    <button
      @click="fetchTrades(true)"
      class="mt-12 px-6 py-2 bg-black text-white rounded-full hover:bg-purple-700"
    >
      Recarregar Trocas
    </button>

    <!-- Cartas disponíveis -->
    <h2 class="text-4xl font-bold mb-4 mt-16">Cartas disponíveis</h2>
    <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="card in cards"
        :key="card.id"
        class="bg-[#1e1e1e] rounded-lg p-2 flex flex-col items-center"
      >
        <img
          :src="card.imageUrl"
          :alt="card.name"
          class="w-full h-64 object-cover rounded-md"
        />
        <p class="text-white text-center mt-2 font-semibold text-sm">
          {{ card.name }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/services/api'
import TradeList from '@/components/trade-list.vue'
import { useTrades } from '@/composables/useTrades'

// Token do usuário
const token = localStorage.getItem('token')

// Cartas do sistema
const cards = ref<any[]>([])
async function fetchCards() {
  const res = await axios.get('/cards', {
    params: { rpp: 50, page: 1 },
    headers: { Authorization: `Bearer ${token}` }
  })
  cards.value = res.data.list
}

// Trocas com cache
const { trades, loading, error, fetchTrades } = useTrades()

// Solicitações de troca
const solicitacoes = ref<any[]>([])
const loadingSolicitacoes = ref(false)
const errorSolicitacoes = ref('')

async function fetchSolicitacoes() {
  loadingSolicitacoes.value = true
  errorSolicitacoes.value = ''
  try {
    const res = await axios.get('/trades', {
      params: { rpp: 50, page: 1 },
      headers: { Authorization: `Bearer ${token}` }
    })
    solicitacoes.value = res.data.list
  } catch (err: any) {
    console.error('Erro ao buscar solicitações:', err)
    errorSolicitacoes.value = 'Erro ao carregar solicitações.'
  } finally {
    loadingSolicitacoes.value = false
  }
}

// Clique em "Quero trocar"
function queroTrocar(solicitacao: any) {
  alert(`Você clicou para trocar com ${solicitacao.user.name}`)
  // Aqui você pode implementar POST futuramente
}

// Inicialização
onMounted(() => {
  fetchCards()
  fetchTrades()
  fetchSolicitacoes()
})
</script>
