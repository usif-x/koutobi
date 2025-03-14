<template>
  <div class="min-h-screen bg-transparent rtl">
    <!-- Background Effects -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <!-- Page Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <div class="relative z-10 container mx-auto px-4 py-12">
        <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>

        <div v-else class="max-w-6xl mx-auto">
        <!-- Page Header -->
        <div class="mb-8">
          <div class="relative inline-block">
            <span class="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 rounded-full opacity-20 blur-md"></span>
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">الملف الشخصي</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Sidebar / User Info -->
          <div class="md:col-span-1">
            <!-- User Card -->
            <!-- User Card -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <!-- User Avatar -->
              <div class="relative bg-gradient-to-r from-indigo-500 to-purple-600 py-8 px-6">
                <div class="absolute top-0 right-0 w-full h-full opacity-20">
                  <div class="absolute top-1/4 right-1/4 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-20"></div>
                  <div class="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white rounded-full mix-blend-overlay opacity-10"></div>
                </div>
                <div class="relative flex flex-col items-center">
                  <div class="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img
                        src="/images/profile.png"
                        alt="صورة المستخدم"
                        class="w-full h-full object-cover"
                    />
                  </div>
                  <h2 class="mt-4 text-xl font-bold text-white font-arabic">{{ userData.firstName }} {{ userData.lastName }}</h2>
                  <p class="text-indigo-100 font-arabic">{{ userData.email }}</p>
                </div>
              </div>

              <!-- User Stats -->
              <div class="p-4 grid grid-cols-3 gap-2 border-b border-indigo-100">
                <div class="flex flex-col items-center p-2">
                  <span class="text-2xl font-bold text-indigo-900">{{ userData.stats.orders }}</span>
                  <span class="text-xs text-gray-600 font-arabic">الطلبات</span>
                </div>
                <div class="flex flex-col items-center p-2 border-r border-l border-indigo-100">
                  <span class="text-2xl font-bold text-indigo-900">{{ userData.stats.wishlist }}</span>
                  <span class="text-xs text-gray-600 font-arabic">المفضلة</span>
                </div>
                <div class="flex flex-col items-center p-2">
                  <span class="text-2xl font-bold text-indigo-900">{{ userData.stats.reviews }}</span>
                  <span class="text-xs text-gray-600 font-arabic">التقييمات</span>
                </div>
              </div>

              <!-- Account Status -->
              <div class="p-4 flex items-center justify-between border-b border-indigo-100">
                <span class="text-gray-600 font-arabic">حالة الحساب</span>
                <div class="flex items-center">
                  <span class="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  <span class="text-green-600 font-arabic">نشط</span>
                </div>
              </div>

              <!-- Member Since -->
              <div class="p-4 flex items-center justify-between">
                <span class="text-gray-600 font-arabic">عضو منذ</span>
                <span class="text-indigo-900 font-arabic">{{ new Date(userData.createdAt).toLocaleDateString('ar-EG') }}</span>
              </div>
            </div>

            <!-- Profile Navigation -->
            <div class="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div v-for="(item, index) in navItems" :key="index" class="border-b border-indigo-100 last:border-0">
                <a
                    @click="activeTab = item.id"
                    class="flex items-center p-4 cursor-pointer transition-colors duration-200 hover:bg-indigo-50"
                    :class="{'bg-indigo-50': activeTab === item.id}"
                >
                  <Icon :icon="item.icon" class="text-xl text-indigo-600 ml-3" />
                  <span class="font-arabic text-indigo-900">{{ item.label }}</span>
                </a>
              </div>

              <!-- Logout Button -->
              <div class="p-4">
                <button
                    @click="logout"
                    class="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Icon icon="ph:sign-out-bold" />
                  <span class="font-arabic">تسجيل الخروج</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div v-if="activeTab === 'personal'" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
              <Icon icon="ph:user-bold" class="ml-2 text-amber-500" /> المعلومات الشخصية
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Name -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">الاسم</label>
                <div class="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">
                  {{ userData.firstName }} {{ userData.lastName }}
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">البريد الإلكتروني</label>
                <div class="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">
                  {{ userData.email }}
                </div>
              </div>

              <!-- Primary Phone -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">رقم الهاتف الرئيسي</label>
                <div class="px-4 py-2 bg-gray-50 rounded-lg text-gray-700">
                  {{ userData.primaryPhone }}
                </div>
              </div>
            </div>
          </div>

          <!-- Address Tab (Editable) -->
          <div v-if="activeTab === 'address'" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
              <Icon icon="ph:map-pin-bold" class="ml-2 text-amber-500" /> العنوان
            </h3>

            <form @submit.prevent="updateAddress" class="space-y-4">
              <!-- Street -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">الشارع</label>
                <input
                    v-model="addressForm.street"
                    type="text"
                    class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
              </div>

              <!-- City -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">المدينة</label>
                <input
                    v-model="addressForm.city"
                    type="text"
                    class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
              </div>

              <!-- Postal Code -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">الرمز البريدي</label>
                <input
                    v-model="addressForm.postalCode"
                    type="text"
                    class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
              </div>

              <!-- Secondary Phone -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">رقم الهاتف الثانوي</label>
                <input
                    v-model="addressForm.secondaryPhone"
                    type="tel"
                    class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <ButtonUi
                    type="submit"
                    label="حفظ العنوان"
                    icon="ph:check-bold"
                />
              </div>
            </form>
          </div>

            <!-- Orders Tab -->
          <div v-if="activeTab === 'orders'" class="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
              <Icon icon="ph:shopping-bag-bold" class="ml-2 text-amber-500" /> طلباتي
            </h3>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent"></div>
            </div>

            <!-- Orders List -->
            <div v-else-if="orders.length > 0" class="space-y-4">
              <div v-for="order in orders" :key="order.id" class="border border-indigo-100 rounded-lg overflow-hidden">
                <!-- Order Header -->
                <div class="bg-indigo-50 p-4 flex flex-wrap justify-between items-center">
                  <div class="flex items-center gap-3">
          <span class="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded font-arabic">
            طلب #{{ order.id }}
          </span>
                    <span class="text-gray-700 text-sm font-arabic">{{ order.date }}</span>
                  </div>
                  <span
                      class="text-xs py-1 px-2 rounded font-arabic"
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

                <!-- Order Items -->
                <div class="p-4 border-b border-indigo-100">
                  <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="flex justify-between items-center py-2">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-16 rounded overflow-hidden shadow-sm">
                        <img
                            :src="item.image"
                            :alt="item.title"
                            class="w-full h-full object-cover"
                            @error="$event.target.src = '/images/placeholder.png'"
                        />
                      </div>
                      <div>
                        <h4 class="text-indigo-900 font-arabic">{{ item.title }}</h4>
                        <p class="text-xs text-gray-600 font-arabic">الكمية: {{ item.quantity }}</p>
                      </div>
                    </div>
                    <span class="font-semibold text-indigo-900 font-arabic">{{ item.price }} جنيه</span>
                  </div>
                </div>

                <!-- Order Footer -->
                <div class="p-4 flex flex-wrap justify-between items-center">
                  <span class="font-bold text-indigo-900 font-arabic">الإجمالي: {{ order.total }} جنيه</span>
                  <ButtonUi
                      size="sm"
                      label="تفاصيل الطلب"
                      icon="ph:info-bold"
                      @click="viewOrderDetails(order.id)"
                  />
                </div>
              </div>
            </div>

            <!-- Empty Orders State -->
            <div v-else class="text-center py-8">
              <Icon icon="ph:shopping-bag-duotone" class="text-indigo-200 text-6xl mx-auto mb-3" />
              <h4 class="text-lg font-semibold text-indigo-900 font-arabic mb-2">لا توجد طلبات بعد</h4>
              <p class="text-gray-600 font-arabic mb-4">يبدو أنك لم تقم بأي طلب حتى الآن</p>
              <ButtonUi label="تصفح الكتب" icon="ph:books-bold" to="/books" isLink />
            </div>
          </div>

          <!-- Ratings Tab -->
          <div v-if="activeTab === 'ratings'" class="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
              <Icon icon="ph:star-bold" class="ml-2 text-amber-500" /> تقييماتي
            </h3>

            <!-- Ratings List -->
            <div v-if="ratings.length > 0" class="space-y-4">
              <div v-for="rating in ratings" :key="rating.id" class="border border-indigo-100 rounded-lg overflow-hidden">
                <!-- Product Info -->
                <div class="p-4 flex items-start gap-4">
                  <div class="w-16 h-20 rounded overflow-hidden shadow-sm">
                    <img
                        :src="rating.productImage"
                        :alt="rating.productTitle"
                        class="w-full h-full object-cover"
                        @error="$event.target.src = '/images/placeholder.png'"
                    />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-indigo-900 font-arabic mb-2">{{ rating.productTitle }}</h4>
                    <!-- Rating Stars -->
                    <div class="flex items-center gap-1 mb-2">
                      <Icon
                          v-for="i in 5"
                          :key="i"
                          :icon="i <= rating.rating ? 'ph:star-fill' : 'ph:star'"
                          :class="i <= rating.rating ? 'text-amber-400' : 'text-gray-300'"
                      />
                    </div>
                    <!-- Comment -->
                    <p v-if="rating.comment" class="text-gray-600 text-sm font-arabic">{{ rating.comment }}</p>
                    <!-- Date -->
                    <span class="text-xs text-gray-500 font-arabic mt-2 block">{{ rating.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8">
              <Icon icon="ph:star-duotone" class="text-indigo-200 text-6xl mx-auto mb-3" />
              <h4 class="text-lg font-semibold text-indigo-900 font-arabic mb-2">لا توجد تقييمات</h4>
              <p class="text-gray-600 font-arabic mb-4">لم تقم بتقييم أي كتاب حتى الآن</p>
              <ButtonUi label="تصفح الكتب" icon="ph:books-bold" to="/books" isLink />
            </div>
          </div>

            <!-- Wishlist Tab -->
          <!-- Wishlist Tab -->
          <div v-if="activeTab === 'wishlist'" class="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
              <Icon icon="ph:heart-bold" class="ml-2 text-amber-500" /> المفضلة
            </h3>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent"></div>
            </div>

            <!-- Wishlist Grid -->
            <div v-else-if="wishlist.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="item in wishlist" :key="item.id" class="border border-indigo-100 rounded-lg overflow-hidden group">
                <div class="relative">
                  <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-40 object-cover"
                      @error="$event.target.src = '/images/placeholder.png'"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <div class="flex gap-2">
                      <button
                          @click="addToCart(item.id)"
                          class="p-2 bg-white/90 rounded-lg text-indigo-600 hover:bg-white transition-colors"
                          :disabled="!item.inStock"
                      >
                        <Icon icon="ph:shopping-cart-bold" />
                      </button>
                      <button
                          @click="removeFromWishlist(item.id)"
                          class="p-2 bg-white/90 rounded-lg text-red-600 hover:bg-white transition-colors"
                      >
                        <Icon icon="ph:trash-bold" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="p-3">
                  <h4 class="font-semibold text-indigo-900 font-arabic">{{ item.title }}</h4>
                  <div class="flex justify-between items-center mt-2">
                    <span class="text-indigo-900 font-bold font-arabic">{{ item.price }} جنيه</span>
                    <div class="flex items-center">
                      <Icon icon="ph:star-fill" class="text-amber-400" />
                      <span class="text-sm text-gray-600 mr-1">{{ item.rating.toFixed(1) }}</span>
                    </div>
                  </div>
                  <div v-if="!item.inStock" class="mt-2">
                    <span class="text-xs text-red-600 font-arabic">غير متوفر حالياً</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty Wishlist State -->
            <div v-else class="text-center py-8">
              <Icon icon="ph:heart-duotone" class="text-indigo-200 text-6xl mx-auto mb-3" />
              <h4 class="text-lg font-semibold text-indigo-900 font-arabic mb-2">المفضلة فارغة</h4>
              <p class="text-gray-600 font-arabic mb-4">ابدأ بإضافة الكتب التي تهمك إلى المفضلة</p>
              <ButtonUi label="تصفح الكتب" icon="ph:books-bold" to="/books" isLink />
            </div>
          </div>

            <!-- Change Password Tab -->
          <div v-if="activeTab === 'password'" class="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
              <Icon icon="ph:lock-bold" class="ml-2 text-amber-500" /> تغيير كلمة المرور
            </h3>

            <form @submit.prevent="updatePassword" class="space-y-4">
              <!-- Current Password -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">كلمة المرور الحالية</label>
                <input
                    v-model="passwordForm.currentPassword"
                    type="password"
                    required
                    class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
              </div>

              <!-- New Password -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">كلمة المرور الجديدة</label>
                <input
                    v-model="passwordForm.newPassword"
                    type="password"
                    required
                    class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
              </div>

              <!-- Confirm New Password -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-700 font-arabic">تأكيد كلمة المرور الجديدة</label>
                <input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    required
                    class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
              </div>

              <!-- Password Requirements -->
              <div class="bg-indigo-50 p-3 rounded-lg">
                <h4 class="text-sm font-semibold text-indigo-900 font-arabic mb-2">شروط كلمة المرور:</h4>
                <ul class="text-xs text-gray-700 space-y-1 font-arabic">
                  <li class="flex items-center gap-1">
                    <Icon icon="ph:check-circle" class="text-green-500" /> يجب أن تحتوي على الأقل 8 أحرف
                  </li>
                  <li class="flex items-center gap-1">
                    <Icon icon="ph:check-circle" class="text-green-500" /> يجب أن تحتوي على حرف كبير وحرف صغير
                  </li>
                  <li class="flex items-center gap-1">
                    <Icon icon="ph:check-circle" class="text-green-500" /> يجب أن تحتوي على رقم واحد على الأقل
                  </li>
                  <li class="flex items-center gap-1">
                    <Icon icon="ph:check-circle" class="text-green-500" /> يجب أن تحتوي على رمز خاص واحد على الأقل
                  </li>
                </ul>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <ButtonUi
                    type="submit"
                    label="تحديث كلمة المرور"
                    icon="ph:check-bold"
                />
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import ButtonUi from '~/components/ui/ButtonUi.vue'
import { useRouter } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'

// Initialize core utilities
const router = useRouter()
const ratings = ref([])
const { errorToast, successToast } = useAlerts()

// Loading state
const isLoading = ref(true)

// User data state - initialize first
const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  primaryPhone: '',
  secondaryPhone: '',
  address: {
    street: '',
    city: '',
    postalCode: ''
  },
  stats: {
    orders: 0,
    wishlist: 0,
    reviews: 0
  },
  createdAt: new Date()
})

