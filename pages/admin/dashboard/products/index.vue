<template>
  <div class="space-y-6">
    <!-- Header with Add Product Button -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">إدارة المنتجات</h1>
      <NuxtLink to="/admin/dashboard/products/add" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Icon icon="ph:plus-bold" />
        <span>إضافة منتج جديد</span>
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
              placeholder="البحث عن منتج..." 
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

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <Icon icon="ph:spinner-gap-bold" class="text-4xl text-indigo-600 animate-spin" />
      </div>
      
      <div v-else-if="filteredProducts.length === 0" class="py-20 text-center">
        <Icon icon="ph:books-duotone" class="text-5xl text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 text-lg">لا توجد منتجات متطابقة مع البحث</p>
      </div>
      
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 text-right">
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الصورة</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">المخزون</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
              <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product._id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <img :src="product.images[0] || '/images/placeholder.png'" alt="Product" class="h-12 w-12 rounded-md object-cover" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                <div class="text-xs text-gray-500">SKU: {{ product.sku || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.price.toFixed(2) }} ج.م</div>
                <div v-if="product.discountPercentage" class="text-xs text-green-600">
                  خصم {{ product.discountPercentage }}%
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStockClass(product.stockCount)">
                  {{ product.stockCount }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(product.status)">
                  {{ product.status === 'active' ? 'نشط' : 'غير نشط' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-left">
                <div class="flex items-center space-x-3 space-x-reverse">
                  <button @click="editProduct(product._id)" class="text-indigo-600 hover:text-indigo-900">
                    <Icon icon="ph:pencil-simple-bold" class="text-lg" />
                  </button>
                  <button @click="confirmDelete(product)" class="text-red-600 hover:text-red-900">
                    <Icon icon="ph:trash-bold" class="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="currentPage--" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            السابق
          </button>
          <button @click="currentPage++" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            التالي
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              عرض
              <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
              إلى
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredProducts.length) }}</span>
              من
              <span class="font-medium">{{ filteredProducts.length }}</span>
              منتج
            </p>
          </div>
          <div>
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
const pageSize = 10;

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
      (product.sku && product.sku.toLowerCase().includes(query))
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
    // Updated to use the correct API endpoint
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
    errorToast('فشل في تحميل المنتجات');
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
    'حذف المنتج',
    `هل أنت متأكد من حذف المنتج "${product.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`,
    'نعم، احذف المنتج',
    'إلغاء'
  );
  
  if (result.isConfirmed) {
    try {
      // Updated to use the correct API endpoint
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
      successToast('تم حذف المنتج بنجاح');
    } catch (error) {
      console.error('Error deleting product:', error);
      errorToast('فشل في حذف المنتج');
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
  title: 'كُتُبي - إدارة المنتجات'
});
</script>