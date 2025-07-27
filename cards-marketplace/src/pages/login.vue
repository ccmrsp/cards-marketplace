<template>
  <div class="max-w-sm mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-300">Login</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Email -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-md hover:shadow-purple-800 hover:border-purple-800"
      />

      <!-- Senha -->
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-md hover:shadow-purple-800 hover:border-purple-800"
      />

      <!-- Botão Entrar -->
      <button
        type="submit"
        class="w-full !bg-purple-800 !text-gray-300 py-2 px-4  rounded-full shadow-md transition-all hover:!bg-gray-200 hover:shadow-purple-800 hover:!text-purple-800">
        Entrar
      </button>

      <!-- Esqueceu a senha -->
      <div class="text-right">
        <router-link
          to="/esqueci-senha"
          class="text-sm !text-gray-300 hover:!text-purple-200">
          Esqueceu a senha?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter }    from 'vue-router'

const email    = ref('')
const password = ref('')
const auth     = useAuthStore()
const router   = useRouter()

async function handleLogin() {
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch {
    alert('Falha no login')
  }
}
</script>
