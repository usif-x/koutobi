<template>
  <div class="border-t border-indigo-900 pt-6 pb-4">
    <swiper
      :modules="[Autoplay, Navigation, Pagination]"
      :slides-per-view="slidesPerView"
      :space-between="50"
      :loop="true"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :breakpoints="{
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20
        }
      }"
      :pagination="{ 
        clickable: true,
        el: '.swiper-pagination'
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }"
      class="relative payment-methods-swiper"
    >
      <swiper-slide v-for="(image, index) in paymentMethods" :key="index" class="flex justify-center">
        <div class="bg-white backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group flex justify-center items-center">
          <img 
            :src="image" 
            :alt="`Payment Method ${index + 1}`" 
            class="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
      </swiper-slide>

      <!-- Navigation buttons -->
      <div class="swiper-button-prev !text-indigo-600 !w-8 !h-8 !bg-white/80 rounded-full shadow-md backdrop-blur-sm
                  after:!text-xl hover:!bg-white transition-all duration-300 !-left-2"></div>
      <div class="swiper-button-next !text-indigo-600 !w-8 !h-8 !bg-white/80 rounded-full shadow-md backdrop-blur-sm
                  after:!text-xl hover:!bg-white transition-all duration-300 !-right-2"></div>

      <!-- Pagination dots -->
      <div class="swiper-pagination !bottom-0 !transform !translate-y-6"></div>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const slidesPerView = ref(5);

const paymentMethods = [
  '/images/paygateway/visa.svg',
  '/images/paygateway/mastercard.svg',
  '/images/paygateway/meeza.svg',
  '/images/paygateway/fawrypay.png',
  '/images/paygateway/vodafone.jpg'
];

// Optional: Update slidesPerView based on window width
onMounted(() => {
  const updateSlidesPerView = () => {
    if (window.innerWidth < 480) {
      slidesPerView.value = 2;
    } else if (window.innerWidth < 640) {
      slidesPerView.value = 3;
    } else if (window.innerWidth < 1024) {
      slidesPerView.value = 4;
    } else {
      slidesPerView.value = 5;
    }
  };

  updateSlidesPerView();
  window.addEventListener('resize', updateSlidesPerView);
});
</script>

<style scoped>
/* Custom styles for the slider */
.payment-methods-swiper {
  padding: 1rem 2rem !important;
  margin: 0 -2rem;
}

/* Custom pagination dots */
:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #e2e8f0;
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #4f46e5;
  width: 24px;
  border-radius: 4px;
}

/* Custom navigation buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  opacity: 0;
  transition: all 0.3s ease;
}

.payment-methods-swiper:hover :deep(.swiper-button-next),
.payment-methods-swiper:hover :deep(.swiper-button-prev) {
  opacity: 1;
}

:deep(.swiper-button-next)::after,
:deep(.swiper-button-prev)::after {
  font-size: 1rem;
  font-weight: bold;
}

/* Disable navigation buttons on mobile */
@media (max-width: 640px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
  
  .payment-methods-swiper {
    padding: 1rem 0.5rem !important;
    margin: 0 -0.5rem;
  }
}
</style>