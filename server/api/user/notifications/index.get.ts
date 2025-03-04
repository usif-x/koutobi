import { UserNotification } from '~/server/models/userNotification.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user

    // Only authenticated users can view their notifications
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const notifications = await UserNotification.find({ user: user._id })
            .sort({ createdAt: -1 }) // Latest first
            .limit(50) // Last 50 notifications

        return { notifications }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch notifications',
            data: error instanceof Error ? error.message : error
        })
    }
})