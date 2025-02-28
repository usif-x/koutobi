<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 md:px-6 lg:px-8 rtl">
    <!-- Abstract background shapes -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>
    
    <!-- Main content container -->
    <div class="container mx-auto z-10 py-12">
      <!-- Page header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-indigo-900 font-arabic mb-4">منتجاتنا</h1>
        <div class="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 mx-auto rounded-full"></div>
        <p class="text-gray-700 mt-4 max-w-2xl mx-auto font-arabic">اكتشف مجموعتنا الواسعة من الكتب والمذكرات الدراسية للمراحل الإعدادية والثانوية</p>
      </div>
      
      <!-- Filter and products grid section -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filter sidebar -->
        <div class="w-full lg:w-1/4">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 class="text-xl font-bold text-indigo-900 font-arabic mb-6 flex items-center gap-2">
              <Icon icon="ph:funnel-bold" class="text-amber-500" />
              تصفية النتائج
            </h2>
            
            <!-- Search input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2 font-arabic">ابحث عن كتاب</label>
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-arabic"
                  placeholder="اكتب اسم الكتاب..."
                />
                <Icon icon="ph:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <!-- Grade filter -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 font-arabic mb-3">المرحلة الدراسية</h3>
              <div class="space-y-2">
                <label v-for="grade in grades" :key="grade.id" class="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    :value="grade.id" 
                    v-model="selectedGrades"
                    class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span class="text-gray-700 group-hover:text-indigo-700 transition-colors font-arabic">{{ grade.name }}</span>
                </label>
              </div>
            </div>
            
            <!-- Subject filter -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 font-arabic mb-3">المادة الدراسية</h3>
              <div class="space-y-2">
                <label v-for="subject in subjects" :key="subject.id" class="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    :value="subject.id" 
                    v-model="selectedSubjects"
                    class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span class="text-gray-700 group-hover:text-indigo-700 transition-colors font-arabic">{{ subject.name }}</span>
                </label>
              </div>
            </div>
            
            <!-- Price range filter -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 font-arabic mb-3">السعر</h3>
              <div class="flex items-center gap-3">
                <input 
                  v-model="priceRange[0]" 
                  type="range" 
                  min="0" 
                  max="500" 
                  step="10"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <div class="flex justify-between mt-2">
                <span class="text-sm text-gray-600 font-arabic">{{ priceRange[0] }} ج.م</span>
                <span class="text-sm text-gray-600 font-arabic">500 ج.م</span>
              </div>
            </div>
            
            <!-- Reset filters button -->
            <button 
              @click="resetFilters"
              class="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-arabic flex items-center justify-center gap-2"
            >
              <Icon icon="ph:arrows-counter-clockwise" />
              إعادة ضبط الفلاتر
            </button>
          </div>
        </div>
        
        <!-- Products grid -->
        <div class="w-full lg:w-3/4">
          <!-- Sorting and view options -->
          <div class="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-3">
              <span class="text-gray-700 text-sm font-arabic">{{ filteredBooks.length }} كتاب</span>
              <div class="h-4 w-px bg-gray-300"></div>
              <div class="relative">
                <select 
                  v-model="sortBy" 
                  class="appearance-none bg-transparent pr-8 py-1 text-sm text-gray-700 focus:outline-none font-arabic"
                >
                  <option value="default">الترتيب الافتراضي</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="newest">الأحدث</option>
                </select>
                <Icon icon="ph:caret-down" class="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <button 
                @click="viewType = 'grid'"
                :class="['p-2 rounded-md transition-colors', viewType === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100']"
              >
                <Icon icon="ph:grid-four" />
              </button>
              <button 
                @click="viewType = 'list'"
                :class="['p-2 rounded-md transition-colors', viewType === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100']"
              >
                <Icon icon="ph:list-bullets" />
              </button>
            </div>
          </div>
          
          <!-- No results message -->
          <div v-if="filteredBooks.length === 0" class="bg-white rounded-xl shadow-md p-8 text-center">
            <Icon icon="ph:book-open-duotone" class="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-800 font-arabic mb-2">لم يتم العثور على نتائج</h3>
            <p class="text-gray-600 font-arabic mb-4">لم نتمكن من العثور على كتب تطابق معايير البحث الخاصة بك</p>
            <button 
              @click="resetFilters"
              class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-arabic inline-flex items-center gap-2"
            >
              <Icon icon="ph:arrows-counter-clockwise" />
              إعادة ضبط الفلاتر
            </button>
          </div>
          
          <!-- Grid view -->
          <div 
            v-else-if="viewType === 'grid'"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div 
              v-for="book in filteredBooks" 
              :key="book.id"
              class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group"
            >
              <!-- Book image -->
              <div class="relative overflow-hidden h-48">
                <img 
                  :src="book.image" 
                  :alt="book.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                
                <!-- Quick action buttons (appear on hover) -->
                <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button class="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors shadow-md">
                    <Icon icon="ph:eye" class="text-lg" />
                  </button>
                  <button class="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors shadow-md">
                    <Icon icon="ph:shopping-cart-simple" class="text-lg" />
                  </button>
                  <button class="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors shadow-md">
                    <Icon icon="ph:heart" class="text-lg" />
                  </button>
                </div>
                
                <!-- Badges -->
                <div class="absolute top-2 right-2 flex flex-col gap-2">
                  <span v-if="book.isNew" class="bg-amber-500 text-white text-xs py-1 px-2 rounded font-arabic">جديد</span>
                  <span v-if="book.discount" class="bg-red-500 text-white text-xs py-1 px-2 rounded font-arabic">خصم {{ book.discount }}%</span>
                </div>
              </div>
              
              <!-- Book details -->
              <div class="p-4">
                <div class="flex items-center gap-1 mb-1">
                  <span class="text-amber-500 text-sm font-arabic">{{ getGradeName(book.gradeId) }}</span>
                  <span class="text-gray-400">•</span>
                  <span class="text-indigo-600 text-sm font-arabic">{{ getSubjectName(book.subjectId) }}</span>
                </div>
                
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-700 transition-colors font-arabic">{{ book.title }}</h3>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1">
                    <span v-if="book.originalPrice && book.originalPrice > book.price" class="text-sm text-gray-400 line-through font-arabic">{{ book.originalPrice }} ج.م</span>
                    <span class="text-lg font-bold text-indigo-900 font-arabic">{{ book.price }} ج.م</span>
                  </div>
                  
                  <div class="flex items-center gap-1 text-amber-500">
                    <Icon icon="ph:star-fill" class="text-sm" />
                    <span class="text-sm font-medium">{{ book.rating }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Action button -->
              <div class="border-t border-gray-100 p-3">
                <button class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-arabic flex items-center justify-center gap-2">
                  <Icon icon="ph:shopping-cart-simple" />
                  أضف إلى السلة
                </button>
              </div>
            </div>
          </div>
          
          <!-- List view -->
          <div v-else class="space-y-4">
            <div 
              v-for="book in filteredBooks" 
              :key="book.id"
              class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group flex flex-col sm:flex-row"
            >
              <!-- Book image -->
              <div class="relative overflow-hidden h-48 sm:h-auto sm:w-1/4">
                <img 
                  :src="book.image" 
                  :alt="book.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                
                <!-- Quick action buttons (appear on hover) -->
                <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button class="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors shadow-md">
                    <Icon icon="ph:eye" class="text-lg" />
                  </button>
                </div>
                
                <!-- Badges -->
                <div class="absolute top-2 right-2 flex flex-col gap-2">
                  <span v-if="book.isNew" class="bg-amber-500 text-white text-xs py-1 px-2 rounded font-arabic">جديد</span>
                  <span v-if="book.discount" class="bg-red-500 text-white text-xs py-1 px-2 rounded font-arabic">خصم {{ book.discount }}%</span>
                </div>
              </div>
              
              <!-- Book details -->
              <div class="p-4 sm:w-3/4 flex flex-col">
                <div class="flex items-center gap-1 mb-1">
                  <span class="text-amber-500 text-sm font-arabic">{{ getGradeName(book.gradeId) }}</span>
                  <span class="text-gray-400">•</span>
                  <span class="text-indigo-600 text-sm font-arabic">{{ getSubjectName(book.subjectId) }}</span>
                </div>
                
                <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors font-arabic">{{ book.title }}</h3>
                
                <p class="text-gray-600 text-sm mb-4 line-clamp-2 font-arabic">{{ book.description }}</p>
                
                <div class="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1 text-amber-500">
                      <Icon icon="ph:star-fill" class="text-sm" />
                      <span class="text-sm font-medium">{{ book.rating }}</span>
                    </div>
                    <span class="text-gray-400">|</span>
                    <div class="flex items-center gap-1 text-gray-600">
                      <Icon icon="ph:eye" class="text-sm" />
                      <span class="text-sm">{{ book.views }}</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-1">
                      <span v-if="book.originalPrice && book.originalPrice > book.price" class="text-sm text-gray-400 line-through font-arabic">{{ book.originalPrice }} ج.م</span>
                      <span class="text-lg font-bold text-indigo-900 font-arabic">{{ book.price }} ج.م</span>
                    </div>
                    
                    <button class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-arabic flex items-center gap-2">
                      <Icon icon="ph:shopping-cart-simple" />
                      أضف إلى السلة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="flex justify-center mt-8">
            <div class="flex items-center gap-2">
              <button class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Icon icon="ph:caret-left" />
              </button>
              
              <button 
                v-for="page in 5" 
                :key="page"
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-sm',
                  page === 1 
                    ? 'bg-indigo-600 text-white' 
                    : 'border border-gray-300 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300'
                ]"
              >
                {{ page }}
              </button>
              
              <button class="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-colors">
                <Icon icon="ph:caret-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import Iconify component
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';

