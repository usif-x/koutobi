import { Event } from '~/server/models/event.model'

export const logEvent = async (type: string, details: any) => {
    try {
        await Event.create({ type, details })
    } catch (error) {
        console.error('Failed to log event:', error)
    }
}