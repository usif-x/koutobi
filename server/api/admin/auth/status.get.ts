import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized: Missing or invalid token'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        const response = { status: 'ok', userId: decoded.userId }

        if (decoded.isAdmin) {
            response.isAdmin = true
        }

        return response
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized: Invalid token'
        })
    }
})
