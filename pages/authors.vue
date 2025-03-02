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
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">المؤلفون</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
          <p class="mt-4 text-gray-600 font-arabic">تصفح الكتب حسب المؤلف</p>
        </div>

        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative max-w-md mx-auto">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="ابحث عن مؤلف..."
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors font-arabic text-right"
            />
            <Icon
                icon="ph:magnifying-glass-bold"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            />
          </div>
        </div>

        <!-- Authors Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="author in filteredAuthors" :key="author.id"
               class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <NuxtLink :to="`/books?author=${author.slug}`" class="block p-6">
              <div class="text-center">
                <div class="w-24 h-24 mx-auto mb-4 relative">
                  <img
                      :src="author.image"
                      :alt="author.name"
                      class="w-full h-full object-cover rounded-full border-4 border-indigo-100 group-hover:border-indigo-200 transition-colors"
                  />
                </div>
                <h3 class="text-lg font-bold text-indigo-900 font-arabic mb-2">{{ author.name }}</h3>
                <p class="text-gray-600 text-sm mb-3">{{ author.bookCount }} كتاب</p>
                <div class="text-amber-500 flex justify-center gap-1">
                  <Icon icon="ph:star-fill" v-for="i in 5" :key="i"
                        :class="i <= author.rating ? 'text-amber-400' : 'text-gray-200'" />
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
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '~/stores/product';
import { Icon } from '@iconify/vue';

const store = useProductStore();
const searchQuery = ref('');
const authors = ref([
  {
    id: 1,
    name: 'طه حسين',
    slug: 'taha-hussein',
    image: '/images/authors/taha-hussein.jpg',
    rating: 5,
    bookCount: 0
  },
  {
    id: 2,
    name: 'نجيب محفوظ',
    slug: 'naguib-mahfouz',
    image: '/images/authors/naguib-mahfouz.jpg',
    rating: 5,
    bookCount: 0
  },
  // Add more authors as needed
]);

const filteredAuthors = computed(() => {
  return authors.value.filter(author =>
      author.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  await store.fetchProducts();
  // Calculate book count for each author
  authors.value = authors.value.map(author => ({
    ...author,
    bookCount: store.products.filter(book => book.author === author.slug).length
  }));
});

// SEO
useHead({
  title: 'المؤلفون - كُتُبي',
  meta: [
    { name: 'description', content: 'تصفح الكتب حسب المؤلف في متجر كُتُبي' },
  ],
});

definePageMeta({
  auth: false
});
</script>