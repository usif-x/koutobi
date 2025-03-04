import { User } from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        // Get user with populated wishlist
        const userWithWishlist = await User.findById(user._id).populate('wishlist')
        return {
            wishlist: userWithWishlist.wishlist
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch wishlist',
            data: error instanceof Error ? error.message : error
        })
    }
})