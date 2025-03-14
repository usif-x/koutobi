// File: middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return

    const { isAuthenticated } = useAuth()
    const { errorAlert } = useAlerts()

    const protectedRoutes = [
        '/profile',
        '/cart',
        '/orders',
        '/orders/*',
        '/categories',
        '/books',
        '/books/*',
        '/authors',
        '/checkout',
        '/logout',
        '/offers',
        '/new',
        '/bestsellers'
    ]

    const authRoutes = ['/login', '/signup']

    const isProtectedPath = protectedRoutes.some((route) => to.path.startsWith(route))
    const isAuthPath = authRoutes.some((route) => to.path.startsWith(route))

    if (isProtectedPath && !isAuthenticated.value) {
        errorAlert('خطأ', 'يجب عليك تسجيل الدخول أولاً')
        return navigateTo('/login')
    }

    if (isAuthPath && isAuthenticated.value) {
        errorAlert('خطأ', 'أنت مسجل دخول بالفعل')
        return navigateTo('/')
    }
})