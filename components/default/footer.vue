<!-- components/Footer.vue -->
<template>
  <footer class="bg-indigo-950 text-white pt-16 pb-8 rtl">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Main Footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="relative">
              <span class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-300 rounded-full opacity-30 blur-sm"></span>
              <h3 class="relative text-2xl font-bold text-white font-arabic">كُتُبي</h3>
            </div>
          </div>
          <div class="w-12 h-1 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full"></div>
          <p class="text-indigo-200 text-sm leading-relaxed font-arabic">
            متجر الكتب العربية الأول على الإنترنت. نقدم آلاف العناوين من أفضل الكتب العربية في مختلف المجالات.
          </p>
          <!-- Social Media Links -->
          <div class="flex space-x-3 space-x-reverse gap-3">
            <a href="#" class="w-9 h-9 rounded-full bg-indigo-800 hover:bg-indigo-700 flex items-center justify-center transition-colors">
              <Icon icon="ph:facebook-logo-bold" class="text-lg" />
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-indigo-800 hover:bg-indigo-700 flex items-center justify-center transition-colors">
              <Icon icon="ph:instagram-logo-bold" class="text-lg" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold font-arabic">روابط سريعة</h3>
          <div class="w-12 h-1 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full"></div>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/books" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>تصفح الكتب</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/bestsellers" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>الأكثر مبيعاً</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/new-releases" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>إصدارات جديدة</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/offers" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>العروض والخصومات</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/authors" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>المؤلفون</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold font-arabic">خدمة العملاء</h3>
          <div class="w-12 h-1 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full"></div>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/faq" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>الأسئلة الشائعة</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shipping" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>الشحن والتوصيل</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/returns" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>الإرجاع والاستبدال</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy-policy" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>سياسة الخصوصية</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-indigo-200 hover:text-white transition-colors font-arabic text-sm inline-flex items-center">
                <Icon icon="ph:caret-left-bold" class="ml-1" />
                <span>الشروط والأحكام</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold font-arabic">الاشعارات و العروض</h3>
          <div class="w-12 h-1 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full"></div>
          <p class="text-indigo-200 text-sm font-arabic">
ادخل بريدك الالكتروني ليصلك كل جديد عن عروضنا وخصومات 
          </p>
          <form class="mt-2">
            <div class="flex">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                class="bg-indigo-900 text-white border border-indigo-700 rounded-r-lg px-4 py-2 w-full focus:outline-none focus:border-amber-400 transition-colors placeholder-indigo-400 text-sm font-arabic"
              />
              <button 
                type="submit" 
                class="bg-amber-500 hover:bg-amber-600 text-white rounded-l-lg px-3 flex items-center justify-center transition-colors"
              >
                <Icon icon="ph:paper-plane-right-bold" />
              </button>
            </div>
          </form>
          
          <!-- Contact Info -->
          <div class="space-y-2 mt-4">
            <div class="flex gap-2 text-indigo-200 text-sm">
              <Icon icon="ph:phone-bold" class="text-amber-400 text-lg flex-shrink-0 mt-0.5" />
              <span class="font-arabic">+201010000000</span>
            </div>
            <div class="flex gap-2 text-indigo-200 text-sm">
              <Icon icon="ph:envelope-bold" class="text-amber-400 text-lg flex-shrink-0 mt-0.5" />
              <span class="font-arabic">info@koutobi.shop</span>
            </div>
            <div class="flex gap-2 text-indigo-200 text-sm">
              <Icon icon="ph:map-pin-bold" class="text-amber-400 text-lg flex-shrink-0 mt-0.5" />
              <span class="font-arabic">مصر, القاهرة</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Payment Methods -->
     <div class="border-t border-indigo-900 pt-6 pb-4">
       <PaymentMethodsSlider />
      </div>
      
      <!-- Copyright -->
      <div class="text-center border-t border-indigo-900 pt-6">
        <p class="text-indigo-300 text-sm font-arabic">
          &copy; 2025 كتبي - جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import PaymentMethodsSlider from '@/components/ui/PaymentGateWaySlider.vue';
</script>