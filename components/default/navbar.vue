<!-- components/Navbar.vue -->
<template>
  <header class="sticky top-0 z-50 bg-[#eef2ff] rtl transition-all ease duration-500"
          :class="[scrolled ? 'backdrop-blur-sm' : 'bg-[#eef2ff]']">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 text-indigo-900 font-bold text-2xl font-arabic">
          <div class="relative">
            <span class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-300 rounded-full opacity-30 blur-sm"></span>
            <img src="/images/logo.png" alt="Logo" class="w-10 h-10">
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex space-x-1 space-x-reverse">
          <NuxtLink to="/" class="px-3 py-2 text-gray-700 hover:text-indigo-700 transition-colors font-arabic">
            الرئيسية
          </NuxtLink>
          <NuxtLink to="/books" class="px-3 py-2 text-gray-700 hover:text-indigo-700 transition-colors font-arabic">
            الكتب
          </NuxtLink>
          <NuxtLink to="/categories" class="px-3 py-2 text-gray-700 hover:text-indigo-700 transition-colors font-arabic">
            التصنيفات
          </NuxtLink>
          <NuxtLink to="/authors" class="px-3 py-2 text-gray-700 hover:text-indigo-700 transition-colors font-arabic">
            المؤلفون
          </NuxtLink>
          <NuxtLink to="/about" class="px-3 py-2 text-gray-700 hover:text-indigo-700 transition-colors font-arabic">
            عن المتجر
          </NuxtLink>
          <NuxtLink to="/contact" class="px-3 py-2 text-gray-700 hover:text-indigo-700 transition-colors font-arabic">
            اتصل بنا
          </NuxtLink>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-2 md:gap-4">
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

          <!-- Cart Button -->
          <NuxtLink to="/cart" class="p-2 text-gray-600 hover:text-indigo-700 transition-colors">
          <button class="p-2 text-gray-600 hover:text-indigo-700 transition-colors relative group">
            <div class="relative">
              <Icon icon="ph:shopping-cart-bold" class="text-xl" />
              <span class="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </span>
            </div>
            <span class="absolute top-10 right-0 bg-white shadow-md px-3 py-1.5 rounded text-sm font-arabic opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[999]">
              عربة التسوق
            </span>
          </button>
          </NuxtLink>

          <!-- User Profile/Login Button - Changes based on authentication status -->
          <template v-if="isAuthenticated">
            <div class="relative group">
              <NuxtLink to="/profile" class="p-2 text-gray-600 hover:text-indigo-700 transition-colors">
                <Icon icon="ph:user-circle-bold" class="text-xl" />
              </NuxtLink>
              <div class="absolute top-10 right-0 bg-white shadow-md rounded py-2 opacity-0 group-hover:opacity-100 transition-opacity z-[999] w-40">
                <NuxtLink to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-arabic text-right">
                  الملف الشخصي
                </NuxtLink>
                <NuxtLink to="/orders" class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-arabic text-right">
                  طلباتي
                </NuxtLink>
                <button @click="logout" class="block w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-arabic text-right">
                  تسجيل الخروج
                </button>
              </div>
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

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2 text-gray-600 hover:text-indigo-700 transition-colors" @click="mobileMenuOpen = !mobileMenuOpen">
          <Icon v-if="!mobileMenuOpen" icon="ph:list-bold" class="text-2xl" />
          <Icon v-else icon="ph:x-bold" class="text-2xl" />
        </button>
      </div>
    </div>

    <!-- Add scroll progress bar UNDER the navigation -->
    <transition name="fade-down">
      <div v-if="scrolled" class="h-1 w-full relative bg-indigo-300">
        <div class="absolute top-0 left-0 h-full bg-indigo-600"
             :style="{ width: `${scrollProgress}%` }"></div>
      </div>
    </transition>

    <!-- Mobile Menu Dropdown -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 shadow-md rtl">
      <div class="container mx-auto px-4 py-3 space-y-1">
        <NuxtLink to="/" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
          الرئيسية
        </NuxtLink>
        <NuxtLink to="/books" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
          الكتب
        </NuxtLink>
        <NuxtLink to="/categories" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
          التصنيفات
        </NuxtLink>
        <NuxtLink to="/authors" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
          المؤلفون
        </NuxtLink>
        <NuxtLink to="/about" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
          عن المتجر
        </NuxtLink>
        <NuxtLink to="/contact" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
          اتصل بنا
        </NuxtLink>
        <div class="border-t border-gray-100 my-2 pt-2">
          <!-- Conditional rendering for mobile menu based on auth status -->
          <template v-if="isAuthenticated">
            <NuxtLink to="/profile" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
              الملف الشخصي
            </NuxtLink>
            <NuxtLink to="/orders" class="block px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
              طلباتي
            </NuxtLink>
            <button @click="logout" class="block w-full text-right px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors font-arabic">
              تسجيل الخروج
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/signup" class="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-arabic text-sm font-semibold transition-colors">
              <span>إنشاء حساب جديد</span>
              <Icon icon="ph:user-plus-bold" />
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
  <SearchModal v-model="showSearchModal" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useAuth } from '~/composables/useAuth';
import SearchModal from '~/components/ui/SearchModal.vue';

const showSearchModal = ref(false);
const scrolled = ref(false);
const scrollY = ref(0);
const mobileMenuOpen = ref(false);

// Get authentication functions from useAuth composable
const { isAuthenticated, logout } = useAuth();

// Calculate scroll percentage for progress bar
const scrollProgress = computed(() => {
  if (typeof window === 'undefined') return 0;

  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight <= 0) return 0;

  return Math.min((scrollY.value / totalHeight) * 100, 100);
});

const handleScroll = () => {
  scrollY.value = window.scrollY;
  scrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
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
</style>