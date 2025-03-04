// server/api/images/upload.post.ts
export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event)
    const apiKey = useRuntimeConfig().imgbbApiKey // Store in .env

    if (!files || !files.length) {
        throw createError({ statusCode: 400, message: 'No image provided' })
    }

    const file = files[0]
    if (!file.type?.startsWith('image/')) {
        throw createError({ statusCode: 400, message: 'Invalid file type' })
    }
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB

    if (file.data.length > MAX_SIZE) {
        throw createError({
            statusCode: 413,
            message: 'File size exceeds 5MB limit'
        })
    }

    try {
        const formData = new FormData()
        formData.append('image', new Blob([file.data]), file.filename)

        const response = await $fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            params: { key: apiKey },
            body: formData
        })

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Image upload failed',
            data: error
        })
    }
})