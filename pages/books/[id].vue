<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 md:px-6 lg:px-8 rtl">
    <!-- Abstract background shapes -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
    </div>
    
    <!-- Loading state -->
    <div v-if="loading" class="container mx-auto z-10 py-12 flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600 font-arabic">جاري تحميل بيانات الكتاب...</p>
      </div>
    </div>
    
    <!-- Main content container -->
    <div v-else-if="book" class="container mx-auto z-10 py-12">
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
            <NuxtLink :to="`/search?categories=${book.category}`" class="hover:text-indigo-700 transition-colors font-arabic">
              {{ getCategoryName(book.category) }}
            </NuxtLink>
            <Icon icon="ph:caret-left" class="mx-2" />
          </li>
          <li>
            <span class="font-medium text-indigo-700 font-arabic line-clamp-1">{{ book.name }}</span>
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
                <div class="aspect-[3/4] overflow-hidden rounded-xl shadow-lg bg-gray-100 flex items-center justify-center">
                  <img 
                    v-if="book.images && book.images.length > 0" 
                    :src="book.images[0]" 
                    :alt="book.name"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Icon 
                    v-else 
                    icon="ph:book-duotone" 
                    class="text-6xl text-indigo-200"
                  />
                </div>
                
                <!-- Badges -->
                <div class="absolute top-3 right-3 flex flex-col gap-2">
                  <span v-if="book.hasDiscount && book.discountPercentage > 0" class="bg-red-500 text-white text-xs py-1 px-3 rounded-full font-arabic">
                    خصم {{ book.discountPercentage }}%
                  </span>
                </div>
                
                <!-- Image zoom overlay -->
                <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                  <button class="p-3 bg-white/90 rounded-full text-indigo-600 hover:bg-white transition-colors">
                    <Icon icon="ph:magnifying-glass-plus" class="text-xl" />
                  </button>
                </div>
              </div>
              
              <!-- Thumbnail images -->
              <div v-if="book.images && book.images.length > 1" class="flex gap-2 justify-center mt-4">
                <button 
                  v-for="(image, index) in book.images.slice(0, 4)" 
                  :key="index" 
                  :class="[
                    'w-16 h-20 rounded-lg overflow-hidden border-2 transition-all',
                    index === 0 ? 'border-indigo-500 shadow-md' : 'border-transparent hover:border-indigo-300'
                  ]"
                >
                  <img 
                    :src="image" 
                    :alt="`${book.name} - صورة ${index + 1}`"
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
                <span class="bg-indigo-100 text-indigo-700 text-sm py-1 px-3 rounded-full font-arabic">
                  {{ getCategoryName(book.category) }}
                </span>
                <span class="bg-amber-100 text-amber-700 text-sm py-1 px-3 rounded-full font-arabic">
                  {{ getBookTypeName(book.bookType) }}
                </span>
              </div>
              
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-arabic">{{ book.name }}</h1>
              
              <div class="flex items-center gap-4 text-sm mb-4">
                <div v-if="book.ratingCount > 0" class="flex items-center text-amber-500">
                  <div class="flex">
                    <Icon v-for="i in 5" :key="i" :icon="i <= Math.floor(book.ratingAverage) ? 'ph:star-fill' : (i - Math.floor(book.ratingAverage) < 1 ? 'ph:star-half-fill' : 'ph:star')" />
                  </div>
                  <span class="mr-1 text-gray-700">({{ book.ratingAverage }})</span>
                  <span class="text-gray-600">{{ book.ratingCount }} تقييم</span>
                </div>
                
                <div class="flex items-center gap-1 text-gray-600">
                  <Icon icon="ph:user-bold" />
                  <span>{{ book.author }}</span>
                </div>
              </div>
              
              <p class="text-gray-700 leading-relaxed mb-6 font-arabic">{{ book.description || 'لا يوجد وصف متاح لهذا الكتاب.' }}</p>
              
              <!-- Price and stock -->
              <div class="flex items-center gap-3 mb-6">
                <div class="flex items-end gap-2">
                  <span v-if="book.hasDiscount && book.discountPercentage > 0" class="text-gray-400 line-through font-arabic">{{ formatPrice(book.price) }}</span>
                  <span class="text-3xl font-bold text-indigo-900 font-arabic">{{ formatPrice(getDiscountedPrice) }}</span>
                </div>
                
                <div v-if="book.hasDiscount && book.discountPercentage > 0" class="bg-red-100 text-red-700 text-sm font-bold py-1 px-3 rounded-full font-arabic">
                  خصم {{ book.discountPercentage }}%
                </div>
              </div>
              
              <div class="flex items-center gap-2 text-sm text-gray-700 mb-6">
                <Icon :icon="book.stockCount > 0 ? 'ph:check-circle-fill' : 'ph:x-circle-fill'" :class="book.stockCount > 0 ? 'text-green-500' : 'text-red-500'" />
                <span class="font-arabic">
                  {{ book.stockCount > 0 ? 'متوفر في المخزن' : 'غير متوفر حالياً' }}
                </span>
                <span v-if="book.stockCount > 0" class="text-green-600 font-arabic mr-1">{{ book.stockCount }} قطعة</span>
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
                  <span class="font-arabic">{{ getBookTypeName(book.bookType) }}</span>
                </div>
              </div>
              
              <!-- Add to cart section -->
              <div class="border-t border-b border-gray-100 py-6 mb-6">
                <div class="flex flex-col sm:flex-row items-center gap-4">
                  <!-- Quantity selector - FIXED -->
                  <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      :disabled="book.stockCount <= 0 || quantity <= 1"
                      @click="decrementQuantity"
                    >
                      <Icon icon="ph:minus" />
                    </button>
                    <input 
                      v-model.number="quantity"
                      type="number"
                      min="1"
                      :max="book.stockCount"
                      class="w-14 h-10 border-0 text-center focus:ring-0 focus:outline-none"
                      :disabled="book.stockCount <= 0"
                    />
                    <button 
                      class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                      :disabled="book.stockCount <= 0 || quantity >= book.stockCount"
                      @click="incrementQuantity"
                    >
                      <Icon icon="ph:plus" />
                    </button>
                  </div>
                  
                  <!-- Add to cart button -->
                  <button 
                    class="flex-1 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg font-arabic flex items-center justify-center gap-2"
                    :disabled="book.stockCount <= 0"
                    :class="{ 'opacity-50 cursor-not-allowed': book.stockCount <= 0 }"
                    @click="addToCart"
                  >
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

