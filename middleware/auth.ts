// File: middleware/auth.ts
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
        '/offers',
        '/new',
        '/bestsellers'
    ]

    const authRoutes = ['/login', '/signup']

    const isProtectedPath = protectedRoutes.some((route) => to.path.startsWith(route))
    const isAuthPath = authRoutes.some((route) => to.path.startsWith(route))

    if (isProtectedPath && !isAuthenticated.value) {
        errorAlert('Error', 'You must log in first')
        return navigateTo('/login')
    }

    if (isAuthPath && isAuthenticated.value) {
        errorAlert('Error', 'You are already logged in')
        return navigateTo('/')
    }
})