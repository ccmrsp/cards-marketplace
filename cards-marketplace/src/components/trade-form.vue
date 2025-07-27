<template>
  <!-- Formulário para criação de uma nova troca -->
  <form @submit.prevent="submitTrade">
    <!-- Título do formulário -->
    <h2>Nova Troca</h2>

    <!-- Seção para selecionar as cartas que o usuário quer oferecer -->
    <label>Cartas que você oferece:</label>
    <select v-model="selectedOffer" multiple>
      <!-- Lista as cartas do usuário como opções selecionáveis -->
      <option v-for="card in myCards" :key="card.id" :value="card.id">
        {{ card.name }}
      </option>
    </select>

    <!-- Seção para selecionar as cartas que o usuário deseja receber -->
    <label>Cartas que deseja receber:</label>
    <select v-model="selectedRequest" multiple>
      <!-- Lista todas as cartas do sistema como opções -->
      <option v-for="card in allCards" :key="card.id" :value="card.id">
        {{ card.name }}
      </option>
    </select>

    <!-- Botão para submeter o formulário -->
    <button type="submit">Criar troca</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * Props recebidas:
 * - myCards: lista de cartas do usuário (para oferecer na troca)
 * - allCards: lista de todas as cartas disponíveis (para escolher quais deseja)
 */
const props = defineProps<{
  myCards: Array<{ id: number; name: string }>
  allCards: Array<{ id: number; name: string }>
}>()

/**
 * Define um evento personalizado que será emitido ao submeter a troca.
 * Evento: 'submit'
 */
const emit = defineEmits(['submit'])

/**
 * Armazena as IDs das cartas que o usuário selecionou para oferecer.
 */
const selectedOffer = ref<number[]>([])

/**
 * Armazena as IDs das cartas que o usuário deseja receber.
 */
const selectedRequest = ref<number[]>([])

/**
 * Função executada ao enviar o formulário.
 * Emite o evento 'submit' com os dados da troca selecionada.
 */
function submitTrade() {
  emit('submit', {
    offer: selectedOffer.value,
    request: selectedRequest.value,
  })
}
</script>
