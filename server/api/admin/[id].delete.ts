import { Admin } from '~/server/models/admin.model'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const currentAdmin = event.context.admin

    if (!currentAdmin || currentAdmin.role !== 'superadmin') {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const adminToDelete = await Admin.findById(id)

        if (adminToDelete?.isInitialSuperAdmin) {
            throw createError({ statusCode: 400, message: 'Cannot delete initial super admin' })
        }

        await Admin.findByIdAndDelete(id)

        return { message: 'Admin deleted successfully' }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Admin deletion failed' })
    }
})