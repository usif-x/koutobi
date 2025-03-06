import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { useStorage, useRuntimeConfig } from '#imports'
import jwt from 'jsonwebtoken'

export default defineNitroPlugin(async (nitroApp) => {
    const storage = useStorage('rate-limits') // الآن يستخدم Redis من nitro.storage
    const config = {
        maxRequests: 10,
        intervalMs: 60 * 1000,
        paths: ['/api/**'],
        headers: true
    }

    nitroApp.hooks.hook('request', async (event) => {
        const ip = event.node.req.socket.remoteAddress || 'unknown-ip'
        const path = event.node.req.url

        if (path.startsWith('/api/admin')) return

        const authHeader = event.node.req.headers['authorization']
        let isAdmin = false

        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]
            try {
                const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret)
                isAdmin = decoded?.isAdmin || false
            } catch (err) {
                console.error('JWT Verification Error:', err.message)
            }
        }

        if (isAdmin) {
            console.log(`Skipping rate limit for admin user at IP: ${ip}`)
            return
        }

        const key = `rate-limit:${ip}:${path}`
        let current = await storage.getItem(key)

        if (!current) {
            current = { count: 0, expiresAt: Date.now() + config.intervalMs }
        }

        if (Date.now() > current.expiresAt) {
            current.count = 0
            current.expiresAt = Date.now() + config.intervalMs
        }

        if (current.count >= config.maxRequests) {
            event.node.res.setHeader('Retry-After', Math.ceil((current.expiresAt - Date.now()) / 1000))
            event.node.res.statusCode = 429
            event.node.res.statusMessage = 'Too Many Requests'
            event.node.res.end(JSON.stringify({
                message: `تم تجاوز الحد الأقصى. حاول مرة أخرى بعد ${Math.ceil((current.expiresAt - Date.now()) / 1000)} ثانية`
            }))
            return
        }

        current.count++
        await storage.setItem(key, current)

        if (config.headers) {
            event.node.res.setHeader('X-RateLimit-Limit', config.maxRequests)
            event.node.res.setHeader('X-RateLimit-Remaining', config.maxRequests - current.count)
            event.node.res.setHeader('X-RateLimit-Reset', Math.ceil(current.expiresAt / 1000))
        }
    })
})
