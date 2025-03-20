<template>
  <section class="relative min-h-screen bg-transparent py-12 px-4 md:px-6 lg:px-8 rtl overflow-hidden">
    <!-- Animated background elements -->
    <div class="bsolute top-0 left-0 w-full h-full overflow-hidden z-[-9999]">
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
             سياسة الخصوصية
            </h1>
            <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3 
                      transform origin-right transition-all duration-300 group-hover:scale-x-110"></div>
          </div>
          <p class="text-gray-600 mt-4 font-arabic">آخر تحديث: ٢٧ فبراير ٢٠٢٥</p>
        </div>

        <!-- Content sections -->
        <div class="space-y-8">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">١. المعلومات التي نجمعها</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>نحن نجمع المعلومات التالية:</p>
              <ul class="list-disc list-inside space-y-2 mr-6">
                <li>معلومات شخصية (الاسم، العنوان، البريد الإلكتروني)</li>
                <li>معلومات الدفع</li>
                <li>سجل المشتريات</li>
                <li>بيانات التصفح والاستخدام</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">٢. كيفية استخدام المعلومات</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>نستخدم معلوماتك لـ:</p>
              <ul class="list-disc list-inside space-y-2 mr-6">
                <li>معالجة طلباتك وتوصيلها</li>
                <li>تحسين خدماتنا وتجربة المستخدم</li>
                <li>التواصل معك بخصوص طلباتك وعروضنا</li>
                <li>حماية أمن وسلامة موقعنا</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">٣. حماية المعلومات</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>نتخذ إجراءات أمنية صارمة لحماية معلوماتك، بما في ذلك:</p>
              <ul class="list-disc list-inside space-y-2 mr-6">
                <li>التشفير المتقدم للبيانات</li>
                <li>تقييد الوصول إلى المعلومات الشخصية</li>
                <li>مراقبة مستمرة لأنظمتنا</li>
              </ul>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
            <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">٤. حقوقك</h2>
            <div class="space-y-4 text-gray-700 font-arabic">
              <p>لديك الحق في:</p>
              <ul class="list-disc list-inside space-y-2 mr-6">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح معلوماتك</li>
                <li>حذف حسابك</li>
                <li>الاعتراض على معالجة بياناتك</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Cookie Policy -->
        <div class="mt-8 bg-indigo-600/10 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-indigo-900 font-arabic mb-4">سياسة ملفات تعريف الارتباط</h2>
          <p class="text-gray-700 font-arabic">نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. باستخدامك للموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط وفقاً لسياستنا.</p>
        </div>

        <!-- Contact Information -->
        <div class="mt-12 bg-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 class="text-2xl font-bold font-arabic mb-4">تواصل معنا</h2>
          <p class="font-arabic mb-4">إذا كان لديك أي استفسارات حول سياسة الخصوصية، يمكنك التواصل معنا عبر:</p>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Icon icon="ph:envelope-duotone" class="text-xl" />
              <span class="font-arabic">privacy@kotoubi.shop</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="ph:phone-duotone" class="text-xl" />
              <span class="font-arabic" dir="ltr">+966 XX XXX XXXX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue';

useHead({
  title: 'سياسة الخصوصية - كُتُبي',
})
</script>
<style scoped>
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

/* Optional: Add hover transitions for links */
a {
  transition: all 0.3s ease;
}

a:hover {
  opacity: 0.8;
}

/* Optional: Add smooth scrolling for the page */
html {
  scroll-behavior: smooth;
}

/* Optional: Add custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>