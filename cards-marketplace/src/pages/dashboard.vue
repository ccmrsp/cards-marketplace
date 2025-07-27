<template>
  <div class="mt-5 p-12 relative">
    <!-- 1) Minhas Cartas -->
    <h2 class="text-2xl font-semibold">Minhas Cartas</h2>
    <p v-if="loadingCards">Carregando cartas…</p>
    <p v-else-if="errorCards" class="text-red-500">{{ errorCards }}</p>

    <!-- Cartas do usuário com imagens reais -->
    <div class="mt-4 mb-4 grid grid-cols-4 gap-4">
      <div
        v-for="card in cardsUser"
        :key="card.id"
        class="cursor-pointer"
        @click="openLightbox(card.imageUrl)"
      >
        <img
          :src="card.imageUrl"
          :alt="card.name"
          class="w-full h-64 object-cover rounded"
        />
        <p class="text-white text-center mt-2">{{ card.name }}</p>
      </div>
    </div>

    <!-- Botão Adicionar Carta -->
    <div class="flex items-center gap-4">
      <button
        @click="showAddModal = true"
        class="mt-8 !bg-purple-800 !text-gray-300 py-2 px-4 rounded-full shadow-md transition-all hover:!bg-gray-200 hover:shadow-purple-800 hover:!text-purple-800"
      >
        Adicionar Carta
      </button>
    </div>

<!-- Modal de Adição de Carta -->
<div
  v-if="showAddModal"
  class="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
  @click.self="showAddModal = false"
>
  <div class="bg-white rounded-lg w-96 p-6 relative">
    
    <!-- Botão de Fechar -->
    <button
      class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center !bg-gray-300 rounded-full text-gray-600 hover:!bg-purple-200 hover:!text-purple-800 text-base"
      @click="showAddModal = false"
    >
      ×
    </button>

    <!-- Título -->
    <h3 class="text-xl font-semibold mb-4 text-neutral-800">Adicionar Carta</h3>

    <!-- Campo Select com título -->
    <div class="flex flex-col mb-4">
      <label class="mb-1 text-sm font-medium text-neutral-700">Selecione uma carta</label>
      <select
        v-model="selectedCardId"
        class="w-full p-2 border border-gray-300 !text-neutral-800 rounded-full focus:outline-none">
        <option v-for="card in cardsAll" :key="card.id" :value="card.id">
          {{ card.name }}
        </option>
      </select>
    </div>

    <!-- Botão de Adicionar -->
    <button
      :disabled="!selectedCardId"
      @click="handleUploadCard"
      class="w-full !bg-purple-800 text-white px-4 py-2 rounded-full transition  hover:!bg-purple-600"
    >
      Adicionar à minha conta
    </button>
  </div>
</div>

    <!-- 5) Minhas Solicitações de Troca -->
    <h2 class="mt-8 text-2xl font-semibold">Minhas Solicitações de Troca</h2>

   <!-- Formulário Inline -->
<div class="bg-white p-6 rounded shadow mt-4 max-w-3xl mx-auto text-center">
  <h3 class="text-lg font-semibold mb-4 text-neutral-700">Criar nova troca</h3>
  <div class="flex flex-col sm:flex-row gap-4 justify-center items-end">
    
    <!-- Campo Tenho -->
    <div class="flex flex-col w-full sm:w-1/3">
      <label class="mb-1 text-sm font-medium text-neutral-700">Tenho</label>
      <select
        v-model="selectedOfferId"
        class="p-2 border-2 border-gray-300 !text-neutral-700 rounded-full focus:outline-none"
      >
        <option disabled value="">
          {{ selectedOfferLabel || 'Selecione' }}
        </option>
        <option v-for="card in cardsUser" :key="card.id" :value="card.id">
          {{ card.name }}
        </option>
      </select>
    </div>

    <!-- Campo Quero -->
    <div class="flex flex-col w-full sm:w-1/3">
      <label class="mb-1 text-sm font-medium text-neutral-700">Quero</label>
      <select
        v-model="selectedRequestId"
        class="p-2 border-2 border-gray-300 !text-neutral-700 rounded-full focus:outline-none"
      >
        <option disabled value="">
          {{ selectedRequestLabel || 'Selecione' }}
        </option>
        <option v-for="card in cardsAll" :key="card.id" :value="card.id">
          {{ card.name }}
        </option>
      </select>
    </div>

    <!-- Botão Criar Troca -->
    <button
      @click="submitTrade"
      :disabled="!selectedOfferId || !selectedRequestId"
      class="!bg-purple-800 text-white px-6 py-2 rounded-full hover:!bg-purple-600 transition">
      Criar Troca
    </button>
  </div>
