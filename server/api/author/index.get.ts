import { Author } from '~/server/models/author.model'

export default defineEventHandler(async () => {
    try {
        const authors = await Author.find().sort({ name: 1 })
        return { authors }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Failed to fetch authors' })
    }
})