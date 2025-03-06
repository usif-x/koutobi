import '~/server/models/product.model'
import '~/server/models/cart.model'
import { Cart } from '~/server/models/cart.model'
import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URI!)
        }

        const cart = await Cart.findOne({ user: user._id }).populate('items.product')

        if (!cart) {
            return { message: 'Cart is empty', cart: { items: [] } }
        }

        return { cart }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch cart',
            data: error instanceof Error ? error.message : error
        })
    }
})