<!-- Tabs section - FIXED -->
<div class="mt-12">
  <div class="border-b border-gray-200">
    <nav class="flex overflow-x-auto hide-scrollbar gap-8">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="setActiveTab(tab.id)"
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center gap-2 py-2 border-b border-gray-100">
            <span class="text-gray-600 font-arabic">المؤلف:</span>
            <span class="text-gray-900 font-arabic">{{ book.author }}</span>
          </div>
          <div class="flex items-center gap-2 py-2 border-b border-gray-100">
            <span class="text-gray-600 font-arabic">التصنيف:</span>
            <span class="text-gray-900 font-arabic">{{ getCategoryName(book.category) }}</span>
          </div>
          <div class="flex items-center gap-2 py-2 border-b border-gray-100">
            <span class="text-gray-600 font-arabic">نوع الكتاب:</span>
            <span class="text-gray-900 font-arabic">{{ getBookTypeName(book.bookType) }}</span>
          </div>
          <div class="flex items-center gap-2 py-2 border-b border-gray-100">
            <span class="text-gray-600 font-arabic">تاريخ النشر:</span>
            <span class="text-gray-900 font-arabic">{{ new Date(book.createdAt).toLocaleDateString('ar-EG') }}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3 font-arabic">وصف الكتاب</h3>
        <p class="text-gray-700 leading-relaxed font-arabic">{{ book.description || 'لا يوجد وصف متاح لهذا الكتاب.' }}</p>
      </div>
    </div>
    
    <!-- Reviews tab -->
    <div v-if="activeTab === 'reviews'" class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3 font-arabic">التقييمات والمراجعات</h3>
        
        <!-- Rating summary -->
        <div class="flex flex-col md:flex-row gap-6 mb-8">
          <div class="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg">
            <div class="text-4xl font-bold text-indigo-900 mb-1">{{ book.ratingAverage || 0 }}</div>
            <div class="flex text-amber-500 mb-2">
              <Icon v-for="i in 5" :key="i" :icon="i <= Math.floor(book.ratingAverage || 0) ? 'ph:star-fill' : (i - Math.floor(book.ratingAverage || 0) < 1 ? 'ph:star-half-fill' : 'ph:star')" />
            </div>
            <div class="text-sm text-gray-600 font-arabic">{{ book.ratingCount || 0 }} تقييم</div>
          </div>
          
          <div class="flex-1">
            <div v-if="book.ratingCount > 0" class="space-y-2">
              <!-- Rating bars would go here in a real implementation -->
              <div v-for="i in 5" :key="i" class="flex items-center gap-2">
                <span class="text-sm text-gray-600 w-6">{{ 6-i }}</span>
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-400 rounded-full" :style="`width: ${Math.random() * 100}%`"></div>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-600 font-arabic">
              لا توجد تقييمات بعد. كن أول من يقيم هذا الكتاب!
            </div>
          </div>
        </div>
        
        <!-- Add review -->
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 class="font-semibold text-gray-900 mb-3 font-arabic">أضف تقييمك</h4>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-gray-600 font-arabic">تقييمك:</span>
            <div class="flex">
              <button 
                v-for="i in 5" 
                :key="i"
                @click="userRating = i"
                @mouseenter="hoverRating = i"
                @mouseleave="hoverRating = 0"
                class="text-2xl"
              >
                <Icon 
                  :icon="(hoverRating || userRating) >= i ? 'ph:star-fill' : 'ph:star'" 
                  :class="(hoverRating || userRating) >= i ? 'text-amber-500' : 'text-gray-300'"
                />
              </button>
            </div>
          </div>
          <textarea 
            placeholder="اكتب مراجعتك هنا..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3 font-arabic"
            rows="3"
          ></textarea>
          <button 
            @click="submitReview"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-arabic"
          >
            إرسال التقييم
          </button>
        </div>
        
        <!-- Reviews list -->
        <div v-if="book.reviews && book.reviews.length > 0" class="space-y-4">
          <div v-for="(review, index) in book.reviews" :key="index" class="bg-white p-4 rounded-lg border border-gray-100">
            <div class="flex justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Icon icon="ph:user" />
                </div>
                <span class="font-medium text-gray-900 font-arabic">{{ review.userName || 'مستخدم' }}</span>
              </div>
              <div class="text-sm text-gray-500 font-arabic">
                {{ new Date(review.createdAt).toLocaleDateString('ar-EG') }}
              </div>
            </div>
            <div class="flex text-amber-500 mb-2">
              <Icon v-for="i in 5" :key="i" :icon="i <= review.rating ? 'ph:star-fill' : 'ph:star'" />
            </div>
            <p class="text-gray-700 font-arabic">{{ review.comment }}</p>
          </div>
        </div>
        
        <div v-else class="bg-gray-50 p-6 rounded-lg text-center">
          <Icon icon="ph:chat-centered-text-duotone" class="text-4xl text-indigo-200 mx-auto mb-2" />
          <p class="text-gray-600 font-arabic">لا توجد مراجعات بعد. كن أول من يراجع هذا الكتاب!</p>
        </div>
      </div>
    </div>
    
    <!-- FAQ tab -->
    <div v-if="activeTab === 'faq'" class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3 font-arabic">الأسئلة الشائعة</h3>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
            <button 
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-4 text-right bg-white hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-900 font-arabic">{{ faq.question }}</span>
              <Icon :icon="faq.open ? 'ph:caret-up-bold' : 'ph:caret-down-bold'" class="text-indigo-600" />
            </button>
            <div v-if="faq.open" class="p-4 bg-gray-50 border-t border-gray-200">
              <p class="text-gray-700 font-arabic">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>

