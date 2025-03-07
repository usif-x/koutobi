<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <Icon
          icon="ph:spinner-bold"
          class="animate-spin text-4xl text-indigo-600 mb-4"
      />
      <p class="text-gray-600">جاري التحقق من الصلاحيات...</p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAlerts } from '~/composables/useAlerts'

const router = useRouter()
const { errorAlert } = useAlerts()

onMounted(async () => {
  try {
    // Check admin status
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw new Error('يرجى تسجيل الدخول أولاً')
    }

    const response = await fetch('/api/admin/auth/status', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok || !data.isAdmin) {
      throw new Error('غير مصرح لك بالوصول إلى لوحة التحكم')
    }

    // If admin, redirect to dashboard
    router.push('/admin/dashboard')
  } catch (error) {
    errorAlert('خطأ', error.message)
    router.push('/admin/login')
  }
})

definePageMeta({
  layout: false
})

useHead({
  title: 'كُتُبي - التحقق من الصلاحيات'
})
</script>