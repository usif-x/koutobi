<template>
  <div class="relative mb-4">
    <!-- Label -->
    <label 
      :for="id" 
      class="block text-right mb-2 text-sm font-arabic"
      :class="error ? 'text-red-600' : 'text-gray-700'"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 mr-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Icon (if provided) -->
      <div 
        v-if="icon" 
        class="absolute top-1/2 right-3 transform -translate-y-1/2 text-indigo-800"
        :class="{ 'text-indigo-800': focused }"
      >
        <Icon :icon="icon" class="text-xl text-indigo-800" />
      </div>

      <!-- Input Element -->
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="focused = true"
        @blur="focused = false"
        class="w-full px-4 py-3 rounded-lg font-arabic text-right transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          icon ? 'pr-12' : 'pr-4',
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' 
            : 'border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 bg-white/80 border backdrop-blur-sm',
          'hover:border-indigo-300'
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
      />

      <!-- Password Toggle Button -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePassword"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
      >
        <Icon :icon="showPassword ? 'ph:eye-slash' : 'ph:eye'" class="text-xl" />
      </button>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600 text-right font-arabic">{{ error }}</p>

    <!-- Helper Text -->
    <p v-else-if="helper" class="mt-1 text-sm text-gray-500 text-right font-arabic">{{ helper }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  icon: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  helper: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  }
});

const focused = ref(false);
const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

defineEmits(['update:modelValue']);
</script>