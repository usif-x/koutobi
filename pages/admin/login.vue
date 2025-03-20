<template>
  <section class="relative min-h-screen bg-transparent py-12 px-4 md:px-6 lg:px-8 rtl overflow-hidden">
    <!-- Background elements -->
    <div class="bsolute top-0 left-0 w-full h-full overflow-hidden z-[-9999]">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <div class="container mx-auto z-10 relative">
      <div class="max-w-md mx-auto">
        <!-- Login Form Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-indigo-900 font-arabic mb-2">لوحة المشرف</h1>
            <p class="text-gray-600 font-arabic">يرجى تسجيل الدخول للوصول إلى لوحة التحكم</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <KInput
                v-model="email"
                label="البريد الإلكتروني"
                type="email"
                icon="ph:envelope-duotone"
                placeholder="admin@example.com"
                :error="errors.email"
                required
            />

            <KInput
                v-model="password"
                label="كلمة المرور"
                type="password"
                icon="ph:lock-duotone"
                placeholder="********"
                :error="errors.password"
                required
            />

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-arabic
                     transform transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02]
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">تسجيل الدخول</span>
              <span v-else class="flex items-center justify-center">
                <Icon icon="ph:spinner-bold" class="animate-spin ml-2" />
                جاري التحميل...
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useAlerts } from '~/composables/useAlerts'
import KInput from '~/components/ui/KInput.vue'
import Swal from 'sweetalert2'

const router = useRouter()
const { errorAlert } = useAlerts()
const loading = ref(false)
const email = ref('')
const password = ref('')

const errors = reactive({
  email: '',
  password: ''
})

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = async () => {
  errors.email = ''
  errors.password = ''

  if (!email.value) {
    errors.email = 'البريد الإلكتروني مطلوب'
    return
  }
  if (!validateEmail(email.value)) {
    errors.email = 'البريد الإلكتروني غير صحيح'
    return
  }
  if (!password.value) {
    errors.password = 'كلمة المرور مطلوبة'
    return
  }

  loading.value = true

  try {
    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'فشل تسجيل الدخول')
    }

    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)

    await Swal.fire({
      title: 'تم تسجيل الدخول بنجاح',
      text: 'مرحباً بك في لوحة التحكم',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
      allowOutsideClick: false
    })

    router.push('/admin/dashboard')
  } catch (error) {
    errorAlert('خطأ', error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    router.push('/admin/dashboard')
  }
})

useHead({
  title: 'كُتُبي - لوحة المشرف',
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, 15px); }
}

@keyframes float-delay {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -10px); }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 18s ease-in-out infinite;
}
</style>