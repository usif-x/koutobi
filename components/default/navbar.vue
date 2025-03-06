<!-- components/Navbar.vue -->
<template dir="rtl">
  <header class="sticky top-0 z-50 bg-[#eef2ff] rtl transition-all ease duration-500"
          :class="[scrolled ? 'backdrop-blur-sm' : 'bg-[#eef2ff]']">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Mobile Menu Button - Left on mobile -->
        <button class="md:hidden p-2 text-gray-600 hover:text-indigo-700 transition-colors order-3">
          <Icon v-if="!mobileMenuOpen" icon="ph:list-bold" class="text-2xl" @click="mobileMenuOpen = !mobileMenuOpen" />
          <Icon v-else icon="ph:x-bold" class="text-2xl" @click="mobileMenuOpen = !mobileMenuOpen" />
        </button>

        <!-- Logo - Left on desktop, centered on mobile -->
        <NuxtLink to="/" class="flex items-center gap-2 text-indigo-900 font-bold text-2xl font-arabic order-2 md:order-3 mx-auto md:mx-0">
          <div class="relative">
            <span class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-300 rounded-full opacity-30 blur-sm"></span>
            <img src="/images/logo.png" alt="Logo" class="w-10 h-10">
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex space-x-1 space-x-reverse order-2">
          <NuxtLink to="/" class="px-3 py-2 text-gray-700 hover:text-indigo-700 hover:shadow-lg hover:scale-105 transition duration-300 rounded-lg font-arabic">
            الرئيسية
          </NuxtLink>
          <NuxtLink to="/books" class="px-3 py-2 text-gray-700 hover:text-indigo-700 hover:shadow-lg hover:scale-105 transition duration-300 rounded-lg font-arabic">
            الكتب
          </NuxtLink>
          <NuxtLink to="/categories" class="px-3 py-2 text-gray-700 hover:text-indigo-700 hover:shadow-lg hover:scale-105 transition duration-300 rounded-lg font-arabic">
            التصنيفات
          </NuxtLink>
          <NuxtLink to="/authors" class="px-3 py-2 text-gray-700 hover:text-indigo-700 hover:shadow-lg hover:scale-105 transition duration-300 rounded-lg font-arabic">
            المؤلفون
          </NuxtLink>
          <NuxtLink to="/about" class="px-3 py-2 text-gray-700 hover:text-indigo-700 hover:shadow-lg hover:scale-105 transition duration-300 rounded-lg font-arabic">
            عن المتجر
          </NuxtLink>
          <NuxtLink to="/contact" class="px-3 py-2 text-gray-700 hover:text-indigo-700 hover:shadow-lg hover:scale-105 transition duration-300 rounded-lg font-arabic">
            اتصل بنا
          </NuxtLink>
        </nav>

        <!-- Right Side Actions - Kept on right for both mobile and desktop -->
        <div class="flex items-center gap-2 md:gap-4 order-1">
          <!-- Search Button -->
          <button
              class="p-2 text-gray-600 hover:text-indigo-700 transition-colors relative group"
              @click="showSearchModal = true"
          >
            <Icon icon="ph:magnifying-glass-bold" class="text-xl" />
            <span class="absolute top-10 right-0 bg-white shadow-md px-3 py-1.5 rounded text-sm font-arabic opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[999]">
              بحث
            </span>
          </button>

          <!-- Notifications Button -->
          <div v-if="isAuthenticated" class="relative group">
            <button
                class="p-2 text-gray-600 hover:text-indigo-700 transition-colors"
                @click="toggleNotifications"
            >
              <div class="relative">
                <Icon icon="ph:bell-bold" class="text-xl" />
                <span v-if="unreadNotificationsCount > 0" class="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  {{ unreadNotificationsCount }}
                </span>
              </div>
            </button>
            <span class="absolute top-10 right-0 bg-white shadow-md px-3 py-1.5 rounded text-sm font-arabic opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[999]">
              الإشعارات
            </span>

            <!-- Notifications Dropdown -->
            <Transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
            <div v-if="showNotifications" class="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 z-[999] w-72 max-h-96 overflow-y-auto">
              <div class="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                <p class="text-sm font-semibold text-gray-700 font-arabic">الإشعارات</p>
                <button v-if="notifications.length > 0" @click="markAllAsRead" class="text-xs text-indigo-600 hover:text-indigo-800">
                  تعليم الكل كمقروء
                </button>
              </div>

              <div v-if="notifications.length === 0" class="px-4 py-6 text-center">
                <p class="text-gray-500 font-arabic">لا توجد إشعارات</p>
              </div>

              <div v-else>
                <div
                    v-for="notification in notifications"
                    :key="notification._id"
                    class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    :class="{ 'bg-indigo-50': !notification.isRead }"
                    @click="readNotification(notification._id)"
                >
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 mt-1">
                      <Icon :icon="getNotificationIcon(notification.eventType)" class="text-lg text-indigo-600" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-800 font-arabic">{{ notification.title }}</p>
                      <p class="text-xs text-gray-600 mt-1 font-arabic">{{ notification.description }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ formatDate(notification.createdAt) }}</p>
                    </div>
                    <div v-if="!notification.isRead" class="flex-shrink-0">
                      <span class="w-2 h-2 bg-indigo-600 rounded-full inline-block"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Transition>
          </div>


          <!-- Cart Button -->
          <div v-if="isAuthenticated" class="relative cart-modal-group">
            <button
                class="p-2 text-gray-600 hover:text-indigo-700 transition-colors relative group"
                @click="toggleCartModal($event)"
            >
              <div class="relative">
                <Icon icon="ph:shopping-cart-bold" class="text-xl" />
                <span v-if="cartItemsCount > 0" class="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
        {{ cartItemsCount }}
      </span>
              </div>
              <span class="absolute top-10 right-0 bg-white shadow-md px-3 py-1.5 rounded text-sm font-arabic opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[999]">
      عربة التسوق
    </span>
            </button>

            <!-- Cart Mini Modal -->
            <Transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
            <CartMiniModal
                :show="showCartModal"
                :cart-items="cartItems"
                @close="showCartModal = false"
            />
            </Transition>
          </div>

          <!-- User Profile/Login Button - Changes based on authentication status -->
          <template v-if="isAuthenticated">
            <div class="relative group">
              <button class="p-2 text-gray-600 hover:text-indigo-700 transition-colors" @click="toggleProfileDropdown">
                <Icon icon="ph:user-circle-bold" class="text-xl" />
              </button>
              <Transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
              >
              <div v-if="showProfileDropdown" class="absolute top-10 right-0 bg-white shadow-md rounded py-2 z-[99999] w-40">
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="text-sm text-gray-600 font-arabic">اهلا {{ user?.firstName }} {{ user?.lastName }}</p>
                </div>
                <NuxtLink to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-arabic text-right">
                  الملف الشخصي
                </NuxtLink>
                <NuxtLink to="/orders" class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-arabic text-right">
                  طلباتي
                </NuxtLink>
                <button
                    @click="handleLogout"
                    class="block w-full text-right px-3 py-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-arabic"
                >
                  تسجيل الخروج
                </button>
              </div>
              </Transition>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="p-2 text-gray-600 hover:text-indigo-700 transition-colors relative group">
              <Icon icon="ph:user-circle-bold" class="text-xl" />
              <span class="absolute top-10 right-0 bg-white shadow-md px-3 py-1.5 rounded text-sm font-arabic opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[999]">
                تسجيل الدخول
              </span>
            </NuxtLink>

            <!-- Primary CTA Button - Only show when not authenticated -->
            <NuxtLink to="/signup" class="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-arabic text-sm font-semibold transition-colors">
              <span>حساب جديد</span>
              <Icon icon="ph:user-plus-bold" />
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>

    <!-- Add scroll progress bar UNDER the navigation -->
    <transition name="fade-down">
      <div v-if="scrolled" class="h-1 w-full relative bg-indigo-300">
        <div class="absolute top-0 left-0 h-full bg-indigo-600"
             :style="{ width: `${scrollProgress}%` }"></div>
      </div>
    </transition>


    <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
      <div
          v-if="mobileMenuOpen"
          class="md:hidden bg-white border-t border-gray-100 shadow-md rtl fixed top-16 left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto z-40 w-[95%] mx-auto rounded-lg overflow-hidden"
      >
        <div class="container mx-auto px-4 py-3 space-y-1">
          <NuxtLink
              v-for="(link, index) in mobileLinks"
              :key="index"
              :to="link.to"
              class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-lg hover:scale-105 transition duration-300 rounded-lg font-arabic"
              @click="mobileMenuOpen = false"
          >
            {{ link.text }}
          </NuxtLink>

          <div class="border-t border-gray-100 my-2 pt-2">
            <template v-if="isAuthenticated">
              <button
                  @click="handleLogout"
                  class="w-full flex items-center justify-between px-3 py-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition duration-300 rounded-lg font-arabic"
              >
                <span>تسجيل الخروج</span>
                <Icon icon="ph:sign-out-bold" class="text-xl" />
              </button>
            </template>
            <template v-else>
              <NuxtLink
                  to="/signup"
                  class="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-arabic text-sm font-semibold transition-colors"
                  @click="mobileMenuOpen = false"
              >
                <span>إنشاء حساب جديد</span>
                <Icon icon="ph:user-plus-bold" />
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </header>
  <SearchModal v-model="showSearchModal" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useAuth } from '~/composables/useAuth'
