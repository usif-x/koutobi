import Swal from 'sweetalert2'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const accessToken = localStorage.getItem('accessToken')
    
    if (accessToken) {
      Swal.fire({
        title: 'تم تسجيل دخولك بالفعل',
        text: 'سيتم تحويلك إلى الصفحة الرئيسية',
        icon: 'info',
        confirmButtonText: 'حسناً',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'font-arabic',
          title: 'font-arabic',
          confirmButton: 'font-arabic'
        }
      })
      return navigateTo('/')
    }
  }
})