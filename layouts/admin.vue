<template>
  <div class="min-h-screen flex bg-gray-100 rtl">
    <!-- Sidebar -->
    <aside class="bg-indigo-800 text-white w-64 min-h-screen py-4 px-2">
      <div class="px-4 py-2 border-b border-indigo-700">
        <h1 class="text-xl font-bold">لوحة التحكم</h1>
        <p class="text-sm text-indigo-300">مرحباً بك في لوحة الإدارة</p>
      </div>

      <nav class="mt-6 space-y-2">
        <NuxtLink
            to="/admin/dashboard"
            class="flex items-center px-4 py-2.5 text-sm transition-colors rounded-lg hover:bg-indigo-700"
            :class="{ 'bg-indigo-700': $route.path === '/admin/dashboard' }"
        >
          <Icon icon="ph:gauge-duotone" class="ml-2 text-xl" />
          الرئيسية
        </NuxtLink>

        <NuxtLink
            to="/admin/books"
            class="flex items-center px-4 py-2.5 text-sm transition-colors rounded-lg hover:bg-indigo-700"
            :class="{ 'bg-indigo-700': $route.path === '/admin/books' }"
        >
          <Icon icon="ph:books-duotone" class="ml-2 text-xl" />
          إدارة الكتب
        </NuxtLink>

        <NuxtLink
            to="/admin/users"
            class="flex items-center px-4 py-2.5 text-sm transition-colors rounded-lg hover:bg-indigo-700"
            :class="{ 'bg-indigo-700': $route.path === '/admin/users' }"
        >
          <Icon icon="ph:users-duotone" class="ml-2 text-xl" />
          المستخدمين
        </NuxtLink>

        <NuxtLink
            to="/admin/orders"
            class="flex items-center px-4 py-2.5 text-sm transition-colors rounded-lg hover:bg-indigo-700"
            :class="{ 'bg-indigo-700': $route.path === '/admin/orders' }"
        >
          <Icon icon="ph:shopping-cart-duotone" class="ml-2 text-xl" />
          الطلبات
        </NuxtLink>

        <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-2.5 text-sm text-red-300 transition-colors rounded-lg hover:bg-red-900/30"
        >
          <Icon icon="ph:sign-out-duotone" class="ml-2 text-xl" />
          تسجيل الخروج
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-800">لوحة التحكم</h2>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">مرحباً، المشرف</span>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({
  middleware: ['admin']
})

const router = useRouter()
const { successAlert } = useAlerts()

const handleLogout = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  successAlert('تم تسجيل الخروج بنجاح')
  await router.push('/admin/login')
}
</script>