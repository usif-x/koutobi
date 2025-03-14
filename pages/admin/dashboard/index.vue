<template>
  <AdminLayout>
    <!-- Dashboard Content -->
    <div>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border-r-4 border-indigo-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">إجمالي المبيعات</p>
              <h3 class="text-2xl font-bold">12,850 ر.س</h3>
              <p class="text-green-500 text-xs mt-2 flex items-center">
                <Icon icon="ph:arrow-up" class="ml-1" />
                <span>18% مقارنة بالشهر الماضي</span>
              </p>
            </div>
            <div class="bg-indigo-100 p-3 rounded-full">
              <Icon icon="ph:currency-circle-dollar-duotone" class="text-2xl text-indigo-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border-r-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">الكتب المتاحة</p>
              <h3 class="text-2xl font-bold">1,256</h3>
              <p class="text-green-500 text-xs mt-2 flex items-center">
                <Icon icon="ph:arrow-up" class="ml-1" />
                <span>24 كتاب جديد هذا الأسبوع</span>
              </p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <Icon icon="ph:books-duotone" class="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border-r-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">الطلبات الجديدة</p>
              <h3 class="text-2xl font-bold">48</h3>
              <p class="text-yellow-500 text-xs mt-2 flex items-center">
                <Icon icon="ph:clock-duotone" class="ml-1" />
                <span>بانتظار المعالجة</span>
              </p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <Icon icon="ph:shopping-cart-duotone" class="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border-r-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">المستخدمين النشطين</p>
              <h3 class="text-2xl font-bold">2,845</h3>
              <p class="text-blue-500 text-xs mt-2 flex items-center">
                <Icon icon="ph:users-three-duotone" class="ml-1" />
                <span>128 مستخدم جديد</span>
              </p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <Icon icon="ph:users-duotone" class="text-2xl text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders and Popular Books -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Orders -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold">أحدث الطلبات</h3>
            <NuxtLink to="/admin/orders" class="text-indigo-600 text-sm hover:underline">عرض الكل</NuxtLink>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
                  <th scope="col" class="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم العميل</th>
                  <th scope="col" class="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                  <th scope="col" class="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="order in recentOrders" :key="order.id">
                  <td class="py-3 px-4 whitespace-nowrap text-sm">#{{ order.id }}</td>
                  <td class="py-3 px-4 whitespace-nowrap text-sm">{{ order.customer }}</td>
                  <td class="py-3 px-4 whitespace-nowrap text-sm">{{ order.amount }} ر.س</td>
                  <td class="py-3 px-4 whitespace-nowrap text-sm">
                    <span 
                      class="px-2 py-1 text-xs rounded-full" 
                      :class="order.statusClass"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Popular Books -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold">الكتب الأكثر مبيعاً</h3>
            <NuxtLink to="/admin/books" class="text-indigo-600 text-sm hover:underline">عرض الكل</NuxtLink>
          </div>
          <div class="space-y-4">
            <div v-for="book in popularBooks" :key="book.id" class="flex items-center p-3 rounded-lg hover:bg-gray-50">
              <div class="bg-gray-200 h-16 w-12 rounded ml-4 flex items-center justify-center">
                <Icon icon="ph:book-duotone" class="text-2xl text-gray-500" />
              </div>
              <div class="flex-1">
                <h4 class="font-medium text-sm">{{ book.title }}</h4>
                <p class="text-gray-500 text-xs">{{ book.author }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold">{{ book.price }} ر.س</p>
                <p class="text-xs text-gray-500">{{ book.sales }} مبيعات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

definePageMeta({
  middleware: ['admin']
})

// Sample data for recent orders
const recentOrders = ref([
  { 
    id: '32854', 
    customer: 'أحمد محمد', 
    amount: '350', 
    status: 'مكتمل', 
    statusClass: 'bg-green-100 text-green-800' 
  },
  { 
    id: '32853', 
    customer: 'سارة علي', 
    amount: '420', 
    status: 'قيد المعالجة', 
    statusClass: 'bg-yellow-100 text-yellow-800' 
  },
  { 
    id: '32852', 
    customer: 'محمد عبدالله', 
    amount: '280', 
    status: 'مكتمل', 
    statusClass: 'bg-green-100 text-green-800'
  },
  { 
    id: '32851', 
    customer: 'نورة سعد', 
    amount: '500', 
    status: 'ملغي', 
    statusClass: 'bg-red-100 text-red-800' 
  },
])

// Sample data for popular books
const popularBooks = ref([
  { 
    id: 1, 
    title: 'البداية والنهاية', 
    author: 'ابن كثير', 
    price: '120', 
    sales: 245 
  },
  { 
    id: 2, 
    title: 'رحلة ابن بطوطة', 
    author: 'ابن بطوطة', 
    price: '85', 
    sales: 189 
  },
  { 
    id: 3, 
    title: 'مقدمة ابن خلدون', 
    author: 'ابن خلدون', 
    price: '95', 
    sales: 176 
  },
  { 
    id: 4, 
    title: 'صحيح البخاري', 
    author: 'الإمام البخاري', 
    price: '150', 
    sales: 168 
  },
])


definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})
</script>


