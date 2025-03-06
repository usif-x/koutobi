import { Schema, model } from 'mongoose'

const userNotificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventType: {
        type: String,
        required: true,
        enum: ['order_created', 'order_updated', 'order_delivered', 'promotion', 'other','admin_note','info']
    },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

export const UserNotification = model('UserNotification', userNotificationSchema)