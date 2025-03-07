export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return

    const { isAuthenticated } = useAuth()
    const { errorAlert } = useAlerts()

    // Check if admin status is valid
    const checkAdminStatus = async () => {
        try {
            const response = await fetch('/api/auth/status')
            const data = await response.json()
            return data.isAdmin === true
        } catch {
            return false
        }
    }

    const isAdmin = await checkAdminStatus()

    if (!isAuthenticated.value || !isAdmin) {
        errorAlert('خطأ', 'غير مصرح لك بالوصول إلى لوحة التحكم')
        return navigateTo('/admin/login')
    }
})