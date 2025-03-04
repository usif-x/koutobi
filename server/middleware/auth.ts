import { User } from '~/server/models/user.model'
import { Admin } from '~/server/models/admin.model'
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
            isAdmin: boolean
        }

        // Handle admin authentication
        if (decoded.isAdmin) {
            const admin = await Admin.findById(decoded.userId)
            if (!admin || admin.status !== 'active') {
                throw createError({ statusCode: 401, message: 'Invalid admin token' })
            }
            event.context.admin = admin
            return
        }

        // Handle regular user authentication
        const user = await User.findById(decoded.userId)
        if (!user || user.tokenVersion !== decoded.tokenVersion) {
            throw createError({ statusCode: 401, message: 'Invalid token' })
        }

        // Attach user to context
        event.context.user = user
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
            data: error instanceof Error ? error.message : error
        })
    }
})