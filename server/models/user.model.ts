import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SettingsModel } from './settings.model'; // استيراد إعدادات الموقع

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    primaryPhone: { type: String, required: true, unique: true },
    status: { type: String, default: 'pending' }, // سيتم تحديثه عند إنشاء المستخدم
    createdAt: { type: Date, default: Date.now },
    secondaryPhone: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String
    },
    tokenVersion: { type: Number, default: 0 },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

// 🔹 عند إنشاء مستخدم جديد، يتم جلب حالة الحساب من إعدادات الموقع
userSchema.pre('save', async function (next) {
    if (this.isNew) {
        const settings = await SettingsModel.findOne(); // جلب إعدادات الموقع
        if (settings) {
            this.status = settings.accountStatusAuto; // تعيين الحالة بناءً على الإعدادات
        }
    }

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

// 🔹 وظيفة للمقارنة بين كلمات المرور
userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export const User = model('User', userSchema);
