import { Order } from '~/server/models/order.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 })
        return { orders }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch orders',
            data: error instanceof Error ? error.message : error
        })
    }
})