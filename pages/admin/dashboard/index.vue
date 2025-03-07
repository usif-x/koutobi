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
            <p class="text-2xl font-semibold">{{ stats.totalRevenue }} ر.س</p>
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
        <div class="overflow-x-auto">
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
            <tr v-for="order in recentOrders" :key="order.id" class="border-b last:border-0">
              <td class="py-3">#{{ order.id }}</td>
              <td class="py-3">{{ order.user }}</td>
              <td class="py-3">{{ order.amount }} ر.س</td>
              <td class="py-3">
                  <span :class="getStatusClass(order.status)">
                    {{ order.status }}
                  </span>
              </td>
              <td class="py-3">{{ order.date }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

// Mock data
const stats = ref({
  totalBooks: 156,
  todayOrders: 24,
  activeUsers: 1289,
  totalRevenue: '45,920'
})

const recentOrders = ref([
  { id: '1234', user: 'أحمد محمد', amount: '259', status: 'مكتمل', date: '2024-02-20' },
  { id: '1235', user: 'سارة أحمد', amount: '180', status: 'قيد المعالجة', date: '2024-02-20' },
  { id: '1236', user: 'محمد علي', amount: '450', status: 'مكتمل', date: '2024-02-19' },
  { id: '1237', user: 'فاطمة حسن', amount: '320', status: 'ملغي', date: '2024-02-19' },
])

const getStatusClass = (status) => {
  const classes = {
    'مكتمل': 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm',
    'قيد المعالجة': 'bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm',
    'ملغي': 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm'
  }
  return classes[status]
}

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'كُتُبي - لوحة التحكم'
})
</script>