import Swal from 'sweetalert2'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user')
    
    if (!user) {
      Swal.fire({
        title: 'غير مصرح',
        text: 'يجب تسجيل الدخول للوصول إلى لوحة التحكم',
        icon: 'error',
        confirmButtonText: 'تسجيل الدخول',
        customClass: {
          popup: 'font-arabic',
          title: 'font-arabic',
          confirmButton: 'font-arabic'
        }
      })
      return navigateTo('/login')
    }

    const userData = JSON.parse(user)
    
    if (userData.role !== 'admin') {
      Swal.fire({
        title: 'غير مصرح',
        text: 'عذراً، لا تملك صلاحية الوصول إلى هذه الصفحة',
        icon: 'error',
        confirmButtonText: 'العودة',
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