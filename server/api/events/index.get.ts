import { Event } from '~/server/models/event.model'

export default defineEventHandler(async (event) => {
    const admin = event.context.admin

    // Only admins can access event logs
    if (!admin || admin.role !== 'superadmin') {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const events = await Event.find()
            .sort({ createdAt: -1 }) // Latest first
            .limit(50) // Last 50 events

        return { events }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch events',
            data: error instanceof Error ? error.message : error
        })
    }
})