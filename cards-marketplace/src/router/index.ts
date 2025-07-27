// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/', 
    name: 'Marketplace', 
    component: () => import('@/pages/marketplace.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register.vue')
  },

  // rota de recuperação de senha
  {
    path: '/esqueci-senha',
    name: 'EsqueciSenha',
    component: () => import('@/pages/esqueci-senha.vue')
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory('/cards-marketplace/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
