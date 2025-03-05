<template>
  <div class="relative mb-4 group">
    <!-- Label Container with better positioning -->
    <div class="relative h-6 mb-1">
      <label 
        :for="id" 
        class="absolute transition-all duration-200 font-arabic z-10 right-[50px]"
        :class="[
          modelValue || focused ? 
            'text-xs top-5 rounded-full border border-indigo-600 right-3 bg-white px-2 z-10' : 
            'text-base top-11 right-4',
          error ? 'text-red-500' : 
          focused ? 'text-indigo-600' : 'text-gray-600'
        ]"
      >
        {{ label }}
        <span v-if="required" class="text-red-500 mr-1 rtl:ml-1">*</span>
      </label>
    </div>

    <!-- Input Wrapper -->
    <div 
      class="relative rounded-lg transition-all duration-200"
      :class="[
        focused ? 'shadow-lg shadow-indigo-100' : 'shadow-sm',
        error && 'shadow-red-100'
      ]"
    >
      <!-- Icon -->
      <div 
        v-if="icon" 
        class="absolute top-1/2 right-4 transform -translate-y-1/2 transition duration-200"
        :class="{ 
          'text-indigo-600 z-20': focused && !error,
          'text-gray-400 z-20': !focused && !error,
          'text-red-500 z-20': error
        }"
      >
        <Icon :icon="icon" class="text-xl" />
      </div>

      <!-- Input Field -->
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        class="w-full rounded-lg font-arabic text-right transition-all duration-200
               border-2 bg-white/95 backdrop-blur-sm
               focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          icon ? 'pr-12' : 'pr-4',
          'pl-4 py-3',
          error 
            ? 'border-red-300 focus:border-red-500' 
            : 'border-gray-200 hover:border-indigo-300 focus:border-indigo-500',
          disabled && 'bg-gray-50'
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
      />

      <!-- Right Side Icons (Password Toggle/Validation) -->
      <div class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <!-- Password Toggle -->
        <button
          v-if="type === 'password'"
          type="button"
          @click="togglePassword"
          @mousedown.prevent
          class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          :class="showPassword ? 'text-indigo-600' : 'text-gray-400'"
        >
          <Icon 
            :icon="showPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" 
            class="text-xl"
          />
        </button>

        <!-- Validation Icon -->
        <Icon 
          v-if="modelValue && !error && type !== 'password'"
          icon="ph:check-circle-bold" 
          class="text-xl text-green-500 transition-all duration-200"
        />
      </div>
    </div>

    <!-- Error/Helper Messages -->
    <div 
      v-if="error || helper" 
      class="mt-1.5 flex items-center gap-1.5 text-sm font-arabic justify-end"
    >
      <span :class="error ? 'text-red-500' : 'text-gray-500'">
        {{ error || helper }}
      </span>
      <Icon 
        :icon="error ? 'ph:warning-circle-bold' : 'ph:info-bold'"
        :class="error ? 'text-red-500' : 'text-gray-400'"
        class="text-lg"
      />
    </div>
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
    default: () => `input-${Date.now().toString(36)}`
  }
});

const emit = defineEmits(['update:modelValue']);

const focused = ref(false);
const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

const handleFocus = () => {
  focused.value = true;
};

const handleBlur = () => {
  focused.value = false;
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
/* Smooth transitions for all interactive states */
.group * {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Better autofill styling */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: currentColor;
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}


/* RTL specific adjustments */
.rtl input {
  direction: rtl;
}
</style>