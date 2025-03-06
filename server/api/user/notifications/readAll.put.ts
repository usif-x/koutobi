import { UserNotification } from '~/server/models/userNotification.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user

    // Only authenticated users can mark notifications as read
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const result = await UserNotification.updateMany(
            {
                user: user._id,
                isRead: false
            },
            {
                $set: { isRead: true }
            }
        )

        return {
            message: 'All notifications marked as read',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to mark all notifications as read',
            data: error instanceof Error ? error.message : error
        })
    }
})