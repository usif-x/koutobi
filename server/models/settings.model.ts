import { Schema, model, Document } from 'mongoose'

export interface Settings extends Document {
    websiteStatus: 'online' | 'maintenance' | 'offline'
    accountStatusAuto: 'pending' | 'active'
    defaultCurrency: string
    booksPerPage: number
    allowCoupons: boolean
    allowGuestCheckout: boolean
    enableReviews: boolean
    showUserWallet: boolean
    paymentTypes: {
        fromUserWallet: boolean
        creditCard: boolean
        fawry: boolean
        vodafone: boolean
    }
    supportContact: {
        email: string
        phone: string
    }
    taxRate: number
    shippingFee: number
    createdAt: Date
    updatedAt: Date
}

const settingsSchema = new Schema<Settings>({
    websiteStatus: {
        type: String,
        enum: ['online', 'maintenance', 'offline'],
        default: 'online'
    },
    accountStatusAuto: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending'
    },
    defaultCurrency: {
        type: String,
        default: 'EGP'
    },
    booksPerPage: {
        type: Number,
        default: 10
    },
    allowCoupons: {
        type: Boolean,
        default: true
    },
    allowGuestCheckout: {
        type: Boolean,
        default: true
    },
    enableReviews: {
        type: Boolean,
        default: true
    },
    showUserWallet: {
        type: Boolean,
        default: true
    },
    paymentTypes: {
        fromUserWallet: {
            type: Boolean,
            default: true
        },
        creditCard: {
            type: Boolean,
            default: true
        },
        fawry: {
            type: Boolean,
            default: true
        },
        vodafone: {
            type: Boolean,
            default: true
        }
    },
    supportContact: {
        email: {
            type: String,
            default: 'support@kotoubi.shop'
        },
        phone: {
            type: String,
            default: '+1-234-567-890'
        }
    },
    taxRate: {
        type: Number,
        default: 5
    },
    shippingFee: {
        type: Number,
        default: 2.99
    }
}, { timestamps: true })

export const SettingsModel = model<Settings>('Settings', settingsSchema)