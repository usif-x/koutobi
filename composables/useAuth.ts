import Swal from 'sweetalert2'

export const useAuth = () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  const accessToken = ref(null)

  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('accessToken')
      const storedUser = localStorage.getItem('user')

      if (storedToken && storedUser) {
        try {
          accessToken.value = storedToken
          user.value = JSON.parse(storedUser)

          const route = useRoute()
          if (route.path === '/login' || route.path === '/signup' || route.path === '/forgot-password') {
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
            navigateTo('/')
          }
        } catch (error) {
          console.error('Error initializing auth state:', error)
          logout()
        }
      }
    }
  }

  const login = async (token: string, userData: any) => {
    accessToken.value = token
    user.value = userData

    localStorage.setItem('accessToken', token)
    localStorage.setItem('user', JSON.stringify(userData))

    await Swal.fire({
      title: 'مرحباً بك!',
      text: 'تم تسجيل الدخول بنجاح',
      icon: 'success',
      confirmButtonText: 'حسناً',
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'font-arabic',
        title: 'font-arabic',
        confirmButton: 'font-arabic'
      }
    })

    const route = useRoute()
    const redirect = route.query.redirect?.toString() || '/'
    return navigateTo(redirect)
  }

  const logout = async () => {
    accessToken.value = null
    user.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')

    await Swal.fire({
      title: 'تم تسجيل الخروج',
      text: 'نراك قريباً!',
      icon: 'success',
      confirmButtonText: 'حسناً',
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'font-arabic',
        title: 'font-arabic',
        confirmButton: 'font-arabic'
      }
    })

    return navigateTo('/login')
  }

  onMounted(() => {
    initAuth()
  })

  return {
    user,
    isLoggedIn,
    accessToken,
    login,
    logout
  }
}