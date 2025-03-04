import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'admin'
    },
    isInitialSuperAdmin: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' }
}, { timestamps: true })

adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

adminSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password)
}

export const Admin = model('Admin', adminSchema)