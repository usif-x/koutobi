// File: middleware/admin.ts
export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return

    const { isAuthenticated } = useAuth()
    const { errorAlert } = useAlerts()

    if (!isAuthenticated.value) {
        errorAlert('Error', 'Authentication required for admin access')
        return navigateTo('/admin/login')
    }

    try {
        const response = await fetch('/api/auth/status')
        if (!response.ok) {
            throw new Error('Failed to validate admin status')
        }
        const data = await response.json()
        if (!data.isAdmin) {
            errorAlert('Error', 'Admin privileges required')
            return navigateTo('/admin/login')
        }
    } catch (error) {
        errorAlert('Error', 'Unable to verify admin access. Please try again.')
        return navigateTo('/admin/login')
    }
})