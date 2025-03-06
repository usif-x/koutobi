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

        <!-- Loading State -->
        <div v-if="pending" class="text-center py-12">
          <div class="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-indigo-600 rounded-full"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 text-red-700 p-6 rounded-xl font-arabic">
          حدث خطأ في تحميل التصنيفات: {{ error.message }}
        </div>

        <!-- Categories Grid -->
        <!-- Categories Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-if="categories.length === 0" class="col-span-full text-center py-12">
            <div class="font-arabic text-xl text-gray-600">لا توجد تصنيفات متاحة حالياً</div>
          </div>
          <div v-else v-for="category in categories" :key="category._id"
               class="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <NuxtLink :to="`/books?category=${category._id}`" class="block">
              <div class="relative h-48 bg-[url('/images/category-bg.jpeg')] bg-cover bg-center">
                <div class="absolute inset-0 bg-black/40"></div>
                <div class="relative z-10 p-6 h-full flex flex-col justify-end rounded-lg">
                  <h3 class="text-xl p-2 font-bold text-indigo-600 font-arabic mb-2 bg-white/50 rounded-lg">{{ category.name }}</h3>
                  <p class="text-white text-sm mb-2">{{ category.description }}</p>
                  <div class="flex justify-between items-center text-sm text-white/90">
                    <span>أنشئ في: {{ category.formattedDate }}</span>
                  </div>
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
const { data: apiData, pending, error } = useFetch('/api/categories', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
});

const categories = computed(() => {
  if (!apiData.value) return [];
  return apiData.value.categories.map(category => ({
    ...category,
    formattedDate: new Date(category.createdAt).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }));
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

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