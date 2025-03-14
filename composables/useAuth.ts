import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
}

const user = ref<User | null>(null)
const accessToken = ref<string | null>(null)
const refreshTokenValue = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export function useAuth() {
    // Initialize tokens on client-side only
    const initTokens = () => {
        if (process.client) {
            accessToken.value = localStorage.getItem('accessToken')
            refreshTokenValue.value = localStorage.getItem('refreshToken')
        }
    }

    // Initialize on composable creation
    initTokens()

    const isAuthenticated = computed(() => !!accessToken.value)

    const setTokens = (access: string, refresh: string) => {
        accessToken.value = access
        refreshTokenValue.value = refresh
        if (process.client) {
            localStorage.setItem('accessToken', access)
            localStorage.setItem('refreshToken', refresh)
        }
    }

    const clearTokens = () => {
        accessToken.value = null
        refreshTokenValue.value = null
        if (process.client) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }

    const fetchUser = async () => {
        if (!accessToken.value) return

        // Skip user fetch for admin routes
        if (process.client && window.location.pathname.startsWith('/admin')) {
            return
        }

        loading.value = true
        error.value = null

        try {
            const response = await fetch('/api/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })

            if (!response.ok) throw new Error('Failed to fetch user data')

            const data = await response.json()
            user.value = data.user
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch user data'
            clearTokens()
            user.value = null
        } finally {
            loading.value = false
        }
    }

    const login = async (credentials: { identifier: string; password: string }) => {
        loading.value = true
        error.value = null

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.message || 'Login failed')

            // Set tokens first
            setTokens(data.accessToken, data.refreshToken)
            
            // Then fetch user data
            await fetchUser()
            
            // Return success with user data
            return { success: true, user: user.value }
        } catch (e: any) {
            error.value = e.message || 'Login failed'
            clearTokens()
            user.value = null
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })

            if (!response.ok) throw new Error('Logout failed')
        } catch (e: any) {
            error.value = e.message || 'Logout failed'
        } finally {
            clearTokens()
            user.value = null
            loading.value = false
        }
    }

    const refreshToken = async () => {
        if (!refreshTokenValue.value) return false

        loading.value = true
        error.value = null

        try {
            const checkSession = await fetch('/api/auth/status', {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })

            if (checkSession.ok) {
                const userData = await checkSession.json()
                user.value = userData.user
                loading.value = false
                return true
            }

            await Swal.fire({
                title: 'انتهت الجلسة',
                text: 'جاري تجديد الجلسة...',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false,
                allowOutsideClick: false
            })

            // Try to refresh token first
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken: refreshTokenValue.value })
            })

            const data = await response.json()

            if (!response.ok) {
                clearTokens()
                user.value = null
                await Swal.fire({
                    title: 'انتهت الجلسة',
                    text: 'فشل تجديد الجلسة. يجب عليك تسجيل الدخول يدويًا باستخدام البريد الإلكتروني/الهاتف وكلمة المرور.',
                    icon: 'error',
                    showConfirmButton: true
                })
                return navigateTo('/login')
            }
            setTokens(data.accessToken, data.refreshToken)
            await fetchUser()

            await Swal.fire({
                title: 'تم التجديد',
                text: 'تم تجديد الجلسة بنجاح',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            })

            return true
        } catch (e: any) {
            error.value = e.message || 'Failed to refresh token'
            clearTokens()
            user.value = null
            return false
        } finally {
            loading.value = false
        }
    }

    // Add a new method to check if the user is admin
    const isAdmin = computed(() => {
        if (!user.value) return false
        return user.value.isAdmin === true
    })

    return {
        user: computed(() => user.value),
        accessToken: computed(() => accessToken.value),
        refreshTokenValue: computed(() => refreshTokenValue.value),
        isAuthenticated,
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        isAdmin,
        login,
        logout,
        fetchUser,
        refreshToken,
        setTokens,
        clearTokens
    }
}
