<template>
  <!-- Container principal da lista de trocas -->
  <div>
    <!-- Título da seção -->
    <h2>Solicitações de Troca</h2>

    <!-- Laço para renderizar cada troca existente na prop "trades" -->
    <div v-for="trade in trades" :key="trade.id" class="trade">
      <!-- Mostra o nome do usuário que criou a troca -->
      <p><strong>Usuário:</strong> {{ trade.user }}</p>

      <!-- Lista as cartas que o usuário está oferecendo, separadas por vírgula -->
      <p><strong>Oferece:</strong> {{ trade.offer.join(', ') }}</p>

      <!-- Lista as cartas que o usuário deseja receber, separadas por vírgula -->
      <p><strong>Quer:</strong> {{ trade.request.join(', ') }}</p>

      <!-- Botão para excluir a troca, visível apenas se "canDelete" for true -->
      <button v-if="canDelete" @click="$emit('delete', trade.id)">Excluir</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Define as props recebidas pelo componente:
 * - trades: array de objetos representando cada troca
 *   - id: identificador da troca
 *   - user: nome do usuário que criou a troca
 *   - offer: lista de cartas oferecidas (nomes)
 *   - request: lista de cartas desejadas (nomes)
 * - canDelete: (opcional) define se o botão de exclusão deve ser exibido
 */
defineProps<{
  trades: Array<{
    id: number
    user: string
    offer: string[]
    request: string[]
  }>
  canDelete?: boolean
}>()
</script>

<style scoped>
/* Estilo para cada bloco de troca individual */
.trade {
  border: 1px solid #ccc;   /* Borda cinza clara */
  padding: 10px;            /* Espaçamento interno */
  margin: 10px 0;           /* Espaço entre os blocos de troca */
}
</style>
