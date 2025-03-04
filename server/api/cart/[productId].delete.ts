import { Cart } from '~/server/models/cart.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const { productId } = event.context.params

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const cart = await Cart.findOne({ user: user._id })
        if (!cart) {
            throw createError({ statusCode: 404, message: 'Cart not found' })
        }

        // Remove item from cart
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        )

        await cart.save()

        return { message: 'Item removed from cart', cart }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to remove item from cart',
            data: error instanceof Error ? error.message : error
        })
    }
})