<template>
  <AdminLayout>
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">إدارة المؤلفين</h1>
        <button @click="showAddModal = true" class="btn-primary flex items-center gap-2">
          <Icon icon="ph:plus-bold" />
          <span>إضافة مؤلف جديد</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="py-8 text-center">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-indigo-600 rounded-full"></div>
        <p class="mt-2 text-gray-600">جاري تحميل المؤلفين...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="authors.length === 0" class="py-8 text-center">
        <Icon icon="ph:user-circle" class="text-gray-300 text-6xl mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-800 mb-1">لا يوجد مؤلفين</h3>
        <p class="text-gray-600 mb-4">قم بإضافة مؤلف جديد للبدء</p>
        <button @click="showAddModal = true" class="btn-primary">إضافة مؤلف</button>
      </div>

      <!-- Authors Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المؤلف
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                نبذة
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
            <tr v-for="author in authors" :key="author._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Icon icon="ph:user-circle-fill" class="text-indigo-500 text-xl" />
                  </div>
                  <div class="mr-4">
                    <div class="text-sm font-medium text-gray-900">{{ author.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 line-clamp-2">{{ author.bio || 'لا توجد نبذة' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(author.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                <button @click="editAuthor(author)" class="text-indigo-600 hover:text-indigo-900 ml-3">
                  <Icon icon="ph:pencil-simple" class="text-lg" />
                </button>
                <button @click="confirmDelete(author)" class="text-red-600 hover:text-red-900">
                  <Icon icon="ph:trash" class="text-lg" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Author Modal -->
    <Modal v-model="showAddModal" :title="isEditing ? 'تعديل مؤلف' : 'إضافة مؤلف جديد'">
      <form @submit.prevent="submitAuthor" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">اسم المؤلف</label>
          <input
            type="text"
            id="name"
            v-model="authorForm.name"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">نبذة عن المؤلف</label>
          <textarea
            id="bio"
            v-model="authorForm.bio"
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
    <Modal v-model="showDeleteModal" title="حذف مؤلف">
      <div class="space-y-4">
        <p class="text-gray-700">
          هل أنت متأكد من رغبتك في حذف المؤلف "{{ authorToDelete?.name }}"؟
        </p>
        <div class="flex justify-end gap-2 pt-2">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
          >
            إلغاء
          </button>
          <button
            @click="deleteAuthor"
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
const authors = ref([])
const isLoading = ref(true)
const error = ref(null)
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const authorToDelete = ref(null)
const authorForm = ref({
  name: '',
  bio: ''
})

const { successToast, errorToast } = useAlerts()

// Fetch authors
const fetchAuthors = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await $fetch('/api/author', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    
    authors.value = response.authors || []
  } catch (err) {
    error.value = 'فشل في تحميل المؤلفين. يرجى المحاولة مرة أخرى.'
    console.error('Error fetching authors:', err)
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

// Edit author
const editAuthor = (author) => {
  authorForm.value = {
    name: author.name,
    bio: author.bio || ''
  }
  isEditing.value = true
  authorToDelete.value = author
  showAddModal.value = true
}

// Confirm delete
const confirmDelete = (author) => {
  authorToDelete.value = author
  showDeleteModal.value = true
}

// Delete author
const deleteAuthor = async () => {
  try {
    isSubmitting.value = true
    
    await $fetch(`/api/author/${authorToDelete.value._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    
    successToast('تم حذف المؤلف بنجاح')
    showDeleteModal.value = false
    fetchAuthors()
  } catch (err) {
    errorToast('فشل في حذف المؤلف')
    console.error('Error deleting author:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Submit author form
const submitAuthor = async () => {
  try {
    isSubmitting.value = true
    
    if (isEditing.value) {
      // Update existing author
      await $fetch(`/api/author/${authorToDelete.value._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: authorForm.value
      })
      
      successToast('تم تحديث المؤلف بنجاح')
    } else {
      // Create new author
      await $fetch('/api/author', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: authorForm.value
      })
      
      successToast('تم إضافة المؤلف بنجاح')
    }
    
    // Reset form and close modal
    resetForm()
    showAddModal.value = false
    fetchAuthors()
  } catch (err) {
    errorToast(isEditing.value ? 'فشل في تحديث المؤلف' : 'فشل في إضافة المؤلف')
    console.error('Error submitting author:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  authorForm.value = {
    name: '',
    bio: ''
  }
  isEditing.value = false
  authorToDelete.value = null
}

// Lifecycle
onMounted(() => {
  fetchAuthors()
})
</script>