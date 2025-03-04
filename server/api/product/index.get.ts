import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const { id } = getQuery(event)

    if (id) {
        const product = await Product.findById(id)
        if (!product) throw createError({ statusCode: 404, message: 'Product not found' })
        return product
    }

    // Add pagination and filtering
    const products = await Product.find({ visible: true })
        .sort({ createdAt: -1 })
        .select('-__v -createdBy') // Exclude internal fields

    return { count: products.length, products }
})