// Page meta
useHead({
  title: 'كُتُبي - معرض الكتب',
  meta: [
    { name: 'description', content: 'تصفح مجموعتنا الواسعة من الكتب والمذكرات الدراسية للمراحل الإعدادية والثانوية' }
  ],
});

// Filter state
const searchQuery = ref('');
const selectedGrades = ref([]);
const selectedSubjects = ref([]);
const priceRange = ref([0]);
const sortBy = ref('default');
const viewType = ref('grid');

// Filter options data
const grades = [
  { id: 1, name: 'الصف الأول الإعدادي' },
  { id: 2, name: 'الصف الثاني الإعدادي' },
  { id: 3, name: 'الصف الثالث الإعدادي' },
  { id: 4, name: 'الصف الأول الثانوي' },
  { id: 5, name: 'الصف الثاني الثانوي' },
  { id: 6, name: 'الصف الثالث الثانوي' },
];

const subjects = [
  { id: 1, name: 'اللغة العربية' },
  { id: 2, name: 'اللغة الإنجليزية' },
  { id: 3, name: 'الرياضيات' },
  { id: 4, name: 'العلوم' },
  { id: 5, name: 'الفيزياء' },
  { id: 6, name: 'الكيمياء' },
  { id: 7, name: 'الأحياء' },
  { id: 8, name: 'الدراسات الاجتماعية' },
];

