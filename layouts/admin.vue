<template>
  <div class="min-h-screen flex bg-gray-100 rtl" :class="{ 'sidebar-collapsed': !sidebarOpen }">
    <!-- Sidebar -->
    <aside 
      class="bg-indigo-800 text-white w-64 min-h-screen py-4 px-2 transition-all duration-300 ease-in-out fixed md:relative z-20"
      :class="{ 'translate-x-64': !sidebarOpen, 'shadow-lg': sidebarOpen }"
    >
      <div class="px-4 py-3 border-b border-indigo-700 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold">لوحة التحكم</h1>
          <p class="text-sm text-indigo-300">مرحباً بك في لوحة الإدارة</p>
        </div>
        <button 
          @click="toggleSidebar" 
          class="text-white hover:bg-indigo-700 rounded-full p-1 md:hidden"
        >
          <Icon icon="ph:x" class="text-xl" />
        </button>
      </div>
<SidebarItem 
  to="/admin/dashboard/authors" 
  icon="ph:user-circle" 
  label="المؤلفون" 
/>
<SidebarItem 
  to="/admin/dashboard/categories" 
  icon="ph:folders" 
  label="التصنيفات" 
/>
      <nav class="mt-6 space-y-1">
        <NuxtLink
          to="/admin/dashboard"
          class="flex items-center px-4 py-3 text-sm transition-colors rounded-lg hover:bg-indigo-700 group"
          :class="{ 'bg-indigo-700': $route.path === '/admin/dashboard' }"
        >
          <Icon icon="ph:gauge-duotone" class="ml-3 text-xl text-indigo-300 group-hover:text-white" />
          <span :class="{ 'font-medium': $route.path === '/admin/dashboard' }">الرئيسية</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/books"
          class="flex items-center px-4 py-3 text-sm transition-colors rounded-lg hover:bg-indigo-700 group"
          :class="{ 'bg-indigo-700': $route.path === '/admin/books' }"
        >
          <Icon icon="ph:books-duotone" class="ml-3 text-xl text-indigo-300 group-hover:text-white" />
          <span :class="{ 'font-medium': $route.path === '/admin/books' }">إدارة الكتب</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/users"
          class="flex items-center px-4 py-3 text-sm transition-colors rounded-lg hover:bg-indigo-700 group"
          :class="{ 'bg-indigo-700': $route.path === '/admin/users' }"
        >
          <Icon icon="ph:users-duotone" class="ml-3 text-xl text-indigo-300 group-hover:text-white" />
          <span :class="{ 'font-medium': $route.path === '/admin/users' }">المستخدمين</span>
        </NuxtLink>

        <NuxtLink
          to="/admin/orders"
          class="flex items-center px-4 py-3 text-sm transition-colors rounded-lg hover:bg-indigo-700 group"
          :class="{ 'bg-indigo-700': $route.path === '/admin/orders' }"
        >
          <Icon icon="ph:shopping-cart-duotone" class="ml-3 text-xl text-indigo-300 group-hover:text-white" />
          <span :class="{ 'font-medium': $route.path === '/admin/orders' }">الطلبات</span>
        </NuxtLink>

        <div class="pt-4 mt-4 border-t border-indigo-700">
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-3 text-sm text-red-300 transition-colors rounded-lg hover:bg-red-900/30 group"
          >
            <Icon icon="ph:sign-out-duotone" class="ml-3 text-xl" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center">
          <button 
            @click="toggleSidebar" 
            class="text-gray-600 hover:text-indigo-600 ml-2 focus:outline-none"
          >
            <Icon :icon="sidebarOpen ? 'ph:list' : 'ph:list'" class="text-2xl" />
          </button>
          <h2 class="text-xl font-semibold text-gray-800">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="text-gray-600 hover:text-indigo-600 focus:outline-none">
              <Icon icon="ph:bell-duotone" class="text-xl" />
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <img 
              src="https://via.placeholder.com/40" 
              alt="صورة المستخدم" 
              class="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
            />
            <span class="text-sm text-gray-600 hidden md:inline-block">مرحباً، المشرف</span>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-6 flex-1 overflow-auto">
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <slot />
        </div>
      </main>
      
      <!-- Footer -->
      <footer class="bg-white p-4 text-center text-gray-500 text-sm border-t">
        <p>© {{ new Date().getFullYear() }} لوحة إدارة المكتبة. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  </div>
  
  <!-- Overlay for mobile when sidebar is open -->
  <div 
    v-if="sidebarOpen" 
    @click="toggleSidebar" 
    class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
  ></div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({
  middleware: ['admin']
})

const router = useRouter()
const route = useRoute()
const { successAlert } = useAlerts()

// Sidebar state
const sidebarOpen = ref(true)
const isMobile = ref(false)

// Page title based on current route
const pageTitle = computed(() => {
  const routePath = route.path
  if (routePath.includes('/dashboard')) return 'الرئيسية'
  if (routePath.includes('/books')) return 'إدارة الكتب'
  if (routePath.includes('/users')) return 'المستخدمين'
  if (routePath.includes('/orders')) return 'الطلبات'
  return 'لوحة التحكم'
})

// Toggle sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  // Save preference to localStorage
  localStorage.setItem('adminSidebarOpen', sidebarOpen.value)
}

// Check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
  // Auto-close sidebar on mobile
  if (isMobile.value) {
    sidebarOpen.value = false
  } else {
    // On desktop, restore from localStorage or default to open
    const storedPref = localStorage.getItem('adminSidebarOpen')
    sidebarOpen.value = storedPref !== null ? storedPref === 'true' : true
  }
}

// Handle logout
const handleLogout = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  successAlert('تم تسجيل الخروج بنجاح')
  await router.push('/admin/login')
}

// Watch for route changes to close sidebar on mobile
watch(route, () => {
  if (isMobile.value) {
    sidebarOpen.value = false
  }
})

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.sidebar-collapsed .flex-1 {
  margin-right: 0;
}

@media (min-width: 768px) {
  .sidebar-collapsed .flex-1 {
    margin-right: 0;
  }
  
  .sidebar-collapsed aside {
    transform: translateX(100%);
    width: 0;
  }
}
</style>