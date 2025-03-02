import mongoose from 'mongoose';

const tokenBlocklistSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 } // Expires after 24h
});

export default mongoose.model('TokenBlocklist', tokenBlocklistSchema);