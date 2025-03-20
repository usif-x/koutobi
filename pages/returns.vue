<template>
  <section class="relative min-h-screen bg-transparent py-12 px-4 md:px-6 lg:px-8 rtl">
  <div class="bsolute top-0 left-0 w-full h-full overflow-hidden z-[-9999]">
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
             الإرجاع والاستبدال
            </h1>
            <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3 
                      transform origin-right transition-all duration-300 group-hover:scale-x-110"></div>
          </div>

          <div class="space-y-8">
            <div class="prose prose-lg max-w-none text-right">
              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">شروط الإرجاع</h2>
              <ul class="space-y-4 text-gray-700 font-arabic list-none">
                <li class="flex items-center gap-3">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500 flex-shrink-0" />
                  <span>يجب أن يتم الإرجاع خلال 14 يوماً من تاريخ استلام الطلب</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500 flex-shrink-0" />
                  <span>يجب أن تكون الكتب بحالتها الأصلية دون أي تلف أو استخدام</span>
                </li>
                <li class="flex items-center gap-3">
                  <Icon icon="ph:check-circle-bold" class="text-amber-500 flex-shrink-0" />
                  <span>يجب الاحتفاظ بفاتورة الشراء وتغليف المنتج الأصلي</span>
                </li>
              </ul>

              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mt-8 mb-4">خطوات الإرجاع</h2>
                            <ol class="space-y-4 text-gray-700 font-arabic list-decimal rtl text-right pr-5">
                <li>تواصل معنا عبر خدمة العملاء لتقديم طلب الإرجاع.</li>
                <li>قم بتعبئة نموذج الإرجاع الذي سيتم إرساله إليك عبر البريد الإلكتروني.</li>
                <li>أعد تغليف المنتج بشكل آمن مع إرفاق الفاتورة الأصلية.</li>
                <li>قم بإرسال المنتج عبر شركة الشحن المعتمدة لدينا.</li>
                <li>بعد استلام المنتج والتحقق منه، سيتم رد المبلغ إلى حسابك خلال 7 أيام عمل.</li>
              </ol>

              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mt-8 mb-4">سياسة الاستبدال</h2>
              <p class="text-gray-700 font-arabic">
                يمكن استبدال المنتجات في حال وجود عيب مصنعي أو استلام منتج خاطئ، على أن يتم الإبلاغ خلال 7 أيام من الاستلام.
              </p>

              <h2 class="text-xl font-semibold text-indigo-900 font-arabic mt-8 mb-4">الاتصال بنا</h2>
              <p class="text-gray-700 font-arabic">
                في حال وجود أي استفسارات، يرجى التواصل معنا عبر البريد الإلكتروني أو الرقم الموحد لخدمة العملاء.
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
useHead({
  title: 'الرجوع والاستبدال - متجر كُتُبي',
})
</script>