<!-- Related books section -->
<div v-if="relatedBooks.length > 0" class="mt-16">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-gray-900 font-arabic">كتب ذات صلة</h2>
    <NuxtLink 
      :to="`/search?categories=${book.category}`" 
      class="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 font-arabic"
    >
      عرض المزيد
      <Icon icon="ph:arrow-left" />
    </NuxtLink>
  </div>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-for="relatedBook in relatedBooks" :key="relatedBook._id" class="bg-white rounded-2xl shadow-lg overflow-hidden group">
      <!-- Book Image -->
      <div class="relative h-48 bg-gray-100">
        <img 
          v-if="relatedBook.images && relatedBook.images.length > 0" 
          :src="relatedBook.images[0]" 
          :alt="relatedBook.name" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div v-else class="w-full h-full flex items-center justify-center text-indigo-200">
          <Icon icon="ph:book-duotone" class="text-6xl" />
        </div>
        
        <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <div class="flex gap-2">
            <NuxtLink :to="`/books/${relatedBook._id}`" class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
              <Icon icon="ph:eye-bold" />
            </NuxtLink>
            <button class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
              <Icon icon="ph:shopping-cart-simple-bold" />
            </button>
          </div>
        </div>
        
        <!-- Discount Badge -->
        <div v-if="relatedBook.hasDiscount && relatedBook.discountPercentage > 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {{ relatedBook.discountPercentage }}% خصم
        </div>
      </div>

      <div class="p-4">
        <h3 class="font-semibold text-indigo-900 font-arabic mb-2 line-clamp-1">{{ relatedBook.name }}</h3>
        <p class="text-gray-600 text-sm mb-2 font-arabic line-clamp-1">{{ relatedBook.author }}</p>
        <div class="flex justify-between items-center">
          <div>
            <span v-if="relatedBook.hasDiscount" class="font-bold text-indigo-900 font-arabic">
              {{ formatPrice(relatedBook.price * (1 - relatedBook.discountPercentage / 100)) }}
              <span class="text-gray-400 text-sm line-through mr-1">{{ formatPrice(relatedBook.price) }}</span>
            </span>
            <span v-else class="font-bold text-indigo-900 font-arabic">{{ formatPrice(relatedBook.price) }}</span>
          </div>
          <div v-if="relatedBook.ratingCount > 0" class="flex items-center gap-1">
            <Icon icon="ph:star-fill" class="text-amber-400 text-sm" />
            <span class="text-gray-600 text-sm font-arabic">{{ relatedBook.ratingAverage }}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>

