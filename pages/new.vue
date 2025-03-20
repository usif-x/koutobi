<template>
  <div class="min-h-screen bg-transparent rtl">
    <!-- Background Effects -->
    <div class="bsolute top-0 left-0 w-full h-full overflow-hidden z-[-9999]">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <!-- Page Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <!-- Page Header -->
        <div class="mb-8">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">أحدث الإصدارات</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div class="flex flex-wrap gap-4 items-center justify-between">
            <div class="flex gap-4">
              <select v-model="filter.category" class="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-arabic">
                <option value="">كل التصنيفات</option>
                <option value="science">علوم</option>
                <option value="math">رياضيات</option>
                <option value="arabic">لغة عربية</option>
                <option value="english">لغة إنجليزية</option>
              </select>
              <select v-model="filter.grade" class="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-arabic">
                <option value="">كل المراحل</option>
                <option value="primary">ابتدائي</option>
                <option value="prep">إعدادي</option>
                <option value="secondary">ثانوي</option>
              </select>
            </div>
            <div class="flex items-center gap-2 text-gray-600 font-arabic">
              <span>عدد الكتب:</span>
              <span class="font-bold text-indigo-900">{{ filteredBooks.length }}</span>
            </div>
          </div>
        </div>

        <!-- Books Grid -->
        <div v-if="filteredBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="book in filteredBooks" :key="book.id" class="bg-white rounded-2xl shadow-lg overflow-hidden group">
            <!-- Book Image -->
            <div class="relative">
              <img :src="book.image" :alt="book.title" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <div class="flex gap-2">
                  <button class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                    <Icon icon="ph:shopping-cart-simple-bold" />
                  </button>
                  <button class="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors">
                    <Icon icon="ph:heart-bold" />
                  </button>
                </div>
              </div>
              <div class="absolute top-2 right-2 bg-amber-400 text-white px-2 py-1 rounded-lg text-sm font-arabic">
                جديد
              </div>
            </div>

            <!-- Book Info -->
            <div class="p-4">
              <h3 class="font-semibold text-indigo-900 font-arabic mb-2">{{ book.title }}</h3>
              <p class="text-gray-600 text-sm mb-3 font-arabic">{{ book.author }}</p>
              <div class="flex justify-between items-center">
                <span class="font-bold text-indigo-900 font-arabic">{{ book.price }} جنيه</span>
                <div class="flex items-center gap-1">
                  <Icon icon="ph:star-fill" class="text-amber-400" />
                  <span class="text-gray-600 text-sm">{{ book.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Icon icon="ph:books-duotone" class="text-indigo-200 text-6xl mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-indigo-900 font-arabic mb-2">لا توجد كتب</h3>
          <p class="text-gray-600 font-arabic mb-6">لم يتم العثور على أي كتب تطابق معايير البحث</p>
          <ButtonUi label="عرض كل الكتب" icon="ph:books-bold" @click="resetFilters" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import ButtonUi from '~/components/ui/ButtonUi.vue';

// SEO
useHead({
  title: 'أحدث الإصدارات - كُتُبي',
});

// Define page meta
definePageMeta({
  auth: false
});

// Filters
const filter = ref({
  category: '',
  grade: ''
});

// Mock books data
const books = ref([
  {
    id: 1,
    title: 'الرياضيات للصف الثالث الثانوي',
    author: 'د. أحمد محمود',
    price: 120,
    rating: 4.8,
    image: '/images/book1.jpg',
    category: 'math',
    grade: 'secondary'
  },
  {
    id: 2,
    title: 'الفيزياء المتقدمة',
    author: 'د. سمير حسين',
    price: 85,
    rating: 4.6,
    image: '/images/book2.jpg',
    category: 'science',
    grade: 'secondary'
  },
  // Add more mock books as needed
]);

// Computed filtered books
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    if (filter.value.category && book.category !== filter.value.category) return false;
    if (filter.value.grade && book.grade !== filter.value.grade) return false;
    return true;
  });
});

// Methods
const resetFilters = () => {
  filter.value.category = '';
  filter.value.grade = '';
};

definePageMeta({
  middleware: ['auth']
})
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out 2s infinite;
}

.animate-float-slow {
  animation: float 8s ease-in-out 1s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>