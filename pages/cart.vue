<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rtl">
    <!-- Page Header -->
    <section class="relative py-10 px-4 md:px-6 lg:px-8 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
        <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      </div>

      <!-- Header Content -->
      <div class="container mx-auto z-10">
        <div class="max-w-6xl mx-auto">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">سلة التسوق</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cart Content -->
    <section class="relative z-10 px-4 md:px-6 lg:px-8 pb-16">
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto">

          <!-- Empty Cart State -->
          <div v-if="cart.items.length === 0" class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div class="flex flex-col items-center justify-center gap-4 py-8">
              <Icon icon="ph:shopping-cart-simple-duotone" class="text-indigo-200 text-8xl"/>
              <h2 class="text-2xl font-semibold text-indigo-900 font-arabic">سلة التسوق فارغة</h2>
              <p class="text-gray-600 font-arabic">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
              <ButtonUi label="تصفح الكتب" icon="ph:books-bold" to="/books" isLink class="mt-2"/>
            </div>
          </div>

          <!-- Cart Items List -->
          <div v-else class="space-y-6">
            <!-- Cart Items Table -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-indigo-50">
                  <tr>
                    <th class="py-4 px-6 text-right text-indigo-900 font-arabic font-semibold">المنتج</th>
                    <th class="py-4 px-6 text-center text-indigo-900 font-arabic font-semibold">السعر</th>
                    <th class="py-4 px-6 text-center text-indigo-900 font-arabic font-semibold">الكمية</th>
                    <th class="py-4 px-6 text-center text-indigo-900 font-arabic font-semibold">الإجمالي</th>
                    <th class="py-4 px-6 text-center text-indigo-900 font-arabic font-semibold"></th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-indigo-100">
                  <tr v-for="item in cart.items" :key="item.id" class="hover:bg-indigo-50/30 transition-colors duration-200">
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-4">
                        <div class="w-16 h-20 rounded-md overflow-hidden shadow-sm">
                          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 class="text-indigo-900 font-semibold font-arabic">{{ item.title }}</h3>
                          <p class="text-gray-500 text-sm font-arabic">{{ item.author }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6 text-center font-arabic">{{ formatPrice(item.price) }}</td>
                    <td class="py-4 px-6 text-center">
                      <div class="flex items-center justify-center">
                        <button
                            @click="decreaseQuantity(item.id)"
                            class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                        >
                          <Icon icon="ph:minus" />
                        </button>
                        <span class="w-12 text-center font-arabic mx-2">{{ item.quantity }}</span>
                        <button
                            @click="increaseQuantity(item.id)"
                            class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                        >
                          <Icon icon="ph:plus" />
                        </button>
                      </div>
                    </td>
                    <td class="py-4 px-6 text-center font-arabic font-semibold text-indigo-900">
                      {{ formatPrice(item.price * item.quantity) }}
                    </td>
                    <td class="py-4 px-6 text-center">
                      <button
                          @click="removeFromCart(item.id)"
                          class="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      >
                        <Icon icon="ph:trash" />
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Cart Summary -->
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Coupon Code -->
              <div class="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">كوبون الخصم</h3>
                <div class="flex gap-2">
                  <input
                      type="text"
                      v-model="couponCode"
                      placeholder="أدخل كود الخصم"
                      class="flex-1 px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-arabic"
                  />
                  <button
                      @click="applyCoupon"
                      class="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-arabic hover:bg-indigo-200 transition-colors"
                  >
                    تطبيق
                  </button>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-xl font-semibold text-indigo-900 font-arabic mb-4">ملخص الطلب</h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center pb-3 border-b border-indigo-100">
                    <span class="text-gray-600 font-arabic">إجمالي المنتجات</span>
                    <span class="font-semibold text-indigo-900 font-arabic">{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="flex justify-between items-center pb-3 border-b border-indigo-100">
                    <span class="text-gray-600 font-arabic">الشحن</span>
                    <span class="font-semibold text-indigo-900 font-arabic">{{ formatPrice(shippingCost) }}</span>
                  </div>
                  <div v-if="discount > 0" class="flex justify-between items-center pb-3 border-b border-indigo-100">
                    <span class="text-gray-600 font-arabic">الخصم</span>
                    <span class="font-semibold text-red-600 font-arabic">-{{ formatPrice(discount) }}</span>
                  </div>
                  <div class="flex justify-between items-center pt-2">
                    <span class="text-lg font-semibold text-indigo-900 font-arabic">الإجمالي</span>
                    <span class="text-xl font-bold text-indigo-900 font-arabic">{{ formatPrice(total) }}</span>
                  </div>
                </div>

                <!-- Checkout Button -->
                <ButtonUi
                    label="إتمام الطلب"
                    icon="ph:check-circle-bold"
                    to="/checkout"
                    isLink
                    class="w-full mt-6"
                />
              </div>
            </div>

            <!-- Continue Shopping Button -->
            <div class="flex justify-end">
              <ButtonUi
                  label="مواصلة التسوق"
                  icon="ph:arrow-right-bold"
                  to="/books"
                  isOutline
                  isLink
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import ButtonUi from '~/components/ui/ButtonUi.vue';

// SEO
useHead({
  title: 'سلة التسوق - كُتُبي',
  meta: [
    { name: 'description', content: 'استعرض سلة التسوق الخاصة بك واستكمل عملية الشراء من كُتُبي - متجر الكتب العربية الأول' },
  ],
});

const cart = ref({
  items: [
    {
      id: 1,
      title: "الرياضيات للصف الثالث الثانوي",
      author: "د. أحمد محمود",
      price: 120,
      quantity: 1,
      image: "/images/book1.jpg"
    },
    {
      id: 2,
      title: "الفيزياء المتقدمة",
      author: "د. سمير حسين",
      price: 85,
      quantity: 2,
      image: "/images/book2.jpg"
    }
  ]
});

const couponCode = ref('');
const discount = ref(0);
const shippingCost = ref(30); // Fixed shipping cost

// Computed values
const subtotal = computed(() => {
  return cart.value.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
});

const total = computed(() => {
  return subtotal.value + shippingCost.value - discount.value;
});

// Methods
const formatPrice = (price) => {
  return `${price} جنيه`;
};

const increaseQuantity = (itemId) => {
  cartStore.increaseQuantity(itemId);
};

const decreaseQuantity = (itemId) => {
  cartStore.decreaseQuantity(itemId);
};

const removeFromCart = (itemId) => {
  cartStore.removeItem(itemId);
};

const applyCoupon = () => {
  if (couponCode.value.toLowerCase() === 'discount10') {
    discount.value = subtotal.value * 0.1;
    alert('تم تطبيق الخصم بنجاح!');
  } else if (couponCode.value.toLowerCase() === 'freeshipping') {
    shippingCost.value = 0;
    alert('تم تطبيق كوبون الشحن المجاني بنجاح!');
  } else {
    alert('كود الخصم غير صالح!');
  }
};

// Initialize
onMounted(() => {
  // Initialize cart from store or API if needed
});

// Define page meta
definePageMeta({
  auth: false // Allow access without authentication
});
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out 2s infinite;
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