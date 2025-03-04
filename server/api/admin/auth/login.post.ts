import { Admin } from '~/server/models/admin.model'
import { generateTokens } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.email || !body.password) {
        throw createError({ statusCode: 400, message: 'Missing credentials' })
    }

    try {
        const admin = await Admin.findOne({ email: body.email })

        if (!admin || admin.status !== 'active') {
            throw createError({ statusCode: 401, message: 'Invalid credentials' })
        }

        const validPassword = await admin.comparePassword(body.password)
        if (!validPassword) {
            throw createError({ statusCode: 401, message: 'Invalid credentials' })
        }

        const { accessToken, refreshToken } = generateTokens(
            admin._id.toString(),
            0, // Token version
            true // isAdmin flag
        )

        return {
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            },
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Login failed' })
    }
})