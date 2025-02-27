<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 md:px-6 lg:px-8 rtl">
    <!-- Abstract background shapes -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 animate-float"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-float-delay"></div>
      <div class="absolute top-2/3 left-1/3 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply opacity-20 animate-float-slow"></div>
    </div>
    
    <!-- Subtle grid pattern overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
    
    <!-- Main content container -->
    <div class="container mx-auto z-10 py-8 md:py-0">
      <div class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
        <!-- Text content (right side in RTL) -->
        <div class="w-full md:w-1/2 text-right space-y-5 md:space-y-6">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 font-arabic tracking-tight">كتبي</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
          
          <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-indigo-800 font-arabic">متجرك المفضل للكتب العربية</h2>
          
          <p class="text-base md:text-lg text-gray-700 leading-relaxed font-arabic">
            اكتشف آلاف الكتب من أفضل المؤلفين العرب. استمتع برحلة ثقافية مميزة مع مجموعتنا الواسعة من الروايات والكتب العلمية والتاريخية والأدبية
          </p>
          
          <div class="flex flex-col sm:flex-row gap-3 justify-end mt-6">
            <!-- Outline button with hover effect -->
            <NuxtLink to="/signup" class="group px-5 py-3 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-600 hover:text-white text-center sm:text-right font-arabic flex items-center justify-center gap-2 relative overflow-hidden">
              <span class="relative z-10">إنشئ/سجل حسابك</span>
              <Icon icon="ph:user-plus-bold" class="relative z-10 text-xl transition-transform group-hover:rotate-12" />
              <span class="absolute inset-0 bg-indigo-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
            </NuxtLink>
            
            <!-- Primary button with hover effect -->
            <NuxtLink to="/books" class="group px-5 py-3 bg-indigo-600 border-2 border-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-indigo-700 hover:border-indigo-700 shadow-md hover:shadow-lg text-center sm:text-right font-arabic flex items-center justify-center gap-2 relative overflow-hidden">
              <span class="relative z-10">تصفح الكتب</span>
              <Icon icon="ph:books-bold" class="relative z-10 text-xl transition-transform group-hover:translate-x-1" />
              <span class="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
            </NuxtLink>
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
          <div class="relative group">
            <!-- Main image with advanced styling -->
            <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-indigo-200/50 transform group-hover:-translate-y-1">
              <!-- Border glow effect -->
              <span class="absolute inset-0 border-2 border-white/30 rounded-2xl z-20 transition-all duration-300 group-hover:border-white/50 group-hover:blur-[1px]"></span>
              
              <div class="relative overflow-hidden">
                <img src="/images/hero.jpg" alt="Koutobi Books" class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                
                <!-- Overlay gradient with interactive effect -->
                <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-50"></div>
                
                <!-- Shine effect on hover -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
              </div>
            </div>
            
            <!-- Subtle decorative elements -->
            <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-20 blur-xl transition-all duration-500 group-hover:w-32 group-hover:h-32 group-hover:opacity-30"></div>
            <div class="absolute -top-4 -left-4 w-32 h-32 bg-indigo-400 rounded-full opacity-20 blur-xl transition-all duration-500 group-hover:w-40 group-hover:h-40 group-hover:opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import Iconify component
import { Icon } from '@iconify/vue';
</script>

<style>
/* Add these styles to your global CSS or Nuxt config */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap');

.font-arabic {
  font-family: 'Cairo', 'Tajawal', sans-serif;
}

.rtl {
  direction: rtl;
}

/* Grid pattern background */
.bg-grid-pattern {
  background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Floating animations for background shapes */
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