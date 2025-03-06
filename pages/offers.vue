<!-- pages/offers.vue -->
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
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">العروض والخصومات</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
          <p class="mt-4 text-gray-600 font-arabic">اكتشف أفضل العروض والخصومات على الكتب</p>
        </div>

        <!-- Offers Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="book in discountedBooks" :key="book.id" class="group">
            <ProductCard :product="book">
              <!-- Discount Badge -->
              <template #badge>
                <div class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold font-arabic">
                  {{ calculateDiscount(book.price, book.originalPrice) }}٪ خصم
                </div>
              </template>
            </ProductCard>
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
const discountedBooks = ref([]);

const calculateDiscount = (currentPrice, originalPrice) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

onMounted(async () => {
  try {
    await store.fetchProducts();
    // Filter products with discounts
    discountedBooks.value = store.products.filter(product =>
        product.originalPrice && product.originalPrice > product.price
    );
  } finally {
    loading.value = false;
  }
});

// SEO
useHead({
  title: 'العروض والخصومات - كُتُبي',
  meta: [
    { name: 'description', content: 'تصفح أفضل العروض والخصومات على الكتب في متجر كُتُبي' },
  ],
});

definePageMeta({
  middleware: ['auth']
})
</script>