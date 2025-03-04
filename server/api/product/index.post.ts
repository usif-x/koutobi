import { Product } from '~/server/models/product.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const admin = event.context.admin

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

    // Validate year for study books
    if (body.category === 'study') {
        if (!body.year) {
            throw createError({ statusCode: 400, message: 'Year is required for study books' })
        }
        if (![1, 2, 3, 4, 5, 6].includes(body.year)) {
            throw createError({ statusCode: 400, message: 'Year must be between 1 and 6' })
        }
    } else if (body.year) {
        throw createError({ statusCode: 400, message: 'Year is only allowed for study category books' })
    }

    try {
        const product = await Product.create({
            ...body,
            createdBy: admin._id,
            price: parseFloat(body.price),
            discountPercentage: body.hasDiscount ? parseFloat(body.discountPercentage) : 0,
            year: body.category === 'study' ? parseInt(body.year) : undefined
        })

        await logEvent('product', {
            productId: product._id,
            name: product.name,
            price: product.price,
            addedBy: admin._id
        })

        return {
            message: 'Product creation successful',
            product
        }
    } catch (error) {
        console.error('Product creation error:', error)
        throw createError({
            statusCode: 500,
            message: 'Product creation failed',
            data: error instanceof Error ? error.message : error
        })
    }
})