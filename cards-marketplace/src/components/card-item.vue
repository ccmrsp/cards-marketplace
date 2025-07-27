<template>
  <!-- Container principal da carta -->
  <div class="card-item">
    <!-- Exibe a imagem da carta, com o src vindo da prop "card.image" -->
    <img :src="card.image" alt="Imagem da carta" />
    
    <!-- Título com o nome da carta -->
    <h3>{{ card.name }}</h3>
    
    <!-- Parágrafo com a descrição da carta -->
    <p>{{ card.description }}</p>
  </div>
</template>

<script setup lang="ts">
/**
 * Declaração das props usando o defineProps no <script setup>.
 * O componente espera receber um objeto "card" com os seguintes campos:
 * - id: número identificador único
 * - name: nome da carta
 * - image: URL da imagem da carta
 * - description: descrição da carta
 */
defineProps<{
  card: {
    id: number
    name: string
    image: string
    description: string
  }
}>()
</script>

<style scoped>
/* Estilização do container da carta */
.card-item {
  border: 1px solid #ccc;       /* Borda cinza clara */
  padding: 12px;                /* Espaçamento interno */
  border-radius: 8px;           /* Cantos arredondados */
  text-align: center;           /* Centraliza texto e imagem */
}

/* Estilização da imagem da carta */
.card-item img {
  max-width: 100px;             /* Define largura máxima da imagem */
}
</style>
