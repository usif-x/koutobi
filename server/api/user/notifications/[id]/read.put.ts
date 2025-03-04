import { UserNotification } from '~/server/models/userNotification.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const { id } = event.context.params

    // Only authenticated users can mark notifications as read
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const notification = await UserNotification.findOneAndUpdate(
            { _id: id, user: user._id },
            { isRead: true },
            { new: true }
        )

        if (!notification) {
            throw createError({ statusCode: 404, message: 'Notification not found' })
        }

        return {
            message: 'Notification marked as read',
            notification
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to mark notification as read',
            data: error instanceof Error ? error.message : error
        })
    }
})