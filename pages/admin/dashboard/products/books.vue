<template>
  <div class="space-y-6">
    <!-- Header with Add Product Button -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">إدارة الكتب</h1>
      <NuxtLink to="/admin/dashboard/products/add" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Icon icon="ph:plus-bold" />
        <span>إضافة كتاب جديد</span>
      </NuxtLink>
    </div>

    <!-- Search and Filter Bar -->
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="البحث عن كتاب..." 
              class="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Icon 
              icon="ph:magnifying-glass" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <div class="flex gap-4">
          <select 
            v-model="categoryFilter" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">جميع الفئات</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <select 
            v-model="sortBy" 
            class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="newest">الأحدث</option>
            <option value="oldest">الأقدم</option>
            <option value="name">الاسم</option>
            <option value="price-asc">السعر: الأقل أولاً</option>
            <option value="price-desc">السعر: الأعلى أولاً</option>
            <option value="stock-asc">المخزون: الأقل أولاً</option>
            <option value="stock-desc">المخزون: الأعلى أولاً</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Books Grid View -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <Icon icon="ph:spinner-gap-bold" class="text-4xl text-indigo-600 animate-spin" />
      </div>
      
      <div v-else-if="filteredProducts.length === 0" class="py-20 text-center">
        <Icon icon="ph:books-duotone" class="text-5xl text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 text-lg">لا توجد كتب متطابقة مع البحث</p>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="book in paginatedProducts" :key="book._id" class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div class="relative h-48 bg-gray-100">
            <img 
              :src="book.images[0] || '/images/placeholder.png'" 
              :alt="book.name" 
              class="w-full h-full object-cover"
            />
            <div class="absolute top-2 right-2 flex gap-1">
              <button @click="editProduct(book._id)" class="bg-white p-1.5 rounded-full shadow-sm hover:bg-indigo-100 transition-colors">
                <Icon icon="ph:pencil-simple-bold" class="text-indigo-600 text-lg" />
              </button>
              <button @click="confirmDelete(book)" class="bg-white p-1.5 rounded-full shadow-sm hover:bg-red-100 transition-colors">
                <Icon icon="ph:trash-bold" class="text-red-600 text-lg" />
              </button>
            </div>
            <div v-if="book.discountPercentage" class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {{ book.discountPercentage }}% خصم
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{{ book.name }}</h3>
            <p class="text-sm text-gray-500 mb-2">{{ book.author }}</p>
            
            <div class="flex justify-between items-center">
              <div>
                <span class="text-indigo-600 font-bold">{{ book.price.toFixed(2) }} ج.م</span>
                <span v-if="book.discountPercentage" class="text-gray-400 text-sm line-through mr-1">
                  {{ (book.price / (1 - book.discountPercentage / 100)).toFixed(2) }} ج.م
                </span>
              </div>
              <span :class="getStockClass(book.stockCount)">
                {{ book.stockCount > 0 ? `متوفر: ${book.stockCount}` : 'نفذت الكمية' }}
              </span>
            </div>
            
            <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                {{ book.category }}
              </span>
              <span :class="getStatusClass(book.status)">
                {{ book.status === 'active' ? 'نشط' : 'غير نشط' }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="!loading && filteredProducts.length > 0" class="mt-8 flex items-center justify-center">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px space-x-reverse" aria-label="Pagination">
          <button @click="currentPage--" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="sr-only">السابق</span>
            <Icon icon="ph:caret-right-bold" class="h-5 w-5" aria-hidden="true" />
          </button>
          <button v-for="page in displayedPages" :key="page" @click="currentPage = page" :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
            currentPage === page 
              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          ]">
            {{ page }}
          </button>
          <button @click="currentPage++" :disabled="currentPage >= totalPages" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="sr-only">التالي</span>
            <Icon icon="ph:caret-left-bold" class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { useAlerts } from '~/composables/useAlerts';

const router = useRouter();
const { confirmAlert, successToast, errorToast } = useAlerts();

// Data
const products = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const categoryFilter = ref('');
const sortBy = ref('newest');
const currentPage = ref(1);
const pageSize = 12; // Show more items in grid view

// Fetch categories from products
const categories = computed(() => {
  const uniqueCategories = new Set(products.value.map(product => product.category));
  return Array.from(uniqueCategories);
});

// Filter and sort products
const filteredProducts = computed(() => {
  let result = [...products.value];
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      (product.author && product.author.toLowerCase().includes(query))
    );
  }
  
  // Apply category filter
  if (categoryFilter.value) {
    result = result.filter(product => product.category === categoryFilter.value);
  }
  
  // Apply sorting
  switch (sortBy.value) {
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'stock-asc':
      result.sort((a, b) => a.stockCount - b.stockCount);
      break;
    case 'stock-desc':
      result.sort((a, b) => b.stockCount - a.stockCount);
      break;
  }
  
  return result;
});

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredProducts.value.slice(start, end);
});

// Display a reasonable number of page buttons
const displayedPages = computed(() => {
  const totalPagesCount = totalPages.value;
  const current = currentPage.value;
  const delta = 2; // Number of pages to show before and after current page
  
  let result = [];
  
  for (let i = 1; i <= totalPagesCount; i++) {
    if (
      i === 1 || // First page
      i === totalPagesCount || // Last page
      (i >= current - delta && i <= current + delta) // Pages around current
    ) {
      result.push(i);
    }
  }
  
  return result;
});

// Reset to first page when filters change
watch([searchQuery, categoryFilter, sortBy], () => {
  currentPage.value = 1;
});

// Fetch products
const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await fetch('/api/product/filter?all=true', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    errorToast('فشل في تحميل الكتب');
  } finally {
    loading.value = false;
  }
};

// Edit product
const editProduct = (productId) => {
  router.push(`/admin/dashboard/products/edit/${productId}`);
};

// Delete product
const confirmDelete = async (product) => {
  const result = await confirmAlert(
    'حذف الكتاب',
    `هل أنت متأكد من حذف الكتاب "${product.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`,
    'نعم، احذف الكتاب',
    'إلغاء'
  );
  
  if (result.isConfirmed) {
    try {
      const response = await fetch(`/api/product/${product._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Remove product from list
      products.value = products.value.filter(p => p._id !== product._id);
      successToast('تم حذف الكتاب بنجاح');
    } catch (error) {
      console.error('Error deleting product:', error);
      errorToast('فشل في حذف الكتاب');
    }
  }
};

// Helper functions for styling
const getStockClass = (stock) => {
  if (stock <= 0) {
    return 'px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs';
  } else if (stock < 10) {
    return 'px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs';
  } else {
    return 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs';
  }
};

const getStatusClass = (status) => {
  return status === 'active' 
    ? 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs'
    : 'px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs';
};

// Fetch products on component mount
onMounted(() => {
  fetchProducts();
});

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
});

useHead({
  title: 'كُتُبي - إدارة الكتب'
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
