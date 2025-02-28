<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rtl">
    <!-- Hero Section -->
    <section class="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
        <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
        <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
      </div>

      <!-- Main Hero Content -->
      <div class="container mx-auto relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 max-w-7xl mx-auto">
          <!-- Text Content -->
          <div class="w-full md:w-1/2 text-right space-y-6">
            <div class="relative inline-block">
              <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
              <h1 class="relative text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 font-arabic">
                كُتُبي
              </h1>
              <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
            </div>

            <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-indigo-800 font-arabic">
              كل كتبك في مكان واحد 
              <Icon icon="fa6-solid:face-laugh-wink" class="inline-block" />
            </h2>

            <p class="text-base md:text-lg text-gray-700 leading-relaxed font-arabic max-w-xl">
              جمعنالك كل الكتب الخارجية مذكرات المدرسين للصفوف الإعدادية والثانوية، علشان تلاقي كل اللي محتاجه في مكان واحد! بنوفر أحدث الإصدارات من الكتب والمذكرات عشان تساعدك تذاكر وتتفوق.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-end">
              <NuxtLink 
                to="/signup"
                class="group relative px-6 py-3 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold transition-all duration-300 overflow-hidden"
              >
                <span class="relative z-10 flex items-center justify-center gap-2 font-arabic">
                  <span>إنشئ/سجل حسابك</span>
                  <Icon 
                    icon="ph:user-plus-bold" 
                    class="text-xl transition-transform group-hover:rotate-12"
                  />
                </span>
                <span class="absolute inset-0 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </NuxtLink>

              <NuxtLink 
                to="/books"
                class="group relative px-6 py-3 bg-indigo-600 border-2 border-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span class="relative z-10 flex items-center justify-center gap-2 font-arabic">
                  <span>تصفح الكتب</span>
                  <Icon 
                    icon="ph:books-bold" 
                    class="text-xl transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span class="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></span>
              </NuxtLink>
            </div>

            <!-- Trust Badges -->
            <div class="flex flex-wrap justify-end items-center gap-6 pt-6 mt-2 border-t border-indigo-100/50">
              <TrustBadge icon="ph:truck-duotone" text="توصيل سريع" />
              <TrustBadge icon="ph:shield-check-duotone" text="دفع آمن" />
              <TrustBadge icon="ph:medal-duotone" text="ضمان الجودة" />
            </div>
          </div>

          <!-- Hero Image -->
          <div class="w-full md:w-1/2">
            <div class="relative group">
              <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-indigo-200/50 transform group-hover:-translate-y-1">
                <span class="absolute inset-0 border-2 border-white/30 rounded-2xl z-20 transition-all duration-300 group-hover:border-white/50 group-hover:blur-[1px]"></span>
                
                <div class="relative overflow-hidden">
                  <img 
                    src="/images/hero.jpg" 
                    alt="كُتُبي - متجر الكتب العربية" 
                    class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-50"></div>
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                </div>
              </div>

              <!-- Decorative Elements -->
              <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-20 blur-xl transition-all duration-500 group-hover:w-32 group-hover:h-32 group-hover:opacity-30"></div>
              <div class="absolute -top-4 -left-4 w-32 h-32 bg-indigo-400 rounded-full opacity-20 blur-xl transition-all duration-500 group-hover:w-40 group-hover:h-40 group-hover:opacity-30"></div>
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
import TrustBadge from '~/components/ui/TrustBadge.vue';
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