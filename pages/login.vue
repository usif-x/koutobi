<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 md:px-6 lg:px-8 rtl overflow-hidden">
    <!-- Background elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>

    <div class="container mx-auto z-10 relative">
      <div class="max-w-md mx-auto">
        <!-- Login Form Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-indigo-900 font-arabic mb-2">
              تسجيل الدخول
            </h1>
            <p class="text-gray-600 font-arabic">
              مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <KInput
                v-model="form.email"
                label="البريد الإلكتروني"
                type="email"
                icon="ph:envelope-duotone"
                placeholder="example@domain.com"
                :error="errors.email"
                required
            />

            <KInput
                v-model="form.password"
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
                class="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-arabic transform transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">تسجيل الدخول</span>
              <span v-else class="flex items-center justify-center">
                <Icon icon="ph:spinner-bold" class="animate-spin ml-2" />
                جاري التحميل...
              </span>
            </button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-gray-600 font-arabic">
              ليس لديك حساب؟
              <NuxtLink to="/signup" class="text-indigo-600 hover:text-indigo-500 font-bold mr-1">
                إنشاء حساب جديد
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import KInput from '~/components/ui/KInput.vue'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/vue'

const router = useRouter()
const { login, user } = useAuth()
const loading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleLogin = async () => {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'البريد الإلكتروني مطلوب'
    return
  }
  if (!validateEmail(form.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح'
    return
  }
  if (!form.password) {
    errors.password = 'كلمة المرور مطلوبة'
    return
  }

  loading.value = true
  try {
    const success = await login({
      identifier: form.email,
      password: form.password,
    })
    if (success && user.value) {
      // Check user status and redirect accordingly
      if (user.value.status === 'pending' || user.value.status === 'blocked') {
        await router.push('/account')
      } else if (user.value.status === 'active') {
        await Swal.fire({
          title: 'تم تسجيل الدخول بنجاح',
          text: 'مرحباً بك مجدداً في كُتُبي',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          allowOutsideClick: false,
        })
        await router.push('/')
      }
    } else {
      errors.password = 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    }
  } catch (error) {
    console.error('Login error:', error)
    errors.password = 'حدث خطأ أثناء تسجيل الدخول'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'كُتُبي - تسجيل الدخول',
})

definePageMeta({
  middleware: ['auth']
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