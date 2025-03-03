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
        <!-- Page Header -->
        <div class="mb-8">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">طلباتي</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
        </div>

        <!-- Orders List -->
        <div class="space-y-6">
          <!-- Filters -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex flex-wrap gap-4 items-center justify-between">
              <div class="flex gap-4">
                <select v-model="filter.status" class="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-arabic">
                  <option value="">كل الطلبات</option>
                  <option value="completed">مكتملة</option>
                  <option value="processing">قيد المعالجة</option>
                  <option value="shipping">قيد الشحن</option>
                  <option value="cancelled">ملغية</option>
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

          <!-- Orders Grid -->
          <div v-if="filteredOrders.length > 0" class="space-y-4">
            <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <!-- Order Header -->
              <div class="bg-indigo-50 p-6">
                <div class="flex flex-wrap justify-between items-center gap-4">
                  <div class="space-y-2">
                    <div class="flex items-center gap-3">
                      <span class="text-sm bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full font-arabic">
                        طلب #{{ order.id }}
                      </span>
                      <span class="text-gray-600 font-arabic">{{ order.date }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon icon="ph:map-pin-bold" class="text-amber-500" />
                      <span class="text-gray-700 font-arabic">{{ order.address }}</span>
                    </div>
                  </div>
                  <span
                    class="px-4 py-2 rounded-full font-arabic text-sm"
                    :class="{
                      'bg-green-100 text-green-800': order.status === 'completed',
                      'bg-blue-100 text-blue-800': order.status === 'processing',
                      'bg-amber-100 text-amber-800': order.status === 'shipping',
                      'bg-red-100 text-red-800': order.status === 'cancelled'
                    }"
                  >
                    {{ getOrderStatusText(order.status) }}
                  </span>
                </div>
              </div>

              <!-- Order Items -->
              <div class="p-6 border-b border-indigo-100">
                <div class="grid gap-4">
                  <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
                    <div class="w-16 h-20 rounded-lg overflow-hidden shadow-sm">
                      <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1">
                      <h4 class="text-indigo-900 font-arabic mb-1">{{ item.title }}</h4>
                      <p class="text-sm text-gray-600 font-arabic">الكمية: {{ item.quantity }}</p>
                    </div>
                    <span class="font-semibold text-indigo-900 font-arabic">{{ item.price }} جنيه</span>
                  </div>
                </div>
              </div>

              <!-- Order Footer -->
              <div class="p-6 flex flex-wrap justify-between items-center gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-600 font-arabic">إجمالي الطلب:</span>
                    <span class="font-bold text-indigo-900 font-arabic">{{ order.total }} جنيه</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-600 font-arabic">طريقة الدفع:</span>
                    <span class="text-indigo-900 font-arabic">{{ order.paymentMethod }}</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <ButtonUi
                    v-if="['processing', 'shipping'].includes(order.status)"
                    label="تتبع الطلب"
                    icon="ph:truck-bold"
                    isOutline
                  />
                  <ButtonUi
                    label="تفاصيل الطلب"
                    icon="ph:info-bold"
                  />
                </div>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import ButtonUi from '~/components/ui/ButtonUi.vue';

// SEO
useHead({
  title: 'طلباتي - كُتُبي',
  meta: [
    { name: 'description', content: 'تتبع طلباتك وتاريخ مشترياتك من متجر كُتُبي - متجر الكتب العربية الأول' },
  ],
});


// Filters
const filter = ref({
  status: '',
  date: ''
});

// Mock orders data
const orders = ref([
  {
    id: 'ORD-12345',
    date: '١٠ فبراير ٢٠٢٤',
    status: 'completed',
    total: 235,
    address: 'شارع التحرير، القاهرة',
    paymentMethod: 'الدفع عند الاستلام',
    items: [
      {
        id: 1,
        title: 'الرياضيات للصف الثالث الثانوي',
        quantity: 1,
        price: 120,
        image: '/images/book1.jpg'
      },
      {
        id: 2,
        title: 'الفيزياء المتقدمة',
        quantity: 1,
        price: 85,
        image: '/images/book2.jpg'
      }
    ]
  },
  // Add more mock orders as needed
]);

// Computed
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    if (filter.value.status && order.status !== filter.value.status) return false;
    if (filter.value.date) {
      // Add date filtering logic here
    }
    return true;
  });
});

// Methods
const getOrderStatusText = (status) => {
  const statusMap = {
    'completed': 'مكتمل',
    'processing': 'قيد المعالجة',
    'shipping': 'قيد الشحن',
    'cancelled': 'ملغي'
  };
  return statusMap[status] || status;
};
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
</style>