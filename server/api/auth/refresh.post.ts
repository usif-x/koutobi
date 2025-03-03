import { User } from '~/server/models/user.model'
import { Token } from '~/server/models/token.model'
import { generateTokens } from '~/server/utils/auth'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const refreshToken = body.refreshToken

    if (!refreshToken) {
        throw createError({ statusCode: 400, message: 'Refresh token required' })
    }

    try {
        // Check if refresh token is already blocked
        const isBlocked = await Token.exists({ token: refreshToken })
        if (isBlocked) {
            throw createError({ statusCode: 401, message: 'Token revoked' })
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
            userId: string
            tokenVersion: number
        }

        // Find user and validate token version
        const user = await User.findById(decoded.userId)
        if (!user || user.tokenVersion !== decoded.tokenVersion) {
            throw createError({ statusCode: 401, message: 'Invalid refresh token' })
        }

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            user._id.toString(),
            user.tokenVersion
        )

        // Block the previous refresh token
        await Token.create({
            token: refreshToken,
            userId: user._id
        })

        return {
            accessToken,
            refreshToken: newRefreshToken
        }
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Invalid refresh token',
            data: error
        })
    }
})