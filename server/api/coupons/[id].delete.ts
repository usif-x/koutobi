import { Coupon } from '~/server/models/coupon.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const { id } = event.context.params

    try {
        const coupon = await Coupon.findByIdAndDelete(id)

        if (!coupon) {
            throw createError({ statusCode: 404, message: 'Coupon not found' })
        }

        await logEvent('coupon', {
            couponId: coupon._id,
            code: coupon.code,
            deletedBy: admin._id
        })

        return {
            message: 'Coupon deleted successfully',
            coupon
        }
    } catch (error) {
        console.error('Coupon deletion error:', error)
        throw createError({
            statusCode: 500,
            message: 'Coupon deletion failed',
            data: error instanceof Error ? error.message : error
        })
    }
})