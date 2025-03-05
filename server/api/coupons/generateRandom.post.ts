import { Coupon } from '~/server/models/coupon.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const body = await readBody(event)
    const count = parseInt(body.count) || 1 // Default to 1 coupon if count is not provided

    if (count < 1 || count > 100) {
        throw createError({ statusCode: 400, message: 'Count must be between 1 and 100' })
    }

    try {
        const coupons = []

        for (let i = 0; i < count; i++) {
            const code = generateCouponCode()
            const discount = generateRandomDiscount(5, 50)

            const coupon = await Coupon.create({
                code,
                discount,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default: Expires in 30 days
                isForAllUsers: true, // Default: Available for all users
                maxUsage: Infinity, // Default: Unlimited usage
                createdBy: admin._id
            })

            coupons.push(coupon)
        }

        await logEvent('coupon', {
            action: 'generate',
            count,
            generatedBy: admin._id
        })

        return {
            message: `${count} coupon(s) generated successfully`,
            coupons
        }
    } catch (error) {
        console.error('Coupon generation error:', error)
        throw createError({
            statusCode: 500,
            message: 'Coupon generation failed',
            data: error instanceof Error ? error.message : error
        })
    }
})

// Helper function to generate a random coupon code
function generateCouponCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = 'CP-'
    for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

// Helper function to generate a random discount between min and max
function generateRandomDiscount(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}