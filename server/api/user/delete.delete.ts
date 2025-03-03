import { User } from '~/server/models/user.model'
import { Token } from '~/server/models/token.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        // Delete user and related tokens
        await Promise.all([
            User.findByIdAndDelete(user._id),
            Token.deleteMany({ userId: user._id })
        ])

        return { message: 'Account deleted successfully' }
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Account deletion failed'
        })
    }
})