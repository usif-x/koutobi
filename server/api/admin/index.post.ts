import { Admin } from '~/server/models/admin.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const currentAdmin = event.context.admin

    // Only superadmin can create new admins
    if (!currentAdmin || currentAdmin.role !== 'superadmin') {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const newAdmin = await Admin.create({
            ...body,
            createdBy: currentAdmin._id,
            role: 'admin'
        })

        return {
            message: 'Admin created successfully',
            admin: {
                _id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role
            }
        }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Admin creation failed' })
    }
})