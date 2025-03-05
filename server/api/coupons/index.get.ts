import { Coupon } from '~/server/models/coupon.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const query = getQuery(event)

    // Pagination and filtering options
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const sortBy = query.sortBy as string || 'createdAt'
    const sortOrder = query.sortOrder as string || 'desc'
    const search = query.search as string || ''

    try {
        // Build the query for filtering
        const filter: any = {}
        if (search) {
            filter.$or = [
                { code: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        // Fetch coupons with pagination and sorting
        const coupons = await Coupon.find(filter)
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit)

        // Get the total count of coupons for pagination metadata
        const totalCoupons = await Coupon.countDocuments(filter)

        await logEvent('coupon', {
            action: 'list',
            listedBy: admin._id
        })

        return {
            message: 'Coupons fetched successfully',
            data: coupons,
            pagination: {
                page,
                limit,
                total: totalCoupons,
                totalPages: Math.ceil(totalCoupons / limit)
            }
        }
    } catch (error) {
        console.error('Coupon fetch error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch coupons',
            data: error instanceof Error ? error.message : error
        })
    }
})