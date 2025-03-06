// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return

    const { isAuthenticated } = useAuth()
    const { errorAlert } = useAlerts()

    const protectedRoutes = [
        '/profile',
        '/cart',
        '/orders',
        '/categories',
        '/books',
        '/authors',
        '/checkout',
        '/logout',
        '/offers', '/new', '/bestsellers'
    ]

    const authRoutes = ['/login', '/signup']

    // Check if the path starts with any protected route
    const isProtectedPath = protectedRoutes.some(route =>
        to.path.startsWith(route)
    )

    // Check if the path starts with any auth route
    const isAuthPath = authRoutes.some(route =>
        to.path.startsWith(route)
    )

    if (isProtectedPath && !isAuthenticated.value) {
        errorAlert('خطأ'       ,'يجب تسجيل الدخول أولاً')
        return navigateTo('/login')
    }

    if (isAuthPath && isAuthenticated.value) {
        errorAlert('خطأ','انت مسجل بالفعل')
        return navigateTo('/')
    }
})