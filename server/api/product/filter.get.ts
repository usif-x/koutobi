import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    // Build filter object
    let filter: any = {}

    // إذا لم يكن all=true، قم بتطبيق الفلاتر
    if (query.all !== 'true') {
        filter.visible = true

        // Text search (name and description)
        if (query.search) {
            filter.$text = { $search: query.search.toString() }
        }

        // Discount filter
        if (query.hasDiscount === 'true') {
            filter.hasDiscount = true
            filter.discountPercentage = { $gt: 0 }
        }

        // Price range
        if (query.minPrice || query.maxPrice) {
            filter.price = {}
            if (query.minPrice) filter.price.$gte = parseFloat(query.minPrice.toString())
            if (query.maxPrice) filter.price.$lte = parseFloat(query.maxPrice.toString())
        }

        // Category filter (multiple categories allowed)
        if (query.categories) {
            filter.category = { $in: query.categories.toString().split(',') }
        }

        // Author filter (multiple authors allowed)
        if (query.authors) {
            filter.author = { $in: query.authors.toString().split(',') }
        }

        // Book type filter (multiple types allowed)
        if (query.bookTypes) {
            filter.bookType = { $in: query.bookTypes.toString().split(',') }
        }

        // Availability filter
        if (query.available === 'true') {
            filter.available = true
        } else if (query.available === 'false') {
            filter.available = false
        }

        // Visibility filter
        if (query.visible === 'false') {
            filter.visible = false
        }
    }

    // Build sort object
    let sort: any = { createdAt: -1 } // Default: newest first
    if (query.sort) {
        switch (query.sort.toString()) {
            case 'price-asc':
                sort = { price: 1 }
                break
            case 'price-desc':
                sort = { price: -1 }
                break
            case 'discount':
                sort = { discountPercentage: -1 }
                break
            case 'popular':
                sort = { purchases: -1 } // Assuming you have a 'purchases' field
                break
            case 'newest':
                sort = { createdAt: -1 }
                break
            case 'oldest':
                sort = { createdAt: 1 }
                break
        }
    }

    // Pagination
    const page = parseInt(query.page?.toString() || '1')
    const limit = parseInt(query.limit?.toString() || '20')
    const skip = (page - 1) * limit

    try {
        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .select('-__v -createdBy'), // Exclude internal fields
            Product.countDocuments(filter)
        ])

        return {
            total,
            page,
            pages: Math.ceil(total / limit),
            products
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch products',
            data: error instanceof Error ? error.message : error
        })
    }
})
