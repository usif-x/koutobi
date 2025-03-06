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
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <h3 class="font-semibold text-indigo-900 font-arabic">{{ item.product.title }}</h3>
                  <p class="text-sm text-gray-600">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                </div>
                <div class="text-indigo-900 font-semibold">
                  {{ formatPrice(item.price * item.quantity) }}
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

const formatPrice = (price) => `${price} جنيه`

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
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