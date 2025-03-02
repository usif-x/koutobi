<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rtl">
    <!-- Background Effects -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <!-- Page Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <!-- Search Header -->
        <div class="mb-8">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">نتائج البحث</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
          <p class="mt-4 text-gray-600 font-arabic">
            نتائج البحث عن: "{{ searchQuery }}"
          </p>
        </div>

        <!-- Search Results -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
        </div>

        <div v-else-if="searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="book in searchResults" :key="book.id" class="bg-white rounded-2xl shadow-lg overflow-hidden group">
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
            </div>

            <!-- Book Info -->
            <div class="p-4">
              <h3 class="font-semibold text-indigo-900 font-arabic mb-2">{{ book.title }}</h3>
              <p class="text-gray-600 text-sm mb-2 font-arabic">{{ book.author }}</p>
              <div class="flex justify-between items-center">
                <span class="font-bold text-indigo-900 font-arabic">{{ book.price }} جنيه</span>
                <div class="flex items-center gap-1">
                  <Icon icon="ph:star-fill" class="text-amber-400 text-sm" />
                  <span class="text-gray-600 text-sm font-arabic">{{ book.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Icon icon="ph:books-duotone" class="text-indigo-200 text-6xl mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-indigo-900 font-arabic mb-2">لا توجد نتائج</h3>
          <p class="text-gray-600 font-arabic mb-6">لم يتم العثور على أي كتب تطابق بحثك</p>
          <ButtonUi label="عرض كل الكتب" icon="ph:books-bold" to="/books" isLink />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import ButtonUi from '~/components/ui/ButtonUi.vue';
import { useProductStore } from '~/stores/product';

// Route and store
const route = useRoute();
const store = useProductStore();

// Search state
const searchQuery = ref('');
const searchResults = ref([]);
const loading = ref(false);

// Watch for query changes
watch(() => route.query.name, async (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery;
    await performSearch();
  } else {
    searchResults.value = [];
  }
}, { immediate: true });

// Search function
const performSearch = async () => {
  loading.value = true;
  try {
    // Ensure products are loaded
    if (!store.products.length) {
      await store.fetchProducts();
    }

    // Perform search
    const query = searchQuery.value.toLowerCase();
    searchResults.value = store.products.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description?.toLowerCase().includes(query)
    );
  } catch (error) {
    console.error('Search error:', error);
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

// SEO
useHead({
  title: `نتائج البحث - ${searchQuery.value || ''} - كُتُبي`,
  meta: [
    { name: 'description', content: 'نتائج البحث في متجر كُتُبي - متجر الكتب العربية الأول' },
  ],
});

// Define page meta
definePageMeta({
  auth: false
});
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