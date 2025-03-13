<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="bg-indigo-100 p-3 rounded-lg">
            <Icon icon="ph:books-duotone" class="text-2xl text-indigo-600" />
          </div>
          <div class="mr-4">
            <h3 class="text-sm text-gray-500">إجمالي الكتب</h3>
            <p class="text-2xl font-semibold">{{ stats.totalBooks }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="bg-green-100 p-3 rounded-lg">
            <Icon icon="ph:shopping-cart-duotone" class="text-2xl text-green-600" />
          </div>
          <div class="mr-4">
            <h3 class="text-sm text-gray-500">الطلبات اليوم</h3>
            <p class="text-2xl font-semibold">{{ stats.todayOrders }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="bg-blue-100 p-3 rounded-lg">
            <Icon icon="ph:users-duotone" class="text-2xl text-blue-600" />
          </div>
          <div class="mr-4">
            <h3 class="text-sm text-gray-500">المستخدمين النشطين</h3>
            <p class="text-2xl font-semibold">{{ stats.activeUsers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="bg-amber-100 p-3 rounded-lg">
            <Icon icon="ph:currency-circle-dollar-duotone" class="text-2xl text-amber-600" />
          </div>
          <div class="mr-4">
            <h3 class="text-sm text-gray-500">إجمالي المبيعات</h3>
            <p class="text-2xl font-semibold">{{ stats.totalRevenue }} ج.م</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b">
        <h2 class="text-lg font-semibold">آخر الطلبات</h2>
      </div>
      <div class="p-6">
        <div v-if="loading" class="flex justify-center py-8">
          <Icon icon="ph:spinner-bold" class="animate-spin text-3xl text-indigo-600" />
        </div>
        <div v-else-if="recentOrders.length === 0" class="text-center py-8 text-gray-500">
          لا توجد طلبات حديثة
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
            <tr class="text-right border-b">
              <th class="pb-3 font-medium">رقم الطلب</th>
              <th class="pb-3 font-medium">المستخدم</th>
              <th class="pb-3 font-medium">المبلغ</th>
              <th class="pb-3 font-medium">الحالة</th>
              <th class="pb-3 font-medium">التاريخ</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in recentOrders" :key="order._id" class="border-b last:border-0">
              <td class="py-3">#{{ order._id.substring(order._id.length - 6).toUpperCase() }}</td>
              <td class="py-3">{{ order.userName || 'غير معروف' }}</td>
              <td class="py-3">{{ order.total.toFixed(2) }} ج.م</td>
              <td class="py-3">
                <span :class="getStatusClass(order.status)">
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td class="py-3">{{ formatDate(order.createdAt) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// Real data with loading state
const stats = ref({
  totalBooks: 0,
  todayOrders: 0,
  activeUsers: 0,
  totalRevenue: '0'
})

const recentOrders = ref([])
const loading = ref(true)

// Fetch dashboard data
const fetchDashboardData = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/admin/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data')
    }
    
    const data = await response.json()
    stats.value = data.stats
    recentOrders.value = data.recentOrders
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// Format date for Arabic locale
const formatDate = (dateString) => {
  if (!dateString) return 'غير متوفر'
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  } catch (e) {
    return 'غير متوفر'
  }
}

// Status mapping
const getStatusText = (status) => {
  const statusMap = {
    'pending': 'قيد الانتظار',
    'processing': 'قيد المعالجة',
    'shipped': 'تم الشحن',
    'delivered': 'تم التوصيل',
    'cancelled': 'ملغي'
  }
  return statusMap[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    'pending': 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm',
    'processing': 'bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm',
    'shipped': 'bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm',
    'delivered': 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm',
    'cancelled': 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm'
}

// Fetch data on component mount
onMounted(() => {
  fetchDashboardData()
})

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

useHead({
  title: 'كُتُبي - لوحة التحكم'
})
</script>