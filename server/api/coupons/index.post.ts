import { Coupon } from '~/server/models/coupon.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validate required fields
    const requiredFields = ['code', 'discount', 'expiresAt']
    for (const field of requiredFields) {
        if (!body[field]) {
            throw createError({ statusCode: 400, message: `${field} is required` })
        }
    }

    try {
        const coupon = await Coupon.create({
            code: body.code,
            discount: parseFloat(body.discount),
            expiresAt: new Date(body.expiresAt),
            isForAllUsers: body.isForAllUsers || true,
            maxUsage: body.maxUsage || Infinity,
            createdBy: admin._id
        })

        await logEvent('coupon', {
            couponId: coupon._id,
            code: coupon.code,
            discount: coupon.discount,
            addedBy: admin._id
        })

        return {
            message: 'Coupon created successfully',
            coupon
        }
    } catch (error) {
        console.error('Coupon creation error:', error)
        throw createError({
            statusCode: 500,
            message: 'Coupon creation failed',
            data: error instanceof Error ? error.message : error
        })
    }
})