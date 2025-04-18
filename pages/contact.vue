<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-8 px-4 md:px-6 lg:px-8 rtl">
    <!-- Abstract background shapes -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-[-9999]">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>
    

    
    <!-- Main content container -->
    <div class="container mx-auto z-10 py-8 md:py-0">
      <div class="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
        <!-- Contact Form Section (right side in RTL) -->
        <div class="w-full md:w-1/2 text-right space-y-6">
          <div class="relative inline-block">
             <span class="absolute -top-6 -right-6 w-20 h-20 bg-amber-300 rounded-full opacity-20 blur-xl 
                       group-hover:w-24 group-hover:h-24 transition-all duration-500"></span>
            <h1 class="relative text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 font-arabic">
             
اتصل بنا
            </h1>
            <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mr-1 ml-auto rounded-full mt-3 
                      transform origin-right transition-all duration-300 group-hover:scale-x-110"></div>
          </div>
          
          <p class="text-lg text-gray-700 leading-relaxed font-arabic">
            نحن هنا لمساعدتك! يمكنك التواصل معنا في أي وقت وسنقوم بالرد عليك في أقرب وقت ممكن.
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <KInput
        v-model="form.senderName"
        label="الاسم الكامل"
        icon="ph:user-duotone"
        :error="errors.senderName"
        required
      />

      <KInput
  v-model="form.senderPhone"
  label="رقم الهاتف"
  type="tel"
  icon="ph:phone-duotone"
  placeholder="01xxxxxxxxx"
  :error="errors.senderPhone"
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
  helper="سيتم استخدامه للتواصل معك"
  required
/>

    <KInput
      v-model="form.subject"
      label="الموضوع"
      icon="ph:chat-text-duotone"
      :error="errors.subject"
      required
    />

    <div class="relative">
  <label class="block text-right mb-2 text-sm text-gray-700 font-arabic">
    الرسالة
    <span class="text-red-500 mr-1">*</span>
  </label>
  <div class="relative group">
    <textarea
      v-model="form.message"
      rows="5"
      class="w-full px-4 py-3 rounded-lg font-arabic text-right transition-all duration-300
             border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
             bg-white/80 backdrop-blur-sm resize-none"
      :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.message }"
      required
    ></textarea>
    <span class="absolute inset-0 rounded-lg bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></span>
  </div>
  <p v-if="errors.message" class="mt-1 text-sm text-red-600 text-right font-arabic">{{ errors.message }}</p>
</div>

            <ButtonUi label="إرسال الرسالة" icon="ph:paper-plane-right-bold" type="submit" :loading="loading" />

          </form>
        </div>

        <!-- Contact Information Section (left side in RTL) -->
        <div class="w-full md:w-1/2 space-y-6">
          <!-- Contact Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Phone Card -->
            <div class="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg 
                        transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div class="flex items-center space-x-4 space-x-reverse">
                <div class="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors">
                  <Icon icon="ph:phone-duotone" class="text-2xl text-indigo-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-indigo-900 font-arabic mb-1">اتصل بنا</h3>
                  <p class="text-gray-600 font-arabic" dir="ltr">+201</p>
                </div>
              </div>
            </div>

            <!-- Email Card -->
            <div class="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg 
                        transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div class="flex items-center space-x-4 space-x-reverse">
                <div class="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-200 transition-colors">
                  <Icon icon="ph:envelope-duotone" class="text-2xl text-indigo-600" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-indigo-900 font-arabic mb-1">راسلنا</h3>
                  <p class="text-gray-600">contact@kotoubi.shop</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Working Hours -->
          <div class="bg-indigo-600/95 backdrop-blur-sm rounded-2xl p-6 text-white shadow-xl">
            <h3 class="text-xl font-semibold font-arabic mb-4 flex items-center gap-2">
              <Icon icon="ph:clock-duotone" class="text-2xl" />
              ساعات العمل
            </h3>
            <div class="space-y-2 font-arabic">
              <div class="flex justify-between items-center">
                <span>الأحد - الخميس</span>
                <span class="text-indigo-200">9:00 ص - 9:00 م</span>
              </div>
              <div class="flex justify-between items-center">
                <span>الجمعة</span>
                <span class="text-indigo-200">4:00 م - 10:00 م</span>
              </div>
              <div class="flex justify-between items-center">
                <span>السبت</span>
                <span class="text-indigo-200">2:00 م - 10:00 م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Icon } from '@iconify/vue';
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import KInput from '~/components/ui/KInput.vue'; 
import ButtonUi from '~/components/ui/ButtonUi.vue';

const loading = ref(false);
const form = reactive({
  senderName: '',
  senderPhone: '',
  email: '',
  subject: '',
  message: ''
});

const errors = reactive({
  senderName: '',
  senderPhone: '',
  email: '',
  subject: '',
  message: ''
});

useHead({
  title: 'اتصل بنا - كُتُبي',
  meta: [
    { name: 'description', content: 'تواصل معنا - كُتُبي متجر الكتب العربية' }
  ]
});

const validatePhone = (phone) => {
  const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
  return egyptianPhoneRegex.test(phone);
};
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach(key => errors[key] = '');

  if (!form.senderName.trim()) {
    errors.senderName = 'الاسم الكامل مطلوب';
    toast.error('الرجاء إدخال الاسم الكامل');
    isValid = false;
  }

  if (!form.senderPhone) {
  errors.senderPhone = 'رقم الهاتف مطلوب';
  toast.error('الرجاء إدخال رقم الهاتف');
  isValid = false;
} else if (!validatePhone(form.senderPhone)) {
  errors.senderPhone = 'رقم الهاتف غير صحيح';
  toast.error('يجب إدخال رقم هاتف مصري صحيح يبدأ بـ 010 أو 011 أو 012 أو 015');
  isValid = false;
}

  if (!form.email) {
    errors.email = 'البريد الإلكتروني مطلوب';
    toast.error('الرجاء إدخال البريد الإلكتروني');
    isValid = false;
  } else if (!validateEmail(form.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح';
    toast.error('البريد الإلكتروني غير صحيح');
    isValid = false;
  }

  if (!form.subject.trim()) {
    errors.subject = 'الموضوع مطلوب';
    toast.error('الرجاء إدخال الموضوع');
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = 'الرسالة مطلوبة';
    toast.error('الرجاء إدخال الرسالة');
    isValid = false;
  } else if (form.message.trim().length < 10) {
    errors.message = 'الرسالة يجب أن تحتوي على 10 أحرف على الأقل';
    toast.error('الرسالة قصيرة جداً');
    isValid = false;
  }

  return isValid;
};
const handleSubmit = async () => {
  try {
    if (!validateForm()) return;
    
    loading.value = true;
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.senderName,
        phone: form.senderPhone,
        email: form.email,
        subject: form.subject,
        message: form.message
      })
    });

    const data = await response.json();

    if (data.success) {
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      Object.keys(form).forEach(key => form[key] = '');
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Submit error:', error);
    toast.error(error.message || 'حدث خطأ أثناء إرسال الرسالة');
  } finally {
    loading.value = false;
  }
};
useHead({
  title: 'اتصل بنا - كُتُبي',
})
</script>

<style scoped>
</style>