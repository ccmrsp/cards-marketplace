<template>
  <div class="max-w-sm mx-auto">

    <!-- Título da página de recuperação -->
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-300">
      Recuperação de senha
    </h1>

    <!-- Formulário de recuperação -->
    <form @submit.prevent="handleRecover" class="space-y-4">

      <!-- Campo Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-md hover:shadow-purple-800"
      />

      <!-- Botão Recupere sua senha -->
      <button
        type="submit"
        class="w-full bg-primary text-white py-2 px-4 border border-gray-300 rounded-full shadow-md transition-all hover:bg-purple-700 hover:shadow-md hover:shadow-purple-800">
        Recupere sua senha
      </button>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleRecover = async () => {
  try {
    // supondo que seu store tenha um método para recuperar senha
    await auth.recoverPassword(email.value)
    // redireciona de volta ao login ou mostra uma mensagem de sucesso
    router.push('/login')
  } catch {
    alert('Não foi possível enviar as instruções de recuperação.')
  }
}
</script>
