<template>
  <div class="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-indigo-800 py-16">
    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full opacity-10"></div>
      <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-400 rounded-full opacity-10"></div>
    </div>

    <div class="container mx-auto px-4 relative">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 font-arabic">
          {{ title }}
        </h2>
        <p class="text-indigo-200 font-arabic">
          {{ subtitle }}
        </p>
      </div>

      <!-- Slider Container -->
      <div class="relative group">
        <!-- Navigation Buttons -->
        <button 
          @click="prevSlide" 
          class="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                 bg-white/10 backdrop-blur-md text-white rounded-full p-3
                 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100
                 group-hover:translate-x-2"
        >
          <Icon icon="ph:caret-right-bold" class="text-2xl" />
        </button>

        <button 
          @click="nextSlide" 
          class="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                 bg-white/10 backdrop-blur-md text-white rounded-full p-3
                 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100
                 group-hover:-translate-x-2"
        >
          <Icon icon="ph:caret-left-bold" class="text-2xl" />
        </button>

        <!-- Slider -->
        <div 
          class="overflow-hidden"
          @mouseenter="pauseAutoplay"
          @mouseleave="resumeAutoplay"
        >
          <div 
            class="flex transition-transform duration-500 ease-out"
            :style="{ transform: `translateX(${currentTranslate}%)` }"
          >
            <div 
              v-for="book in books" 
              :key="book.id"
              class="min-w-[280px] sm:min-w-[320px] px-4"
            >
              <!-- Book Card -->
              <div 
                class="bg-white/10 backdrop-blur-md rounded-2xl p-4 h-full
                       hover:transform hover:scale-105 transition-all duration-300
                       border border-white/20 group/card"
              >
                <!-- Book Image -->
                <div class="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden">
                  <img 
                    :src="book.image" 
                    :alt="book.title"
                    class="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                </div>

                <!-- Book Info -->
                <div class="space-y-2 text-right">
                  <h3 class="font-bold text-white text-lg font-arabic line-clamp-1">
                    {{ book.title }}
                  </h3>
                  <p class="text-indigo-200 text-sm font-arabic">
                    {{ book.author }}
                  </p>
                  
                  <!-- Rating -->
                  <div class="flex items-center justify-end gap-1">
                    <span class="text-amber-400 text-sm">
                      {{ book.rating }}
                    </span>
                    <div class="flex items-center">
                      <Icon 
                        v-for="i in 5" 
                        :key="i"
                        :icon="i <= Math.floor(book.rating) ? 'ph:star-fill' : 'ph:star'"
                        :class="i <= Math.floor(book.rating) ? 'text-amber-400' : 'text-gray-400'"
                        class="text-sm"
                      />
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="flex items-center justify-between">
                    <button 
                      class="text-xs text-white bg-indigo-600/80 px-3 py-1 rounded-full
                             hover:bg-indigo-600 transition-colors duration-200 font-arabic"
                    >
                      عرض التفاصيل
                    </button>
                    <p class="text-white font-bold font-arabic">
                      {{ book.price }} ج.م
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Navigation -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(_, index) in Math.ceil(books.length / itemsPerView)"
            :key="index"
            @click="goToSlide(index)"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="[
              currentSlide === index 
                ? 'bg-white w-6' 
                : 'bg-white/30 hover:bg-white/50'
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  title: {
    type: String,
    default: 'أحدث الكتب'
  },
  subtitle: {
    type: String,
    default: 'اكتشف أحدث الإصدارات في مكتبتنا'
  },
  books: {
    type: Array,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  autoplaySpeed: {
    type: Number,
    default: 3000
  }
});

const currentSlide = ref(0);
const itemsPerView = ref(4);
let autoplayInterval = null;

// Responsive items per view
const updateItemsPerView = () => {
  if (window.innerWidth < 640) {
    itemsPerView.value = 1;
  } else if (window.innerWidth < 1024) {
    itemsPerView.value = 2;
  } else if (window.innerWidth < 1280) {
    itemsPerView.value = 3;
  } else {
    itemsPerView.value = 4;
  }
};

const currentTranslate = computed(() => {
  return currentSlide.value * -100;
});

const totalSlides = computed(() => {
  return Math.ceil(props.books.length / itemsPerView.value);
});

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
};

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? totalSlides.value - 1 
    : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  if (props.autoplay) {
    autoplayInterval = setInterval(nextSlide, props.autoplaySpeed);
  }
};

const pauseAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

const resumeAutoplay = () => {
  pauseAutoplay();
  startAutoplay();
};

onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', updateItemsPerView);
  startAutoplay();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView);
  pauseAutoplay();
});
</script>