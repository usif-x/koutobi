import { Schema, model } from 'mongoose'

const notificationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true }
})

export const Notification = model('Notification', notificationSchema)