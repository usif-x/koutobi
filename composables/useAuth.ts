// composables/useAuth.ts
import { ref, computed } from 'vue'

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

            setTokens(data.accessToken, data.refreshToken)
            await fetchUser()
            return true
        } catch (e: any) {
            error.value = e.message || 'Login failed'
            clearTokens()
            user.value = null
            return false
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
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken: refreshTokenValue.value })
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.message || 'Failed to refresh token')

            setTokens(data.accessToken, data.refreshToken)
            await fetchUser()
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

    return {
        user: computed(() => user.value),
        accessToken: computed(() => accessToken.value),
        refreshTokenValue: computed(() => refreshTokenValue.value), // إعادة التسمية لتجنب التكرار
        isAuthenticated,
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        login,
        logout,
        fetchUser,
        refreshToken,
        setTokens,
        clearTokens
    }

}