// Active tab state
const activeTab = ref('personal')

// Example data
const orders = ref([])
const wishlist = ref([])

// Form data
const addressForm = reactive({
  street: '',
  city: '',
  postalCode: '',
  secondaryPhone: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Navigation items
const navItems = [
  { id: 'personal', label: 'المعلومات الشخصية', icon: 'ph:user-bold' },
  { id: 'password', label: 'تغيير كلمة المرور', icon: 'ph:lock-bold' },
  { id: 'wishlist', label: 'المفضلة', icon: 'ph:heart-bold' },
  { id: 'orders', label: 'طلباتي', icon: 'ph:shopping-bag-bold' },
  {id: 'ratings', label: 'التقييمات', icon: 'ph:star-bold'},
  { id: 'address', label: 'العنوان', icon: 'ph:map-pin-bold' }
]

// Utilities
const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken')
  }
  return null
}

const getOrderStatusText = (status) => {
  const statusMap = {
    completed: 'مكتمل',
    processing: 'قيد المعالجة',
    shipping: 'قيد الشحن',
    cancelled: 'ملغي'
  }
  return statusMap[status] || status
}

// API Functions
const fetchUserData = async () => {
  try {
    isLoading.value = true
    const { user } = await $fetch('/api/user/me', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    if (user) {
      userData.value = {
        ...userData.value,
        ...user,
        stats: {
          orders: user.stats?.orders || 0,
          wishlist: user.stats?.wishlist || 0,
          reviews: user.stats?.reviews || 0
        },
        memberSince: new Date(user.createdAt).toLocaleDateString('ar-EG')
      }

      // Update address form
      addressForm.street = user.address?.street || ''
      addressForm.city = user.address?.city || ''
      addressForm.postalCode = user.address?.postalCode || ''
      addressForm.secondaryPhone = user.secondaryPhone || ''
    }
  } catch (error) {
    errorToast('فشل في جلب بيانات المستخدم')
  } finally {
    isLoading.value = false
  }
}

const fetchOrders = async () => {
  try {
    const { orders: userOrders } = await $fetch('/api/orders', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    // Transform and update orders data
    orders.value = userOrders.map(order => ({
      id: order._id,
      date: new Date(order.createdAt).toLocaleDateString('ar-EG'),
      status: order.status,
      total: order.total,
      items: order.items.map(item => ({
        title: item.product.title,
        image: item.product.image,
        quantity: item.quantity,
        price: item.price
      }))
    }))

    // Update user stats
    userData.value.stats.orders = orders.value.length
  } catch (error) {
    errorToast('فشل في جلب الطلبات')
  }
}
const fetchRatings = async () => {
  try {
    const { ratings: userRatings } = await $fetch('/api/ratings/user', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    ratings.value = userRatings.map(rating => ({
      id: rating._id,
      productTitle: rating.product.title,
      productImage: rating.product.image,
      rating: rating.rating,
      comment: rating.comment,
      date: new Date(rating.createdAt).toLocaleDateString('ar-EG')
    }))

    // Update user stats
    userData.value.stats.reviews = ratings.value.length
  } catch (error) {
    errorToast('فشل في جلب التقييمات')
  }
}

const fetchWishlist = async () => {
  try {
    const { wishlist: userWishlist } = await $fetch('/api/wishlist', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    // Transform and update wishlist data
    wishlist.value = userWishlist.map(item => ({
      id: item._id,
      title: item.title,
      image: item.image,
      price: item.price,
      rating: item.ratingAverage || 0,
      inStock: item.inStock
    }))

    // Update user stats
    userData.value.stats.wishlist = wishlist.value.length
  } catch (error) {
    errorToast('فشل في جلب المفضلة')
  }
}

// Add removeFromWishlist function
const removeFromWishlist = async (bookId) => {
  try {
    await $fetch(`/api/wishlist/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    // Remove from local state
    wishlist.value = wishlist.value.filter(item => item.id !== bookId)
    userData.value.stats.wishlist = wishlist.value.length
    successToast('تم إزالة الكتاب من المفضلة')
  } catch (error) {
    errorToast('فشل في إزالة الكتاب من المفضلة')
  }
}

// Add addToCart function
const addToCart = async (bookId) => {
  try {
    await $fetch('/api/cart/', {
      method: 'POST',
      body: {
        productId: bookId,
        quantity: 1
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    successToast('تم إضافة الكتاب إلى السلة')
  } catch (error) {
    errorToast('فشل في إضافة الكتاب إلى السلة')
  }
}

// Update onMounted to include fetchRatings

const addNotification = async (typeOfNotification) => {
  const typeOfN = typeOfNotification
  if (typeOfN === 'password') {
    await $fetch('/api/user/notifications', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: {
        title: 'تم تحديث الملف الشخصي',
        description: 'لقد قمت بتحديث كلمة المرور الخاصة بك بنجاح.',
        eventType: 'info'
      }
    })
  } else {
    await $fetch('/api/user/notifications', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      },
      body: {
        title: 'تم تحديث الملف الشخصي',
        description: 'لقد قمت بتحديث العنوان الخاص بك بنجاح.',
        eventType: 'info'
      }
    })
  }
}

  // Add updatePassword function
// Add viewOrderDetails function
const viewOrderDetails = (orderId) => {
  router.push(`/orders/${orderId}`)
}
// Update functions
const validatePassword = (password) => {
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*]/.test(password)
  return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial
}

const updatePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    errorToast('كلمات المرور غير متطابقة')
    return
  }

  if (!validatePassword(passwordForm.newPassword)) {
    errorToast('كلمة المرور الجديدة لا تستوفي المتطلبات')
    return
  }

  try {
    await $fetch('/api/user/update-password', {
      method: 'PUT',
      body: {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    successToast('تم تحديث كلمة المرور بنجاح')
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    addNotification('password')
  } catch (error) {
    errorToast('فشل في تحديث كلمة المرور')
  }
}

const updateAddress = async () => {
  try {
    await $fetch('/api/user/update', {
      method: 'PUT',
      body: {
        address: {
          street: addressForm.street,
          city: addressForm.city,
          postalCode: addressForm.postalCode
        },
        secondaryPhone: addressForm.secondaryPhone
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    successToast('تم تحديث العنوان بنجاح')
    addNotification('address')
    if (error.value) {
      console.error('خطأ أثناء إرسال الإشعار:', error.value);
    } else {
    }

    await fetchUserData()
  } catch (error) {
    errorToast('فشل في تحديث العنوان')
  }
}

// Auth functions
const logout = () => {
  localStorage.removeItem('accessToken')
  router.push('/login')
}

onMounted(async () => {
  await fetchUserData()
  await fetchOrders()
  await fetchRatings()
  await fetchWishlist()
})
// Meta
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'الملف الشخصي - كُتُبي',
  meta: [
    { name: 'description', content: 'إدارة الملف الشخصي في متجر كُتُبي' }
  ]
})


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