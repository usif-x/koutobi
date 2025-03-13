// File: middleware/admin.ts
export default defineNuxtRouteMiddleware(async (to) => {
    if (process.server) return
    
    const { isAuthenticated, isAdmin } = useAuth()
    const { errorAlert } = useAlerts()
    
    // First check if user is authenticated
    if (!isAuthenticated.value) {
        errorAlert('خطأ', 'يجب تسجيل الدخول للوصول إلى لوحة التحكم')
        return navigateTo('/admin/login')
    }
    
    try {
        // Check admin status from API
        const response = await fetch('/api/auth/status', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        
        if (!response.ok) {
            throw new Error('فشل التحقق من صلاحيات المسؤول')
        }
        
        const data = await response.json()
        
        if (!data.isAdmin) {
            errorAlert('خطأ', 'ليس لديك صلاحيات للوصول إلى لوحة التحكم')
            return navigateTo('/')
        }
    } catch (error) {
        console.error('Admin middleware error:', error)
        errorAlert('خطأ', 'حدث خطأ أثناء التحقق من الصلاحيات')
        return navigateTo('/admin/login')
    }
})