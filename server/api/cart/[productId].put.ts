import { Cart } from '~/server/models/cart.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const { productId } = event.context.params
    const body = await readBody(event)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    if (!body.quantity || body.quantity < 1) {
        throw createError({ statusCode: 400, message: 'Invalid quantity' })
    }

    try {
        const cart = await Cart.findOne({ user: user._id })
        if (!cart) {
            throw createError({ statusCode: 404, message: 'Cart not found' })
        }

        // Find and update item quantity
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )

        if (itemIndex === -1) {
            throw createError({ statusCode: 404, message: 'Item not found in cart' })
        }

        cart.items[itemIndex].quantity = body.quantity
        await cart.save()

        return { message: 'Cart updated', cart }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to update cart',
            data: error instanceof Error ? error.message : error
        })
    }
})