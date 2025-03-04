import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { useStorage, useRuntimeConfig } from '#imports'
import jwt from 'jsonwebtoken'

export default defineNitroPlugin((nitroApp) => {
    const storage = useStorage('rate-limits')
    const config = {
        maxRequests: 10, // الحد الأقصى للطلبات لكل IP
        intervalMs: 60 * 1000, // المدة الزمنية (دقيقة واحدة)
        paths: ['/api/**'], // التطبيق على جميع مسارات API
        headers: true // إضافة هيدرات لمعدل الحد
    }

    nitroApp.hooks.hook('request', async (event) => {
        const ip = event.node.req.socket.remoteAddress || 'unknown-ip'
        const path = event.node.req.url

        // **استثناء المسارات الإدارية بالكامل**
        if (path.startsWith('/api/admin')) return

        // **استخراج التوكن من الهيدر**
        const authHeader = event.node.req.headers['authorization']
        let isAdmin = false

        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]
            try {
                const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret)
                isAdmin = decoded?.isAdmin || false // التأكد من أن `isAdmin` موجود
            } catch (err) {
                console.error('JWT Verification Error:', err.message)
            }
        }

        // **استثناء المشرفين من الحد**
        if (isAdmin) {
            console.log(`Skipping rate limit for admin user at IP: ${ip}`)
            return
        }

        // إنشاء مفتاح التخزين
        const key = `rate-limit:${ip}:${path}`

        // استرجاع عدد الطلبات الحالية
        let current = await storage.getItem(key)
        if (!current) {
            current = { count: 0, expiresAt: Date.now() + config.intervalMs }
        }

        // إعادة التهيئة إذا انتهت المدة
        if (Date.now() > current.expiresAt) {
            current.count = 0
            current.expiresAt = Date.now() + config.intervalMs
        }

        // **التحقق من الحد**
        if (current.count >= config.maxRequests) {
            event.node.res.setHeader('Retry-After', Math.ceil((current.expiresAt - Date.now()) / 1000))

            // **إرسال خطأ 429**
            event.node.res.statusCode = 429
            event.node.res.statusMessage = 'Too Many Requests'
            event.node.res.end(JSON.stringify({
                message: `تم تجاوز الحد الأقصى. حاول مرة أخرى بعد ${Math.ceil((current.expiresAt - Date.now()) / 1000)} ثانية`
            }))

            return // إيقاف المعالجة
        }

        // زيادة العداد
        current.count++
        await storage.setItem(key, current)

        // **إضافة هيدرات الحد**
        if (config.headers) {
            event.node.res.setHeader('X-RateLimit-Limit', config.maxRequests)
            event.node.res.setHeader('X-RateLimit-Remaining', config.maxRequests - current.count)
            event.node.res.setHeader('X-RateLimit-Reset', Math.ceil(current.expiresAt / 1000))
        }
    })
})
