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
            <h1 class="relative text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 font-arabic tracking-tight">الملف الشخصي</h1>
            <div class="w-16 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3"></div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Sidebar / User Info -->
          <div class="md:col-span-1">
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
                        :src="userProfile.avatar || '/images/default-avatar.jpg'"
                        alt="صورة المستخدم"
                        class="w-full h-full object-cover"
                    />
                  </div>
                  <h2 class="mt-4 text-xl font-bold text-white font-arabic">{{ userProfile.name }}</h2>
                  <p class="text-indigo-100 font-arabic">{{ userProfile.email }}</p>
                </div>
              </div>

              <!-- User Stats -->
              <div class="p-4 grid grid-cols-3 gap-2 border-b border-indigo-100">
                <div class="flex flex-col items-center p-2">
                  <span class="text-2xl font-bold text-indigo-900">{{ userProfile.orders }}</span>
                  <span class="text-xs text-gray-600 font-arabic">الطلبات</span>
                </div>
                <div class="flex flex-col items-center p-2 border-r border-l border-indigo-100">
                  <span class="text-2xl font-bold text-indigo-900">{{ userProfile.wishlistCount }}</span>
                  <span class="text-xs text-gray-600 font-arabic">المفضلة</span>
                </div>
                <div class="flex flex-col items-center p-2">
                  <span class="text-2xl font-bold text-indigo-900">{{ userProfile.reviews }}</span>
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
                <span class="text-indigo-900 font-arabic">{{ userProfile.memberSince }}</span>
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
          <div class="md:col-span-2">
            <!-- Personal Information Tab -->
            <div v-if="activeTab === 'personal'" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
                <Icon icon="ph:user-bold" class="ml-2 text-amber-500" /> المعلومات الشخصية
              </h3>

              <form @submit.prevent="updatePersonalInfo" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Name Field -->
                  <div class="space-y-2">
                    <label class="block text-sm text-gray-700 font-arabic">الاسم</label>
                    <input
                        v-model="formData.name"
                        type="text"
                        class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                    />
                  </div>

                  <!-- Email Field -->
                  <div class="space-y-2">
                    <label class="block text-sm text-gray-700 font-arabic">البريد الإلكتروني</label>
                    <input
                        v-model="formData.email"
                        type="email"
                        class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                    />
                  </div>

                  <!-- Phone Field -->
                  <div class="space-y-2">
                    <label class="block text-sm text-gray-700 font-arabic">رقم الهاتف</label>
                    <input
                        v-model="formData.phone"
                        type="tel"
                        class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                    />
                  </div>

                  <!-- Date of Birth Field -->
                  <div class="space-y-2">
                    <label class="block text-sm text-gray-700 font-arabic">تاريخ الميلاد</label>
                    <input
                        v-model="formData.dateOfBirth"
                        type="date"
                        class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <!-- Address Field -->
                <div class="space-y-2">
                  <label class="block text-sm text-gray-700 font-arabic">العنوان</label>
                  <textarea
                      v-model="formData.address"
                      rows="3"
                      class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end">
                  <ButtonUi
                      type="submit"
                      label="حفظ التغييرات"
                      icon="ph:check-bold"
                  />
                </div>
              </form>
            </div>

            <!-- Orders Tab -->
            <div v-if="activeTab === 'orders'" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
                <Icon icon="ph:shopping-bag-bold" class="ml-2 text-amber-500" /> طلباتي
              </h3>

              <!-- Orders List -->
              <div v-if="orders.length > 0" class="space-y-4">
                <div v-for="(order, index) in orders" :key="index" class="border border-indigo-100 rounded-lg overflow-hidden">
                  <!-- Order Header -->
                  <div class="bg-indigo-50 p-4 flex flex-wrap justify-between items-center">
                    <div class="flex items-center gap-3">
                      <span class="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded font-arabic">
                        طلب #{{ order.id }}
                      </span>
                      <span class="text-gray-700 text-sm font-arabic">{{ order.date }}</span>
                    </div>
                    <div class="flex items-center gap-2">
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
                  </div>

                  <!-- Order Items -->
                  <div class="p-4 border-b border-indigo-100">
                    <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="flex justify-between items-center py-2">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-16 rounded overflow-hidden shadow-sm">
                          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
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
                    <div class="flex gap-2">
                      <ButtonUi
                          v-if="['processing', 'shipping'].includes(order.status)"
                          size="sm"
                          label="تتبع الطلب"
                          icon="ph:truck-bold"
                          isOutline
                      />
                      <ButtonUi
                          size="sm"
                          label="تفاصيل الطلب"
                          icon="ph:info-bold"
                          isOutline
                      />
                    </div>
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

            <!-- Wishlist Tab -->
            <div v-if="activeTab === 'wishlist'" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 class="text-xl font-bold text-indigo-900 font-arabic mb-4 flex items-center">
                <Icon icon="ph:heart-bold" class="ml-2 text-amber-500" /> المفضلة
              </h3>

              <!-- Wishlist Grid -->
              <div v-if="wishlist.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(item, index) in wishlist" :key="index" class="border border-indigo-100 rounded-lg overflow-hidden group">
                  <div class="relative">
                    <img :src="item.image" :alt="item.title" class="w-full h-40 object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <div class="flex gap-2">
                        <button class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                          <Icon icon="ph:shopping-cart-simple-bold" />
                        </button>
                        <button class="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors">
                          <Icon icon="ph:heart-slash-bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="p-3">
                    <h4 class="font-semibold text-indigo-900 font-arabic">{{ item.title }}</h4>
                    <div class="flex justify-between items-center mt-2">
                      <span class="text-indigo-900 font-bold font-arabic">{{ item.price }} جنيه</span>
                      <div class="flex items-center">
                        <Icon icon="ph:star-fill" class="text-amber-400 text-sm" />
                        <span class="text-gray-600 text-sm font-arabic mr-1">{{ item.rating }}</span>
                      </div>
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
            <div v-if="activeTab === 'password'" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
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
                      class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  />
                </div>

                <!-- New Password -->
                <div class="space-y-2">
                  <label class="block text-sm text-gray-700 font-arabic">كلمة المرور الجديدة</label>
                  <input
                      v-model="passwordForm.newPassword"
                      type="password"
                      class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  />
                </div>

                <!-- Confirm New Password -->
                <div class="space-y-2">
                  <label class="block text-sm text-gray-700 font-arabic">تأكيد كلمة المرور الجديدة</label>
                  <input
                      v-model="passwordForm.confirmPassword"
                      type="password"
                      class="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                  />
                </div>

                <!-- Password Requirements -->
                <div class="bg-indigo-50 p-3 rounded-lg">
                  <h4 class="text-sm font-semibold text-indigo-900 font-arabic mb-2">شروط كلمة المرور:</h4>
                  <ul class="text-xs text-gray-700 space-y-1 font-arabic">
                    <li class="flex items-center gap-1">
                      <Icon icon="ph:check-circle" class="text-green-500" />
                      يجب أن تحتوي على الأقل 8 أحرف
                    </li>
                    <li class="flex items-center gap-1">
                      <Icon icon="ph:check-circle" class="text-green-500" />
                      يجب أن تحتوي على حرف كبير وحرف صغير
                    </li>
                    <li class="flex items-center gap-1">
                      <Icon icon="ph:check-circle" class="text-green-500" />
                      يجب أن تحتوي على رقم واحد على الأقل
                    </li>
                    <li class="flex items-center gap-1">
                      <Icon icon="ph:check-circle" class="text-green-500" />
                      يجب أن تحتوي على رمز خاص واحد على الأقل
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
import { ref, reactive } from 'vue';
import { Icon } from '@iconify/vue';
import ButtonUi from '~/components/ui/ButtonUi.vue';

