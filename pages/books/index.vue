<template>
  <div class="relative">
    <!-- Background container -->
    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <!-- Content container -->
    <div class="relative z-10 py-8 px-4 md:px-6 lg:px-8 rtl">
      <div class="container mx-auto">
        <!-- Page header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-indigo-900 font-arabic mb-4">معرض الكتب</h1>
          <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mx-auto rounded-full"></div>
          <p class="text-gray-700 mt-4 max-w-2xl mx-auto font-arabic">اكتشف مجموعتنا الواسعة من الكتب والمذكرات الدراسية للمراحل الإعدادية والثانوية</p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div class="h-48 bg-gray-200"></div>
            <div class="p-4">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div v-else class="flex flex-col lg:flex-row gap-8">
          <!-- Filter sidebar -->
          <div class="w-full lg:w-1/4">
            <div class="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 class="text-xl font-bold text-indigo-900 font-arabic mb-6 flex items-center gap-2">
                <Icon icon="ph:funnel-bold" class="text-amber-500" />
                تصفية النتائج
              </h2>

              <!-- Search input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2 font-arabic">ابحث عن كتاب</label>
                <div class="relative">
                  <input
                      v-model="searchQuery"
                      type="text"
                      class="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-arabic"
                      placeholder="اكتب اسم الكتاب..."
                  />
                  <Icon icon="ph:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <!-- Grade filter -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 font-arabic mb-3">المرحلة الدراسية</h3>
                <div class="space-y-2">
                  <label v-for="grade in grades" :key="grade.id" class="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        :value="grade.id"
                        v-model="selectedGrades"
                        class="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span class="text-gray-700 group-hover:text-indigo-700 transition-colors font-arabic">{{ grade.name }}</span>
                  </label>
                </div>
              </div>

              <!-- Subject filter -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 font-arabic mb-3">المادة الدراسية</h3>
                <div class="space-y-2">
                  <label v-for="subject in subjects" :key="subject.id" class="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        :value="subject.id"
                        v-model="selectedSubjects"
                        class="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span class="text-gray-700 group-hover:text-indigo-700 transition-colors font-arabic">{{ subject.name }}</span>
                  </label>
                </div>
              </div>

              <!-- Price range filter -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 font-arabic mb-3">السعر</h3>
                <div class="flex items-center gap-3">
                  <input
                      v-model="priceRange[0]"
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div class="flex justify-between mt-2">
                  <span class="text-sm text-gray-600 font-arabic">{{ priceRange[0] }} ج.م</span>
                  <span class="text-sm text-gray-600 font-arabic">500 ج.م</span>
                </div>
              </div>

              <!-- Reset filters button -->
              <button
                  @click="resetFilters"
                  class="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-arabic flex items-center justify-center gap-2"
              >
                <Icon icon="ph:arrows-counter-clockwise" />
                إعادة ضبط الفلاتر
              </button>
            </div>
          </div>

          <!-- Products grid -->
          <div class="w-full lg:w-3/4">
            <!-- Sorting and view options -->
            <div class="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div class="flex items-center gap-3">
                <span class="text-gray-700 text-sm font-arabic">{{ filteredBooks.length }} كتاب</span>
                <div class="h-4 w-px bg-gray-300"></div>
                <div class="relative">
                  <select
                      v-model="sortBy"
                      class="appearance-none bg-transparent pr-8 py-1 text-sm text-gray-700 focus:outline-none font-arabic"
                  >
                    <option value="default">الترتيب الافتراضي</option>
                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                    <option value="newest">الأحدث</option>
                  </select>
                  <Icon icon="ph:caret-down" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="viewType = 'grid'" :class="viewType === 'grid' ? 'text-indigo-600' : 'text-gray-400'">
                  <Icon icon="ph:grid-four" class="text-xl" />
                </button>
                <button @click="viewType = 'list'" :class="viewType === 'list' ? 'text-indigo-600' : 'text-gray-400'">
                  <Icon icon="ph:list" class="text-xl" />
                </button>
              </div>
            </div>

            <!-- No results -->
            <div v-if="filteredBooks.length === 0" class="bg-white rounded-xl shadow-md p-8 text-center">
              <Icon icon="ph:books" class="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-800 font-arabic mb-2">لا توجد نتائج</h3>
              <p class="text-gray-600 font-arabic mb-4">جرب تغيير معايير البحث</p>
              <button @click="resetFilters" class="btn-primary">إعادة ضبط الفلاتر</button>
            </div>
            <div v-else-if="viewType === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="book in filteredBooks" :key="book.id" class="bg-white rounded-xl shadow-md overflow-hidden group relative transition-all duration-300 hover:shadow-lg">
                <!-- Book image without hover overlay buttons -->
                <div class="relative h-52 overflow-hidden">
                  <img :src="book.image" :alt="book.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  
                  <!-- Discount badge -->
                  <div v-if="book.discount" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-arabic font-medium">
                    خصم {{ book.discount }}%
                  </div>
                  
                  <!-- New badge -->
                  <div v-if="book.isNew" class="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-md text-sm font-arabic font-medium">
                    جديد
                  </div>
                </div>

                <!-- Book details with improved layout -->
                <div class="p-4">
                  <!-- Tags -->
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-xs px-2 py-1 bg-amber-100 text-amber-600 rounded-full font-arabic font-medium">{{ getGradeName(book.gradeId) }}</span>
                    <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full font-arabic font-medium">{{ getSubjectName(book.subjectId) }}</span>
                  </div>
                  
                  <!-- Title with improved styling -->
                  <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 h-12 font-arabic text-lg">{{ book.title }}</h3>
                  
                  <!-- Book description with improved styling -->
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2 font-arabic">{{ book.description }}</p>
                  
                  <!-- Star rating with improved styling -->
                  <div class="flex items-center mb-4">
                    <div class="flex items-center">
                      <Icon v-for="i in 5" :key="i" :icon="i <= Math.round(book.rating) ? 'ph:star-fill' : 'ph:star'" 
                            :class="i <= Math.round(book.rating) ? 'text-amber-400' : 'text-gray-300'" 
                            class="text-sm" />
                    </div>
                    <span class="text-xs text-gray-500 mr-1 font-arabic">({{ book.rating }})</span>
                  </div>
                  
                  <!-- Price section with improved styling -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                      <span class="text-xl font-bold text-indigo-600 font-arabic">{{ book.price }} ج.م</span>
                      <span v-if="book.originalPrice" class="text-sm text-gray-400 line-through font-arabic">{{ Math.round(book.originalPrice) }} ج.م</span>
                    </div>
                  </div>
                  
                  <!-- Simplified action buttons -->
                  <div class="grid grid-cols-1 gap-3">
                    <!-- Out of stock message (larger and more prominent) -->
                    <div 
                      v-if="!book.inStock"
                      class="py-3 px-4 bg-red-50 border-2 border-red-300 text-red-600 rounded-lg flex items-center justify-center gap-2 font-arabic font-medium text-base"
                    >
                      <Icon icon="ph:x-circle" class="text-xl" />
                      <span>نفذ من المخزون</span>
                    </div>
                    
                    <!-- Add to cart button (only shown when in stock) -->
                    <button 
                      v-else
                      @click="addToCart(book)" 
                      class="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-arabic font-medium"
                    >
                      <Icon icon="ph:shopping-cart" class="text-lg" />
                      <span>أضف للسلة</span>
                    </button>
                    
                    <!-- Add to wishlist button (always shown) -->
                    <button
                      @click="addToWishlist(book.id)"
                      class="py-2 px-3 bg-white border border-rose-500 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center gap-2 font-arabic font-medium text-sm"
                    >
                      <Icon icon="ph:heart" class="text-lg" />
                      <span>المفضلة</span>
                    </button>
                    
                    <!-- Preview and Rating buttons (only shown when in stock) -->
                    <template v-if="book.inStock">
                      <!-- Preview book button -->
                      <NuxtLink
                        :to="`/books/${book.id}`"
                        class="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors flex items-center justify-center gap-2 font-arabic font-medium text-sm"
                      >
                        <Icon icon="ph:eye" class="text-lg" />
                        <span>عرض التفاصيل</span>
                      </NuxtLink>
                      
                      <!-- Rating button -->
                      <button
                        @click="openRatingModal(book)"
                        class="py-2 px-3 bg-white border border-amber-500 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors flex items-center justify-center gap-2 font-arabic font-medium text-sm"
                      >
                        <Icon icon="ph:star" class="text-lg" />
                        <span>أضف تقييم</span>
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="mt-8 flex justify-center">
              <div class="flex items-center gap-2">
                <button
                    @click="currentPage > 1 && currentPage--"
                    :disabled="currentPage === 1"
                    class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon icon="ph:caret-right-bold" />
                </button>
                <div class="flex items-center gap-1">
                  <span class="text-sm text-gray-600 font-arabic">{{ currentPage }} من {{ totalPages }}</span>
                </div>
                <button
                    @click="currentPage < totalPages && currentPage++"
                    :disabled="currentPage === totalPages"
                    class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon icon="ph:caret-left-bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Rating Modal -->
  <Modal v-model="showRatingModal" title="إضافة تقييم">
    <div class="space-y-4">
      <div class="flex justify-center gap-2">
        <button
            v-for="star in 5"
            :key="star"
            @click="ratingValue = star"
            class="text-2xl"
            :class="star <= ratingValue ? 'text-amber-400' : 'text-gray-300'"
        >
          <Icon icon="ph:star-fill" />
        </button>
      </div>
      <textarea
          v-model="ratingComment"
          rows="4"
          class="w-full rounded-lg border-gray-300 font-arabic"
          placeholder="اكتب تعليقك..."
      ></textarea>
      <div class="flex justify-end gap-2">
        <button
            @click="showRatingModal = false"
            type="button"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-arabic"
        >
          إلغاء
        </button>
        <button
            @click="submitRating"
            type="button"
            :disabled="isSubmitting || !ratingValue"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg transition-colors font-arabic flex items-center gap-2"
        >
          <Icon v-if="isSubmitting" icon="ph:circle-notch" class="animate-spin" />
          <span>إرسال التقييم</span>
        </button>
      </div>
    </div>
  </Modal>

  <!-- Cart Modal -->
  <Modal v-model="showCartModal" title="إضافة إلى السلة">
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <img
            :src="selectedBook?.image"
            :alt="selectedBook?.title"
            class="w-20 h-20 object-cover rounded"
            @error="$event.target.src = '/images/book.png'"
        />
        <div>
          <h4 class="font-semibold text-gray-900 font-arabic">{{ selectedBook?.title }}</h4>
          <p class="text-indigo-600 font-bold font-arabic">{{ selectedBook?.price }} ج.م</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
            @click="cartQuantity > 1 && cartQuantity--"
            class="p-2 rounded-lg border"
            :disabled="cartQuantity <= 1"
        >
          <Icon icon="ph:minus-bold" />
        </button>
        <input
            v-model="cartQuantity"
            type="number"
            min="1"
            class="w-20 text-center rounded-lg border-gray-300"
        />
        <button
            @click="cartQuantity++"
            class="p-2 rounded-lg border"
        >
          <Icon icon="ph:plus-bold" />
        </button>
      </div>
      <div class="flex justify-end gap-2">
        <button @click="showCartModal = false" class="btn-secondary">إلغاء</button>
        <button @click="confirmAddToCart" class="btn-primary">إضافة</button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'
