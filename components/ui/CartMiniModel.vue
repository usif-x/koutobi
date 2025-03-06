<!-- components/ui/CartMiniModal.vue -->
<template>
  <div v-if="show" class="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 z-[999] w-72 max-h-96 overflow-y-auto">
    <div class="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
      <p class="text-sm font-semibold text-gray-700 font-arabic">عربة التسوق</p>
      <p v-if="cartItems.length > 0" class="text-xs text-gray-600">
        <span class="font-semibold">{{ totalItems }}</span> منتجات
      </p>
    </div>

    <div v-if="cartItems.length === 0" class="px-4 py-6 text-center">
      <p class="text-gray-500 font-arabic">لا توجد منتجات في السلة</p>
    </div>

    <div v-else>
      <div v-for="item in cartItems" :key="item._id" class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 h-14 w-12 bg-gray-100 rounded overflow-hidden">
            <img v-if="item.product.images && item.product.images.length > 0"
                 :src="item.product.images[0]"
                 :alt="item.product.name"
                 class="h-full w-full object-cover">
            <div v-else class="h-full w-full flex items-center justify-center bg-gray-200">
              <Icon icon="ph:book-bold" class="text-gray-400 text-xl" />
            </div>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-800 font-arabic">{{ item.product.name }}</p>
            <div class="flex justify-between items-center mt-1">
              <div class="flex items-center">
                <span class="text-xs text-gray-500 font-arabic">الكمية: {{ item.quantity }}</span>
              </div>
              <p class="text-xs font-bold text-indigo-600">{{ item.product.price }} ر.س</p>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div class="flex justify-between items-center">
          <p class="text-sm font-medium text-gray-800 font-arabic">المجموع:</p>
          <p class="text-sm font-bold text-indigo-700">{{ totalPrice }} ر.س</p>
        </div>
      </div>

      <div class="px-4 py-3">
        <NuxtLink to="/cart" class="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded font-arabic text-sm font-semibold transition-colors">
          عرض السلة والدفع
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  cartItems: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close']);

// Calculate total number of items
const totalItems = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + item.quantity, 0);
});

// Calculate total price
const totalPrice = computed(() => {
  const total = props.cartItems.reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0);
  return total.toFixed(2);
});
</script>