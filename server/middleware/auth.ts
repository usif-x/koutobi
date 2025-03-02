import jwt from 'jsonwebtoken';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const publicRoutes = [
        '/api/auth/login',
        '/api/auth/register',
        '/login',
        '/signup',
        '/'  // Add root path as public
    ];

    const path = event.node.req.url;

    // Skip auth for public routes
    if (publicRoutes.some(route => path?.startsWith(route))) {
        return;
    }

    try {
        const token = getHeader(event, 'authorization')?.split(' ')[1];
        if (!token) {
            throw createError({ statusCode: 401, message: 'No token provided' });
        }

        const config = useRuntimeConfig();
        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
        event.context.auth = decoded;
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: error instanceof jwt.JsonWebTokenError
                ? 'Invalid token'
                : 'Authentication failed'
        });
    }
});