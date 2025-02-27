<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 md:px-6 lg:px-8 rtl">
    <div class="container mx-auto z-10 relative">
      <div class="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div class="text-right">
          <div class="relative inline-block mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-indigo-900 font-arabic">الأسئلة الشائعة</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>

          <div class="space-y-6">
            <div v-for="(item, index) in faqs" :key="index" class="border-b border-gray-200 pb-6">
              <div class="flex justify-between items-start cursor-pointer" @click="item.isOpen = !item.isOpen">
                <Icon 
                  :icon="item.isOpen ? 'ph:minus-circle-bold' : 'ph:plus-circle-bold'" 
                  class="text-2xl text-indigo-600 ml-4 mt-1"
                />
                <h3 class="text-xl font-semibold text-indigo-900 font-arabic flex-1">{{ item.question }}</h3>
              </div>
              <div v-show="item.isOpen" class="mt-4 text-gray-700 font-arabic pr-10">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const faqs = ref([
  {
    question: 'كيف يمكنني طلب الكتب؟',
    answer: 'يمكنك تصفح موقعنا واختيار الكتب التي ترغب بها، ثم إضافتها إلى سلة المشتريات. بعد ذلك، اتبع خطوات إتمام الطلب وقم بتحديد طريقة الدفع والشحن المناسبة.',
    isOpen: true
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل الدفع عبر البطاقات الائتمانية، والمحافظ الإلكترونية، والتحويل البنكي، والدفع عند الاستلام في بعض المناطق.',
    isOpen: false
  },
  {
    question: 'كم تستغرق عملية التوصيل؟',
    answer: 'تختلف مدة التوصيل حسب موقعك، ولكن عادةً ما تستغرق من 3-7 أيام عمل داخل المدن الرئيسية.',
    isOpen: false
  },
  {
    question: 'هل يمكنني إرجاع الكتب؟',
    answer: 'نعم، يمكنك إرجاع الكتب خلال 14 يوماً من تاريخ الاستلام شريطة أن تكون بحالتها الأصلية.',
    isOpen: false
  }
]);
</script>