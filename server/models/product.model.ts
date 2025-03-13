import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
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
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
    bookType: {
        type: String,
        enum: ['paperback', 'hardcover', 'ebook', 'audiobook','textbook'],
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    category: {
        type: String,
        enum: ['study', 'story', 'academic', 'children', 'biography'],
        required: true
    },
    year: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
        required: function() {
            return this.category === 'study'
        },
        validate: {
            validator: function(v: number) {
                return this.category === 'study' || v === undefined
            },
            message: 'Year is only allowed for study category books'
        }
    }
}, { timestamps: true })

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)