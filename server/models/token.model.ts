import { Schema, model } from 'mongoose'

const tokenSchema = new Schema({
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
})

// Create TTL index (auto-delete after 10 days)
tokenSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 10 * 24 * 60 * 60 // 10 days in seconds
})

export const Token = model('Token', tokenSchema)