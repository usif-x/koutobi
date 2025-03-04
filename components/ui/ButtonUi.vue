<template>
  <component
      :is="isLink ? 'NuxtLink' : 'button'"
      :to="isLink ? to : undefined"
      @click="handleClick"
      :type="type"
      :disabled="loading || disabled"
      class="group px-5 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed w-fit"
      :class="[buttonClasses, { 'cursor-pointer': !loading && !disabled }]"
  >
    <!-- Button Content -->
    <div class="relative z-10 flex items-center justify-center gap-2">
      <span class="font-arabic">{{ loading ? loadingText : label }}</span>
      <Icon
          v-if="icon"
          :icon="loading ? 'ph:spinner-bold' : icon"
          class="text-xl transition-transform"
          :class="[loading ? 'animate-spin' : iconClasses]"
      />
    </div>

    <!-- Hover Effect Background -->
    <span
        class="absolute inset-0 transform scale-x-0 transition-transform duration-300 -z-0"
        :class="bgClasses"
    ></span>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const emit = defineEmits(['click']);

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: ''
  },
  isOutline: {
    type: Boolean,
    default: false
  },
  isLink: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'جاري التحميل...'
  }
});

const handleClick = (event) => {
  if (props.loading || props.disabled) {
    event.preventDefault();
    return;
  }

  // Only emit click event for buttons, not for links
  if (!props.isLink) {
    emit('click', event);
  }
};

const buttonClasses = computed(() => ({
  'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white': props.isOutline,
  'bg-indigo-600 border-2 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700 shadow-md hover:shadow-lg': !props.isOutline
}));

const iconClasses = computed(() => ({
  'group-hover:rotate-12': props.isOutline,
  'group-hover:translate-x-1': !props.isOutline
}));

const bgClasses = computed(() => ({
  'bg-indigo-600 origin-left group-hover:scale-x-100': props.isOutline,
  'bg-gradient-to-r from-indigo-700 to-indigo-800 origin-right group-hover:scale-x-100': !props.isOutline
}));
</script>