<template>
  <div class="max-w-sm mx-auto">
    <!-- Título da página de registro -->
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-300">
      Criar Conta
    </h1>

    <form @submit.prevent="register" class="space-y-4">
      <!-- Nome -->
      <div>
        <input
          v-model="name"
          type="text"
          placeholder="Nome completo"
          class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-purple-800 hover:border-purple-800"
        />
        <p v-if="errors.name" class="mt-1 text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <!-- CPF -->
      <div>
        <input
          v-model="cpf"
          type="text"
          placeholder="CPF"
          maxlength="14"
          @blur="onBlurCPF"
          class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-purple-800 hover:border-purple-800"
        />
        <p v-if="errors.cpf" class="mt-1 text-red-500 text-sm">{{ errors.cpf }}</p>
      </div>

      <!-- Data de nascimento -->
      <div>
        <input
          v-model="birthDate"
          type="date"
          placeholder="Data de nascimento"
          class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-purple-800 hover:border-purple-800"
        />
        <p v-if="errors.birthDate" class="mt-1 text-red-500 text-sm">{{ errors.birthDate }}</p>
      </div>

      <!-- Celular -->
      <div>
        <input
          v-model="phone"
          type="tel"
          placeholder="Celular"
          class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-purple-800 hover:border-purple-800"
        />
        <p v-if="errors.phone" class="mt-1 text-red-500 text-sm">{{ errors.phone }}</p>
      </div>

      <!-- Email -->
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-purple-800 hover:border-purple-800"
        />
        <p v-if="errors.email" class="mt-1 text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <!-- Senha -->
      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          class="w-full p-2 border border-gray-600 rounded-full shadow-md transition-all hover:shadow-purple-800 hover:border-purple-800"
        />
        <p v-if="errors.password" class="mt-1 text-red-500 text-sm">{{ errors.password }}</p>
      </div>

      <!-- Botão Criar conta -->
      <button
        type="submit"
        class="w-full bg-primary text-white py-2 px-4 border border-gray-300 rounded-full shadow-md transition-all hover:bg-purple-700 hover:shadow-purple-800 hover:border-purple-800"
      >
        Criar conta
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const name = ref('')
const cpf = ref('')
const birthDate = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const errors = ref<Record<string, string>>({})

const router = useRouter()

function validateCPF(value: string): boolean {
  const str = value.replace(/\D/g, '')
  if (str.length !== 11 || /^(\d)\1+$/.test(str)) return false
  const calc = (len: number): boolean => {
    let sum = 0
    for (let i = 0; i < len; i++) {
      sum += parseInt(str.charAt(i)) * (len + 1 - i)
    }
    let rev = (sum * 10) % 11
    if (rev === 10) rev = 0
    return rev === parseInt(str.charAt(len))
  }
  return calc(9) && calc(10)
}

function onBlurCPF() {
  if (cpf.value && !validateCPF(cpf.value)) {
    errors.value.cpf = 'CPF inválido'
  } else {
    delete errors.value.cpf
  }
}

async function register() {
  errors.value = {}

  if (!name.value.trim())                   errors.value.name      = 'Nome é obrigatório'
  if (!cpf.value.trim())                    errors.value.cpf       = 'CPF é obrigatório'
  else if (!validateCPF(cpf.value))         errors.value.cpf       = 'CPF inválido'
  if (!birthDate.value)                     errors.value.birthDate = 'Data de nascimento é obrigatória'
  if (!email.value.trim())                  errors.value.email     = 'Email é obrigatório'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
                                            errors.value.email     = 'Email inválido'
  if (!phone.value.trim())                  errors.value.phone     = 'Celular é obrigatório'
  if (!password.value)                      errors.value.password  = 'Senha é obrigatória'
  else if (password.value.length < 6)       errors.value.password  = 'Senha deve ter ao menos 6 caracteres'

  if (Object.keys(errors.value).length) return

  try {
    const res = await api.post('/register', {
      name:      name.value.trim(),
      cpf:       cpf.value.replace(/\D/g, ''),
      birthDate: birthDate.value,
      email:     email.value.trim(),
      phone:     phone.value.trim(),
      password:  password.value
    })
    console.log('Register success:', res.data)
    alert('Conta criada com sucesso!')
    router.push('/login')
  } catch (err: any) {
    console.error('Register error:', err)
    const serverMessage =
      err.response?.data?.message ||
      JSON.stringify(err.response?.data) ||
      err.message ||
      'Erro desconhecido'
    alert(`Erro ao criar a conta:\n${serverMessage}`)
  }
}
</script>
