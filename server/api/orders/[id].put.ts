import { Order } from '~/server/models/order.model'
import { UserNotification } from '~/server/models/userNotification.model'
import { Product } from '~/server/models/product.model'

// Apply API key middleware
export default defineEventHandler(async (event) => {
    // Validate API key
    const apiKey = event.node.req.headers['x-api-key']
    if (!apiKey || apiKey !== process.env.SHIPPING_API_KEY) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized: Invalid API key'
        })
    }

    const { id } = event.context.params
    const body = await readBody(event)

    // Validate status update
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!body.status || !validStatuses.includes(body.status)) {
        throw createError({
            statusCode: 400,
            message: 'Valid status required: pending, processing, shipped, delivered, cancelled'
        })
    }

    try {
        // Find and update order
        const order = await Order.findById(id).populate('user')
        if (!order) {
            throw createError({ statusCode: 404, message: 'Order not found' })
        }

        // Validate status transition
        const statusFlow = {
            pending: ['processing', 'cancelled'],
            processing: ['shipped', 'cancelled'],
            shipped: ['delivered'],
            delivered: [],
            cancelled: []
        }

        if (!statusFlow[order.status].includes(body.status)) {
            throw createError({
                statusCode: 400,
                message: `Invalid status transition from ${order.status} to ${body.status}`
            })
        }

        // Update order status
        order.status = body.status
        const updatedOrder = await order.save()

        // Update product stock if delivered
        if (body.status === 'delivered') {
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stockCount: -item.quantity }
                })
            }
        }

        // Create user notification
        await UserNotification.create({
            user: order.user._id,
            title: 'Order Status Updated',
            description: `Your order #${order._id.toString().slice(-6).toUpperCase()} 
                    has been updated to: ${body.status}`,
            eventType: 'order_updated'
        })

        // Optional: Send Telegram notification to admins
        const config = useRuntimeConfig()
        if (body.status === 'delivered' && config.TELEGRAM_BOT_TOKEN) {
            await fetch(`https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: config.TELEGRAM_CHAT_ID,
                    text: `🚚 Order #${order._id.toString().slice(-6).toUpperCase()} delivered to ${order.user.email}`
                })
            })
        }

        return {
            message: 'Order updated successfully',
            order: updatedOrder
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to update order',
            data: error instanceof Error ? error.message : error
        })
    }
})