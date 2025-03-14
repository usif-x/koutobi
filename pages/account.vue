<template>
  <section class="min-h-screen bg-transparent py-12 px-4 md:px-6 lg:px-8 rtl">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Account Status Header -->
        <div class="text-center mb-8">
          <div class="mb-4">
            <Icon
                :icon="statusIcon"
                :class="statusIconClass"
                class="text-5xl"
            />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">حالة الحساب</h1>
          <p class="text-gray-600">{{ statusMessage }}</p>
        </div>

        <!-- Account Details -->
        <div class="space-y-6">
          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span class="text-gray-600">الاسم</span>
            <span class="font-semibold">{{ user?.firstName }} {{ user?.lastName }}</span>
          </div>

          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span class="text-gray-600">البريد الإلكتروني</span>
            <span class="font-semibold">{{ user?.email }}</span>
          </div>

          <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span class="text-gray-600">تاريخ إنشاء الحساب</span>
            <span class="font-semibold">{{ formatDate(user?.createdAt) }}</span>
          </div>

          <div class="flex justify-between items-center p-4 rounded-lg" :class="statusBgClass">
            <span class="text-gray-600">حالة الحساب</span>
            <span class="font-semibold" :class="statusTextClass">{{ getStatusText }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 text-center">
          <button
              @click="handleLogout"
              class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth()
const router = useRouter()

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Computed properties for status
const getStatusText = computed(() => {
  const statusMap = {
    pending: 'قيد المراجعة',
    active: 'نشط',
    blocked: 'محظور'
  }
  return statusMap[user.value?.status] || 'غير معروف'
})

const statusMessage = computed(() => {
  const messageMap = {
    pending: 'حسابك قيد المراجعة من قبل الإدارة. سيتم إخطارك عند تفعيل حسابك.',
    blocked: 'تم حظر حسابك. يرجى التواصل مع الإدارة للمزيد من المعلومات.',
    active: 'حسابك نشط ويمكنك استخدام جميع خدمات الموقع.'
  }
  return messageMap[user.value?.status] || 'حالة الحساب غير معروفة'
})

const statusIcon = computed(() => {
  const iconMap = {
    pending: 'ph:clock-countdown-duotone',
    active: 'ph:check-circle-duotone',
    blocked: 'ph:prohibit-duotone'
  }
  return iconMap[user.value?.status] || 'ph:question-duotone'
})

const statusIconClass = computed(() => {
  const classMap = {
    pending: 'text-amber-500',
    active: 'text-green-500',
    blocked: 'text-red-500'
  }
  return classMap[user.value?.status] || 'text-gray-500'
})

const statusBgClass = computed(() => {
  const classMap = {
    pending: 'bg-amber-50',
    active: 'bg-green-50',
    blocked: 'bg-red-50'
  }
  return classMap[user.value?.status] || 'bg-gray-50'
})

const statusTextClass = computed(() => {
  const classMap = {
    pending: 'text-amber-700',
    active: 'text-green-700',
    blocked: 'text-red-700'
  }
  return classMap[user.value?.status] || 'text-gray-700'
})

// Logout handler
const handleLogout = async () => {
  await logout()
  router.push('/login')
}

// Page meta
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'كُتُبي - حالة الحساب'
})
</script>