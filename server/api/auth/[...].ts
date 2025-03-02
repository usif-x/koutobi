import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import TokenBlocklist from '../../models/TokenBlocklist';
import { connectToDatabase } from '../../utils/db';

export default defineEventHandler(async (event) => {
    await connectToDatabase();
    const config = useRuntimeConfig();

    // Register
    if (event.node.req.url === '/api/auth/register' && event.node.req.method === 'POST') {
        const body = await readBody(event);

        const userExists = await User.findOne({
            $or: [{ email: body.email }, { number: body.number }]
        });
        if (userExists) throw createError({ statusCode: 400, message: 'User already exists' });

        const user = await User.create(body);
        return { message: 'User registered successfully', userId: user._id };
    }

    // Login
    if (event.node.req.url === '/api/auth/login' && event.node.req.method === 'POST') {
        const { login, password } = await readBody(event);

        const user = await User.findOne({
            $or: [{ email: login }, { number: login }]
        });
        if (!user) throw createError({ statusCode: 400, message: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw createError({ statusCode: 400, message: 'Invalid credentials' });

        // Block previous tokens
        const oldTokens = await TokenBlocklist.find({ userId: user._id });
        if (oldTokens.length) {
            await TokenBlocklist.insertMany(oldTokens);
        }

        const token = jwt.sign(
            { userId: user._id.toString() }, // Ensure userId is a string
            config.jwtSecret,
            { expiresIn: '7d' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id.toString() }, // Ensure userId is a string
            config.jwtRefreshSecret,
            { expiresIn: '10d' }
        );
        return { token, refreshToken };
    }

    // Get user data
    if (event.node.req.url === '/api/auth/me' && event.node.req.method === 'GET') {
        const user = await User.findById(event.context.auth.userId).select('-password');
        if (!user) throw createError({ statusCode: 404, message: 'User not found' });
        return user;
    }

    // Update user
    if (event.node.req.url === '/api/auth/update' && event.node.req.method === 'PUT') {
        const body = await readBody(event);
        const updatedUser = await User.findByIdAndUpdate(
            event.context.auth.userId,
            { $set: body },
            { new: true }
        ).select('-password');
        if (!updatedUser) throw createError({ statusCode: 404, message: 'User not found' });
        return updatedUser;
    }

    // Update password
    if (event.node.req.url === '/api/auth/password' && event.node.req.method === 'PUT') {
        const { currentPassword, newPassword } = await readBody(event);
        const user = await User.findById(event.context.auth.userId);
        if (!user) throw createError({ statusCode: 404, message: 'User not found' });

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) throw createError({ statusCode: 400, message: 'Invalid current password' });

        user.password = newPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    }

    throw createError({ statusCode: 404, message: 'API endpoint not found' });
});