import { Author } from '~/server/models/author.model'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    if (!body.name) {
        throw createError({ statusCode: 400, message: 'Author name required' })
    }

    try {
        const author = await Author.create({
            name: body.name,
            bio: body.bio,
            photo: body.photo,
            website: body.website
        })

        return {
            message: 'Author created successfully',
            author
        }
    } catch (error) {
        if (error.code === 11000) {
            throw createError({ statusCode: 409, message: 'Author already exists' })
        }
        throw createError({ statusCode: 500, message: 'Author creation failed' })
    }
})