<template>
  <section class="relative min-h-screen bg-transparent py-12 px-4 md:px-6 lg:px-8 rtl">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>
    <div class="container mx-auto z-10 relative">
      <div class="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div class="text-right">
          <div class="relative inline-block mb-8">
            <span class="absolute -top-6 -right-6 w-20 h-20 bg-amber-300 rounded-full opacity-20 blur-xl 
                        group-hover:w-24 group-hover:h-24 transition-all duration-500"></span>
            <h1 class="relative text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 font-arabic">
              الشحن والتوصيل
            </h1>
            <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3 
                      transform origin-right transition-all duration-300 group-hover:scale-x-110"></div>
          </div>

          <div class="space-y-8">
            <div class="bg-indigo-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">مناطق التوصيل</h2>
              <p class="text-gray-700 font-arabic leading-relaxed">
                نقدم خدمات التوصيل لجميع محافظات مصر، بما في ذلك القاهرة، الإسكندرية، الدلتا، الصعيد، ومدن القناة.
              </p>
            </div>

            <div class="bg-amber-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">مدة التوصيل</h2>
              <ul class="space-y-3 text-gray-700 font-arabic">
                <li class="flex items-center gap-2">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500" />
                  <span>القاهرة والجيزة: 2-6 أيام عمل</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500" />
                  <span>المحافظات الأخرى: 3-10 أيام عمل</span>
                </li>
              </ul>
            </div>

            <div class="bg-indigo-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">تكلفة الشحن</h2>
              <p class="text-gray-700 font-arabic leading-relaxed">
                تكلفة الشحن الأساسية **50 جنيهًا** لأول كتاب، وكل كتاب إضافي يزيد السعر **5 جنيهات**.
              </p>
            </div>

            <div class="bg-amber-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">تتبع الطلب</h2>
              <p class="text-gray-700 font-arabic leading-relaxed">
                يمكنك تتبع طلبك بسهولة من خلال رقم التتبع الذي سيصلك عبر البريد الإلكتروني والرسائل النصية بمجرد شحن الطلب.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>
