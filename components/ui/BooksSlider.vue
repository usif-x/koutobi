<template>
  <!-- Template remains unchanged -->
  <div class="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-indigo-800 py-16">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full opacity-10"></div>
      <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-400 rounded-full opacity-10"></div>
    </div>

    <div class="container mx-auto px-4 relative">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 font-arabic">
          {{ title }}
        </h2>
        <p class="text-indigo-200 font-arabic">
          {{ subtitle }}
        </p>
      </div>

      <div class="relative group">
        <!-- Navigation buttons remain unchanged -->
        <button @click="prevSlide" class="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 backdrop-blur-md text-white rounded-full p-3 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-2">
          <Icon icon="ph:caret-right-bold" class="text-2xl" />
        </button>

        <button @click="nextSlide" class="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 backdrop-blur-md text-white rounded-full p-3 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2">
          <Icon icon="ph:caret-left-bold" class="text-2xl" />
        </button>

        <div class="overflow-hidden" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
          <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(${currentTranslate}%)` }">
            <div v-for="book in books" :key="book.id" class="min-w-[280px] sm:min-w-[320px] px-4">
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 h-full hover:transform hover:bg-white/20 hover:shadow-xl transition-all duration-300 border border-white/20 group/card">
                <div class="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden">
                  <img :src="book.image" :alt="book.title" class="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-500" />
                </div>
                <div class="space-y-2 text-right">
                  <h3 class="font-bold text-white text-lg font-arabic line-clamp-1">{{ book.title }}</h3>
                  <p class="text-indigo-200 text-sm font-arabic">{{ book.author }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-2 mt-8">
          <button v-for="(_, index) in totalSlides" :key="index" @click="goToSlide(index)" class="w-2 h-2 rounded-full transition-all duration-300" :class="[ currentSlide === index ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50' ]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  title: { type: String, default: 'أحدث الكتب' },
  subtitle: { type: String, default: 'اكتشف أحدث الإصدارات في مكتبتنا' },
  books: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
  autoplaySpeed: { type: Number, default: 2000 }
});

const currentSlide = ref(0);
const itemsPerView = ref(4);
let autoplayInterval = null;

const updateItemsPerView = () => {
  const width = window.innerWidth;
  if (width < 640) itemsPerView.value = 1;
  else if (width < 1024) itemsPerView.value = 2;
  else if (width < 1280) itemsPerView.value = 3;
  else itemsPerView.value = 4;
};

const totalSlides = computed(() =>
    Math.max(1, Math.ceil(props.books.length / itemsPerView.value))
);

const currentTranslate = computed(() =>
    currentSlide.value * 75 // Changed from -100 to +100
);

const nextSlide = () => {
  const maxSlide = totalSlides.value - 1;
  currentSlide.value = currentSlide.value < maxSlide ? currentSlide.value + 1 : 0;
};

const prevSlide = () => {
  const maxSlide = totalSlides.value - 1;
  currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : maxSlide;
};


const goToSlide = (index) => {
  if (index >= 0 && index < totalSlides.value) {
    currentSlide.value = index;
  }
};

const startAutoplay = () => {
  if (!props.autoplay) return;
  pauseAutoplay();
  autoplayInterval = setInterval(nextSlide, props.autoplaySpeed);
};

const pauseAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const resumeAutoplay = () => {
  startAutoplay();
};

watch(totalSlides, (newTotal) => {
  currentSlide.value = Math.min(currentSlide.value, newTotal - 1);
});

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const handleResize = debounce(updateItemsPerView, 100);

onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', handleResize);
  startAutoplay();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  pauseAutoplay();
});
</script>