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
      <!-- Breadcrumb navigation -->
      <nav class="mb-6">
        <ol class="flex items-center text-sm text-gray-600 flex-wrap">
          <li class="flex items-center">
            <NuxtLink to="/" class="hover:text-indigo-700 transition-colors font-arabic">الرئيسية</NuxtLink>
            <Icon icon="ph:caret-left" class="mx-2" />
          </li>
          <li class="flex items-center">
            <NuxtLink to="/books" class="hover:text-indigo-700 transition-colors font-arabic">الكتب</NuxtLink>
            <Icon icon="ph:caret-left" class="mx-2" />
          </li>
          <li class="flex items-center">
            <NuxtLink :to="`/books?grade=${book.gradeId}`" class="hover:text-indigo-700 transition-colors font-arabic">
              {{ getGradeName(book.gradeId) }}
            </NuxtLink>
            <Icon icon="ph:caret-left" class="mx-2" />
          </li>
          <li>
            <span class="font-medium text-indigo-700 font-arabic line-clamp-1">{{ book.title }}</span>
          </li>
        </ol>
      </nav>
      
      <!-- Product detail card -->
      <div class="bg-white rounded-2xl shadow-md overflow-hidden">
        <div class="flex flex-col lg:flex-row">
          <!-- Book image section -->
          <div class="w-full lg:w-2/5 xl:w-1/3 p-6 border-b lg:border-b-0 lg:border-l border-gray-100">
            <div class="sticky top-6">
              <!-- Main image -->
              <div class="relative group mb-4">
                <div class="aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                  <img 
                    :src="book.image" 
                    :alt="book.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <!-- Badges -->
                <div class="absolute top-3 right-3 flex flex-col gap-2">
                  <span v-if="book.isNew" class="bg-amber-500 text-white text-xs py-1 px-3 rounded-full font-arabic">جديد</span>
                  <span v-if="book.discount" class="bg-red-500 text-white text-xs py-1 px-3 rounded-full font-arabic">خصم {{ book.discount }}%</span>
                </div>
                
                <!-- Image zoom overlay -->
                <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                  <button class="p-3 bg-white/90 rounded-full text-indigo-600 hover:bg-white transition-colors">
                    <Icon icon="ph:magnifying-glass-plus" class="text-xl" />
                  </button>
                </div>
              </div>
              
              <!-- Thumbnail images -->
              <div class="flex gap-2 justify-center mt-4">
                <button 
                  v-for="i in 4" 
                  :key="i" 
                  :class="[
                    'w-16 h-20 rounded-lg overflow-hidden border-2 transition-all',
                    i === 1 ? 'border-indigo-500 shadow-md' : 'border-transparent hover:border-indigo-300'
                  ]"
                >
                  <img 
                    :src="book.image" 
                    :alt="`${book.title} - صورة ${i}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>
              
              <!-- Share buttons -->
              <div class="flex items-center justify-center gap-3 mt-6">
                <span class="text-gray-700 font-arabic">مشاركة:</span>
                <button class="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  <Icon icon="ph:facebook-logo" />
                </button>
                <button class="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                  <Icon icon="ph:twitter-logo" />
                </button>
                <button class="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                  <Icon icon="ph:whatsapp-logo" />
                </button>
                <button class="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                  <Icon icon="ph:link-simple" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Book details section -->
          <div class="w-full lg:w-3/5 xl:w-2/3 p-6">
            <!-- Book info -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-indigo-100 text-indigo-700 text-sm py-1 px-3 rounded-full font-arabic">{{ getSubjectName(book.subjectId) }}</span>
                <span class="bg-amber-100 text-amber-700 text-sm py-1 px-3 rounded-full font-arabic">{{ getGradeName(book.gradeId) }}</span>
              </div>
              
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-arabic">{{ book.title }}</h1>
              
              <div class="flex items-center gap-4 text-sm mb-4">
                <div class="flex items-center text-amber-500">
                  <div class="flex">
                    <Icon v-for="i in 5" :key="i" :icon="i <= Math.floor(book.rating) ? 'ph:star-fill' : (i - Math.floor(book.rating) < 1 ? 'ph:star-half-fill' : 'ph:star')" />
                  </div>
                  <span class="mr-1 text-gray-700">({{ book.rating }})</span>
                </div>
                
                <div class="flex items-center gap-1 text-gray-600">
                  <Icon icon="ph:eye" />
                  <span>{{ book.views }} مشاهدة</span>
                </div>
                
                <div class="flex items-center gap-1 text-gray-600">
                  <Icon icon="ph:shopping-cart-simple" />
                  <span>{{ Math.floor(book.views / 5) }} مبيعة</span>
                </div>
              </div>
              
              <p class="text-gray-700 leading-relaxed mb-6 font-arabic">{{ book.description }}</p>
              
              <!-- Price and stock -->
              <div class="flex items-center gap-3 mb-6">
                <div class="flex items-end gap-2">
                  <span v-if="book.originalPrice && book.originalPrice > book.price" class="text-gray-400 line-through font-arabic">{{ book.originalPrice }} ج.م</span>
                  <span class="text-3xl font-bold text-indigo-900 font-arabic">{{ book.price }} ج.م</span>
                </div>
                
                <div v-if="book.discount" class="bg-red-100 text-red-700 text-sm font-bold py-1 px-3 rounded-full font-arabic">
                  خصم {{ book.discount }}%
                </div>
              </div>
              
              <div class="flex items-center gap-2 text-sm text-gray-700 mb-6">
                <Icon icon="ph:check-circle-fill" class="text-green-500" />
                <span class="font-arabic">متوفر في المخزن</span>
                <span class="text-green-600 font-arabic mr-1">{{ Math.floor(Math.random() * 50) + 10 }} قطعة</span>
              </div>
              
              <!-- Features list -->
              <div class="space-y-2 mb-8">
                <div class="flex items-start gap-2">
                  <Icon icon="ph:check" class="text-indigo-600 mt-1" />
                  <span class="font-arabic">ورق فاخر عالي الجودة</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon icon="ph:check" class="text-indigo-600 mt-1" />
                  <span class="font-arabic">طباعة ملونة واضحة وجذابة</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon icon="ph:check" class="text-indigo-600 mt-1" />
                  <span class="font-arabic">شرح مبسط ومفصل</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon icon="ph:check" class="text-indigo-600 mt-1" />
                  <span class="font-arabic">تدريبات وأسئلة متنوعة على كل درس</span>
                </div>
                <div class="flex items-start gap-2">
                  <Icon icon="ph:check" class="text-indigo-600 mt-1" />
                  <span class="font-arabic">غلاف سميك مقوى</span>
                </div>
              </div>
              
              <!-- Add to cart section -->
              <div class="border-t border-b border-gray-100 py-6 mb-6">
                <div class="flex flex-col sm:flex-row items-center gap-4">
                  <!-- Quantity selector -->
                  <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      @click="quantity > 1 ? quantity-- : null"
                      class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Icon icon="ph:minus" />
                    </button>
                    <input 
                      v-model="quantity"
                      type="number"
                      min="1"
                      class="w-14 h-10 border-0 text-center focus:ring-0 focus:outline-none"
                    />
                    <button 
                      @click="quantity++"
                      class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Icon icon="ph:plus" />
                    </button>
                  </div>
                  
                  <!-- Add to cart button -->
                  <button class="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg font-arabic flex items-center justify-center gap-2">
                    <Icon icon="ph:shopping-cart-simple" />
                    إضافة إلى السلة
                  </button>
                  
                  <!-- Wishlist button -->
                  <button class="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-indigo-600 rounded-lg transition-colors flex items-center justify-center">
                    <Icon icon="ph:heart" class="text-xl" />
                  </button>
                </div>
              </div>
              
              <!-- Delivery info -->
              <div class="flex flex-col sm:flex-row gap-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Icon icon="ph:truck-duotone" class="text-xl" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 font-arabic">توصيل سريع</h4>
                    <p class="text-sm text-gray-600 font-arabic">توصيل إلى جميع المحافظات</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Icon icon="ph:currency-circle-dollar-duotone" class="text-xl" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 font-arabic">الدفع عند الاستلام</h4>
                    <p class="text-sm text-gray-600 font-arabic">أو الدفع عبر بطاقة الائتمان</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Tabs section -->
            <div class="mt-12">
              <div class="border-b border-gray-200">
                <nav class="flex overflow-x-auto hide-scrollbar gap-8">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                      'font-medium pb-4 px-1 whitespace-nowrap transition-colors font-arabic',
                      activeTab === tab.id 
                        ? 'text-indigo-600 border-b-2 border-indigo-600' 
                        : 'text-gray-500 hover:text-gray-900'
                    ]"
                  >
                    {{ tab.name }}
                  </button>
                </nav>
              </div>
              
              <!-- Tab content -->
              <div class="py-6">
                <!-- Details tab -->
                <div v-if="activeTab === 'details'" class="space-y-6">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3 font-arabic">تفاصيل الكتاب</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">عدد الصفحات</span>
                        <span class="font-medium text-gray-900 font-arabic">{{ Math.floor(Math.random() * 200) + 100 }} صفحة</span>
                      </div>
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">المؤلف</span>
                        <span class="font-medium text-gray-900 font-arabic">أ. محمد أحمد</span>
                      </div>
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">تاريخ النشر</span>
                        <span class="font-medium text-gray-900 font-arabic">2024</span>
                      </div>
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">المرحلة</span>
                        <span class="font-medium text-gray-900 font-arabic">{{ getGradeName(book.gradeId) }}</span>
                      </div>
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">المادة</span>
                        <span class="font-medium text-gray-900 font-arabic">{{ getSubjectName(book.subjectId) }}</span>
                      </div>
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">اللغة</span>
                        <span class="font-medium text-gray-900 font-arabic">العربية</span>
                      </div>
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">الغلاف</span>
                        <span class="font-medium text-gray-900 font-arabic">غلاف كرتوني</span>
                      </div>
                      <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600 font-arabic">الوزن</span>
                        <span class="font-medium text-gray-900 font-arabic">{{ Math.floor(Math.random() * 500) + 300 }} جرام</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3 font-arabic">محتويات الكتاب</h3>
                    <div class="space-y-3 text-gray-700 font-arabic">
                      <p>يحتوي الكتاب على شرح مفصل للمنهج مقسم إلى وحدات متكاملة:</p>
                      <ul class="list-disc list-inside space-y-2 pr-4">
                        <li>الوحدة الأولى: مقدمة عامة وأساسيات المادة</li>
                        <li>الوحدة الثانية: الدروس الأساسية بشرح مفصل</li>
                        <li>الوحدة الثالثة: تدريبات متنوعة على كل درس</li>
                        <li>الوحدة الرابعة: نماذج امتحانات سابقة محلولة</li>
                        <li>الوحدة الخامسة: أسئلة امتحانات متوقعة</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <!-- Reviews tab -->
                <div v-if="activeTab === 'reviews'" class="space-y-8">
                  <!-- Reviews summary -->
                  <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/3 flex flex-col items-center text-center p-6 bg-indigo-50 rounded-xl">
                      <h3 class="text-4xl font-bold text-indigo-900">{{ book.rating }}</h3>
                      <div class="flex text-amber-500 my-2">
                        <Icon v-for="i in 5" :key="i" :icon="i <= Math.floor(book.rating) ? 'ph:star-fill' : (i - Math.floor(book.rating) < 1 ? 'ph:star-half-fill' : 'ph:star')" />
                      </div>
                      <p class="text-gray-600 font-arabic">{{ Math.floor(Math.random() * 100) + 20 }} تقييم</p>
                    </div>
                    
                    <div class="w-full md:w-2/3">
                      <h3 class="text-lg font-semibold text-gray-900 mb-4 font-arabic">توزيع التقييمات</h3>
                      <div class="space-y-3">
                        <div v-for="i in 5" :key="i" class="flex items-center gap-3">
                          <div class="flex items-center gap-1 w-20">
                            <span class="text-sm text-gray-700">{{ 6 - i }}</span>
                            <Icon icon="ph:star-fill" class="text-amber-500 text-sm" />
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              class="bg-amber-500 h-2.5 rounded-full" 
                              :style="`width: ${i === 1 ? 75 : i === 2 ? 20 : i === 3 ? 3 : i === 4 ? 1 : 1}%`"
                            ></div>
                          </div>
                          <span class="text-sm text-gray-600 w-12 text-left">{{ i === 1 ? 75 : i === 2 ? 20 : i === 3 ? 3 : i === 4 ? 1 : 1 }}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Review form -->
                  <div class="border border-gray-200 rounded-xl p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 font-arabic">أضف تقييمك</h3>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-gray-700 mb-2 font-arabic">تقييمك</label>
                        <div class="flex gap-1 text-gray-400">
                          <button 
                            v-for="i in 5" 
                            :key="i"
                            @mouseover="hoverRating = i" 
                            @mouseleave="hoverRating = 0"
                            @click="userRating = i"
                            class="text-2xl transition-colors"
                            :class="i <= (hoverRating || userRating) ? 'text-amber-500' : ''"
                          >
                            <Icon icon="ph:star-fill" />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label class="block text-gray-700 mb-2 font-arabic">تعليقك</label>
                        <textarea 
                          rows="4" 
                          class="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-arabic"
                          placeholder="اكتب رأيك في الكتاب..."
                        ></textarea>
                      </div>
                      
                      <div class="flex justify-end">
                        <button class="py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg font-arabic">
                          إرسال التقييم
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- User reviews -->
                  <div class="space-y-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 font-arabic">آراء المستخدمين</h3>
                    
                    <div v-for="i in 3" :key="i" class="border-b border-gray-100 pb-6 last:border-0">
                      <div class="flex justify-between items-start">
                        <div class="flex gap-3">
                          <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <Icon icon="ph:user" />
                          </div>
                          <div>
                            <h4 class="font-medium text-gray-900 font-arabic">{{ ['أحمد محمود', 'سارة علي', 'محمد خالد'][i-1] }}</h4>
                            <div class="flex items-center gap-2 mt-1">
                              <div class="flex text-amber-500">
                                <Icon v-for="star in 5" :key="star" :icon="star <= [5, 4, 5][i-1] ? 'ph:star-fill' : 'ph:star'" />
                              </div>
                              <span class="text-sm text-gray-500">{{ ['منذ 3 أيام', 'منذ أسبوع', 'منذ شهر'][i-1] }}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button class="text-gray-400 hover:text-gray-700">
                          <Icon icon="ph:dots-three-outline" />
                        </button>
                      </div>
                      
                      <div class="mt-3 text-gray-700 font-arabic pr-12">
                        <p>{{ [
                          'كتاب ممتاز جدًا وشرح مفصل للمنهج بطريقة مبسطة. التدريبات متنوعة وتساعد على فهم المادة بشكل أعمق. أنصح به بشدة.',
                          'الكتاب جيد ويحتوي على معلومات مفيدة، لكن كنت أتمنى المزيد من الأمثلة التوضيحية. بشكل عام هو يستحق الشراء.',
                          'من أفضل الكتب التي اشتريتها لأولادي. الشرح واضح والأمثلة كثيرة ومتنوعة. الطباعة ممتازة والورق عالي الجودة.'
                        ][i-1] }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- FAQ tab -->
                <div v-if="activeTab === 'faq'" class="space-y-6">
                  <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-100 pb-4 last:border-0">
                    <button 
                      @click="faq.open = !faq.open"
                      class="flex justify-between items-center w-full py-3 text-right"
                    >
                      <h3 class="font-medium text-gray-900 font-arabic">{{ faq.question }}</h3>
                      <Icon 
                        :icon="faq.open ? 'ph:minus-circle' : 'ph:plus-circle'" 
                        class="text-indigo-600 transition-transform" 
                        :class="faq.open ? 'transform rotate-180' : ''"
                      />
                    </button>
                    <div v-if="faq.open" class="mt-2 text-gray-700 font-arabic pr-6">
                      <p>{{ faq.answer }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related books section -->
      <div class="mt-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-900 font-arabic">كتب ذات صلة</h2>
          <NuxtLink to="/books" class="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 font-arabic">
            عرض الكل
            <Icon icon="ph:arrow-left" />
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="relatedBook in relatedBooks" 
            :key="relatedBook.id"
            class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group"
          >
            <!-- Book image -->
            <div class="relative overflow-hidden h-48">
              <img 
                :src="relatedBook.image" 
                :alt="relatedBook.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              
              <!-- Quick action buttons (appear on hover) -->
              <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <!-- Continue from the quick action buttons -->
                <button class="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors">
                  <Icon icon="ph:shopping-cart-simple" class="text-lg" />
                </button>
                <button class="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors">
                  <Icon icon="ph:heart" class="text-lg" />
                </button>
                <button class="p-2 bg-white rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors">
                  <Icon icon="ph:eye" class="text-lg" />
                </button>
              </div>
            </div>

            <!-- Book details -->
            <div class="p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-arabic">
                  {{ getSubjectName(relatedBook.subjectId) }}
                </span>
                <span class="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-arabic">
                  {{ getGradeName(relatedBook.gradeId) }}
                </span>
              </div>

              <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 font-arabic">
                {{ relatedBook.title }}
              </h3>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <span class="text-lg font-bold text-indigo-600 font-arabic">{{ relatedBook.price }}</span>
                  <span class="text-sm text-gray-600 font-arabic">ج.م</span>
                </div>

                <div class="flex items-center text-amber-500">
                  <Icon icon="ph:star-fill" />
                  <span class="text-sm text-gray-600 mr-1">{{ relatedBook.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute();
const quantity = ref(1);
const userRating = ref(0);
const hoverRating = ref(0);

// Tabs configuration
const tabs = [
  { id: 'details', name: 'التفاصيل' },
  { id: 'reviews', name: 'التقييمات' },
  { id: 'faq', name: 'الأسئلة الشائعة' }
];
const activeTab = ref('details');

// FAQ data
const faqs = ref([
  {
    question: 'هل الكتاب متوافق مع المنهج الحديث؟',
    answer: 'نعم، الكتاب متوافق تماماً مع أحدث تعديلات المنهج الدراسي.',
    open: true
  },
  {
    question: 'هل يمكن إرجاع الكتاب؟',
    answer: 'نعم، يمكن إرجاع الكتاب خلال 14 يوم من تاريخ الاستلام إذا كان بحالته الأصلية.',
    open: false
  },
  {
    question: 'كم تستغرق عملية التوصيل؟',
    answer: 'يتم التوصيل خلال 2-4 أيام عمل داخل المدن الرئيسية.',
    open: false
  }
]);

// Mock data (replace with actual API calls)
const book = ref({
  id: route.params.id,
  title: 'الرياضيات للصف الأول الثانوي - الفصل الدراسي الأول',
  image: '/images/books/Book.png',
  price: 120,
  originalPrice: 150,
  discount: 20,
  rating: 4.5,
  views: 1250,
  description: 'كتاب شامل يغطي منهج الرياضيات بأسلوب مبسط وسهل الفهم...',
  isNew: true,
  gradeId: 1,
  subjectId: 1
});

const relatedBooks = ref([
  // Add 4 related books with similar structure to book
]);

// Utility functions
const getGradeName = (id) => {
  const grades = {
    1: 'الصف الأول الثانوي',
    2: 'الصف الثاني الثانوي',
    3: 'الصف الثالث الثانوي'
  };
  return grades[id] || '';
};

const getSubjectName = (id) => {
  const subjects = {
    1: 'رياضيات',
    2: 'فيزياء',
    3: 'كيمياء',
    4: 'أحياء'
  };
  return subjects[id] || '';
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out 2s infinite;
}

.animate-float-slow {
  animation: float 8s ease-in-out 1s infinite;
}
</style>