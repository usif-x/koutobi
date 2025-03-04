import { Category } from '~/server/models/category.model'

export default defineEventHandler(async () => {
    try {
        const categories = await Category.find().sort({ name: 1 })
        return { categories }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Failed to fetch categories' })
    }
})