// pages/logout.vue
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useAlerts } from '~/composables/useAlerts'

const router = useRouter()
const { logout } = useAuth()
const { confirmAlert, successToast, errorToast } = useAlerts()

onMounted(async () => {
  const confirmed = await confirmAlert(
      'تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج من حسابك؟'
  )

  if (confirmed) {
    try {
      await logout()
      successToast('تم تسجيل الخروج بنجاح')
      await router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      errorToast('حدث خطأ أثناء تسجيل الخروج')
      await router.push('/')
    }
  } else {
    await router.push('/')
  }
})

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-transparent">
    <div class="text-center">
      <Icon
          icon="ph:spinner-bold"
          class="animate-spin text-4xl text-indigo-600 mb-4"
      />
      <p class="text-gray-600 font-arabic">جاري تسجيل الخروج...</p>
    </div>
  </div>
</template>