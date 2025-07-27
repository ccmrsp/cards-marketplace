<template>
  <!-- Container da lista de cartas -->
  <div class="card-list">
    <!-- Renderiza o componente CardItem para cada carta no array "cards" -->
    <card-item
      v-for="card in cards"     
      :key="card.id"            
      :card="card"              
    />
  </div>
</template>

<script setup lang="ts">
// Importa o componente filho que representa uma carta individual
import CardItem from './card-item.vue'

/**
 * Define a prop "cards", que é um array de objetos de carta.
 * Cada objeto deve conter:
 * - id: identificador único da carta
 * - name: nome da carta
 * - image: URL da imagem
 * - description: descrição da carta
 */
defineProps<{
  cards: Array<{
    id: number
    name: string
    image: string
    description: string
  }>
}>()
</script>

<style scoped>
/* Estilo aplicado ao container da lista de cartas */
.card-list {
  display: flex;        /* Usa flexbox para posicionar os itens lado a lado */
  flex-wrap: wrap;      /* Permite que as cartas quebrem linha se necessário */
  gap: 16px;            /* Espaço entre as cartas */
}
</style>
