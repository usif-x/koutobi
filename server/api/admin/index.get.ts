import { Admin } from '~/server/models/admin.model'

export default defineEventHandler(async (event) => {
    const superadmin = event.context.admin

    // Only superadmin can access the admin list
    if (!superadmin || superadmin.role !== 'superadmin') {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        // Fetch all admins (excluding sensitive fields)
        const admins = await Admin.find()
            .select('-password -__v -tokenVersion')
            .sort({ createdAt: -1 })

        return { admins }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch admin list',
            data: error instanceof Error ? error.message : error
        })
    }
})