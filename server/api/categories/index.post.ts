import { Category } from '~/server/models/category.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    if (!body.name) {
        throw createError({ statusCode: 400, message: 'Category name required' })
    }

    try {
        const category = await Category.create({
            name: body.name,
            description: body.description
        })

        return {
            message: 'Category created successfully',
            category
        }
    } catch (error) {
        if (error.code === 11000) {
            throw createError({ statusCode: 409, message: 'Category already exists' })
        }
        throw createError({ statusCode: 500, message: 'Category creation failed' })
    }
})