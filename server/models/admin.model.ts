import { Schema, model } from 'mongoose'
// Change this import from 'bcrypt' to 'bcryptjs'
import bcrypt from 'bcryptjs'

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
        // This uses the imported bcrypt object, which is now bcryptjs
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

adminSchema.methods.comparePassword = async function (password: string) {
    // This also uses the imported bcrypt object
    return bcrypt.compare(password, this.password)
}

export const Admin = model('Admin', adminSchema)