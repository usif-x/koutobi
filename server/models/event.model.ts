import { Schema, model } from 'mongoose'

const eventSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['order', 'product', 'user', 'login', 'register', 'edit']
    },
    details: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now }
})

export const Event = model('Event', eventSchema)