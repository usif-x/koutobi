<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import ButtonUi from '~/components/ui/ButtonUi.vue'
import { useRouter } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'
import Modal from '~/components/ui/Modal.vue'

const router = useRouter()
const { errorToast } = useAlerts()

// Filters
const filter = ref({
  status: '',
  date: ''
})

// Orders state
const orders = ref([])
const isLoading = ref(true)

// Get access token
const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken')
  }
  return null
}

// Fetch orders
const fetchOrders = async () => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/orders', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    orders.value = response.orders
  } catch (error) {
    errorToast('فشل في جلب الطلبات')
  } finally {
    isLoading.value = false
  }
}

// Computed filtered orders
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (filter.value.status && order.status !== filter.value.status) return false
    if (filter.value.date) {
      const orderDate = new Date(order.createdAt).toLocaleDateString()
      const filterDate = new Date(filter.value.date).toLocaleDateString()
      if (orderDate !== filterDate) return false
    }
    return true
  })
})

// Format date
const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

// Format price
const formatPrice = (price) => `${price} جنيه`

// Get order status text
const getOrderStatusText = (status) => {
  const statusMap = {
    'pending': 'قيد المعالجة',
    'processing': 'قيد التجهيز',
    'shipping': 'قيد الشحن',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
  }
  return statusMap[status] || status
}

// View order details
const viewOrderDetails = (orderId) => {
  router.push(`/orders/${orderId}`)
}

// Initialize
onMounted(() => {
  fetchOrders()
})

// SEO
useHead({
  title: 'طلباتي - كُتُبي',
  meta: [
    { name: 'description', content: 'تتبع طلباتك وتاريخ مشترياتك من متجر كُتُبي' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-transparent rtl py-10">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-indigo-900 font-arabic mb-2">طلباتي</h1>
          <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full"></div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex flex-wrap gap-4 items-center justify-between">
            <div class="flex gap-4">
              <select v-model="filter.status" class="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-arabic">
                <option value="">كل الطلبات</option>
                <option value="pending">قيد المعالجة</option>
                <option value="processing">قيد التجهيز</option>
                <option value="shipping">قيد الشحن</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
              <input
                  type="date"
                  v-model="filter.date"
                  class="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div class="flex items-center gap-2 text-gray-600 font-arabic">
              <span>إجمالي الطلبات:</span>
              <span class="font-bold text-indigo-900">{{ filteredOrders.length }}</span>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div class="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-gray-600 font-arabic">جاري تحميل الطلبات...</p>
        </div>

        <!-- Orders List -->
        <div v-else-if="filteredOrders.length > 0" class="space-y-6">
          <div v-for="order in filteredOrders" :key="order._id" class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Order Header -->
            <div class="bg-indigo-50 p-6">
              <div class="flex flex-wrap justify-between items-center gap-4">
                <div class="space-y-2">
                  <div class="flex items-center gap-3">
                    <span class="text-sm bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full font-arabic">
                      طلب #{{ order._id }}
                    </span>
                    <span class="text-gray-600 font-arabic">{{ formatDate(order.createdAt) }}</span>
                  </div>
                </div>
                <span
                    class="px-4 py-2 rounded-full font-arabic text-sm"
                    :class="{
                    'bg-amber-100 text-amber-800': order.status === 'pending',
                    'bg-blue-100 text-blue-800': order.status === 'processing',
                    'bg-indigo-100 text-indigo-800': order.status === 'shipping',
                    'bg-green-100 text-green-800': order.status === 'completed',
                    'bg-red-100 text-red-800': order.status === 'cancelled'
                  }"
                >
                  {{ getOrderStatusText(order.status) }}
                </span>
              </div>
            </div>

            <!-- Order Items -->
            <div class="p-6 border-b border-indigo-100">
              <div class="space-y-4">
                <div v-for="item in order.items" :key="item._id" class="flex items-center gap-4">
                  <div class="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <Icon 
                        icon="ph:books-bold"
                        class="w-full h-full text-gray-400"
                        @error="$event.target.icon = 'ph:image-square-duotone'"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-indigo-900 font-arabic mb-1">{{ item.product.title }}</h4>
                    <p class="text-sm text-gray-600 font-arabic">الكمية: {{ item.quantity }}</p>
                  </div>
                  <span class="font-semibold text-indigo-900 font-arabic">
                    {{ formatPrice(item.price) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Order Footer -->
            <div class="p-6 flex flex-wrap justify-between items-center gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-gray-600 font-arabic">إجمالي الطلب:</span>
                  <span class="font-bold text-indigo-900 font-arabic">{{ formatPrice(order.total) }}</span>
                </div>
              </div>
              <button
                  @click="viewOrderDetails(order._id)"
                  class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-arabic text-sm transition-colors"
              >
                <span>تفاصيل الطلب</span>
                <Icon icon="ph:arrow-right-bold" />
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Icon icon="ph:shopping-bag-duotone" class="text-indigo-200 text-6xl mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-indigo-900 font-arabic mb-2">لا توجد طلبات</h3>
          <p class="text-gray-600 font-arabic mb-6">لم يتم العثور على أي طلبات تطابق معايير البحث</p>
          <ButtonUi label="تصفح الكتب" icon="ph:books-bold" to="/books" isLink />
        </div>
      </div>
    </div>
  </div>
</template>