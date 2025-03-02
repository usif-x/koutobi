<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rtl">
    <!-- Background Effects -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
    </div>

    <!-- Page Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <!-- Page Header -->
        <div class="mb-12">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">التصنيفات</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
          <p class="mt-4 text-gray-600 font-arabic">تصفح الكتب حسب التصنيف</p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="category in categories" :key="category.id"
               class="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <NuxtLink :to="`/books?category=${category.slug}`" class="block">
              <div class="relative h-48">
                <img :src="category.image" :alt="category.name"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                <div class="absolute bottom-0 p-6">
                  <h3 class="text-xl font-bold text-white font-arabic mb-2">{{ category.name }}</h3>
                  <p class="text-indigo-100 text-sm">{{ category.bookCount }} كتاب</p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '~/stores/product';

const store = useProductStore();
const categories = ref([
  {
    id: 1,
    name: 'العلوم',
    slug: 'science',
    image: '/images/categories/science.jpg',
    bookCount: 0
  },
  {
    id: 2,
    name: 'الأدب',
    slug: 'literature',
    image: '/images/categories/literature.jpg',
    bookCount: 0
  },
  {
    id: 3,
    name: 'التاريخ',
    slug: 'history',
    image: '/images/categories/history.jpg',
    bookCount: 0
  },
  // Add more categories as needed
]);

onMounted(async () => {
  await store.fetchProducts();
  // Calculate book count for each category
  categories.value = categories.value.map(category => ({
    ...category,
    bookCount: store.products.filter(book => book.category === category.slug).length
  }));
});

// SEO
useHead({
  title: 'التصنيفات - كُتُبي',
  meta: [
    { name: 'description', content: 'تصفح الكتب حسب التصنيف في متجر كُتُبي' },
  ],
});

definePageMeta({
  auth: false
});
</script>