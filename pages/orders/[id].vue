<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rtl py-10">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto space-y-6">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-indigo-900 font-arabic mb-2">تفاصيل الطلب</h1>
          <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full"></div>
        </div>

        <!-- Order Status -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-indigo-900 font-arabic">حالة الطلب #{{ order._id }}</h2>
            <span class="px-3 py-1 rounded-full text-sm font-semibold"
                  :class="{
                    'bg-amber-100 text-amber-700': order.status === 'pending',
                    'bg-green-100 text-green-700': order.status === 'completed',
                    'bg-red-100 text-red-700': order.status === 'cancelled'
                  }">
              {{ statusText }}
            </span>
          </div>
          <div class="text-gray-600">
            <p class="font-arabic">تاريخ الطلب: {{ formatDate(order.createdAt) }}</p>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-lg font-semibold text-indigo-900 font-arabic mb-4">المنتجات</h2>
          <div class="divide-y divide-gray-100">
            <div v-for="item in order.items" :key="item._id" class="py-4">
              <div class="flex gap-4">
                <!-- Product Image or Icon -->
                <div class="w-20 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                  <img 
                    v-if="item.product.images && item.product.images.length > 0" 
                    :src="item.product.images[0]" 
                    :alt="item.product.name" 
                    class="w-full h-full object-cover"
                  />
                  <Icon 
                    v-else 
                    icon="ph:book-duotone" 
                    class="text-4xl text-indigo-300"
                  />
                </div>
                
                <!-- Product Details -->
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-semibold text-indigo-900 font-arabic">{{ item.product.name }}</h3>
                      <p class="text-sm text-gray-600 mt-1">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                    </div>
                    <div class="text-indigo-900 font-semibold">
                      {{ formatPrice(item.price * item.quantity) }}
                    </div>
                  </div>
                  
                  <!-- Additional Product Details -->
                  <div class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span class="text-gray-500">المؤلف:</span>
                      <span class="text-gray-700 mr-1">{{ item.product.author }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">الفئة:</span>
                      <span class="text-gray-700 mr-1">{{ getCategoryName(item.product.category) }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">النوع:</span>
                      <span class="text-gray-700 mr-1">{{ getBookTypeName(item.product.bookType) }}</span>
                    </div>
                    <div v-if="item.product.ratingCount > 0">
                      <span class="text-gray-500">التقييم:</span>
                      <span class="text-gray-700 mr-1 flex items-center">
                        {{ item.product.ratingAverage }}
                        <Icon icon="ph:star-fill" class="text-amber-400 ml-1" />
                        ({{ item.product.ratingCount }})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-lg font-semibold text-indigo-900 font-arabic mb-4">ملخص الطلب</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600 font-arabic">إجمالي المنتجات</span>
              <span class="font-semibold">{{ formatPrice(order.total) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 font-arabic">الشحن</span>
              <span class="font-semibold">{{ formatPrice(30) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-2 flex justify-between">
              <span class="text-lg font-semibold text-indigo-900 font-arabic">الإجمالي النهائي</span>
              <span class="text-xl font-bold text-indigo-900">{{ formatPrice(order.total + 30) }}</span>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="flex justify-end">
          <button
              @click="router.push('/orders')"
              class="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-arabic"
          >
            <span>العودة إلى الطلبات</span>
            <Icon icon="ph:arrow-right-bold" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()
const { errorToast } = useAlerts()

const order = ref({
  _id: '',
  user: {},
  items: [],
  total: 0,
  status: 'pending',
  createdAt: '',
  updatedAt: ''
})

const statusText = computed(() => {
  const statusMap = {
    pending: 'قيد الانتظار',
    completed: 'مكتمل',
    cancelled: 'ملغي'
  }
  return statusMap[order.value.status] || order.value.status
})

const formatPrice = (price) => `${price} ج.م`

const formatDate = (dateString) => {
  if (!dateString) return 'غير متوفر'
  const date = new Date(dateString)
  return isNaN(date) ? 'غير متوفر' : new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getCategoryName = (category) => {
  const categories = {
    'study': 'كتب دراسية',
    'novel': 'روايات',
    'children': 'كتب أطفال',
    'religious': 'كتب دينية',
    'self-development': 'تنمية ذاتية',
    'story': 'قصص',
    'other': 'أخرى'
  }
  return categories[category] || category
}

const getBookTypeName = (bookType) => {
  const types = {
    'textbook': 'كتاب مدرسي',
    'workbook': 'كتاب تمارين',
    'guide': 'دليل مرجعي',
    'novel': 'رواية',
    'story': 'قصة',
    'paperback': 'غلاف ورقي',
    'hardcover': 'غلاف صلب',
    'other': 'أخرى'
  }
  return types[bookType] || bookType
}

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken')
  }
  return null
}

onMounted(async () => {
  try {
    const { order: orderData } = await $fetch(`/api/orders/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    order.value = orderData
  } catch (error) {
    errorToast('فشل في جلب تفاصيل الطلب')
    router.push('/orders')
  }
})

useHead({
  title: 'تفاصيل الطلب - كُتُبي',
  meta: [
    { name: 'description', content: 'عرض تفاصيل الطلب في متجر كُتُبي' }
  ]
})

definePageMeta({
  auth: true
})
</script>