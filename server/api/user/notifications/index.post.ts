import { UserNotification } from '~/server/models/userNotification.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const body = await readBody(event)

    // Only authenticated users can create notifications for themselves
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validate input
    if (!body.title || !body.description || !body.eventType) {
        throw createError({ statusCode: 400, message: 'Title, description, and event type are required' })
    }

    try {
        const notification = await UserNotification.create({
            user: user._id,
            title: body.title,
            description: body.description,
            eventType: body.eventType
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