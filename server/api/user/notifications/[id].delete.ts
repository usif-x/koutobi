import { UserNotification } from '~/server/models/userNotification.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const { id } = event.context.params

    // Only authenticated users can delete their notifications
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const notification = await UserNotification.findOneAndDelete({
            _id: id,
            user: user._id
        })

        if (!notification) {
            throw createError({ statusCode: 404, message: 'Notification not found' })
        }

        return {
            message: 'Notification deleted successfully'
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to delete notification',
            data: error instanceof Error ? error.message : error
        })
    }
})