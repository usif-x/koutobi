import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    primaryPhone: { type: String, required: true, unique: true },
    secondaryPhone: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String
    },
    tokenVersion: { type: Number, default: 0 }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password)
}

export const User = model('User', userSchema)