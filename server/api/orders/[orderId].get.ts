import { Order } from '~/server/models/order.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const { orderId } = event.context.params

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const order = await Order.findOne({ _id: orderId, user: user._id }).populate('items.product')
        if (!order) {
            throw createError({ statusCode: 404, message: 'Order not found' })
        }

        return { order }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch order details',
            data: error instanceof Error ? error.message : error
        })
    }
})