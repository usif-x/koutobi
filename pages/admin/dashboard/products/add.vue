<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">إضافة كتاب جديد</h1>
      <NuxtLink to="/admin/dashboard/books" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Icon icon="ph:arrow-right-bold" />
        <span>العودة للكتب</span>
      </NuxtLink>
    </div>

    <form @submit.prevent="submitForm" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">المعلومات الأساسية</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">اسم الكتاب*</label>
            <input 
              v-model="form.name" 
              id="name" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.name }"
              placeholder="اسم الكتاب"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>
          
          <div>
            <label for="sku" class="block text-sm font-medium text-gray-700 mb-1">رمز المنتج (SKU)</label>
            <input 
              v-model="form.sku" 
              id="sku" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="رمز المنتج الفريد"
            />
          </div>
        </div>
        
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">وصف الكتاب*</label>
          <textarea 
            v-model="form.description" 
            id="description" 
            rows="4" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :class="{ 'border-red-500': errors.description }"
            placeholder="وصف تفصيلي للكتاب"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>
      </div>
      
      <!-- Categorization -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">التصنيف</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">الفئة*</label>
            <select 
              v-model="form.category" 
              id="category" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.category }"
            >
              <option value="" disabled>اختر الفئة</option>
              <option value="study">كتب دراسية</option>
              <option value="novel">روايات</option>
              <option value="children">كتب أطفال</option>
              <option value="religious">كتب دينية</option>
              <option value="self-development">تنمية ذاتية</option>
              <option value="other">أخرى</option>
            </select>
            <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
          </div>
          
          <div>
            <label for="bookType" class="block text-sm font-medium text-gray-700 mb-1">نوع الكتاب*</label>
            <select 
              v-model="form.bookType" 
              id="bookType" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.bookType }"
            >
              <option value="" disabled>اختر النوع</option>
              <option value="textbook">كتاب مدرسي</option>
              <option value="workbook">كتاب تمارين</option>
              <option value="guide">دليل مرجعي</option>
              <option value="novel">رواية</option>
              <option value="story">قصة</option>
              <option value="other">أخرى</option>
            </select>
            <p v-if="errors.bookType" class="mt-1 text-sm text-red-600">{{ errors.bookType }}</p>
          </div>
          
          <div v-if="form.category === 'study'">
            <label for="year" class="block text-sm font-medium text-gray-700 mb-1">السنة الدراسية*</label>
            <select 
              v-model="form.year" 
              id="year" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.year }"
            >
              <option value="" disabled>اختر السنة</option>
              <option :value="1">الأولى</option>
              <option :value="2">الثانية</option>
              <option :value="3">الثالثة</option>
              <option :value="4">الرابعة</option>
              <option :value="5">الخامسة</option>
              <option :value="6">السادسة</option>
            </select>
            <p v-if="errors.year" class="mt-1 text-sm text-red-600">{{ errors.year }}</p>
          </div>
        </div>
        
        <div>
          <label for="author" class="block text-sm font-medium text-gray-700 mb-1">المؤلف*</label>
          <input 
            v-model="form.author" 
            id="author" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :class="{ 'border-red-500': errors.author }"
            placeholder="اسم المؤلف"
          />
          <p v-if="errors.author" class="mt-1 text-sm text-red-600">{{ errors.author }}</p>
        </div>
      </div>
      
      <!-- Pricing -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">التسعير والمخزون</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">السعر (ج.م)*</label>
            <input 
              v-model.number="form.price" 
              id="price" 
              type="number" 
              min="0" 
              step="0.01" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.price }"
              placeholder="0.00"
            />
            <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
          </div>
          
          <div>
            <label for="discountPercentage" class="block text-sm font-medium text-gray-700 mb-1">نسبة الخصم (%)</label>
            <input 
              v-model.number="form.discountPercentage" 
              id="discountPercentage" 
              type="number" 
              min="0" 
              max="100" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0"
            />
          </div>
          
          <div>
            <label for="stockCount" class="block text-sm font-medium text-gray-700 mb-1">المخزون*</label>
            <input 
              v-model.number="form.stockCount" 
              id="stockCount" 
              type="number" 
              min="0" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.stockCount }"
              placeholder="0"
            />
            <p v-if="errors.stockCount" class="mt-1 text-sm text-red-600">{{ errors.stockCount }}</p>
          </div>
        </div>
      </div>
      
      <!-- Images -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">صور الكتاب</h2>
        
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">صور الكتاب*</label>
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors"
              @dragover.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
              @drop.prevent="handleFileDrop"
              :class="{ 'border-indigo-500 bg-indigo-50': dragover }"
            >
              <input 
                type="file" 
                ref="fileInput" 
                multiple 
                accept="image/*" 
                class="hidden" 
                @change="handleFileUpload"
              />
              <div @click="$refs.fileInput.click()" class="cursor-pointer">
                <Icon icon="ph:upload-simple-bold" class="text-4xl text-gray-400 mx-auto mb-2" />
                <p class="text-sm text-gray-500">اضغط لاختيار الصور أو اسحب الصور هنا</p>
                <p class="text-xs text-gray-400 mt-1">يمكنك اختيار عدة صور (الحد الأقصى: 5 صور)</p>
              </div>
            </div>
            <p v-if="errors.images" class="mt-1 text-sm text-red-600">{{ errors.images }}</p>
          </div>
          
          <!-- Preview Images -->
          <div v-if="imagePreviewUrls.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            <div v-for="(url, index) in imagePreviewUrls" :key="index" class="relative group">
              <img :src="url" class="w-full h-32 object-cover rounded-lg border border-gray-200" />
              <button 
                @click.prevent="removeImage(index)" 
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon icon="ph:x-bold" class="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Additional Information -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">معلومات إضافية</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="publisher" class="block text-sm font-medium text-gray-700 mb-1">الناشر</label>
            <input 
              v-model="form.publisher" 
              id="publisher" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="اسم الناشر"
            />
          </div>
          
          <div>
            <label for="publishDate" class="block text-sm font-medium text-gray-700 mb-1">تاريخ النشر</label>
            <input 
              v-model="form.publishDate" 
              id="publishDate" 
              type="date" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="isbn" class="block text-sm font-medium text-gray-700 mb-1">الرقم الدولي (ISBN)</label>
            <input 
              v-model="form.isbn" 
              id="isbn" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="الرقم الدولي"
            />
          </div>
          
          <div>
            <label for="pageCount" class="block text-sm font-medium text-gray-700 mb-1">عدد الصفحات</label>
            <input 
              v-model.number="form.pageCount" 
              id="pageCount" 
              type="number" 
              min="1" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="عدد صفحات الكتاب"
            />
          </div>
        </div>
        
        <div>
          <label for="language" class="block text-sm font-medium text-gray-700 mb-1">لغة الكتاب</label>
          <select 
            v-model="form.language" 
            id="language" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="arabic">العربية</option>
            <option value="english">الإنجليزية</option>
            <option value="french">الفرنسية</option>
            <option value="other">أخرى</option>
          </select>
        </div>
      </div>
      
      <!-- Status -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 border-b pb-2">الحالة</h2>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">حالة المنتج</label>
          <div class="flex items-center space-x-4 space-x-reverse">
            <div class="flex items-center">
              <input 
                v-model="form.status" 
                id="status-active" 
                type="radio" 
                value="active" 
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label for="status-active" class="mr-2 block text-sm text-gray-700">نشط</label>
            </div>
            <div class="flex items-center">
              <input 
                v-model="form.status" 
                id="status-inactive" 
                type="radio" 
                value="inactive" 
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label for="status-inactive" class="mr-2 block text-sm text-gray-700">غير نشط</label>
            </div>
          </div>
          <p class="mt-1 text-xs text-gray-500">المنتجات النشطة فقط ستظهر في المتجر</p>
        </div>
      </div>
      
      <!-- Submit Button -->
      <div class="pt-4 border-t border-gray-200">
        <button 
          type="submit" 
          class="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          :disabled="loading"
        >
          <Icon v-if="loading" icon="ph:spinner-gap-bold" class="animate-spin" />
          <Icon v-else icon="ph:check-bold" />
          <span>حفظ المنتج</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { useAlerts } from '~/composables/useAlerts';

