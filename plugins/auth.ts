// plugins/auth.ts
import { defineNuxtPlugin } from '#app'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.client) {
        const { refreshToken, fetchUser, isAuthenticated } = useAuth()

        // Check session only if there's an existing auth state
        if (isAuthenticated.value) {
            try {
                const success = await refreshToken()
                if (success) {
                    await fetchUser()
                }
            } catch (error) {
                console.error('Auth check failed:', error)
            }
        }
    }
})