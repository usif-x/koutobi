import { Category } from '~/server/models/category.model'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            throw createError({ statusCode: 404, message: 'Category not found' })
        }
        return { message: 'Category deleted successfully' }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Category deletion failed' })
    }
})