import SearchModal from '~/components/ui/SearchModal.vue'
import CartMiniModal from '~/components/ui/CartMiniModel.vue';
import { useRouter } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'

const { normalToast, errorToast } = useAlerts()

const router = useRouter()
const showSearchModal = ref(false)
const scrolled = ref(false)
const scrollY = ref(0)
const mobileMenuOpen = ref(false)
const showNotifications = ref(false)
const showProfileDropdown = ref(false)
const showCartModal = ref(false);
const cartItems = ref([]);
const cartItemsCount = ref(0)
const notifications = ref([])
const unreadNotificationsCount = ref(0)
const mobileLinks = [
  { to: '/', text: 'الرئيسية' },
  { to: '/books', text: 'الكتب' },
  { to: '/categories', text: 'التصنيفات' },
  { to: '/authors', text: 'المؤلفون' },
  { to: '/about', text: 'عن المتجر' },
  { to: '/contact', text: 'اتصل بنا' }
]
// Get authentication state and functions
const { isAuthenticated, logout: authLogout, user } = useAuth()

// Get access token from localStorage
const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken')
  }
  return null
}

// Create request headers with authorization token
const getAuthHeaders = () => {
  const accessToken = getAccessToken()
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
}

// Toggle notifications dropdown
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showProfileDropdown.value) {
    showProfileDropdown.value = false
  }

  // If opening notifications, fetch them
  if (showNotifications.value) {
    fetchNotifications().then(() => {
      console.log('Notifications after fetch:', notifications.value)
    })
  }
}

