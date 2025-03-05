import { Schema, model } from 'mongoose'

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isForAllUsers: {
        type: Boolean,
        default: true // By default, the coupon is available for all users
    },
    maxUsage: {
        type: Number,
        default: Infinity // By default, unlimited users can use the coupon
    },
    usedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: { type: Date, default: Date.now }
})

export const Coupon = model('Coupon', couponSchema)