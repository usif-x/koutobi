import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params // Get the product ID from the URL
    const admin = event.context.admin // Get the authenticated admin

    // Check if admin is authenticated
    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        // Find and delete the product
        const product = await Product.findByIdAndDelete(id)

        // Check if product exists
        if (!product) {
            throw createError({ statusCode: 404, message: 'Product not found' })
        }

        return { message: 'Product deleted successfully' }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Product deletion failed',
            data: error instanceof Error ? error.message : error
        })
    }
})