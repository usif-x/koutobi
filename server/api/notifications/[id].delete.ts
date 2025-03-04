import { Notification } from '~/server/models/notification.model'

export default defineEventHandler(async (event) => {
    const admin = event.context.admin
    const { id } = event.context.params

    // Only admins can delete notifications
    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const notification = await Notification.findByIdAndDelete(id)
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