// Helper functions
const getGradeName = (id) => {
  const grade = grades.find(g => g.id === id);
  return grade ? grade.name : '';
};

const getSubjectName = (id) => {
  const subject = subjects.find(s => s.id === id);
  return subject ? subject.name : '';
};

// Reset all filters
const resetFilters = () => {
  searchQuery.value = '';
  selectedGrades.value = [];
  selectedSubjects.value = [];
  priceRange.value = [0];
  sortBy.value = 'default';
};

// Sample books data
const books = [
  {
    id: 1,
    title: 'كتاب اللغة العربية للصف الأول الإعدادي - الفصل الدراسي الأول',
    gradeId: 1,
    subjectId: 1,
    price: 85,
    originalPrice: 100,
    discount: 15,
    rating: 4.8,
    isNew: true,
    views: 1240,
    image: '/images/books/Book.png',
    description: 'كتاب شامل لمادة اللغة العربية للصف الأول الإعدادي يحتوي على شرح مفصل للمنهج وتدريبات متنوعة لمساعدة الطلاب على الفهم والتطبيق.'
  },
  {
    id: 2,
    title: 'مذكرة الرياضيات للصف الثالث الإعدادي',
    gradeId: 3,
    subjectId: 3,
    price: 90,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    isNew: false,
    views: 985,
    image: '/images/books/Book.png',
    description: 'مذكرة متميزة في مادة الرياضيات للصف الثالث الإعدادي تحتوي على شرح مبسط للمفاهيم الأساسية وحل نماذج امتحانات.'
  },
  {
    id: 3,
    title: 'كتاب الفيزياء للصف الأول الثانوي - الترم الثاني',
    gradeId: 4,
    subjectId: 5,
    price: 120,
    originalPrice: 150,
    discount: 20,
    rating: 4.9,
    isNew: true,
    views: 1560,
    image: '/images/books/Book.png',
    description: 'كتاب شامل يغطي منهج الفيزياء للصف الأول الثانوي مع شرح مفصل للقوانين والنظريات وتطبيقات عملية وحلول لجميع التمارين.'
  },
  {
    id: 4,
    title: 'مذكرة اللغة الإنجليزية للصف الثاني الإعدادي',
    gradeId: 2,
    subjectId: 2,
    price: 75,
    originalPrice: null,
    discount: null,
    rating: 4.3,
    isNew: false,
    views: 780,
    image: '/images/books/Book.png',
    description: 'مذكرة شاملة تغطي منهج اللغة الإنجليزية للصف الثاني الإعدادي بطريقة مبسطة مع تدريبات متنوعة وشرح للقواعد.'
  },
  {
    id: 5,
    title: 'كتاب الكيمياء للصف الثاني الثانوي',
    gradeId: 5,
    subjectId: 6,
    price: 130,
    originalPrice: 160,
    discount: 18,
    rating: 4.7,
    isNew: true,
    views: 1320,
    image: '/images/books/Book.png',
    description: 'كتاب متميز يشرح منهج الكيمياء للصف الثاني الثانوي بأسلوب مبسط مع أمثلة توضيحية وتجارب عملية وحلول للمسائل.'
  },
  {
    id: 6,
    title: 'مذكرة الدراسات الاجتماعية للصف الثالث الإعدادي',
    gradeId: 3,
    subjectId: 8,
    price: 70,
    originalPrice: 85,
    discount: 17,
    rating: 4.4,
    isNew: false,
    views: 650,
    image: '/images/books/Book.png',
    description: 'مذكرة شاملة لمادة الدراسات الاجتماعية للصف الثالث الإعدادي تتضمن خرائط وأنشطة وأسئلة متنوعة على المنهج.'
  }
];

// Filtered and sorted books
const filteredBooks = computed(() => {
  let result = [...books];
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(book => 
      book.title.toLowerCase().includes(query) || 
      getSubjectName(book.subjectId).toLowerCase().includes(query)
    );
  }
  
  // Apply grade filter
  if (selectedGrades.value.length > 0) {
    result = result.filter(book => selectedGrades.value.includes(book.gradeId));
  }
  
  // Apply subject filter
  if (selectedSubjects.value.length > 0) {
    result = result.filter(book => selectedSubjects.value.includes(book.subjectId));
  }
  
  // Apply price filter
  if (priceRange.value[0] > 0) {
    result = result.filter(book => book.price >= priceRange.value[0]);
  }
  
  // Apply sorting
  if (sortBy.value === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === 'newest') {
    result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }
  
  return result;
});
</script>

<style>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 8s ease-in-out infinite 1s;
}

.animate-float-slow {
  animation: float 10s ease-in-out infinite 2s;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.rtl {
  direction: rtl;
}
</style>