<template>
  <div class="min-h-screen bg-transparent rtl py-10">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-indigo-900 font-arabic mb-2">إتمام الطلب</h1>
          <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full"></div>
        </div>

        <!-- Shipping Form -->
        <form @submit.prevent="updateAddress" class="bg-white rounded-2xl shadow-lg p-6 space-y-6 mb-6">
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-indigo-900 font-arabic">معلومات الشحن</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 font-arabic mb-2">الاسم الأول</label>
                <input
                    v-model="userData.firstName"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled
                />
              </div>
              <div>
                <label class="block text-gray-700 font-arabic mb-2">الاسم الأخير</label>
                <input
                    v-model="userData.lastName"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled
                />
              </div>
            </div>

            <div>
              <label class="block text-gray-700 font-arabic mb-2">العنوان</label>
              <input
                  v-model="addressData.street"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 font-arabic mb-2">المدينة</label>
                <input
                    v-model="addressData.city"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                />
              </div>
              <div>
                <label class="block text-gray-700 font-arabic mb-2">الرمز البريدي</label>
                <input
                    v-model="addressData.postalCode"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                />
              </div>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-gray-700 font-arabic mb-2">رقم الهاتف</label>
              <input
                  v-model="addressData.secondaryPhone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
              />
            </div>

            <!-- Update Address Button -->
            <button
                type="submit"
                class="w-full bg-amber-500 hover:bg-amber-600 text-white font-arabic font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                :disabled="isUpdatingAddress"
            >
              {{ isUpdatingAddress ? 'جاري حفظ العنوان...' : 'حفظ معلومات الشحن' }}
            </button>
          </div>
        </form>

        <!-- Order Summary -->
        <div class="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h2 class="text-xl font-semibold text-indigo-900 font-arabic">ملخص الطلب</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600 font-arabic">إجمالي المنتجات</span>
              <span class="font-semibold">{{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 font-arabic">الشحن</span>
              <span class="font-semibold">{{ formatPrice(shippingCost) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-2 flex justify-between">
              <span class="text-lg font-semibold text-indigo-900 font-arabic">الإجمالي النهائي</span>
              <span class="text-xl font-bold text-indigo-900">{{ formatPrice(total) }}</span>
            </div>
          </div>

          <!-- Submit Order Button -->
          <button
              @click="submitOrder"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-arabic font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              :disabled="isSubmitting || !isAddressUpdated"
          >
            {{ isSubmitting ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'

const router = useRouter()
const { successToast, errorToast } = useAlerts()

const isSubmitting = ref(false)
const isUpdatingAddress = ref(false)
const isAddressUpdated = ref(false)
const cartTotal = ref(0)
const shippingCost = ref(30)

const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  primaryPhone: ''
})

const addressData = ref({
  street: '',
  city: '',
  state: '',
  postalCode: '',
  secondaryPhone: ''
})

const total = computed(() => cartTotal.value + shippingCost.value)

const formatPrice = (price) => `${price} جنيه`

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken')
  }
  return null
}

// Fetch user data
const fetchUserData = async () => {
  try {
    const { user } = await $fetch('/api/user/me', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    userData.value = user
    if (user.address) {
      addressData.value = {
        street: user.address.street || '',
        city: user.address.city || '',
        state: user.address.state || '',
        postalCode: user.address.postalCode || '',
        secondaryPhone: user.secondaryPhone || ''
      }
    }
  } catch (error) {
    errorToast('فشل في جلب بيانات المستخدم')
  }
}

// Update address
const updateAddress = async () => {
  isUpdatingAddress.value = true
  try {
    await $fetch('/api/user/update', {
      method: 'PUT',
      body: {
        address: {
          street: addressData.value.street,
          city: addressData.value.city,
          state: addressData.value.state,
          postalCode: addressData.value.postalCode
        },
        secondaryPhone: addressData.value.secondaryPhone
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    successToast('تم حفظ عنوان الشحن بنجاح')
    isAddressUpdated.value = true
  } catch (error) {
    errorToast('فشل في حفظ عنوان الشحن')
  } finally {
    isUpdatingAddress.value = false
  }
}

// Submit order
const submitOrder = async () => {
  if (!isAddressUpdated.value) {
    errorToast('يرجى حفظ معلومات الشحن أولاً')
    return
  }

  isSubmitting.value = true
  try {
    const response = await $fetch('/api/orders', {
      method: 'POST',
      body: {
        shippingAddress: {
          ...addressData.value
        }
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    successToast('تم تأكيد طلبك بنجاح')
    router.push(`/orders/${response.order._id}`)
  } catch (error) {
    errorToast(error.message || 'حدث خطأ أثناء تأكيد الطلب')
  } finally {
    isSubmitting.value = false
  }
}

// Initialize
onMounted(async () => {
  await fetchUserData()
  try {
    const { cart } = await $fetch('/api/cart', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    if (cart && cart.items) {
      cartTotal.value = cart.items.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity)
      }, 0)
    }
  } catch (error) {
    console.error('Error fetching cart:', error)
  }
})

// Meta tags
useHead({
  title: 'إتمام الطلب - كُتُبي',
  meta: [
    { name: 'description', content: 'إتمام عملية الشراء وتأكيد الطلب من متجر كُتُبي' }
  ]
})

definePageMeta({
  middleware: ['auth']
})
</script>