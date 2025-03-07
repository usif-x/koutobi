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
        <!-- Signup Form Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-indigo-900 font-arabic mb-2">
              إنشاء حساب جديد
            </h1>
            <p class="text-gray-600 font-arabic">
              انضم إلينا واستمتع بتجربة تسوق مميزة
            </p>
          </div>

          <form @submit.prevent="handleSignup" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <KInput
                  v-model="form.firstName"
                  label="الاسم الأول"
                  icon="ph:user-duotone"
                  :error="errors.firstName"
                  required
              />
              <KInput
                  v-model="form.lastName"
                  label="الاسم الأخير"
                  icon="ph:user-duotone"
                  :error="errors.lastName"
                  required
              />
            </div>

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
                v-model="form.phone"
                label="رقم الهاتف"
                type="tel"
                icon="ph:phone-duotone"
                placeholder="01xxxxxxxx"
                :error="errors.phone"
                required
            />

            <KInput
                v-model="form.password"
                label="كلمة المرور"
                type="password"
                icon="ph:lock-duotone"
                placeholder="********"
                :error="errors.password"
                helper="يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل"
                required
            />

            <KInput
                v-model="form.passwordConfirmation"
                label="تأكيد كلمة المرور"
                type="password"
                icon="ph:lock-duotone"
                placeholder="********"
                :error="errors.passwordConfirmation"
                required
            />

            <div class="flex items-center space-x-2 space-x-reverse">
              <input
                  type="checkbox"
                  v-model="form.terms"
                  id="terms"
                  class="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label for="terms" class="text-sm text-gray-600 font-arabic">
                أوافق على
                <NuxtLink to="/terms" class="text-indigo-600 hover:text-indigo-500">
                  الشروط والأحكام
                </NuxtLink>
                و
                <NuxtLink to="/privacy-policy" class="text-indigo-600 hover:text-indigo-500">
                  سياسة الخصوصية
                </NuxtLink>
              </label>
            </div>

            <button
                type="submit"
                :disabled="loading || !form.terms"
                class="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-arabic transform transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">إنشاء الحساب</span>
              <span v-else class="flex items-center justify-center">
                <Icon icon="ph:spinner-bold" class="animate-spin ml-2" />
                جاري التحميل...
              </span>
            </button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-gray-600 font-arabic">
              لديك حساب بالفعل؟
              <NuxtLink to="/login" class="text-indigo-600 hover:text-indigo-500 font-bold mr-1">
                تسجيل الدخول
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import KInput from '~/components/ui/KInput.vue'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/vue'

const router = useRouter()
const { login } = useAuth() // used for auto-login after registration
const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  terms: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: ''
})

// Validation functions adjusted for consistency
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone) => {
  const phoneRegex = /^01[0-9]{9}$/
  return phoneRegex.test(phone)
}

const validatePassword = (password) => {
  return password.length >= 8
}

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach(key => errors[key] = '')

  if (!form.firstName.trim()) {
    errors.firstName = 'الاسم الأول مطلوب'
    isValid = false
  }
  if (!form.lastName.trim()) {
    errors.lastName = 'الاسم الأخير مطلوب'
    isValid = false
  }
  if (!form.email) {
    errors.email = 'البريد الإلكتروني مطلوب'
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح'
    isValid = false
  }
  if (!form.phone) {
    errors.phone = 'رقم الهاتف مطلوب'
    isValid = false
  } else if (!validatePhone(form.phone)) {
    errors.phone = 'يجب أن يبدأ رقم الهاتف بـ 01 ويتكون من 11 رقمًا'
    isValid = false
  }
  if (!form.password) {
    errors.password = 'كلمة المرور مطلوبة'
    isValid = false
  } else if (!validatePassword(form.password)) {
    errors.password = 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل'
    isValid = false
  }
  if (!form.passwordConfirmation) {
    errors.passwordConfirmation = 'تأكيد كلمة المرور مطلوب'
    isValid = false
  } else if (form.password !== form.passwordConfirmation) {
    errors.passwordConfirmation = 'كلمة المرور غير متطابقة'
    isValid = false
  }
  return isValid
}

const handleSignup = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        primaryPhone: form.phone,
        password: form.password,
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Registration failed')
    }

    const success = await login({
      identifier: form.email,
      password: form.password,
    })

    if (success) {
      await Swal.fire({
        title: 'تم إنشاء الحساب بنجاح',
        text: 'مرحباً بك في كُتُبي، استمتع بتجربة تسوق مميزة',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        allowOutsideClick: false,
      })
      await router.push('/')
    } else {
      throw new Error('Auto-login failed')
    }
  } catch (error) {
    console.error('Signup error:', error)
    if (error.message === 'User already exists') {
      errors.email = 'البريد الإلكتروني مستخدم بالفعل'
    } else {
      errors.email = 'حدث خطأ أثناء إنشاء الحساب'
    }
  } finally {
    loading.value = false
  }
}

const validateField = (field) => {
  switch (field) {
    case 'email':
      errors.email = form.email && !validateEmail(form.email)
          ? 'البريد الإلكتروني غير صحيح'
          : ''
      break
    case 'phone':
      errors.phone = form.phone && !validatePhone(form.phone)
          ? 'يجب أن يبدأ رقم الهاتف بـ 01 ويتكون من 11 رقمًا'
          : ''
      break
    case 'password':
      errors.password = form.password && !validatePassword(form.password)
          ? 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل'
          : ''
      break
    case 'passwordConfirmation':
      errors.passwordConfirmation = form.passwordConfirmation && form.password !== form.passwordConfirmation
          ? 'كلمة المرور غير متطابقة'
          : ''
      break
  }
}

watch(() => form.email, () => validateField('email'))
watch(() => form.phone, () => validateField('phone'))
watch(() => form.password, () => validateField('password'))
watch(() => form.passwordConfirmation, () => validateField('passwordConfirmation'))

useHead({
  title: 'كُتُبي - إنشاء حساب جديد',
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

.form-enter-active,
.form-leave-active {
  transition: opacity 0.3s ease;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.5s ease-in-out;
}
</style>