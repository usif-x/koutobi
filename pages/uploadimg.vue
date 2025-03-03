<!-- pages/admin/upload.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">رفع الصور</h1>
      <ImageUploader />
    </div>
  </div>
</template>

<script setup>
import ImageUploader from '~/components/ui/ImageUploader.vue';
</script>