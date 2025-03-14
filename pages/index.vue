<template>
  <div class="min-h-screen bg-transparent rtl">
    <!-- Hero Section -->
    <section class="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
        <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
        <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
      </div>

      <!-- Main content container -->
      <div class="container mx-auto z-10 py-8 md:py-0">
        <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          <!-- Text content (right side in RTL) -->
          <div class="w-full md:w-1/2 text-right space-y-5 md:space-y-6">
            <div class="relative inline-block">
              <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
              <h1 class="relative text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 font-arabic tracking-tight">كُتُبي</h1>
              <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
            </div>

            <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-indigo-800 font-arabic">كل كتبك في مكان واحد <Icon icon="fa6-solid:face-laugh-wink" class="inline"/></h2>

            <p class="text-base md:text-lg text-gray-700 leading-relaxed font-arabic">
              جمعنالك كل الكتب الخارجية مذكرات المدرسين للصفوف الإعدادية والثانوية، علشان تلاقي كل اللي محتاجه في مكان واحد! بنوفر أحدث الإصدارات من الكتب والمذكرات عشان تساعدك تذاكر وتتفوق.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-end mt-6">
              <template v-if="!isAuthenticated">
                <ButtonUi
                    label="إنشئ/سجل حسابك"
                    icon="ph:user-plus-bold"
                    to="/signup"
                    isOutline
                    isLink
                />
              </template>
              <template v-else>
                <ButtonUi
                    label="حسابي الشخصي"
                    icon="ph:user-circle-bold"
                    to="/profile"
                    isOutline
                    isLink
                />
                <ButtonUi
                    label="تصفح الكتب"
                    icon="ph:books-bold"
                    to="/books"
                    isLink
                />
              </template>
            </div>

            <!-- Trust badges with animated hover -->
            <div class="flex flex-wrap justify-end items-center gap-4 pt-6 mt-2 border-t border-indigo-100/50">
              <div class="flex items-center text-gray-600 gap-2 group transition-all duration-300 hover:text-indigo-700">
                <Icon icon="ph:truck-duotone" class="text-amber-500 text-lg group-hover:scale-110 transition-transform" />
                <span class="text-sm font-arabic">توصيل سريع</span>
              </div>

              <div class="flex items-center text-gray-600 gap-2 group transition-all duration-300 hover:text-indigo-700">
                <Icon icon="ph:shield-check-duotone" class="text-amber-500 text-lg group-hover:scale-110 transition-transform" />
                <span class="text-sm font-arabic">دفع آمن</span>
              </div>

              <div class="flex items-center text-gray-600 gap-2 group transition-all duration-300 hover:text-indigo-700">
                <Icon icon="ph:medal-duotone" class="text-amber-500 text-lg group-hover:scale-110 transition-transform" />
                <span class="text-sm font-arabic">ضمان الجودة</span>
              </div>
            </div>
          </div>

          <!-- Image content (left side in RTL) -->
          <div class="w-full md:w-1/2">
            <div class="rounded-2xl overflow-hidden">
              <img src="/images/hero.png" alt="kotoubi Books" class="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Book Sliders -->
    <section class="py-16 relative z-10">
      <BookSlider
          title="الكتب المميزة"
          subtitle="اكتشف مجموعة مختارة من أفضل الكتب"
          :books="featuredBooks"
          :autoplay="true"
          :autoplay-speed="4000"
          class="mb-16"
      />

      <BookSlider
          title="أحدث الإصدارات"
          subtitle="تصفح أحدث الكتب المضافة إلى مكتبتنا"
          :books="newArrivals"
          :autoplay="true"
          :autoplay-speed="3500"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '~/stores/product';
import { Icon } from '@iconify/vue';
import BookSlider from '~/components/ui/BooksSlider.vue';
import ButtonUi from '~/components/ui/ButtonUi.vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

// Import authentication composable and get authentication state
const { isAuthenticated } = useAuth();
const router = useRouter();
const isAdmin = ref(false);

// Check if user is admin and redirect if needed
const checkAdminStatus = async () => {
  try {
    const response = await fetch('/api/auth/status', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      isAdmin.value = data.isAdmin;
      
      // Redirect to admin dashboard if user is admin
      if (data.isAdmin) {
        router.push('/admin/dashboard');
      }
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
  }
};

// SEO
useHead({
  title: 'كُتُبي - متجر الكتب العربية الأول',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'description',
      content: 'كُتُبِي - متجر الكتب العربية الأول، نوفر لك أحدث الكتب والمراجع بأفضل الأسعار، مع توصيل سريع.'
    },
    {
      name: 'keywords',
      content: 'كتب, متجر كتب, كتب دراسية, كتب إلكترونية, مذكرات, كتب خارجية'
    },
    {
      name: 'author',
      content: 'Yousseif Muhammed / Telegram: @YousseifMuhammed'
    }
  ],
});

// Store and Data
const store = useProductStore();
const featuredBooks = ref([]);
const newArrivals = ref([]);

onMounted(async () => {
  // Check admin status if user is authenticated
  if (isAuthenticated.value) {
    await checkAdminStatus();
  }
  
  await store.fetchProducts();

  featuredBooks.value = store.products
      .filter(book => book.rating >= 4.5)
      .slice(0, 8);

  newArrivals.value = [...store.products]
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 8);
});
</script>

<style>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out 2s infinite;
}

.animate-float-slow {
  animation: float 8s ease-in-out 1s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>