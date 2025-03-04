import { Rating } from '~/server/models/rating.model'
import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const { ratingId } = event.context.params

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        // Find the rating
        const rating = await Rating.findById(ratingId)
        if (!rating) {
            throw createError({ statusCode: 404, message: 'Rating not found' })
        }

        // Check if the rating belongs to the user
        if (rating.user.toString() !== user._id.toString()) {
            throw createError({ statusCode: 403, message: 'You can only delete your own ratings' })
        }

        // Update product's rating average and count
        const product = await Product.findById(rating.product)
        const totalRatings = product.ratingAverage * product.ratingCount - rating.rating
        product.ratingCount -= 1
        product.ratingAverage = product.ratingCount > 0 ? totalRatings / product.ratingCount : 0
        await product.save()

        // Delete the rating
        await Rating.findByIdAndDelete(ratingId)

        return {
            message: 'Rating deleted successfully'
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to delete rating',
            data: error instanceof Error ? error.message : error
        })
    }
})