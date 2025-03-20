<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" 
           class="fixed inset-0 bg-black/60 backdrop-blur-md z-[999]" 
           @click="$emit('update:modelValue', false)"
           @keydown.esc="$emit('update:modelValue', false)"
           tabindex="-1"
      >
        <div class="flex items-center justify-center min-h-screen p-4" @click.stop>
          <div :class="[
            'bg-white dark:bg-gray-800 w-full rounded-2xl shadow-2xl',
            'max-w-2xl p-6 rtl animate-in relative',
            'dark:text-gray-100'
          ]">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6 pb-4 border-b dark:border-gray-700">
              <h3 class="text-xl font-bold font-arabic">{{ title }}</h3>
              <button
                  @click="$emit('update:modelValue', false)"
                  class="p-2 rounded-full text-gray-500 hover:text-gray-700 
                         dark:text-gray-400 dark:hover:text-gray-200
                         hover:bg-gray-100 dark:hover:bg-gray-700 
                         transition-colors focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Close modal"
              >
                <Icon icon="ph:x-bold" class="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div class="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-in {
  animation: modal-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>