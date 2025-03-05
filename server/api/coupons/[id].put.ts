import { Coupon } from '~/server/models/coupon.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const { id } = event.context.params

    try {
        const coupon = await Coupon.findByIdAndUpdate(
            id,
            {
                code: body.code,
                discount: parseFloat(body.discount),
                expiresAt: new Date(body.expiresAt),
                isForAllUsers: body.isForAllUsers,
                maxUsage: body.maxUsage
            },
            { new: true }
        )

        if (!coupon) {
            throw createError({ statusCode: 404, message: 'Coupon not found' })
        }

        await logEvent('coupon', {
            couponId: coupon._id,
            code: coupon.code,
            updatedBy: admin._id
        })

        return {
            message: 'Coupon updated successfully',
            coupon
        }
    } catch (error) {
        console.error('Coupon update error:', error)
        throw createError({
            statusCode: 500,
            message: 'Coupon update failed',
            data: error instanceof Error ? error.message : error
        })
    }
})