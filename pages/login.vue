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
            <h1 class="text-3xl font-bold text-indigo-900 font-arabic mb-2">تسجيل الدخول</h1>
            <p class="text-gray-600 font-arabic">مرحباً بعودتك! يرجى تسجيل الدخول للمتابعة</p>
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

            <div class="flex items-center justify-between mb-6">
              <NuxtLink 
                to="/forgot-password"
                class="text-sm text-indigo-600 hover:text-indigo-500 font-arabic"
              >
                نسيت كلمة المرور؟
              </NuxtLink>

              <label class="flex items-center space-x-2 space-x-reverse">
                <input 
                  type="checkbox" 
                  v-model="form.remember"
                  class="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span class="text-sm text-gray-600 font-arabic">تذكرني</span>
              </label>
            </div>

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

          <div class="mt-8 text-center">
            <p class="text-gray-600 font-arabic">
              ليس لديك حساب؟
              <NuxtLink 
                to="/signup"
                class="text-indigo-600 hover:text-indigo-500 font-bold mr-1"
              >
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
import { ref, reactive } from 'vue';
import { Icon } from '@iconify/vue';
import KInput from '~/components/ui/KInput.vue';

const loading = ref(false);
const form = reactive({
  email: '',
  password: '',
  remember: false
});

const errors = reactive({
  email: '',
  password: ''
});

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleLogin = async () => {
  // Reset errors
  errors.email = '';
  errors.password = '';

  // Validation
  if (!form.email) {
    errors.email = 'البريد الإلكتروني مطلوب';
    return;
  }
  if (!validateEmail(form.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح';
    return;
  }
  if (!form.password) {
    errors.password = 'كلمة المرور مطلوبة';
    return;
  }

  loading.value = true;

  try {
    // Add your login logic here
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    console.log('Login submitted:', form);
    
    // Navigate to home page after successful login
    navigateTo('/');
  } catch (error) {
    console.error('Login error:', error);
    errors.password = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
  } finally {
    loading.value = false;
  }
};
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