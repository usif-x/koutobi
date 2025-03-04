import { Author } from '~/server/models/author.model'

export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const admin = event.context.admin

    if (!admin) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    try {
        const author = await Author.findByIdAndDelete(id)
        if (!author) {
            throw createError({ statusCode: 404, message: 'Author not found' })
        }
        return { message: 'Author deleted successfully' }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Author deletion failed' })
    }
})