import Modal from '~/components/ui/Modal.vue'

// Core utilities
const router = useRouter()
const route = useRoute()
const { errorToast, successToast } = useAlerts()

// State Management with proper initialization
const books = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const selectedGrades = ref([])
const selectedSubjects = ref([])
const priceRange = ref([0])
const sortBy = ref('default')
const viewType = ref('grid')
const showRatingModal = ref(false)
const showCartModal = ref(false)
const selectedBook = ref(null)
const ratingValue = ref(0)
const ratingComment = ref('')
const cartQuantity = ref(1)
const isSubmitting = ref(false)

// Filter options data
const grades = [
  { id: 1, name: 'الصف الأول الإعدادي' },
  { id: 2, name: 'الصف الثاني الإعدادي' },
  { id: 3, name: 'الصف الثالث الإعدادي' },
  { id: 4, name: 'الصف الأول الثانوي' },
  { id: 5, name: 'الصف الثاني الثانوي' },
  { id: 6, name: 'الصف الثالث الثانوي' }
]

const subjects = [
  { id: 1, name: 'اللغة العربية' },
  { id: 2, name: 'اللغة الإنجليزية' },
  { id: 3, name: 'الرياضيات' },
  { id: 4, name: 'العلوم' },
  { id: 5, name: 'الفيزياء' },
  { id: 6, name: 'الكيمياء' },
  { id: 7, name: 'الأحياء' },
  { id: 8, name: 'الدراسات الاجتماعية' }
]

