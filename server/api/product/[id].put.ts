import { Product } from '~/server/models/product.model'
import { logEvent } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
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

    try {
        // Get existing product first
        const existingProduct = await Product.findById(id)
        if (!existingProduct) {
            throw createError({ statusCode: 404, message: 'Product not found' })
        }

        // Validate year based on category
        const newCategory = body.category || existingProduct.category
        const newYear = body.year || existingProduct.year

        if (newCategory === 'study') {
            if (!newYear) {
                throw createError({ statusCode: 400, message: 'Year is required for study books' })
            }
            if (![1, 2, 3, 4, 5, 6].includes(newYear)) {
                throw createError({ statusCode: 400, message: 'Year must be between 1 and 6' })
            }
        } else {
            if (body.year) {
                throw createError({ statusCode: 400, message: 'Year is only allowed for study category books' })
            }
            // Remove year if changing from study to another category
            body.year = undefined
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...body,
                price: parseFloat(body.price),
                discountPercentage: body.hasDiscount ? parseFloat(body.discountPercentage) : 0,
                year: newCategory === 'study' ? parseInt(body.year) : undefined
            },
            { new: true, runValidators: true }
        )

        await logEvent('edit', {
            entity: 'product',
            updatedBy: admin._id,
            changes: body
        })

        return {
            message: 'Product updated successfully',
            product: updatedProduct
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Product update failed',
            data: error instanceof Error ? error.message : error
        })
    }
})