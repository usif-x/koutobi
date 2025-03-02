import mongoose from 'mongoose';

export async function connectToDatabase() {
    const config = useRuntimeConfig();

    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}