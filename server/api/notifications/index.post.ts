import { Notification } from '~/server/models/notification.model'

export default defineEventHandler(async (event) => {
    const admin = event.context.admin
    const body = await readBody(event)

    // Only admins can create notifications
    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validate input
    if (!body.title || !body.description || !body.expiryDate) {
        throw createError({ statusCode: 400, message: 'Title, description, and expiry date are required' })
    }

    try {
        const notification = await Notification.create({
            title: body.title,
            description: body.description,
            expiryDate: new Date(body.expiryDate)
        })

        return {
            message: 'Notification created successfully',
            notification
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to create notification',
            data: error instanceof Error ? error.message : error
        })
    }
})