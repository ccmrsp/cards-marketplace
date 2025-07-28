<template>
  <nav class="bg-white px-4 sm:px-8 shadow-md border-b border-gray-200 fixed top-0 left-0 w-full z-50 rounded-b-2xl h-[80px]">
    <div class="max-w-7xl mx-auto flex items-center justify-between overflow-hidden">
      <!-- Logo + Menu Desktop -->
      <div class="flex items-center gap-4 sm:gap-8">
        <router-link to="/">
          <img src="@/assets/img/logo_col.png" alt="Logo" class="h-[70px] w-[80px] md:h-[90px] md:w-[100px]" />
        </router-link>

        <!-- Menu Desktop (visível somente md+) -->
        <ul class="hidden md:flex space-x-4 font-poppins">
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

      <!-- Botão de Login Desktop -->
      <router-link
        to="/login"
        class="hidden md:block !bg-purple-800 !text-white font-semibold px-6 py-2 rounded-full hover:!bg-gray-200 hover:!text-purple-800 transition">
        Login
      </router-link>

      <!-- Botão Hamburguer Mobile -->
      <button @click="menuOpen = !menuOpen" class="md:hidden text-purple-800">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Menu Mobile (Dropdown) -->
    <div v-if="menuOpen" class="md:hidden bg-white border-t border-gray-200 px-6 py-4">
      <ul class="flex flex-col space-y-4 font-poppins">
        <li v-for="item in navItems" :key="item.name">
          <router-link
            :to="item.path"
            class="flex items-center gap-2 text-sm font-medium transition"
            :class="isActive(item.path) ? 'text-purple-800' : 'text-gray-700'"
            @click="menuOpen = false"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/login"
            class="block text-center bg-purple-800 !text-white font-semibold px-6 py-2 rounded-full hover:!bg-gray-200 hover:!text-purple-800 transition"
            @click="menuOpen = false"
          >
            Login
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Home, LayoutDashboard, LogIn, UserPlus } from 'lucide-vue-next'

const menuOpen = ref(false)
const route = useRoute()
const isActive = (path: string) => route.path === path

const navItems = [
  { name: 'Marketplace', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Registrar', path: '/register', icon: UserPlus }
]
</script>
