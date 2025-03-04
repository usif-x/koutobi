import { Notification } from '~/server/models/notification.model'

export default defineEventHandler(async (event) => {
    const admin = event.context.admin
    const { id } = event.context.params
    const body = await readBody(event)

    // Only admins can edit notifications
    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const notification = await Notification.findByIdAndUpdate(
            id,
            {
                title: body.title,
                description: body.description,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined
            },
            { new: true }
        )

        if (!notification) {
            throw createError({ statusCode: 404, message: 'Notification not found' })
        }

        return {
            message: 'Notification updated successfully',
            notification
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to update notification',
            data: error instanceof Error ? error.message : error
        })
    }
})