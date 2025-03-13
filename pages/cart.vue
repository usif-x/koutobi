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
          <!-- Loading State -->
          <div v-if="loading" class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div class="flex flex-col items-center justify-center gap-4 py-8">
              <Icon icon="ph:spinner-gap-bold" class="text-indigo-400 text-6xl animate-spin"/>
              <h2 class="text-2xl font-semibold text-indigo-900 font-arabic">جاري تحميل سلة التسوق...</h2>
            </div>
          </div>

          <!-- Empty Cart State -->
          <div v-else-if="!cart || !cart.items || cart.items.length === 0" class="bg-white rounded-2xl shadow-lg p-8 text-center">
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
                  <tr v-for="item in cart.items" :key="item._id" class="hover:bg-indigo-50/30 transition-colors duration-200">
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-4">
                        <div class="w-16 h-20 rounded-md overflow-hidden shadow-sm">
                          <img 
                            :src="item.product.images && item.product.images.length > 0 ? item.product.images[0] : '/images/placeholder-book.jpg'" 
                            :alt="item.product.name" 
                            class="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h3 class="text-indigo-900 font-semibold font-arabic">{{ item.product.name }}</h3>
                          <p class="text-gray-500 text-sm font-arabic">{{ item.product.author }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6 text-center font-arabic">
                      <div v-if="item.product.hasDiscount" class="flex flex-col items-center">
                        <span class="line-through text-gray-400 text-sm">{{ formatPrice(item.product.price) }}</span>
                        <span>{{ formatPrice(getDiscountedPrice(item.product)) }}</span>
                      </div>
                      <span v-else>{{ formatPrice(item.product.price) }}</span>
                    </td>
                    <td class="py-4 px-6 text-center">
                      <div class="flex items-center justify-center">
                        <button
                            @click="decreaseQuantity(item.product._id)"
                            class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                            :disabled="updateLoading"
                        >
                          <Icon icon="ph:minus" />
                        </button>
                        <span class="w-12 text-center font-arabic mx-2">{{ item.quantity }}</span>
                        <button
                            @click="increaseQuantity(item.product._id)"
                            class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
                            :disabled="updateLoading || item.quantity >= item.product.stockCount"
                        >
                          <Icon icon="ph:plus" />
                        </button>
                      </div>
                    </td>
                    <td class="py-4 px-6 text-center font-arabic font-semibold text-indigo-900">
                      {{ formatPrice(getItemTotal(item)) }}
                    </td>
                    <td class="py-4 px-6 text-center">
                      <button
                          @click="removeFromCart(item.product._id)"
                          class="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          :disabled="updateLoading"
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
                      :disabled="couponLoading || appliedCoupon"
                  />
                  <button
                      v-if="!appliedCoupon"
                      @click="applyCoupon"
                      class="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-arabic hover:bg-indigo-200 transition-colors flex items-center gap-2"
                      :disabled="couponLoading || !couponCode"
                  >
                    <Icon v-if="couponLoading" icon="ph:spinner-gap-bold" class="animate-spin" />
                    <span>تطبيق</span>
                  </button>
                  <button
                      v-else
                      @click="removeCoupon"
                      class="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-arabic hover:bg-red-200 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
                <div v-if="couponError" class="mt-2 text-red-500 text-sm font-arabic">
                  {{ couponError }}
                </div>
                <div v-if="appliedCoupon" class="mt-2 text-green-600 text-sm font-arabic">
                  تم تطبيق كوبون "{{ appliedCoupon.code }}" بنجاح ({{ appliedCoupon.discount }}%)
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
                    :disabled="updateLoading || cart.items.length === 0"
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
import { useAlerts } from '~/composables/useAlerts';

// SEO
useHead({
  title: 'سلة التسوق - كُتُبي',
  meta: [
    { name: 'description', content: 'استعرض سلة التسوق الخاصة بك واستكمل عملية الشراء من كُتُبي - متجر الكتب العربية الأول' },
  ],
});

const { successToast, errorToast } = useAlerts();
const cart = ref(null);
const loading = ref(true);
const updateLoading = ref(false);
const couponLoading = ref(false);
const couponCode = ref('');
const couponError = ref('');
const appliedCoupon = ref(null);
const discount = ref(0);
const shippingCost = ref(30); // Fixed shipping cost

// Fetch cart data
const fetchCart = async () => {
  loading.value = true;
  try {
    const response = await fetch('/api/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    
    const data = await response.json();
    cart.value = data.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    errorToast('حدث خطأ أثناء تحميل سلة التسوق');
  } finally {
    loading.value = false;
  }
};

// Get discounted price for a product
const getDiscountedPrice = (product) => {
  if (product.hasDiscount && product.discountPercentage > 0) {
    return product.price * (1 - product.discountPercentage / 100);
  }
  return product.price;
};

// Get total price for an item (considering discounts)
const getItemTotal = (item) => {
  const price = getDiscountedPrice(item.product);
  return price * item.quantity;
};

// Computed values
const subtotal = computed(() => {
  if (!cart.value || !cart.value.items || cart.value.items.length === 0) {
    return 0;
  }
  
  return cart.value.items.reduce((total, item) => {
    return total + getItemTotal(item);
  }, 0);
});

const total = computed(() => {
  return subtotal.value + shippingCost.value - discount.value;
});

// Methods
const formatPrice = (price) => {
  return `${price.toFixed(2)} ج.م`;
};

// Update cart item quantity
const updateCartItem = async (productId, quantity) => {
  updateLoading.value = true;
  try {
    const response = await fetch(`/api/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ quantity })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
    
    await fetchCart();
    successToast('تم تحديث سلة التسوق بنجاح');
  } catch (error) {
    console.error('Error updating cart:', error);
    errorToast('حدث خطأ أثناء تحديث سلة التسوق');
  } finally {
    updateLoading.value = false;
  }
};

// Increase item quantity
const increaseQuantity = (productId) => {
  if (updateLoading.value) return;
  
  const item = cart.value.items.find(item => item.product._id === productId);
  if (item && item.quantity < item.product.stockCount) {
    updateCartItem(productId, item.quantity + 1);
  }
};

// Decrease item quantity
const decreaseQuantity = (productId) => {
  if (updateLoading.value) return;
  
  const item = cart.value.items.find(item => item.product._id === productId);
  if (item && item.quantity > 1) {
    updateCartItem(productId, item.quantity - 1);
  } else if (item && item.quantity === 1) {
    removeFromCart(productId);
  }
};

// Remove item from cart
const removeFromCart = async (productId) => {
  updateLoading.value = true;
  try {
    const response = await fetch(`/api/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    
    await fetchCart();
    successToast('تم إزالة المنتج من سلة التسوق بنجاح');
  } catch (error) {
    console.error('Error removing item from cart:', error);
    errorToast('حدث خطأ أثناء إزالة المنتج من سلة التسوق');
  } finally {
    updateLoading.value = false;
  }
};

// Apply coupon
const applyCoupon = async () => {
  if (!couponCode.value || couponLoading.value) return;
  
  couponLoading.value = true;
  couponError.value = '';
  
  try {
    const response = await fetch('/api/coupons/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ code: couponCode.value })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      couponError.value = data.message || 'كود الخصم غير صالح';
      return;
    }
    
    appliedCoupon.value = data.coupon;
    discount.value = (subtotal.value * appliedCoupon.value.discount) / 100;
    successToast('تم تطبيق كوبون الخصم بنجاح');
  } catch (error) {
    console.error('Error applying coupon:', error);
    couponError.value = 'حدث خطأ أثناء تطبيق كوبون الخصم';
  } finally {
    couponLoading.value = false;
  }
};

// Remove applied coupon
const removeCoupon = () => {
  appliedCoupon.value = null;
  discount.value = 0;
  couponCode.value = '';
  couponError.value = '';
  successToast('تم إلغاء كوبون الخصم');
};

// Fetch cart on component mount
onMounted(() => {
  fetchCart();
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