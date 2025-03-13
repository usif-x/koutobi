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
            {{ getSearchDescription() }}
          </p>
        </div>

        <!-- Search Filters -->
        <div class="bg-white rounded-xl shadow-md p-4 mb-6">
          <div class="flex flex-wrap gap-4 items-center">
            <!-- Sort Options -->
            <div class="flex-1 min-w-[200px]">
              <select 
                v-model="sortOption" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-arabic"
                @change="fetchSearchResults()"
              >
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="discount">الخصومات</option>
                <option value="popular">الأكثر شعبية</option>
              </select>
            </div>
            
            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex items-center gap-2">
              <button 
                @click="prevPage" 
                class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
                :disabled="currentPage === 1"
              >
                <Icon icon="ph:caret-left-bold" />
              </button>
              <span class="text-gray-600 font-arabic">{{ currentPage }} / {{ totalPages }}</span>
              <button 
                @click="nextPage" 
                class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
                :disabled="currentPage === totalPages"
              >
                <Icon icon="ph:caret-right-bold" />
              </button>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
          <p class="mt-4 text-gray-600 font-arabic">جاري البحث...</p>
        </div>

        <div v-else-if="searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="book in searchResults" :key="book._id" class="bg-white rounded-2xl shadow-lg overflow-hidden group">
            <!-- Book Image -->
            <div class="relative h-48 bg-gray-100">
              <img 
                v-if="book.images && book.images.length > 0" 
                :src="book.images[0]" 
                :alt="book.name" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div v-else class="w-full h-full flex items-center justify-center text-indigo-200">
                <Icon icon="ph:book-duotone" class="text-6xl" />
              </div>
              
              <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <div class="flex gap-2">
                  <NuxtLink :to="`/books/${book._id}`" class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                    <Icon icon="ph:eye-bold" />
                  </NuxtLink>
                  <button class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                    <Icon icon="ph:shopping-cart-simple-bold" />
                  </button>
                </div>
              </div>
              
              <!-- Discount Badge -->
              <div v-if="book.hasDiscount && book.discountPercentage > 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {{ book.discountPercentage }}% خصم
              </div>
            </div>

            <!-- Book Info -->
            <div class="p-4">
              <h3 class="font-semibold text-indigo-900 font-arabic mb-2 line-clamp-1">{{ book.name }}</h3>
              <p class="text-gray-600 text-sm mb-2 font-arabic line-clamp-1">{{ book.author }}</p>
              <div class="flex justify-between items-center">
                <div>
                  <span v-if="book.hasDiscount" class="font-bold text-indigo-900 font-arabic">
                    {{ formatPrice(getDiscountedPrice(book)) }}
                    <span class="text-gray-400 text-sm line-through mr-1">{{ formatPrice(book.price) }}</span>
                  </span>
                  <span v-else class="font-bold text-indigo-900 font-arabic">{{ formatPrice(book.price) }}</span>
                </div>
                <div v-if="book.ratingCount > 0" class="flex items-center gap-1">
                  <Icon icon="ph:star-fill" class="text-amber-400 text-sm" />
                  <span class="text-gray-600 text-sm font-arabic">{{ book.ratingAverage }}</span>
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
        
        <!-- Pagination Controls -->
        <div v-if="searchResults.length > 0 && totalPages > 1" class="mt-8 flex justify-center">
          <div class="flex items-center gap-2">
            <button 
              @click="goToPage(1)" 
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
              :disabled="currentPage === 1"
            >
              <Icon icon="ph:caret-double-left-bold" />
            </button>
            <button 
              @click="prevPage" 
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
              :disabled="currentPage === 1"
            >
              <Icon icon="ph:caret-left-bold" />
            </button>
            
            <div v-for="page in displayedPages" :key="page" class="mx-1">
              <button 
                @click="goToPage(page)" 
                class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                :class="currentPage === page ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="nextPage" 
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
              :disabled="currentPage === totalPages"
            >
              <Icon icon="ph:caret-right-bold" />
            </button>
            <button 
              @click="goToPage(totalPages)" 
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors disabled:opacity-50"
              :disabled="currentPage === totalPages"
            >
              <Icon icon="ph:caret-double-right-bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import ButtonUi from '~/components/ui/ButtonUi.vue';

