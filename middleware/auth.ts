
import Swal from 'sweetalert2'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const accessToken = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')

    // If user is logged in and trying to access login/signup pages
    if (accessToken && user && (to.path === '/login' || to.path === '/signup' || to.path === '/forgot-password')) {
      Swal.fire({
        title: 'تم تسجيل دخولك بالفعل!',
        text: 'سيتم تحويلك إلى الصفحة الرئيسية',
        icon: 'info',
        confirmButtonText: 'حسناً',
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'font-arabic',
          title: 'font-arabic',
          confirmButton: 'font-arabic'
        }
      })
      return navigateTo('/')
    }

    // Check if route requires authentication and user is not logged in
    if (to.meta.requiresAuth && (!accessToken || !user)) {
      Swal.fire({
        title: 'تنبيه!',
        text: 'يجب تسجيل الدخول للوصول إلى هذه الصفحة',
        icon: 'warning',
        confirmButtonText: 'تسجيل الدخول',
        customClass: {
          popup: 'font-arabic',
          title: 'font-arabic',
          confirmButton: 'font-arabic'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          return navigateTo('/login', {
            replace: true,
            query: {
              redirect: to.fullPath
            }
          })
        }
      })
      return false
    }

    try {
      if (accessToken && user) {
        const userData = JSON.parse(user)
        const currentTime = Math.floor(Date.now() / 1000)
        
        if (userData.exp && userData.exp < currentTime) {
          Swal.fire({
            title: 'انتهت صلاحية الجلسة',
            text: 'يرجى إعادة تسجيل الدخول',
            icon: 'error',
            confirmButtonText: 'تسجيل الدخول',
            customClass: {
              popup: 'font-arabic',
              title: 'font-arabic',
              confirmButton: 'font-arabic'
            }
          })
          
          localStorage.removeItem('accessToken')
          localStorage.removeItem('user')
          return navigateTo('/login', {
            replace: true,
            query: {
              redirect: to.fullPath
            }
          })
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      
      Swal.fire({
        title: 'خطأ',
        text: 'حدث خطأ في النظام، يرجى إعادة تسجيل الدخول',
        icon: 'error',
        confirmButtonText: 'حسناً',
        customClass: {
          popup: 'font-arabic',
          title: 'font-arabic',
          confirmButton: 'font-arabic'
        }
      })
      
      return navigateTo('/login')
    }
  }
})