// Toggle profile dropdown
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value
  if (showNotifications.value) {
    showNotifications.value = false
  }
}

// Handle logout with proper error handling and navigation
const handleLogout = () => {
  mobileMenuOpen.value = false
  showProfileDropdown.value = false
  router.push('/logout')
}

// Fetch cart items from API with auth token
const toggleCartModal = (event) => {
  event.preventDefault(); // Prevent navigation to cart page
  showCartModal.value = !showCartModal.value;

  if (showProfileDropdown.value) {
    showProfileDropdown.value = false;
  }

  if (showNotifications.value) {
    showNotifications.value = false;
  }

  // If opening cart modal, fetch cart items
  if (showCartModal.value) {
    fetchCartItems();
  }
};

const fetchCartItems = async () => {
  if (!isAuthenticated.value) return;

  try {
    const response = await $fetch("/api/cart", {
      headers: getAuthHeaders(),
    });

    console.log('Cart API response:', response);

    if (response && response.cart && Array.isArray(response.cart.items)) {
      cartItems.value = response.cart.items;
      cartItemsCount.value = response.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      console.log('Updated cart count to:', cartItemsCount.value);
    } else {
      cartItems.value = [];
      cartItemsCount.value = 0;
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    normalToast("❌ فشل في جلب عناصر السلة");
    cartItems.value = [];
    cartItemsCount.value = 0;
  }
};


// Fetch user notifications with auth token
const fetchNotifications = async () => {
  if (!isAuthenticated.value) return

  try {
    const { data } = await useFetch('/api/user/notifications', {
      headers: getAuthHeaders()
    })

    // Check if data exists and has notifications property
    if (data.value && data.value.notifications && Array.isArray(data.value.notifications)) {
      notifications.value = data.value.notifications
      unreadNotificationsCount.value = data.value.notifications.filter(notification => !notification.isRead).length
    } else if (data.value && Array.isArray(data.value)) {
      // For backward compatibility, if response is already an array
      notifications.value = data.value
      unreadNotificationsCount.value = data.value.filter(notification => !notification.isRead).length
    }
  } catch (error) {
    normalToast('❌ فشل في جلب الإشعارات')
  }
}

// Mark notification as read with auth token
const readNotification = async (id) => {
  try {
    await $fetch(`/api/user/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    })

    // Update the local state
    const notification = notifications.value.find(n => n._id === id)
    if (notification) {
      notification.isRead = true
      unreadNotificationsCount.value = notifications.value.filter(n => !n.isRead).length
    }
  } catch (error) {
    normalToast('❌ فشل في تعليم الإشعار كمقروء')
  }
}

// Mark all notifications as read with auth token

const markAllAsRead = async () => {
  try {
    await $fetch('/api/user/notifications/readAll', {
      method: 'PUT',
      headers: getAuthHeaders()
    })

    // Update local state
    notifications.value.forEach(n => n.isRead = true)
    unreadNotificationsCount.value = 0
    normalToast('تم تعليم جميع الإشعارات كمقروءة')
  } catch (error) {
    errorToast('حدث خطأ أثناء تعليم جميع الإشعارات كمقروءة')
  }
}

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Get icon based on notification type
const getNotificationIcon = (eventType) => {
  switch (eventType) {
    case 'order_updated':
      return 'ph:package-bold'
    case 'payment_received':
      return 'ph:currency-circle-dollar-bold'
    case 'product_available':
      return 'ph:book-bookmark-bold'
    case 'account_updated':
      return 'ph:user-gear-bold'
    case 'promotion':
      return 'ph:tag-bold'
    case 'admin_note':
      return 'ph:note-bold'
    case 'other':
      return 'ph:bell-bold'
    case 'info':
      return 'ph:info-bold'
    default:
      return 'icon-park-twotone:message'
  }
}

// Close dropdowns when clicking outside
const closeDropdowns = (event) => {
  if (showNotifications.value && !event.target.closest('.group')) {
    showNotifications.value = false
  }
  if (showProfileDropdown.value && !event.target.closest('.group')) {
    showProfileDropdown.value = false
  }
  if (showCartModal.value && !event.target.closest('.cart-modal-group')) {
    showCartModal.value = false;
  }
}

// Watch for authentication changes
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    fetchNotifications()
    fetchCartItems()
  }
}, { immediate: true })

// Scroll handling logic
const scrollProgress = computed(() => {
  if (typeof window === 'undefined') return 0
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  return totalHeight <= 0 ? 0 : Math.min((scrollY.value / totalHeight) * 100, 100)
})

const handleScroll = () => {
  scrollY.value = window.scrollY
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', closeDropdowns)
  handleScroll()

})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', closeDropdowns)
})
</script>

<style>
.fixed {
  position: fixed;
}

/* Smooth scrolling for mobile menu */
.max-h-[calc(100vh-4rem)] {
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Hide scrollbar but allow scrolling */
.max-h-[calc(100vh-4rem)]::-webkit-scrollbar {
                           display: none;
                         }

.fade-down-enter-active, .fade-down-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* البداية عند الإدخال */
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

/* النهاية عند الإخفاء */
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>