// Route and router
const route = useRoute();
const router = useRouter();

// Search state
const searchResults = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(0);
const itemsPerPage = ref(20);
const sortOption = ref('newest');

// Watch for query changes
watch(() => route.query, async () => {
  currentPage.value = parseInt(route.query.page?.toString() || '1');
  sortOption.value = route.query.sort?.toString() || 'newest';
  await fetchSearchResults();
}, { immediate: true, deep: true });

// Get search description based on query parameters
const getSearchDescription = () => {
  if (route.query.search) {
    return `نتائج البحث عن: "${route.query.search}"`;
  } else if (route.query.authors) {
    return `كتب المؤلف: "${route.query.authors}"`;
  } else if (route.query.categories) {
    return `كتب في تصنيف: "${getCategoryName(route.query.categories.toString())}"`;
  } else {
    return 'جميع الكتب';
  }
};

// Get category name in Arabic
const getCategoryName = (category) => {
  const categories = {
        'children': 'كتب أطفال',
    'religious': 'كتب دينية',
    'self-development': 'تنمية ذاتية',
    'story': 'قصص',
    'other': 'أخرى'
  }
  return categories[category] || category;
};

// Get discounted price for a product
const getDiscountedPrice = (product) => {
  if (product.hasDiscount && product.discountPercentage > 0) {
    return product.price * (1 - product.discountPercentage / 100);
  }
  return product.price;
};

// Format price
const formatPrice = (price) => {
  return `${price.toFixed(2)} ر.س`;
};

// Pagination logic
const displayedPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages.value <= maxVisiblePages) {
    // Show all pages if total pages is less than max visible
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

// Fetch search results from API
const fetchSearchResults = async () => {
  loading.value = true;
  
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    // Add search parameters
    if (route.query.search) {
      queryParams.append('search', route.query.search.toString());
    }
    
    if (route.query.authors) {
      queryParams.append('authors', route.query.authors.toString());
    }
    
    if (route.query.categories) {
      queryParams.append('categories', route.query.categories.toString());
    }
    
    if (route.query.bookTypes) {
      queryParams.append('bookTypes', route.query.bookTypes.toString());
    }
    
    // Add pagination
    queryParams.append('page', currentPage.value.toString());
    queryParams.append('limit', itemsPerPage.value.toString());
    
    // Add sorting
    if (sortOption.value === 'newest') {
      queryParams.append('sort', '-createdAt');
    } else if (sortOption.value === 'price-asc') {
      queryParams.append('sort', 'price');
    } else if (sortOption.value === 'price-desc') {
      queryParams.append('sort', '-price');
    } else if (sortOption.value === 'discount') {
      queryParams.append('hasDiscount', 'true');
      queryParams.append('sort', '-discountPercentage');
    } else if (sortOption.value === 'popular') {
      queryParams.append('sort', '-ratingAverage');
    }
    
    // Fetch data from API
    const response = await fetch(`/api/product/filter?${queryParams.toString()}`);
    const data = await response.json();
    
    // Update state
    searchResults.value = data.products;
    totalItems.value = data.totalCount;
    totalPages.value = Math.ceil(data.totalCount / itemsPerPage.value);
    
  } catch (error) {
    console.error('Error fetching search results:', error);
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

// Pagination methods
const goToPage = (page) => {
  if (page === currentPage.value) return;
  
  router.push({
    query: {
      ...route.query,
      page: page.toString(),
      sort: sortOption.value
    }
  });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

// Add to cart functionality
const addToCart = async (productId) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        productId,
        quantity: 1
      })
    });
    
    if (response.ok) {
      // Show success message or update cart count
      alert('تمت إضافة المنتج إلى سلة التسوق');
    } else {
      alert('فشل في إضافة المنتج إلى سلة التسوق');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('حدث خطأ أثناء إضافة المنتج إلى سلة التسوق');
  }
};

// SEO
useHead({
  title: 'نتائج البحث - كُتُبي',
  meta: [
    { name: 'description', content: 'ابحث عن الكتب في متجر كُتُبي - متجر الكتب العربية الأول' }
  ]
});

// Initial fetch
onMounted(() => {
  fetchSearchResults();
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>