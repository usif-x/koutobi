import { Schema, model } from 'mongoose'

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bio: String,
    photo: String,
    website: String,
    createdAt: { type: Date, default: Date.now }
})

export const Author = model('Author', authorSchema)