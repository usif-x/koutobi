import mongoose from 'mongoose'
import { Product } from './product.model' // Importing to ensure registration

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
})

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema]
}, { timestamps: true })

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)