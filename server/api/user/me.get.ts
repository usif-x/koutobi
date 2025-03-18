import { User } from '~/server/models/user.model'

export default defineEventHandler(async (event) => {
    try {
        // Middleware will attach user to context if authenticated
        const user = event.context.user

        if (!user) {
            throw createError({
                statusCode: 401,
                message: 'Unauthorized'
            })
        }

        // Return user details without sensitive information
        return {
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                primaryPhone: user.primaryPhone,
                address: user.address,
                secondaryPhone: user.secondaryPhone,
                createdAt: user.createdAt,
            }
        }
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }
})