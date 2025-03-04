import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const admin = event.context.admin

    // Only allow active admins
    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validation
    const requiredFields = ['name', 'price', 'description', 'author', 'bookType', 'category']
    for (const field of requiredFields) {
        if (!body[field]) {
            throw createError({ statusCode: 400, message: `${field} is required` })
        }
    }

    try {
        const product = await Product.create({
            ...body,
            createdBy: admin._id, // Track creating admin
            price: parseFloat(body.price),
            discountPercentage: body.hasDiscount ? parseFloat(body.discountPercentage) : 0
        })

        return {
            message: 'Product creation successful',
            product
        }
    } catch (error) {
        console.error('Product creation error:', error) // Log the full error
        throw createError({
            statusCode: 500,
            message: 'Product creation failed',
            data: error instanceof Error ? error.message : error // Include error details
        })
    }
})