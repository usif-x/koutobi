import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { useStorage } from '#imports'

export default defineNitroPlugin((nitroApp) => {
    const storage = useStorage('rate-limits')
    const config = {
        maxRequests: 10, // Requests per IP per window
        intervalMs: 60 * 1000, // 1 minute window
        paths: ['/**'], // Apply to all routes
        headers: true // Add rate limit headers
    }

    nitroApp.hooks.hook('request', async (event) => {
        const ip = event.node.req.socket.remoteAddress || 'unknown-ip'
        const path = event.node.req.url

        // Skip rate limiting for specific paths (optional)
        if (path.startsWith('/api/health')) return

        // Create storage key
        const key = `rate-limit:${ip}:${path}`

        // Get current count
        let current = await storage.getItem(key)
        if (!current) {
            current = { count: 0, expiresAt: Date.now() + config.intervalMs }
        }

        // Reset if expired
        if (Date.now() > current.expiresAt) {
            current.count = 0
            current.expiresAt = Date.now() + config.intervalMs
        }

        // Check limit
        if (current.count >= config.maxRequests) {
            event.node.res.setHeader('Retry-After', Math.ceil(
                (current.expiresAt - Date.now()) / 1000
            ))
            throw createError({
                statusCode: 429,
                statusMessage: 'Too Many Requests',
                message: `Rate limit exceeded. Try again in ${Math.ceil(
                    (current.expiresAt - Date.now()) / 1000
                )} seconds`
            })
        }

        // Increment count
        current.count++
        await storage.setItem(key, current)

        // Add headers if enabled
        if (config.headers) {
            event.node.res.setHeader('X-RateLimit-Limit', config.maxRequests)
            event.node.res.setHeader('X-RateLimit-Remaining', config.maxRequests - current.count)
            event.node.res.setHeader('X-RateLimit-Reset', Math.ceil(current.expiresAt / 1000))
        }
    })
})