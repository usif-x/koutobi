import { Notification } from '~/server/models/notification.model'

export default defineEventHandler(async (event) => {
    try {
        const notifications = await Notification.find({
            expiryDate: { $gt: new Date() } // Only show non-expired notifications
        }).sort({ createdAt: -1 }) // Latest first

        return { notifications }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch notifications',
            data: error instanceof Error ? error.message : error
        })
    }
})