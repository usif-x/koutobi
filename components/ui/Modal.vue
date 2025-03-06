<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]" @click="$emit('update:modelValue', false)">
        <div class="flex items-center justify-center min-h-screen px-4" @click.stop>
          <div class="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 rtl animate-in">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4 pb-4 border-b">
              <h3 class="text-xl font-bold text-gray-900 font-arabic">{{ title }}</h3>
              <button
                  @click="$emit('update:modelValue', false)"
                  class="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <Icon icon="ph:x-bold" class="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div class="space-y-4">
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
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-in {
  animation: modal-in 0.3s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>