const router = useRouter();
const { successToast, errorToast } = useAlerts();

// Form state
const form = reactive({
  name: '',
  sku: '',
  description: '',
  category: '',
  bookType: '',
  year: '',
  author: '',
  price: null,
  discountPercentage: 0,
  stockCount: null,
  publisher: '',
  publishDate: '',
  isbn: '',
  pageCount: null,
  language: 'arabic',
  status: 'active',
  images: []
});

// Validation errors
const errors = reactive({});

// File upload state
const fileInput = ref(null);
const dragover = ref(false);
const loading = ref(false);
const imageFiles = ref([]);
const imagePreviewUrls = ref([]);

// Handle file selection from input
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  processFiles(files);
};

// Handle file drop
const handleFileDrop = (event) => {
  dragover.value = false;
  const files = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'));
  processFiles(files);
};

// Process selected files
const processFiles = (files) => {
  // Limit to 5 images total
  const remainingSlots = 5 - imageFiles.value.length;
  const filesToAdd = files.slice(0, remainingSlots);
  
  if (filesToAdd.length === 0) {
    return;
  }
  
  // Add files to our array
  imageFiles.value = [...imageFiles.value, ...filesToAdd];
  
  // Create preview URLs
  filesToAdd.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrls.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
  
  // Clear the file input
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Remove image
const removeImage = (index) => {
  imageFiles.value.splice(index, 1);
  imagePreviewUrls.value.splice(index, 1);
};

// Validate form
const validateForm = () => {
  errors.name = !form.name ? 'اسم الكتاب مطلوب' : '';
  errors.description = !form.description ? 'وصف الكتاب مطلوب' : '';
  errors.category = !form.category ? 'فئة الكتاب مطلوبة' : '';
  errors.bookType = !form.bookType ? 'نوع الكتاب مطلوب' : '';
  errors.author = !form.author ? 'اسم المؤلف مطلوب' : '';
  errors.price = form.price === null || form.price < 0 ? 'السعر مطلوب ويجب أن يكون أكبر من أو يساوي 0' : '';
  errors.stockCount = form.stockCount === null || form.stockCount < 0 ? 'المخزون مطلوب ويجب أن يكون أكبر من أو يساوي 0' : '';
  
  if (form.category === 'study' && !form.year) {
    errors.year = 'السنة الدراسية مطلوبة للكتب الدراسية';
  } else {
    errors.year = '';
  }
  
  if (imageFiles.value.length === 0) {
    errors.images = 'يجب إضافة صورة واحدة على الأقل';
  } else {
    errors.images = '';
  }
  
  // Check if there are any errors
  return !Object.values(errors).some(error => error);
};

// Upload images to server
const uploadImages = async () => {
  const formData = new FormData();
  
  imageFiles.value.forEach(file => {
    formData.append('images', file);
  });
  
  try {
    const response = await fetch('/api/images/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload images');
    }
    
    const data = await response.json();
    return data.imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  try {
    // Upload images first
    const imageUrls = await uploadImages();
    
    // Create product with image URLs
    const productData = { ...form, images: imageUrls };
    
    const response = await fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(productData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    successToast('تم إضافة الكتاب بنجاح');
    router.push('/admin/dashboard/books');
  } catch (error) {
    console.error('Error creating product:', error);
    errorToast('فشل في إضافة الكتاب');
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
});

useHead({
  title: 'كُتُبي - إضافة كتاب جديد'
});
</script>

<style scoped>
/* Drag and drop styling */
.drag-over {
  border-color: #4f46e5;
  background-color: rgba(79, 70, 229, 0.05);
}
</style>