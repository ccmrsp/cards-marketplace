// src/services/api.ts
import axios from 'axios'
import router from '@/router'      // só se você tiver o Vue Router configurado
// import { useToast } from 'vue-toastification' // descomente se for usar toasts

const api = axios.create({
  baseURL: 'https://cards-marketplace-api-2fjj.onrender.com',
})

// injeta o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// trata erros de resposta globalmente
api.interceptors.response.use(
  response => response,    // passa adiante as respostas válidas
  error => {
    const status = error.response?.status

    if (status === 401) {
      // não autorizado — token inválido ou expirado
      // redireciona para login
      router.push({ name: 'login' })
      // ou window.location.href = '/login'

      // opcional: limpa o token
      localStorage.removeItem('token')
    }
    else if (status === 403) {
      // proibido
      // ex: toast.error('Você não tem permissão para esta ação.')
    }
    else if (status >= 500) {
      // erro no servidor
      // ex: toast.error('Erro no servidor. Tente novamente mais tarde.')
      console.error('Erro 5xx:', error)
    }

    // propaga o erro para quem chamou
    return Promise.reject(error)
  }
)

export default api