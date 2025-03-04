import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0 },
    images: [{ type: String }],
    author: { type: String, required: true },
    hasDiscount: { type: Boolean, default: false },
    discountPercentage: { type: Number, min: 0, max: 100 },
    visible: { type: Boolean, default: true },
    isAllowCoupon: { type: Boolean, default: false },
    bookType: {
        type: String,
        enum: ['paperback', 'hardcover', 'ebook', 'audiobook'],
        required: true
    },
    category: {
        type: String,
        enum: ['study', 'story', 'academic', 'children', 'biography'], // Allowed values
        required: true
    },
    metadata: {
        publisher: String,
        publicationDate: Date,
        isbn: String,
        pages: Number,
        language: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true })

export const Product = model('Product', productSchema)