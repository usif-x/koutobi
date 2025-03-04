import { User } from '~/server/models/user.model'
import { generateTokens } from '~/server/utils/auth'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validation
    if (!body.firstName || !body.lastName || !body.email || !body.password || !body.primaryPhone) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields'
        })
    }

    if (body.password.length < 8) {
        throw createError({
            statusCode: 400,
            message: 'Password must be at least 8 characters'
        })
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({
            $or: [
                { email: body.email },
                { primaryPhone: body.primaryPhone }
            ]
        })

        if (existingUser) {
            throw createError({
                statusCode: 409,
                message: 'Email or phone number already exists'
            })
        }

        // Create new user
        const newUser = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            primaryPhone: body.primaryPhone,
            tokenVersion: 0
        })

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(
            newUser._id.toString(),
            newUser.tokenVersion
        )
        await logEvent('register', {
            userId: newUser._id,
            email: newUser.email,
            name: `${newUser.firstName} ${newUser.lastName}`
        })

        return {
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            },
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Registration failed',
            data: error
        })
    }
})