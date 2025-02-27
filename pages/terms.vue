<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 md:px-6 lg:px-8 rtl overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <div class="container mx-auto z-10 relative">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-right mb-12">
          <div class="relative inline-block group">
            <span class="absolute -top-6 -right-6 w-20 h-20 bg-amber-300 rounded-full opacity-20 blur-xl 
                       group-hover:w-24 group-hover:h-24 transition-all duration-500"></span>
            <h1 class="relative text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 font-arabic">
             الشروط والأحكام
            </h1>
            <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3 
                      transform origin-right transition-all duration-300 group-hover:scale-x-110"></div>
          </div>
          <p class="text-gray-600 mt-4 font-arabic">آخر تحديث: ٢٧ فبراير ٢٠٢٥</p>
        </div>

        <!-- Content sections -->
        <div class="space-y-8">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">١. شروط الاستخدام</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>باستخدامك لموقع كُتبي، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.</p>
              <ul class="list-disc list-inside space-y-2 mr-6">
                <li>يجب تقديم معلومات دقيقة وحقيقية عند التسجيل</li>
                <li>أنت مسؤول عن الحفاظ على سرية حسابك</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">٢. الملكية الفكرية</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>جميع المحتويات المنشورة على موقع كُتبي محمية بموجب قوانين الملكية الفكرية. لا يجوز نسخ أو إعادة نشر أي محتوى دون إذن كتابي مسبق.</p>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">٣. المشتريات والمدفوعات</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>عند إجراء عملية شراء على موقعنا:</p>
              <ul class="list-disc list-inside space-y-2 mr-6">
                <li>توافق على دفع المبلغ الكامل المستحق عن مشترياتك</li>
                <li>تفهم أن الأسعار قد تتغير في أي وقت</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">٤. إخلاء المسؤولية</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>يتم تقديم خدماتنا "كما هي" دون أي ضمانات. لا نتحمل المسؤولية عن أي أضرار مباشرة أو غير مباشرة تنتج عن استخدام موقعنا.</p>
            </div>
          </div>
        </div>

        <!-- Contact section -->
        <div class="mt-12 bg-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 class="text-2xl font-bold font-arabic mb-4">تواصل معنا</h2>
          <p class="font-arabic">إذا كان لديك أي استفسارات حول شروطنا وأحكامنا، يرجى التواصل معنا على:</p>
          <div class="flex items-center gap-2 mt-4">
            <Icon icon="ph:envelope-duotone" class="text-xl" />
            <span class="font-arabic">legal@koutobi.shop</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>