
import { Token } from '~/server/models/token.model'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const authHeader = event.node.req.headers.authorization
    const accessToken = authHeader?.split(' ')[1]

    if (!accessToken) {
        throw createError({ statusCode: 400, message: 'Access token required' })
    }

    try {
        // Verify and decode token to get user ID
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as { userId: string }

        // Add access token to blocklist
        await Token.create({
            token: accessToken,
            userId: decoded.userId
        })

        return { message: 'Logout successful' }
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Invalid token' })
    }
})