// Clean up function
const cleanupState = () => {
  books.value = []
  isLoading.value = false
  selectedBook.value = null
  showRatingModal.value = false
  showCartModal.value = false
  ratingValue.value = 0
  ratingComment.value = ''
  cartQuantity.value = 1
}

// Lifecycle hooks with proper cleanup
onMounted(() => {
  fetchBooks()
})

onBeforeUnmount(() => {
  cleanupState()
})

// Navigation guard
const navigationGuard = () => {
  cleanupState()
}

// Watch for route changes
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (oldPath?.includes('/books') && !newPath?.includes('/books')) {
      navigationGuard()
    }
  }
)

// Your existing fetchBooks function
const fetchBooks = async () => {
  try {
    isLoading.value = true
    
    // Add debugging to check what's happening
    console.log('Fetching books with params:', {
      page: currentPage.value,
      search: searchQuery.value,
      grades: selectedGrades.value,
      subjects: selectedSubjects.value,
      minPrice: priceRange.value[0],
      sort: sortBy.value
    })
    
    const { products, count } = await $fetch('/api/product', {
      params: {
        page: currentPage.value,
        limit: 12,
        sort: sortBy.value,
        search: searchQuery.value,
        grades: selectedGrades.value.length ? selectedGrades.value.join(',') : undefined,
        subjects: selectedSubjects.value.length ? selectedSubjects.value.join(',') : undefined,
        minPrice: priceRange.value[0]
      }
    })
    
    // Check if products were returned
    if (!products || !Array.isArray(products)) {
      console.error('Invalid products data returned:', products)
      errorToast('خطأ في تنسيق البيانات المستردة')
      books.value = []
      return
    }
    
    books.value = products.map(product => ({
      id: product._id,
      title: product.name,
      gradeId: product.year,
      subjectId: getSubjectFromCategory(product.category),
      price: product.price,
      originalPrice: product.hasDiscount ? product.price / (1 - product.discountPercentage / 100) : null,
      discount: product.hasDiscount ? product.discountPercentage : null,
      rating: product.ratingAverage || 0,
      isNew: isNewProduct(product.createdAt),
      image: product.images[0] || '/images/book.png',
      description: product.description,
      inStock: product.stockCount > 0
    }))

    totalPages.value = Math.ceil(count / 12)
  } catch (error) {
    console.error('Error fetching books:', error)
    errorToast('فشل في تحميل المنتجات')
    books.value = []
  } finally {
    isLoading.value = false
  }
}

