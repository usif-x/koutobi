import { Notification } from '~/server/models/notification.model'

export default defineEventHandler(async (event) => {
    try {
        const notifications = await Notification.find({
            expiryDate: { $gt: new Date() }
        })
            .select('-_id') // Exclude the _id field
            .sort({ createdAt: -1 })
            .lean() // Convert to plain JavaScript objects

        return { notifications }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch notifications',
            data: error instanceof Error ? error.message : error
        })
    }
})