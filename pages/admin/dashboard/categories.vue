<template>
  <AdminLayout>
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">إدارة التصنيفات</h1>
        <button @click="showAddModal = true" class="btn-primary flex items-center gap-2">
          <Icon icon="ph:plus-bold" />
          <span>إضافة تصنيف جديد</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="py-8 text-center">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-indigo-600 rounded-full"></div>
        <p class="mt-2 text-gray-600">جاري تحميل التصنيفات...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="categories.length === 0" class="py-8 text-center">
        <Icon icon="ph:folders" class="text-gray-300 text-6xl mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-800 mb-1">لا توجد تصنيفات</h3>
        <p class="text-gray-600 mb-4">قم بإضافة تصنيف جديد للبدء</p>
        <button @click="showAddModal = true" class="btn-primary">إضافة تصنيف</button>
      </div>

      <!-- Categories Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التصنيف
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الوصف
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاريخ الإضافة
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                إجراءات
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in categories" :key="category._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon icon="ph:folder-fill" class="text-amber-500 text-xl" />
                  </div>
                  <div class="mr-4">
                    <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                    <div class="text-sm text-gray-500">{{ category.slug }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 line-clamp-2">{{ category.description || 'لا يوجد وصف' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(category.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                <button @click="editCategory(category)" class="text-indigo-600 hover:text-indigo-900 ml-3">
                  <Icon icon="ph:pencil-simple" class="text-lg" />
                </button>
                <button @click="confirmDelete(category)" class="text-red-600 hover:text-red-900">
                  <Icon icon="ph:trash" class="text-lg" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Category Modal -->
    <Modal v-model="showAddModal" :title="isEditing ? 'تعديل تصنيف' : 'إضافة تصنيف جديد'">
      <form @submit.prevent="submitCategory" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">اسم التصنيف</label>
          <input
            type="text"
            id="name"
            v-model="categoryForm.name"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label for="slug" class="block text-sm font-medium text-gray-700 mb-1">المعرف (slug)</label>
          <input
            type="text"
            id="slug"
            v-model="categoryForm.slug"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          <p class="text-xs text-gray-500 mt-1">مثال: arabic, math, science</p>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">وصف التصنيف</label>
          <textarea
            id="description"
            v-model="categoryForm.description"
            rows="4"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="showAddModal = false"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
          >
            إلغاء
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-2"
            :disabled="isSubmitting"
          >
            <Icon v-if="isSubmitting" icon="ph:spinner" class="animate-spin" />
            <span>{{ isEditing ? 'تحديث' : 'إضافة' }}</span>
          </button>
        </div>
      </form>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="showDeleteModal" title="حذف تصنيف">
      <div class="space-y-4">
        <p class="text-gray-700">
          هل أنت متأكد من رغبتك في حذف التصنيف "{{ categoryToDelete?.name }}"؟
        </p>
        <div class="flex justify-end gap-2 pt-2">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
          >
            إلغاء
          </button>
          <button
            @click="deleteCategory"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2"
            :disabled="isSubmitting"
          >
            <Icon v-if="isSubmitting" icon="ph:spinner" class="animate-spin" />
            <span>حذف</span>
          </button>
        </div>
      </div>
    </Modal>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({
  middleware: ['admin']
})

// State
const categories = ref([])
const isLoading = ref(true)
const error = ref(null)
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const categoryToDelete = ref(null)
const categoryForm = ref({
  name: '',
  slug: '',
  description: ''
})

const { successToast, errorToast } = useAlerts()

// Fetch categories
const fetchCategories = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await $fetch('/api/category', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    
    categories.value = response.categories || []
  } catch (err) {
    error.value = 'فشل في تحميل التصنيفات. يرجى المحاولة مرة أخرى.'
    console.error('Error fetching categories:', err)
  } finally {
    isLoading.value = false
  }
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Edit category
const editCategory = (category) => {
  categoryForm.value = {
    name: category.name,
    slug: category.slug,
    description: category.description || ''
  }
  isEditing.value = true
  categoryToDelete.value = category
  showAddModal.value = true
}

// Confirm delete
const confirmDelete = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

// Delete category
const deleteCategory = async () => {
  try {
    isSubmitting.value = true
    
    await $fetch(`/api/category/${categoryToDelete.value._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    
    successToast('تم حذف التصنيف بنجاح')
    showDeleteModal.value = false
    fetchCategories()
  } catch (err) {
    errorToast('فشل في حذف التصنيف')
    console.error('Error deleting category:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Submit category form
const submitCategory = async () => {
  try {
    isSubmitting.value = true
    
    if (isEditing.value) {
      // Update existing category
      await $fetch(`/api/category/${categoryToDelete.value._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: categoryForm.value
      })
      
      successToast('تم تحديث التصنيف بنجاح')
    } else {
      // Create new category
      await $fetch('/api/category', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: categoryForm.value
      })
      
      successToast('تم إضافة التصنيف بنجاح')
    }
    
    // Reset form and close modal
    resetForm()
    showAddModal.value = false
    fetchCategories()
  } catch (err) {
    errorToast(isEditing.value ? 'فشل في تحديث التصنيف' : 'فشل في إضافة التصنيف')
    console.error('Error submitting category:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  categoryForm.value = {
    name: '',
    slug: '',
    description: ''
  }
  isEditing.value = false
  categoryToDelete.value = null
}

// Generate slug from name
const generateSlug = (name) => {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// Watch name to auto-generate slug
watch(() => categoryForm.value.name, (newName) => {
  if (!isEditing.value || !categoryForm.value.slug) {
    categoryForm.value.slug = generateSlug(newName)
  }
})

// Lifecycle
onMounted(() => {
  fetchCategories()
})
</script>