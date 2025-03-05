<script setup lang="ts">
import { useAlerts } from '~/composables/useAlerts'

const { normalToast, successToast, errorToast, confirmAlert, successAlert, errorAlert } = useAlerts()

const showSuccessToast = () => {
  successToast('تمت العملية بنجاح!')
}

const showErrorToast = () => {
  errorToast('حدث خطأ أثناء العملية!')
}

const showNormalToast = () => {
  normalToast('تمت العملية بنجاح!', 'لقد تمت العملية بنجاح.')
}

const confirmAction = async () => {
  const confirmed = await confirmAlert('هل أنت متأكد؟', 'لن يمكنك التراجع بعد ذلك!')
  if (confirmed) {
    successAlert('تم التأكيد', 'لقد أكدت العملية بنجاح!')
  } else {
    errorAlert('تم الإلغاء', 'لم يتم تنفيذ العملية.')
  }

}
</script>

<template>
  <div>
    <button @click="showSuccessToast">إشعار نجاح</button>
    <button @click="showNormalToast">إشعار نجاح</button>
    <button @click="showErrorToast">إشعار خطأ</button>
    <button @click="confirmAction">تنبيه تأكيد</button>
  </div>
</template>