<!-- Book not found -->
<div v-else-if="!loading" class="container mx-auto z-10 py-12 text-center">
  <div class="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
    <Icon icon="ph:book-bookmark-duotone" class="text-6xl text-indigo-200 mx-auto mb-4" />
    <h2 class="text-2xl font-bold text-gray-900 mb-2 font-arabic">الكتاب غير موجود</h2>
    <p class="text-gray-600 mb-6 font-arabic">عذراً، لم نتمكن من العثور على الكتاب الذي تبحث عنه.</p>
    <div class="flex justify-center gap-4">
      <NuxtLink to="/books" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-arabic flex items-center gap-2">
        <Icon icon="ph:books-bold" />
        تصفح الكتب
      </NuxtLink>
      <button 
        @click="router.go(-1)" 
        class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-arabic flex items-center gap-2"
      >
        <Icon icon="ph:arrow-left-bold" />
        العودة
      </button>
    </div>
  </div>
</div>
</section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useAlerts } from '~/composables/useAlerts';
import { useCartStore } from '~/stores/cart';

const route = useRoute();
const router = useRouter();
const { errorToast, successToast } = useAlerts();
const cartStore = useCartStore();
const quantity = ref(1);
const userRating = ref(0);
const hoverRating = ref(0);
const loading = ref(true);
const book = ref(null);
const relatedBooks = ref([]);
const reviewText = ref('');

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

// Fetch book data
onMounted(async () => {
  await fetchBookData();
});

