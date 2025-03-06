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

        <!-- Loading State -->
        <div v-if="pending" class="text-center py-12">
          <div class="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-indigo-600 rounded-full"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 text-red-700 p-6 rounded-xl font-arabic">
          حدث خطأ في تحميل المؤلفين: {{ error.message }}
        </div>

        <!-- Authors Grid -->
        <!-- Authors Grid -->
        <div v-else>
          <!-- No Authors Message -->
          <div v-if="filteredAuthors.length === 0" class="text-center py-12">
            <p class="text-lg text-gray-600 font-arabic">لا يوجد مؤلفون متاحون حالياً</p>
          </div>
          <!-- Authors List -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="author in filteredAuthors" :key="author._id"
                 class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <NuxtLink :to="`/books?author=${author._id}`" class="block p-6">
                <div class="text-center">
                  <div class="w-24 h-24 mx-auto mb-4 relative">
                    <img
                        :src="author.photo || '/images/authors/default.jpg'"
                        :alt="author.name"
                        class="w-full h-full object-cover rounded-full border-4 border-indigo-100 group-hover:border-indigo-200 transition-colors"
                    />
                  </div>
                  <h3 class="text-lg font-bold text-indigo-900 font-arabic mb-2">{{ author.name }}</h3>
                  <p class="text-gray-600 text-sm mb-3">{{ author.bookCount }} كتاب</p>
                  <div class="text-sm text-gray-500">
                    أنشئ في: {{ formatDate(author.createdAt) }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: apiData, pending, error } = useFetch("/api/author", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

const authors = computed(() => {
  if (!apiData.value) return [];
  return apiData.value.authors.map((author) => ({
    ...author,
    formattedDate: new Date(author.createdAt).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));
});

const searchQuery = ref("");

const filteredAuthors = computed(() => {
  return authors.value.filter((author) =>
      author.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// SEO
useHead({
  title: "المؤلفون - كُتُبي",
  meta: [
    { name: "description", content: "تصفح الكتب حسب المؤلف في متجر كُتُبي" },
  ],
});

definePageMeta({
  auth: false,
});

</script>