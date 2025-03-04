<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 md:px-6 lg:px-8 rtl">
    <!-- Abstract background shapes -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <!-- Subtle grid pattern overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>

    <!-- Main content -->
    <div class="container mx-auto z-10 text-center">
      <div class="max-w-2xl mx-auto px-4">
        <!-- Error Animation -->
        <div class="relative mb-8">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h1 class="text-8xl md:text-9xl font-bold text-indigo-600 font-arabic mb-4">404</h1>
            <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mx-auto rounded-full mb-6"></div>
            <h2 class="text-2xl md:text-3xl font-bold text-indigo-900 font-arabic mb-4">
              عذراً، الصفحة غير موجودة
            </h2>
            <p class="text-gray-600 font-arabic mb-8">
              الصفحة التي تبحث عنها قد تكون محذوفة أو تم تغيير عنوانها أو غير متوفرة مؤقتاً
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <!-- Back button -->
              <button 
                @click="handleError"
                class="px-6 py-3 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-600 hover:text-white text-center font-arabic flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span class="relative z-10">العودة للصفحة السابقة</span>
                <Icon 
                  icon="ph:arrow-left-bold" 
                  class="relative z-10 text-xl transition-transform group-hover:translate-x-1"
                />
                <span class="absolute inset-0 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
              </button>

              <!-- Home button -->
              <NuxtLink 
                to="/"
                class="px-6 py-3 bg-indigo-600 border-2 border-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-700 hover:border-indigo-700 shadow-md hover:shadow-lg text-center font-arabic flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span class="relative z-10">الصفحة الرئيسية</span>
                <Icon 
                  icon="ph:house-bold" 
                  class="relative z-10 text-xl transition-transform group-hover:translate-x-1"
                />
                <span class="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Search suggestions if needed -->
        <div class="text-gray-600 font-arabic space-y-2">
          <p>يمكنك أيضاً:</p>
          <ul class="space-y-1">
            <li>
              <NuxtLink to="/books" class="text-indigo-600 hover:text-indigo-700 transition-colors">
                تصفح مكتبة الكتب
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-indigo-600 hover:text-indigo-700 transition-colors">
                التواصل مع فريق الدعم
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  error: {
    type: Object,
    required: true
  }
});

useHead({
  title: '404 - الصفحة غير موجودة | كُتُبي',
  meta: [
    { name: 'description', content: 'عذراً، الصفحة التي تبحث عنها غير موجودة' }
  ]
});

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
  background-size: 20px 20px;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-10px) translateX(5px); }
}

@keyframes float-delay {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(10px) translateX(-5px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-15px) translateX(-8px); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 10s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}
</style>