<template>
  <component
    :is="isLink ? 'NuxtLink' : 'button'"
    :to="isLink ? to : undefined"
    @click="handleClick"
    :type="type"
    :disabled="loading"
    class="group px-5 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden w-full"
    :class="buttonClasses"
  >
    <span class="relative z-10">{{ loading ? loadingText : label }}</span>
    <Icon :icon="loading ? 'ph:spinner-bold' : icon" class="relative z-10 text-xl transition-transform" :class="loading ? 'animate-spin' : iconClasses" />
    <span class="absolute inset-0 transform scale-x-0 transition-transform duration-300 -z-0" :class="bgClasses"></span>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue'

const props = defineProps({
  label: String,
  icon: String,
  to: String,
  isOutline: Boolean,
  isLink: Boolean,
  action: Function,
  type: {
    type: String,
    default: 'button',
  },
  loading: Boolean,
  loadingText: {
    type: String,
    default: 'جاري التحميل...',
  }
});

const handleClick = () => {
  if (!props.isLink && props.action) {
    props.action();
  }
};

const buttonClasses = computed(() =>
  props.isOutline
    ? 'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
    : 'bg-indigo-600 border-2 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-700 shadow-md hover:shadow-lg'
);

const iconClasses = computed(() =>
  props.isOutline ? 'group-hover:rotate-12' : 'group-hover:translate-x-1'
);

const bgClasses = computed(() =>
  props.isOutline ? 'bg-indigo-600 origin-left group-hover:scale-x-100' : 'bg-gradient-to-r from-indigo-700 to-indigo-800 origin-right group-hover:scale-x-100'
);
</script>
