import { Admin } from '~/server/models/admin.model'

export default defineNitroPlugin(async () => {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD

    if (!superAdminEmail || !superAdminPassword) {
        console.error('Super admin credentials missing in .env')
        return
    }

    try {
        const existingSuperAdmin = await Admin.findOne({ isInitialSuperAdmin: true })

        if (!existingSuperAdmin) {
            await Admin.create({
                name: 'Super Admin',
                email: superAdminEmail,
                password: superAdminPassword,
                role: 'superadmin',
                isInitialSuperAdmin: true
            })
            console.log('Initial super admin created')
        }
    } catch (error) {
        console.error('Error creating super admin:', error)
    }
})