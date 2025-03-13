<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]" @click="$emit('update:modelValue', false)">
        <div class="flex items-center justify-center min-h-screen px-4" @click.stop>
          <div class="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 rtl animate-in">
            <!-- Search Form -->
            <form @submit.prevent="handleSearch" class="space-y-4">
              <!-- Tabs -->
              <div class="flex justify-center mb-4 border-b">
                <button
                    v-for="tab in tabs"
                    :key="tab.value"
                    @click.prevent="activeTab = tab.value"
                    :class="[
                    'px-4 py-2 font-arabic font-semibold transition-colors',
                    activeTab === tab.value
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>

              <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="getPlaceholder()"
                    class="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors font-arabic text-lg text-right pr-12"
                    ref="searchInput"
                    @keyup.esc="$emit('update:modelValue', false)"
                />
                <Icon
                    icon="ph:magnifying-glass-bold"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl"
                />
              </div>
              <div class="flex justify-end gap-3">
                <button
                    type="button"
                    @click="$emit('update:modelValue', false)"
                    class="px-5 py-2.5 rounded-lg font-semibold transition-colors font-arabic bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  إلغاء
                </button>
                <button
                    type="submit"
                    class="px-5 py-2.5 rounded-lg font-semibold transition-colors font-arabic bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                >
                  <span>بحث</span>
                  <Icon icon="ph:arrow-right-bold" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);
const router = useRouter();
const searchQuery = ref('');
const searchInput = ref(null);

// Tabs configuration
const tabs = [
  { label: 'كتب', value: 'books' },
  { label: 'مؤلفون', value: 'authors' },
  { label: 'تصنيفات', value: 'categories' }
];

const activeTab = ref('books');

// Get placeholder text based on active tab
const getPlaceholder = () => {
  switch (activeTab.value) {
    case 'books':
      return 'ابحث عن كتاب...';
    case 'authors':
      return 'ابحث عن مؤلف...';
    case 'categories':
      return 'ابحث عن تصنيف...';
    default:
      return 'ابحث...';
  }
};

watch(() => props.modelValue, async (newVal) => {
  if (newVal) {
    await nextTick();
    searchInput.value?.focus();
  } else {
    searchQuery.value = '';
  }
});

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;

  // Construct query parameters based on active tab
  const query = {};
  
  if (activeTab.value === 'books') {
    query.search = searchQuery.value.trim();
  } else if (activeTab.value === 'authors') {
    query.authors = searchQuery.value.trim();
  } else if (activeTab.value === 'categories') {
    query.categories = searchQuery.value.trim();
  }

  router.push({
    path: '/search',
    query: {
      ...query,
      type: activeTab.value
    }
  });

  // Close modal after search
  searchQuery.value = '';
  emit('update:modelValue', false);
};
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