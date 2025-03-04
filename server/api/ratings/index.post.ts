import { Rating } from '~/server/models/rating.model'
import { Product } from '~/server/models/product.model'
import { Order } from '~/server/models/order.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const body = await readBody(event)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validate input
    if (!body.productId || !body.rating || body.rating < 1 || body.rating > 5) {
        throw createError({ statusCode: 400, message: 'Invalid rating data' })
    }

    try {
        // Check if the user has a delivered order for this product
        const hasDeliveredOrder = await Order.exists({
            user: user._id,
            status: 'delivered',
            'items.product': body.productId
        })

        if (!hasDeliveredOrder) {
            throw createError({ statusCode: 403, message: 'You can only rate products you have received' })
        }

        // Check if the user has already rated this product
        const existingRating = await Rating.findOne({
            user: user._id,
            product: body.productId
        })

        if (existingRating) {
            throw createError({ statusCode: 400, message: 'You have already rated this product' })
        }

        // Create the rating
        const rating = await Rating.create({
            user: user._id,
            product: body.productId,
            rating: body.rating,
            comment: body.comment
        })

        // Update product's rating average and count
        const product = await Product.findById(body.productId)
        const totalRatings = product.ratingAverage * product.ratingCount + body.rating
        product.ratingCount += 1
        product.ratingAverage = totalRatings / product.ratingCount
        await product.save()

        return {
            message: 'Rating added successfully',
            rating
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to add rating',
            data: error instanceof Error ? error.message : error
        })
    }
})