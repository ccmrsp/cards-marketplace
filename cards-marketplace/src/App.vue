<!-- src/App.vue -->
<script setup lang="ts">
//*import ErrorBoundary from 'vue-error-boundary'
import Navbar from '@/components/navbar.vue'
</script>

<template><!---
  <ErrorBoundary>
   
    <template #fallback="{ error, reset }">
      <div class="p-4 bg-red-100 text-red-800 rounded space-y-4">
        <h2 class="text-xl font-bold">😵‍💫 Ops! Algo deu errado.</h2>
        <p><strong>Mensagem:</strong> {{ error.message }}</p>
        <pre class="text-xs overflow-auto">{{ error.stack }}</pre>
        <button
          @click="reset"
          class="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
        >
          Tentar de novo
        </button>
      </div>
    </template>
  -->
    <Navbar />

    <main class="pt-20 max-w-4xl mx-auto p-4">
      <router-view />
    </main>
  <!--</ErrorBoundary>-->
</template>

<style scoped>
.bg-red-100 { background-color: #fee2e2; }
.text-red-800 { color: #7f1d1d; }
.rounded     { border-radius: 0.375rem; }
.p-4         { padding: 1rem; }
</style>
