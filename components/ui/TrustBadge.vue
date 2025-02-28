<template>
  <div class="flex items-center text-gray-600 gap-2 group transition-all duration-300 hover:text-indigo-700">
    <Icon 
      :icon="icon" 
      class="text-amber-500 text-lg group-hover:scale-110 transition-transform" 
    />
    <span class="text-sm font-arabic">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>