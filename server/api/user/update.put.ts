import { User } from '~/server/models/user.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const body = await readBody(event)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    address: {
                        street: body.address?.street || user.address?.street,
                        city: body.address?.city || user.address?.city,
                        state: body.address?.state || user.address?.state,
                        postalCode: body.address?.postalCode || user.address?.postalCode
                    },
                    secondaryPhone: body.secondaryPhone || user.secondaryPhone
                }
            },
            { new: true }
        )
        await logEvent('edit', {
            entity: 'user',
            updatedBy: user._id, // or user._id
            changes: body // The updated fields
        })

        return {
            user: {
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                primaryPhone: updatedUser.primaryPhone,
                address: updatedUser.address,
                secondaryPhone: updatedUser.secondaryPhone
            }
        }
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Profile update failed'
        })
    }
})