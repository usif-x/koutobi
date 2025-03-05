import { Coupon } from '~/server/models/coupon.model'
import { User } from '~/server/models/user.model'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    // Log headers for debugging
    const headers = getHeaders(event)
    console.log('Headers:', headers)

    // Extract the Bearer token from the Authorization header
    const authHeader = headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({ statusCode: 401, message: 'Unauthorized: Missing or invalid token' })
    }
    const authToken = authHeader.split(' ')[1]

    // Log the token for debugging
    console.log('Auth token:', authToken)

    // Read and log the request body
    const body = await readBody(event)
    console.log('Request body:', body)

    const { couponCode } = body

    if (!couponCode) {
        throw createError({ statusCode: 400, message: 'Coupon code is required' })
    }

    try {
        // Decode the auth token to get the user ID
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET) as { _id: string }
        const userId = decoded._id

        // Find the user to ensure they exist
        const user = await User.findById(userId)
        if (!user) {
            throw createError({ statusCode: 404, message: 'User not found' })
        }

        // Find the coupon
        const coupon = await Coupon.findOne({ code: couponCode })

        if (!coupon) {
            throw createError({ statusCode: 404, message: 'Coupon not found' })
        }

        // Check if the coupon is expired
        if (coupon.expiresAt < new Date()) {
            throw createError({ statusCode: 400, message: 'Coupon has expired' })
        }

        // Check if the coupon is restricted to unique users and has already been used by this user
        if (!coupon.isForAllUsers && coupon.usedBy.includes(userId)) {
            throw createError({ statusCode: 400, message: 'You have already used this coupon' })
        }

        // Check if the coupon has reached its maximum usage limit
        if (coupon.usedBy.length >= coupon.maxUsage) {
            throw createError({ statusCode: 400, message: 'Coupon usage limit reached' })
        }

        // Add the user to the usedBy array and save the coupon
        coupon.usedBy.push(userId)
        await coupon.save()

        return {
            message: 'Coupon applied successfully',
            coupon
        }
    } catch (error) {
        console.error('Coupon application error:', error)
        if (error.name === 'JsonWebTokenError') {
            throw createError({ statusCode: 401, message: 'Invalid token' })
        }
        if (error.name === 'TokenExpiredError') {
            throw createError({ statusCode: 401, message: 'Token expired' })
        }
        throw createError({
            statusCode: 500,
            message: 'Failed to apply coupon',
            data: error instanceof Error ? error.message : error
        })
    }
})