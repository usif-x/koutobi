import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { useStorage, useRuntimeConfig, createError } from '#imports'
import jwt from 'jsonwebtoken'

interface RateLimit {
    count: number
    expiresAt: number
    penalties: number
    lastViolation: number
}

export default defineNitroPlugin(async (nitroApp) => {
    const storage = useStorage('rate-limits')
    const config = {
        maxRequests: 10,
        baseIntervalMs: 60 * 1000, // 1 دقيقة
        maxPenalties: 5,
        penaltyReductionMs: 5 * 60 * 1000, // 5 دقائق
        excludedPaths: ['/api/admin']
    }

    nitroApp.hooks.hook('request', async (event) => {
        try {
            const path = event.path || ''
            if (!path.startsWith('/api/') || config.excludedPaths.some(p => path.startsWith(p))) {
                return
            }

            // استخراج التوكن من الهيدر
            const token = event.node.req.headers.authorization?.replace('Bearer ', '')
            if (!token) return

            let decoded: { userId?: string; isAdmin?: boolean; }
            try {
                decoded = jwt.verify(token, useRuntimeConfig().jwtSecret) as { userId?: string; isAdmin?: boolean; }
                if (decoded.isAdmin) return
                if (!decoded.userId) return
            } catch (error) {
                // Handle expired tokens gracefully
                if (error.name === 'TokenExpiredError') {
                    // Don't apply rate limiting to expired token requests
                    // This allows the client to request a new token without being rate limited
                    return
                }
                console.error('JWT verification error:', error)
                return
            }

            const baseApiPath = path.split('/').slice(0, 3).join('/')
            const key = `rate-limit:${decoded.userId}:${baseApiPath}`

            // جلب أو إنشاء السجل من Redis
            let limit = await storage.getItem<RateLimit>(key)
            const now = Date.now()

            if (!limit) {
                limit = {
                    count: 0,
                    expiresAt: now + config.baseIntervalMs,
                    penalties: 0,
                    lastViolation: 0
                }
            }

            // تقليل العقوبات إذا مر وقت كافٍ
            if (limit.penalties > 0 && now > limit.lastViolation + config.penaltyReductionMs) {
                limit.penalties = Math.max(0, limit.penalties - 1)
            }

            // إعادة تعيين العداد إذا انتهت المهلة
            if (now > limit.expiresAt) {
                limit.count = 0
                limit.expiresAt = now + (config.baseIntervalMs * Math.pow(2, limit.penalties))
            }

            // فحص ما إذا تم تجاوز الحد
            if (limit.count >= config.maxRequests) {
                limit.penalties = Math.min(config.maxPenalties, limit.penalties + 1)
                limit.lastViolation = now
                const blockDuration = config.baseIntervalMs * Math.pow(2, limit.penalties)
                limit.expiresAt = now + blockDuration

                await storage.setItem(key, limit)

                setRateLimitHeaders(event, {
                    limit: config.maxRequests,
                    remaining: 0,
                    reset: Math.ceil(limit.expiresAt / 1000),
                    penalties: limit.penalties
                })

                throw createError({
                    statusCode: 429,
                    statusMessage: 'Too Many Requests',
                    data: {
                        message: `تم تجاوز الحد الأقصى للطلبات. حاول مرة أخرى بعد ${Math.ceil(blockDuration / 1000)} ثانية`,
                        retryAfter: Math.ceil(blockDuration / 1000),
                        penalties: limit.penalties
                    }
                })
            }

            // تحديث العداد وحفظ البيانات
            limit.count++
            await storage.setItem(key, limit)

            setRateLimitHeaders(event, {
                limit: config.maxRequests,
                remaining: config.maxRequests - limit.count,
                reset: Math.ceil(limit.expiresAt / 1000),
                penalties: limit.penalties
            })

        } catch (err: any) {
            if (err.statusCode === 429) {
                return err
            }
            console.error('Rate limit error:', err.message)
        }
    })
})

// دالة لإعداد الهيدرات
function setRateLimitHeaders(event: any, {
    limit,
    remaining,
    reset,
    penalties
}: {
    limit: number,
    remaining: number,
    reset: number,
    penalties: number
}) {
    try {
        event.node.res.setHeader('X-RateLimit-Limit', String(limit))
        event.node.res.setHeader('X-RateLimit-Remaining', String(remaining))
        event.node.res.setHeader('X-RateLimit-Reset', String(reset))
        event.node.res.setHeader('X-RateLimit-Penalties', String(penalties))
    } catch (error) {
        console.error('Error setting headers:', error)
    }
}