const fetchBookData = async () => {
  loading.value = true;
  try {
    const { product } = await $fetch(`/api/product/${route.params.id}`);
    book.value = product;
    
    // Fetch related books (books in the same category)
    if (product.category) {
      fetchRelatedBooks(product.category, product._id);
    }
    
    // Set page title and meta
    useHead({
      title: `${product.name} - كُتُبي`,
      meta: [
        { name: 'description', content: product.description || 'تفاصيل الكتاب في متجر كُتُبي' }
      ]
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    errorToast('فشل في تحميل بيانات الكتاب');
    router.push('/books');
  } finally {
    loading.value = false;
  }
};

// Fetch related books
const fetchRelatedBooks = async (category, currentBookId) => {
  try {
    const response = await $fetch(`/api/product/filter?categories=${category}&limit=4`);
    // Filter out the current book and limit to 4 items
    relatedBooks.value = response.products
      .filter(book => book._id !== currentBookId)
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching related books:', error);
    relatedBooks.value = [];
  }
};

// Get discounted price
const getDiscountedPrice = computed(() => {
  if (!book.value) return 0;
  
  if (book.value.hasDiscount && book.value.discountPercentage > 0) {
    return book.value.price * (1 - book.value.discountPercentage / 100);
  }
  return book.value.price;
});

// Format price
const formatPrice = (price) => {
  return `${price.toFixed(2)} ر.س`;
};

// Get category name in Arabic
const getCategoryName = (category) => {
  const categories = {
    'study': 'كتب دراسية',
    'fiction': 'روايات',
    'children': 'كتب أطفال',
    'religious': 'كتب دينية',
    'self-development': 'تطوير الذات',
    'history': 'كتب تاريخية',
    'science': 'كتب علمية',
    'biography': 'سير ذاتية'
  };
  
  return categories[category] || category;
};

// Get book type name in Arabic
const getBookTypeName = (bookType) => {
  const types = {
    'paper': 'كتاب ورقي',
    'electronic': 'كتاب إلكتروني',
    'audio': 'كتاب صوتي'
  };
  
  return types[bookType] || bookType;
};

// Quantity handlers
const incrementQuantity = () => {
  if (book.value && quantity.value < book.value.stockCount) {
    quantity.value++;
  }
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Add to cart
const addToCart = () => {
  if (!book.value) return;
  
  try {
    cartStore.addToCart({
      id: book.value._id,
      name: book.value.name,
      price: getDiscountedPrice.value,
      originalPrice: book.value.price,
      image: book.value.images && book.value.images.length > 0 ? book.value.images[0] : null,
      quantity: quantity.value
    });
    
    successToast('تمت إضافة الكتاب إلى السلة');
  } catch (error) {
    console.error('Error adding to cart:', error);
    errorToast('فشل في إضافة الكتاب إلى السلة');
  }
};

// Tab handling
const setActiveTab = (tabId) => {
  activeTab.value = tabId;
};

// FAQ toggle
const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};

// Submit review
const submitReview = async () => {
  if (!userRating.value) {
    errorToast('يرجى تحديد تقييم للكتاب');
    return;
  }
  
  try {
    // In a real implementation, you would send this to your API
    // await $fetch(`/api/product/${book.value._id}/review`, {
    //   method: 'POST',
    //   body: {
    //     rating: userRating.value,
    //     comment: reviewText.value
    //   }
    // });
    
    // For now, just show a success message
    successToast('تم إرسال تقييمك بنجاح');
    userRating.value = 0;
    hoverRating.value = 0;
    reviewText.value = '';
    
    // Optionally refresh the book data to show the new review
    // await fetchBookData();
  } catch (error) {
    console.error('Error submitting review:', error);
    errorToast('فشل في إرسال التقييم');
  }
};

// Add to wishlist
const addToWishlist = () => {
  // Implementation would go here
  successToast('تمت إضافة الكتاب إلى المفضلة');
};

// Share functionality
const shareBook = (platform) => {
  const url = window.location.href;
  const title = book.value ? book.value.name : 'كتاب من متجر كُتُبي';
  
  let shareUrl = '';
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
      break;
    case 'copy':
      navigator.clipboard.writeText(url);
      successToast('تم نسخ الرابط');
      return;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank');
  }
};
</script>