import mongoose from 'mongoose'
import '~/server/models/product.model' // Ensure Product model is registered
import '~/server/models/cart.model' // Ensure Cart model is registered

export default defineNitroPlugin(async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
})
