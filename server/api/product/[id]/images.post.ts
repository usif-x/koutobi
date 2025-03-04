// server/api/products/[id]/images.post.ts
import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const { imageUrl } = await readBody(event)
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { $push: { images: imageUrl } },
            { new: true }
        )

        if (!product) {
            throw createError({ statusCode: 404, message: 'Product not found' })
        }

        return {
            success: true,
            message: 'Image added to product',
            product
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to save image',
            data: error
        })
    }
})