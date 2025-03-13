// server/api/images/upload.post.ts
export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event)
    const apiKey = useRuntimeConfig().imgbbApiKey // Store in .env

    if (!files || !files.length) {
        throw createError({ statusCode: 400, message: 'No image provided' })
    }

    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    const imageUrls = []

    // Process all files instead of just the first one
    for (const file of files) {
        if (!file.type?.startsWith('image/')) {
            throw createError({ statusCode: 400, message: `Invalid file type: ${file.filename}` })
        }

        if (file.data.length > MAX_SIZE) {
            throw createError({
                statusCode: 413,
                message: `File size exceeds 5MB limit: ${file.filename}`
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

            // Add the URL to our array
            imageUrls.push(response.data.url)
        } catch (error) {
            throw createError({
                statusCode: 500,
                message: `Image upload failed: ${file.filename}`,
                data: error
            })
        }
    }

    return {
        success: true,
        imageUrls: imageUrls
    }
})