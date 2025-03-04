import { Rating } from '~/server/models/rating.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const ratings = await Rating.find({ user: user._id }).populate('product')
        return { ratings }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch user ratings',
            data: error instanceof Error ? error.message : error
        })
    }
})