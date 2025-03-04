import { User } from '~/server/models/user.model'
import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const body = await readBody(event)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validate input
    if (!body.productId) {
        throw createError({ statusCode: 400, message: 'Product ID is required' })
    }

    try {
        // Check if product exists
        const product = await Product.findById(body.productId)
        if (!product) {
            throw createError({ statusCode: 404, message: 'Product not found' })
        }

        // Add product to wishlist if not already added
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { wishlist: body.productId } }, // Use $addToSet to avoid duplicates
            { new: true }
        ).populate('wishlist')

        return {
            message: 'Product added to wishlist',
            wishlist: updatedUser.wishlist
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to add product to wishlist',
            data: error instanceof Error ? error.message : error
        })
    }
})