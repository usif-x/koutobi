<!-- pages/bestsellers.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rtl">
    <!-- Background Effects -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
    </div>

    <!-- Page Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <div class="max-w-7xl mx-auto">
        <!-- Page Header -->
        <div class="mb-12">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">الأكثر مبيعاً</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
          <p class="mt-4 text-gray-600 font-arabic">اكتشف أكثر الكتب مبيعاً في متجرنا</p>
        </div>

        <!-- Books Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="book in bestsellerBooks" :key="book.id" class="group">
            <ProductCard :product="book" />
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '~/stores/product';

const store = useProductStore();
const loading = ref(true);
const bestsellerBooks = ref([]);

onMounted(async () => {
  try {
    await store.fetchProducts();
    // Filter and sort products by sales count
    bestsellerBooks.value = store.products
        .filter(product => product.sales > 0)
        .sort((a, b) => b.sales - a.sales);
  } finally {
    loading.value = false;
  }
});

// SEO
useHead({
  title: 'الأكثر مبيعاً - كُتُبي',
  meta: [
    { name: 'description', content: 'تصفح أكثر الكتب مبيعاً في متجر كُتُبي' },
  ],
});

definePageMeta({
  auth: false
});
</script>