// Function to update URL based on filters
const updateRouteFromFilters = () => {
  const query = {}
  
  if (searchQuery.value) query.search = searchQuery.value
  if (selectedGrades.value.length) query.grade = selectedGrades.value.join(',')
  if (selectedSubjects.value.length) query.subject = selectedSubjects.value.join(',')
  if (currentPage.value > 1) query.page = currentPage.value.toString()
  if (sortBy.value !== 'default') query.sort = sortBy.value
  if (priceRange.value[0] > 0) query.minPrice = priceRange.value[0].toString()
  
  // Use replace to avoid building up history
  router.replace({ query })
}

// Wishlist Functions
const addToWishlist = async (bookId) => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.push('/login?redirect=' + encodeURIComponent(route.fullPath))
      return
    }
    
    await $fetch('/api/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: { productId: bookId }
    })
    successToast('تمت الإضافة إلى المفضلة')
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    if (error.response && error.response.status === 401) {
      errorToast('يرجى تسجيل الدخول أولاً')
      router.push('/login?redirect=' + encodeURIComponent(route.fullPath))
    } else {
      errorToast('فشل في الإضافة إلى المفضلة')
    }
  }
}

const removeFromWishlist = async (bookId) => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      errorToast('يرجى تسجيل الدخول أولاً')
      return
    }
    
    await $fetch(`/api/wishlist/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    })
    successToast('تمت الإزالة من المفضلة')
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    errorToast('فشل في الإزالة من المفضلة')
  }
}

// Cart Functions
const addToCart = async (book) => {
  selectedBook.value = book
  if (!book.inStock) {
    errorToast('المنتج غير متوفر حالياً')
    return
  }
  
  const token = localStorage.getItem('accessToken')
  if (!token) {
    router.push('/login?redirect=' + encodeURIComponent(route.fullPath))
    return
  }
  
  showCartModal.value = true
  cartQuantity.value = 1 // Reset quantity when opening modal
}

const confirmAddToCart = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      errorToast('يرجى تسجيل الدخول أولاً')
      showCartModal.value = false
      router.push('/login?redirect=' + encodeURIComponent(route.fullPath))
      return
    }
    
    await $fetch('/api/cart/', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: {
        productId: selectedBook.value.id,
        quantity: cartQuantity.value
      }
    })
    successToast('تمت الإضافة إلى السلة')
    showCartModal.value = false
    cartQuantity.value = 1
  } catch (error) {
    console.error('Error adding to cart:', error)
    if (error.response && error.response.status === 401) {
      errorToast('يرجى تسجيل الدخول أولاً')
      showCartModal.value = false
      router.push('/login?redirect=' + encodeURIComponent(route.fullPath))
    } else {
      errorToast('فشل في الإضافة إلى السلة')
    }
  }
}

// Rating Functions
const openRatingModal = (book) => {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    errorToast('يرجى تسجيل الدخول أولاً')
    router.push('/login?redirect=' + encodeURIComponent(route.fullPath))
    return
  }
  
  selectedBook.value = book
  ratingValue.value = 0 // Reset rating
  ratingComment.value = '' // Reset comment
  showRatingModal.value = true
}

const submitRating = async () => {
  if (!ratingValue.value) {
    errorToast('يرجى اختيار تقييم')
    return
  }
  
  try {
    isSubmitting.value = true
    const token = localStorage.getItem('accessToken')
    if (!token) {
      errorToast('يرجى تسجيل الدخول أولاً')
      showRatingModal.value = false
      router.push('/login?redirect=' + encodeURIComponent(route.fullPath))
      return
    }
    
    await $fetch('/api/ratings', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: {
        productId: selectedBook.value.id,
        rating: ratingValue.value,
        comment: ratingComment.value
      }
    })
    successToast('تم إضافة التقييم بنجاح')
    showRatingModal.value = false
    ratingValue.value = 0
    ratingComment.value = ''
    await fetchBooks() // Refresh books to update rating
  } catch (error) {
    console.error('Error submitting rating:', error)
    errorToast('فشل في إضافة التقييم')
  } finally {
    isSubmitting.value = false
  }
}

// Helper Functions
const getGradeName = (id) => {
  const grade = grades.find(g => g.id === id)
  return grade ? grade.name : ''
}

const getSubjectName = (id) => {
  const subject = subjects.find(s => s.id === id)
  return subject ? subject.name : ''
}

const getSubjectFromCategory = (category) => {
  const categoryMap = {
    'arabic': 1,
    'english': 2,
    'math': 3,
    'science': 4,
    'physics': 5,
    'chemistry': 6,
    'biology': 7,
    'social': 8
  }
  return categoryMap[category] || null
}

const isNewProduct = (createdAt) => {
  const productDate = new Date(createdAt)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return productDate >= sevenDaysAgo
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedGrades.value = []
  selectedSubjects.value = []
  priceRange.value = [0]
  sortBy.value = 'default'
  currentPage.value = 1
  
  // Update the URL to match the reset state
  router.replace({ query: {} })
  
  fetchBooks()
}

// Computed Properties
const filteredBooks = computed(() => books.value)

// Watchers - improved to be more specific
watch(
  [searchQuery, selectedGrades, selectedSubjects, priceRange, sortBy],
  () => {
    currentPage.value = 1
    updateRouteFromFilters()
    fetchBooks()
  },
  { deep: true }
)

// Watch for page changes
watch(currentPage, () => {
  updateRouteFromFilters()
  fetchBooks()
})

// Better route watcher that focuses on specific parameters
watch(
  () => ({
    page: route.query.page,
    search: route.query.search,
    grade: route.query.grade,
    subject: route.query.subject,
    sort: route.query.sort,
    minPrice: route.query.minPrice
  }),
  (newQuery, oldQuery) => {
    // Only fetch if the component is already mounted and query params changed
    // This prevents double fetching with the onMounted hook
    if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
      console.log('Route query changed:', newQuery)
      fetchBooks()
    }
  },
  { deep: true, immediate: false }
)

// This is correct usage of definePageMeta in a page component
useHead({
  title: 'كتبي - الكتب ',
})
</script>

<style scoped>
/* Add these styles to ensure smooth transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(-10px);
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 8s ease-in-out infinite 1s;
}

.animate-float-slow {
  animation: float 10s ease-in-out infinite 2s;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>