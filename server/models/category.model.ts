import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: String,
    createdAt: { type: Date, default: Date.now }
})

export const Category = model('Category', categorySchema)