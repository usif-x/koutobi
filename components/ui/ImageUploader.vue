<!-- components/ImageUploader.vue -->
<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <!-- Upload Section -->
    <div class="mb-4">
      <label class="block mb-2 text-sm font-medium text-gray-700">
        اختر صورة للرفع
      </label>
      <input
          type="file"
          ref="fileInput"
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
      />
      <button
          @click="$refs.fileInput.click()"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        اختيار صورة
      </button>
    </div>

    <!-- Preview Section -->
    <div v-if="preview" class="mb-4">
      <img
          :src="preview"
          alt="Preview"
          class="w-full max-w-md mx-auto rounded-lg shadow-md"
      />
    </div>

    <!-- Upload Button -->
    <button
        v-if="selectedFile"
        @click="handleUpload"
        :disabled="isUploading"
        class="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
    >
      <span v-if="isUploading">جاري الرفع...</span>
      <span v-else>رفع الصورة</span>
    </button>

    <!-- Result Section -->
    <div v-if="uploadedImage" class="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 mb-2">تم الرفع بنجاح</h3>
      <div class="space-y-2">
        <div class="flex items-center">
          <span class="text-sm text-gray-500">رابط الصورة:</span>
          <a
              :href="uploadedImage.url"
              target="_blank"
              class="ml-2 text-sm text-indigo-600 hover:text-indigo-500"
          >
            {{ uploadedImage.url }}
          </a>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div
        v-if="error"
        class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { uploadImage, isUploading, error } = useImageUpload();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const preview = ref<string | null>(null);
const uploadedImage = ref<any>(null);

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  selectedFile.value = file;
  preview.value = URL.createObjectURL(file);
  uploadedImage.value = null;
};

const handleUpload = async () => {
  if (!selectedFile.value) return;

  try {
    const result = await uploadImage(selectedFile.value);
    uploadedImage.value = result;

    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    selectedFile.value = null;
  } catch (err) {
  }
};
</script>