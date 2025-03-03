import { User } from '~/server/models/user.model'
import { Token } from '~/server/models/token.model'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const authHeader = event.node.req.headers.authorization
    const accessToken = authHeader?.split(' ')[1]

    if (!accessToken) return // Continue without authentication

    try {
        // Check if token is blocked
        const isBlocked = await Token.exists({ token: accessToken })
        if (isBlocked) {
            throw createError({ statusCode: 401, message: 'Token revoked' })
        }

        // Verify access token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
            userId: string
            tokenVersion: number
        }

        // Validate user and token version
        const user = await User.findById(decoded.userId)
        if (!user || user.tokenVersion !== decoded.tokenVersion) {
            throw createError({ statusCode: 401, message: 'Invalid token' })
        }

        // Attach user to context
        event.context.user = user
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
})