// SEO
useHead({
  title: 'الملف الشخصي - كُتُبي',
  meta: [
    { name: 'description', content: 'إدارة الملف الشخصي والطلبات والمفضلة في متجر كُتُبي - متجر الكتب العربية الأول' },
  ],
});

// Define page meta
definePageMeta({
  auth: true // Require authentication
});

// Navigation items
const navItems = [
  { id: 'personal', label: 'المعلومات الشخصية', icon: 'ph:user-bold' },
  { id: 'orders', label: 'طلباتي', icon: 'ph:shopping-bag-bold' },
  { id: 'wishlist', label: 'المفضلة', icon: 'ph:heart-bold' },
  { id: 'password', label: 'تغيير كلمة المرور', icon: 'ph:lock-bold' },
];

// Active tab state
const activeTab = ref('personal');

// Mock user data - replace with actual user data from your auth system
const userProfile = reactive({
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  avatar: '/images/avatar.jpg',
  orders: 5,
  wishlistCount: 12,
  reviews: 3,
  memberSince: '٢٠ مارس ٢٠٢٣',
  phone: '01012345678',
  dateOfBirth: '1990-05-15',
  address: 'شارع التحرير، القاهرة، مصر'
});

// Form data for personal information
const formData = reactive({
  name: userProfile.name,
  email: userProfile.email,
  phone: userProfile.phone,
  dateOfBirth: userProfile.dateOfBirth,
  address: userProfile.address
});

// Form data for password change
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Mock orders data - replace with actual data from your API
const orders = ref([
  {
    id: 'ORD-12345',
    date: '١٠ فبراير ٢٠٢٤',
    status: 'completed',
    total: 235,
    items: [
      {
        title: 'الرياضيات للصف الثالث الثانوي',
        quantity: 1,
        price: 120,
        image: '/images/book1.jpg'
      },
      {
        title: 'الفيزياء المتقدمة',
        quantity: 1,
        price: 85,
        image: '/images/book2.jpg'
      }
    ]
  },
  {
    id: 'ORD-12346',
    date: '٥ فبراير ٢٠٢٤',
    status: 'shipping',
    total: 150,
    items: [
      {
        title: 'قواعد اللغة العربية',
        quantity: 1,
        price: 75,
        image: '/images/book3.jpg'
      },
      {
        title: 'الكيمياء العضوية',
        quantity: 1,
        price: 75,
        image: '/images/book4.jpg'
      }
    ]
  }
]);

// Mock wishlist data - replace with actual data from your API
const wishlist = ref([
  {
    id: 1,
    title: 'الأحياء للصف الثاني الثانوي',
    price: 95,
    rating: 4.8,
    image: '/images/book5.jpg'
  },
  {
    id: 2,
    title: 'اللغة الإنجليزية للصف الثالث الإعدادي',
    price: 65,
    rating: 4.6,
    image: '/images/book6.jpg'
  },
  {
    id: 3,
    title: 'التاريخ للصف الأول الثانوي',
    price: 70,
    rating: 4.5,
    image: '/images/book7.jpg'
  }
]);

// Methods
const updatePersonalInfo = () => {
  // Update user profile with form data
  Object.assign(userProfile, formData);

  // API call would go here
  alert('تم تحديث المعلومات الشخصية بنجاح');
};

const updatePassword = () => {
  // Validate passwords
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('كلمة المرور الجديدة وتأكيدها غير متطابقين');
    return;
  }

  // API call would go here
  alert('تم تغيير كلمة المرور بنجاح');

  // Reset form
  passwordForm.currentPassword = '';
  passwordForm.newPassword = '';
  passwordForm.confirmPassword = '';
};

const logout = () => {
  // Add your logout logic here
  // For example: auth.logout()

  // Navigate to home page
  navigateTo('/');
};

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