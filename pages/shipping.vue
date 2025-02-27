<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 md:px-6 lg:px-8 rtl">
    <div class="container mx-auto z-10 relative">
      <div class="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div class="text-right">
          <div class="relative inline-block mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-indigo-900 font-arabic">الشحن والتوصيل</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>

          <div class="space-y-8">
            <div class="bg-indigo-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">مناطق التوصيل</h2>
              <p class="text-gray-700 font-arabic leading-relaxed">
                نقدم خدمات التوصيل لجميع مدن المملكة العربية السعودية ودول مجلس التعاون الخليجي.
              </p>
            </div>

            <div class="bg-amber-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">مدة التوصيل</h2>
              <ul class="space-y-3 text-gray-700 font-arabic">
                <li class="flex items-center gap-2">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500" />
                  <span>المدن الرئيسية: 2-3 أيام عمل</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500" />
                  <span>المدن الأخرى: 3-5 أيام عمل</span>
                </li>
                <li class="flex items-center gap-2">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500" />
                  <span>دول الخليج: 5-7 أيام عمل</span>
                </li>
              </ul>
            </div>

            <div class="bg-indigo-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">تكلفة الشحن</h2>
              <p class="text-gray-700 font-arabic leading-relaxed">
                تحتسب تكلفة الشحن بناءً على وزن الطلب والمنطقة. الشحن مجاني للطلبات التي تتجاوز 200 ريال.
              </p>
            </div>

            <div class="bg-amber-50 rounded-lg p-6">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">تتبع الطلب</h2>
              <p class="text-gray-700 font-arabic leading-relaxed">
                يمكنك تتبع طلبك بسهولة من خلال رقم التتبع الذي سيصلك عبر البريد الإلكتروني والرسائل النصية.
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