</div>
    <!-- Listagem de trocas -->
    <button
      @click="reloadUserTrades"
      class="mt-4 mb-4  !bg-purple-800 text-white px-6 py-2 rounded-full hover:!bg-gray-200 hover:text-purple-800 transition-all">
      Recarregar Minhas Trocas
    </button>

    <!-- Listagem de trocas -->
    <p v-if="loadingTrades">Carregando suas trocas…</p>
    <p v-else-if="errorTrades" class="text-red-500">{{ errorTrades }}</p>
    <ul v-else-if="tradesUser.length" class="space-y-4">
      <li v-for="trade in tradesUser" :key="trade.id" class="p-4 !bg-purple-200/1 rounded shadow">
        <p class="font-semibold text-xl text-neutral-100">
          Solicitação de {{ trade.user?.name || 'Usuário' }}
        </p>
            <div class="flex justify-center gap-12 mt-4">
                <div class="text-center">
                  <p class="text-xm mb-2 text-gray-200">Oferecendo</p>
                  <img :src="getCardImage(trade.tradeCards, 'OFFERING')" class="h-32 mx-auto" />
                  <p class="text-sm">{{ getCardName(trade.tradeCards, 'OFFERING') }}</p>
                </div>
                <div class="text-center">
                  <p class="text-xm mb-2 text-gray-200">Desejando</p>
                  <img :src="getCardImage(trade.tradeCards, 'RECEIVING')" class="h-32 mx-auto" />
                  <p class="text-sm">{{ getCardName(trade.tradeCards, 'RECEIVING') }}</p>
                </div>
              </div>
        <button
          @click="handleDeleteTrade(trade.id)"
          class="!bg-gray-500 text-white px-6 py-2 rounded-full mt-5 hover:!bg-purple-600 transition">
          Deletar Troca
        </button>
      </li>
    </ul>
    <p v-else class="text-sm text-gray-400">Nenhuma troca encontrada</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import CardList from '@/components/card-list.vue'
import { useUserCards } from '@/composables/useUserCards'
import { useUserTrades } from '@/composables/useUserTrades'
import { useAllCards } from '@/composables/useAllCards'

// Cartas do usuário logado
const {
  cards: cardsUser,
  loading: loadingCards,
  error: errorCards,
  fetchUserCards: reloadUserCards
} = useUserCards()

// Trocas do usuário logado
const {
  trades: tradesUser,
  loading: loadingTrades,
  error: errorTrades,
  fetchUserTrades
} = useUserTrades()
const reloadUserTrades = () => fetchUserTrades(true)

// Cartas disponíveis para troca
const {
  cards: cardsAll,
  loading: loadingAll,
  error: errorAll,
  fetchAllCards
} = useAllCards()

// Modal
const showAddModal = ref(false)
const selectedCardId = ref<string | null>(null)
const selectedOfferId = ref<string | null>(null)
const selectedRequestId = ref<string | null>(null)

// Lightbox
const lightboxSrc = ref<string | null>(null)
function openLightbox(src: string) {
  lightboxSrc.value = src
}
function closeLightbox() {
  lightboxSrc.value = null
}

// Computed labels com nome da carta selecionada
const selectedOfferLabel = computed(() => {
  const selected = cardsUser.value.find(card => card.id === selectedOfferId.value)
  return selected?.name || ''
})

const selectedRequestLabel = computed(() => {
  const selected = cardsAll.value.find(card => card.id === selectedRequestId.value)
  return selected?.name || ''
})

// Adiciona carta
async function handleUploadCard() {
  if (!selectedCardId.value) return
  try {
    await api.post('/me/cards', { cardIds: [selectedCardId.value] })
    await reloadUserCards()
    showAddModal.value = false
    selectedCardId.value = null
  } catch (err: any) {
    alert('Erro ao adicionar carta')
  }
}

// Cria troca
async function submitTrade() {
  if (!selectedOfferId.value || !selectedRequestId.value) return
  try {
    await api.post('/trades', {
      cards: [
        { cardId: selectedOfferId.value, type: 'OFFERING' },
        { cardId: selectedRequestId.value, type: 'RECEIVING' }
      ]
    })
    await reloadUserTrades()
    selectedOfferId.value = null
    selectedRequestId.value = null
  } catch (err: any) {
    console.error('Erro ao criar troca:', err.response?.data || err)
    alert(err.response?.data?.message || 'Erro ao criar troca')
  }
}

// Exclui troca
async function handleDeleteTrade(id: string) {
  try {
    await api.delete(`/trades/${id}`)
    await reloadUserTrades()
  } catch (err) {
    console.error('Erro ao deletar troca', err)
  }
}

// Utilitários para imagem/nome da carta nas trocas
function getCardImage(tradeCards: any[], type: string) {
  return tradeCards.find(t => t.type === type)?.card?.imageUrl || ''
}
function getCardName(tradeCards: any[], type: string) {
  return tradeCards.find(t => t.type === type)?.card?.name || '---'
}

// Inicializa os dados
onMounted(() => {
  reloadUserCards()
  reloadUserTrades()
  fetchAllCards()
})
</script>
