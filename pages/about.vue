<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 md:px-6 lg:px-8 rtl overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>
    
    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
    
    <div class="container mx-auto z-10 relative">
      <div class="max-w-5xl mx-auto">
        <!-- Hero section -->
        <div class="text-right mb-16 space-y-6">
          <div class="relative inline-block group">
            <span class="absolute -top-6 -right-6 w-20 h-20 bg-amber-300 rounded-full opacity-20 blur-xl 
                       group-hover:w-24 group-hover:h-24 transition-all duration-500"></span>
            <h1 class="relative text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 font-arabic">
              من نحن
            </h1>
            <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3 
                      transform origin-right transition-all duration-300 group-hover:scale-x-110"></div>
          </div>
          
          <p class="text-xl md:text-2xl text-indigo-800/80 font-arabic font-light max-w-2xl mr-auto">
            وجهتك الأولى لاكتشاف عالم الكتب العربية
          </p>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Text content -->
          <div class="space-y-8 order-2 lg:order-1">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
              <p class="text-lg font-arabic leading-relaxed text-gray-700">
                مرحباً بكم في كُتبي - وجهتكم المفضلة للكتب العربية. نحن نؤمن بأن القراءة هي مفتاح المعرفة والتطور الشخصي، 
                ولذلك نسعى جاهدين لتوفير أفضل وأحدث الإصدارات من الكتب العربية.
              </p>
            </div>

            <div class="bg-indigo-600/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
              <p class="text-lg font-arabic leading-relaxed text-gray-700">
                تأسست منصتنا بهدف إثراء المحتوى العربي وتسهيل وصول القراء إلى الكتب التي يحبونها. 
                نحن نتعاون مع أفضل دور النشر العربية لنقدم لكم مجموعة متنوعة من الكتب في مختلف المجالات.
              </p>
            </div>
          </div>

          <!-- Stats & Features -->
          <div class="order-1 lg:order-2">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Stats cards -->
              <div class="group bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300
                          hover:shadow-xl hover:shadow-indigo-200/40">
                <div class="relative">
                  <div class="absolute -top-4 -right-4 w-16 h-16 bg-amber-300/20 rounded-full blur-xl
                             group-hover:w-20 group-hover:h-20 transition-all duration-500"></div>
                  <Icon icon="ph:books-bold" class="text-5xl text-amber-500 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                  <h3 class="text-2xl font-semibold text-indigo-900 font-arabic mb-2">+10,000</h3>
                  <p class="text-gray-600 font-arabic">كتاب متوفر</p>
                </div>
              </div>

              <div class="group bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300
                          hover:shadow-xl hover:shadow-indigo-200/40">
                <div class="relative">
                  <div class="absolute -top-4 -right-4 w-16 h-16 bg-indigo-300/20 rounded-full blur-xl
                             group-hover:w-20 group-hover:h-20 transition-all duration-500"></div>
                  <Icon icon="ph:users-bold" class="text-5xl text-indigo-500 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                  <h3 class="text-2xl font-semibold text-indigo-900 font-arabic mb-2">+50,000</h3>
                  <p class="text-gray-600 font-arabic">قارئ نشط</p>
                </div>
              </div>

              <!-- Feature cards -->
              <div class="sm:col-span-2">
                <div class="group bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg p-8 transform 
                            hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200/40">
                  <div class="relative">
                    <div class="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl
                               group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>
                    <Icon icon="ph:medal-bold" class="text-5xl text-white mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                    <h3 class="text-2xl font-semibold text-white font-arabic mb-2">خدمة موثوقة</h3>
                    <p class="text-indigo-100 font-arabic">نضمن لكم تجربة تسوق سلسة وآمنة مع دعم على مدار الساعة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust badges -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="flex items-center justify-center p-6 bg-white/60 rounded-xl backdrop-blur-sm">
            <Icon icon="ph:truck-duotone" class="text-3xl text-amber-500 ml-3" />
            <span class="text-gray-700 font-arabic">توصيل سريع</span>
          </div>
          <div class="flex items-center justify-center p-6 bg-white/60 rounded-xl backdrop-blur-sm">
            <Icon icon="ph:shield-check-duotone" class="text-3xl text-amber-500 ml-3" />
            <span class="text-gray-700 font-arabic">دفع آمن</span>
          </div>
          <div class="flex items-center justify-center p-6 bg-white/60 rounded-xl backdrop-blur-sm">
            <Icon icon="ph:book-bookmark-duotone" class="text-3xl text-amber-500 ml-3" />
            <span class="text-gray-700 font-arabic">كتب أصلية</span>
          </div>
          <div class="flex items-center justify-center p-6 bg-white/60 rounded-xl backdrop-blur-sm">
            <Icon icon="ph:headset-duotone" class="text-3xl text-amber-500 ml-3" />
            <span class="text-gray-700 font-arabic">دعم متواصل</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>

<style scoped>
/* Grid pattern background */
.bg-grid-pattern {
  background-image: linear-gradient(to right, #6366f1 1px, transparent 1px),
                    linear-gradient(to bottom, #6366f1 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Floating animations */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, 15px); }
}

@keyframes float-delay {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -10px); }
}

@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, -15px); }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 18s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 20s ease-in-out infinite;
}
</style>