// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './stores'
import router from './router'

// ** 1. Importações do toast **
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import './assets/tailwind.css'
import './style.css'

const app = createApp(App)

// ** 2. Registre Pinia e Router **
app.use(pinia)
app.use(router)

// ** 3. Registre o plugin de toasts **
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
})


// ** 5. Global Vue error handler **
app.config.errorHandler = (err, instance, info) => {
  console.error('[Vue Error]', info, err)
  // notifica o usuário
  toast.error('Ocorreu um erro inesperado. Por favor, tente novamente.')
}

app.mount('#app')

// ** 4. Exporte o `toast` para usar em services/composables **
export { toast }
