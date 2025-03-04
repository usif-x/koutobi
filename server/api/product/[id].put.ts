import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params // Get the product ID from the URL
    const body = await readBody(event) // Get the update data from the request body
    const admin = event.context.admin // Get the authenticated admin

    // Check if admin is authenticated
    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validate required fields
    const requiredFields = ['name', 'price', 'description', 'author', 'bookType', 'category']
    for (const field of requiredFields) {
        if (!body[field]) {
            throw createError({ statusCode: 400, message: `${field} is required` })
        }
    }

    try {
        // Find and update the product
        const product = await Product.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true } // Return the updated product and run validators
        )

        // Check if product exists
        if (!product) {
            throw createError({ statusCode: 404, message: 'Product not found' })
        }

        return {
            message: 'Product updated successfully',
            product
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Product update failed',
            data: error instanceof Error ? error.message : error
        })
    }
})