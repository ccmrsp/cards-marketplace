<template>
  <nav class="bg-white px-8 shadow-md border-b border-gray-200 fixed top-0 left-0 w-full z-50 rounded-b-2xl h-[80px]">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo + Menu -->
      <div class="flex items-center gap-8">
        <router-link to="/">
          <img src="@/assets/img/logo_col.png" alt="Logo" class="h-[90px] w-[100px]" />
        </router-link>

        <!-- Menu alinhado próximo do logo -->
        <ul class="flex space-x-4 font-poppins">
          <li v-for="item in navItems" :key="item.name">
            <router-link
              :to="item.path"
              class="flex items-center gap-[4px] text-sm font-medium transition duration-150 transform hover:scale-105"
              :class="isActive(item.path)
                ? 'text-purple-800'
                : 'text-gray-300 hover:text-purple-800'"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Botão de Login à direita -->
      <router-link
        to="/login"
        class="!bg-purple-800 !text-white font-semibold px-6 py-2 rounded-full hover:!bg-gray-200 hover:!text-purple-800 transition ">
        Login
      </router-link>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Home, LayoutDashboard, LogIn, UserPlus } from 'lucide-vue-next'

const route = useRoute()
const isActive = (path: string) => route.path === path

const navItems = [
  { name: 'Marketplace', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Registrar', path: '/register', icon: UserPlus }
]
</script>
