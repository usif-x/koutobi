import { User } from '~/server/models/user.model'
import { generateTokens } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.identifier || !body.password) {
        throw createError({
            statusCode: 400,
            message: 'Missing email/phone or password'
        })
    }

    try {
        // Find user by email or phone
        const user = await User.findOne({
            $or: [
                { email: body.identifier },
                { primaryPhone: body.identifier }
            ]
        })

        if (!user) {
            throw createError({
                statusCode: 404,
                message: 'User not found'
            })
        }

        // Verify password
        const validPassword = await user.comparePassword(body.password)
        if (!validPassword) {
            throw createError({
                statusCode: 401,
                message: 'Invalid credentials'
            })
        }

        // Invalidate previous tokens by incrementing tokenVersion
        user.tokenVersion += 1
        await user.save()

        // Generate new tokens
        const { accessToken, refreshToken } = generateTokens(
            user._id.toString(),
            user.tokenVersion
        )

        return {
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Login failed',
            data: error
        })
    }
})