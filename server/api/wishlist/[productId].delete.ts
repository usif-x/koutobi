import { User } from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const { productId } = event.context.params

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        // Remove product from wishlist
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $pull: { wishlist: productId } }, // Remove the product ID
            { new: true }
        ).populate('wishlist')

        return {
            message: 'Product removed from wishlist',
            wishlist: updatedUser.wishlist
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to remove product from wishlist',
            data: error instanceof Error ? error.message : error
        })
    }
})