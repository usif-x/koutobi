import { Order } from '~/server/models/order.model'
import { Cart } from '~/server/models/cart.model'
import { Product } from '~/server/models/product.model'
import { logEvent } from '~/server/utils/logger'
import { UserNotification } from '~/server/models/userNotification.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const cart = await Cart.findOne({ user: user._id }).populate('items.product')
        if (!cart || cart.items.length === 0) {
            throw createError({ statusCode: 400, message: 'Cart is empty' })
        }

        // Calculate total and prepare order items
        let total = 0
        const orderItems = cart.items.map((item) => {
            const product = item.product
            const price = product.price * (1 - (product.discountPercentage || 0) / 100)
            total += price * item.quantity

            return {
                product: product._id,
                quantity: item.quantity,
                price: product.price
            }
        })

        // Create order
        const order = await Order.create({
            user: user._id,
            items: orderItems,
            total,
            status: 'pending'
        })

        // Clear the cart
        await Cart.deleteOne({ user: user._id })
        await $fetch('/api/orders/notify', {
            method: 'POST',
            body: { orderId: order._id }
        })
        await logEvent('order', {
            orderId: order._id,
            userId: user._id,
            total: order.total,
            status: order.status
        })
        await UserNotification.create({
            user: user._id,
            title: 'Order Created',
            description: `Your order #${order._id.toString().slice(-6).toUpperCase()} has been placed successfully.`,
            eventType: 'order_created'
        })
        return { message: 'Order created successfully', order }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to create order',
            data: error instanceof Error ? error.message : error
        })
    }
})