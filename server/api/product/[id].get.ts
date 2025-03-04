import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    try {
        const product = await Product.findById(id)
        if (!product) {
            throw createError({ statusCode: 404, message: 'Product not found' })
        }

        return {
            product: {
                ...product.toObject(),
                ratingAverage: product.ratingAverage,
                ratingCount: product.ratingCount
            }
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch product details',
            data: error instanceof Error ? error.message : error
        })
    }
})