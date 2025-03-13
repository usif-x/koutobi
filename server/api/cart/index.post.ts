import { Cart } from '~/server/models/cart.model'
import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    const body = await readBody(event)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Validate input
    if (!body.productId || !body.quantity) {
        throw createError({ statusCode: 400, message: 'Product ID and quantity are required' })
    }

    // Define maximum allowed quantity per product
    const MAX_QUANTITY = 10

    try {
        // Check if product exists
        const product = await Product.findById(body.productId)
        if (!product) {
            throw createError({ statusCode: 404, message: 'Product not found' })
        }

        // Find or create user's cart
        let cart = await Cart.findOne({ user: user._id })
        if (!cart) {
            cart = await Cart.create({ user: user._id, items: [] })
        }

        // Check if product already exists in cart
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === body.productId
        )

        if (itemIndex > -1) {
            // Calculate new quantity
            const newQuantity = cart.items[itemIndex].quantity + body.quantity
            
            // Enforce maximum quantity limit
            if (newQuantity > MAX_QUANTITY) {
                throw createError({ 
                    statusCode: 400, 
                    message: `Maximum quantity of ${MAX_QUANTITY} per product exceeded` 
                })
            }
            
            // Update quantity if product exists
            cart.items[itemIndex].quantity = newQuantity
        } else {
            // Check if requested quantity exceeds maximum
            if (body.quantity > MAX_QUANTITY) {
                throw createError({ 
                    statusCode: 400, 
                    message: `Maximum quantity of ${MAX_QUANTITY} per product exceeded` 
                })
            }
            
            // Add new item to cart
            cart.items.push({ product: body.productId, quantity: body.quantity })
        }

        await cart.save()

        return { message: 'Item added to cart', cart }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to add item to cart',
            data: error instanceof Error ? error.message : error
        })
    }
})