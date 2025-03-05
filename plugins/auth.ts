// plugins/auth.ts
import { defineNuxtPlugin } from '#app'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.client) {
        const { refreshToken, fetchUser } = useAuth()
        await refreshToken()
        await fetchUser()
    }
})