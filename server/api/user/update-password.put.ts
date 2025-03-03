import { User } from '~/server/models/user.model'
import { Token } from '~/server/models/token.model'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const body = await readBody(event)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const currentUser = await User.findById(user._id)

        // Verify current password
        const validPassword = await currentUser.comparePassword(body.currentPassword)
        if (!validPassword) {
            throw createError({ statusCode: 401, message: 'Invalid current password' })
        }

        // Update password and increment token version
        currentUser.password = body.newPassword
        currentUser.tokenVersion += 1
        await currentUser.save()

        // Invalidate all previous tokens
        await Token.deleteMany({ userId: user._id })

        return { message: 'Password updated successfully' }
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Password update failed'
        })
    }
})