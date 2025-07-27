// Importa o método defineStore do Pinia para criar uma store reativa
import { defineStore } from 'pinia'

// Importa o cliente Axios configurado com baseURL e interceptores
import axios from '@/services/api'

// Interface que define a estrutura esperada de um objeto "User"
interface User {
  id: number
  name: string
  email: string
}

// Define a store de autenticação com o nome 'auth'
export const useAuthStore = defineStore('auth', {
  // Estado inicial da store
  state: () => ({
    // Token armazenado localmente (ou vazio caso não exista)
    token: localStorage.getItem('token') || '',

    // Objeto do usuário logado, ou null se não estiver autenticado
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),

  // Ações (métodos) que modificam o estado ou executam lógica assíncrona
  actions: {
    /**
     * Realiza o login do usuário:
     * - Envia email e senha para a API
     * - Armazena o token e dados do usuário na store e no localStorage
     */
    async login(email: string, password: string) {
      try {
        // Chamada à API de login
        const response = await axios.post('/login', { email, password })

        // Armazena o token e usuário retornado pela API
        this.token = response.data.token
        this.user = response.data.user

        // Persiste os dados no localStorage para manter a sessão
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user)) // ✅ ESSA LINHA É A CORREÇÃO
      } catch (error) {
        // Lança erro genérico se a autenticação falhar
        throw new Error('Login inválido')
      }
    },

    /**
     * Realiza o logout:
     * - Limpa o token e o usuário da store
     * - Remove o token e o usuário do localStorage
     */
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    
    /**
     * Envia um pedido de recuperação de senha para o email informado.
     */
    async recoverPassword(email: string) {
      try {
        await axios.post('/forgot-password', { email })
      } catch {
        throw new Error('Falha ao solicitar recuperação de senha')
      }
    },
  },
})
