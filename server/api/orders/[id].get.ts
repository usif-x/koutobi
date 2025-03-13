import { Order } from '~/server/models/order.model'

export default defineEventHandler(async (event) => {
    const user = event.context.user
    
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    
    // Get orderId from params - using id instead of orderId
    const orderId = event.context.params
    
    console.log('Debug - Full params:', event.context.params)
    console.log('Debug - orderId:', orderId)
    
    if (!orderId) {
        throw createError({ 
            statusCode: 400, 
            message: 'Order ID is required' 
        })
    }

    try {
        console.log('Searching for order:', { orderId, userId: user._id })
        const order = await Order.findOne({ 
            _id: orderId.id,
            user: user._id 
        }).populate('items.product')
        
        if (!order) {
            console.log('Order not found for:', { orderId, userId: user._id })
            throw createError({ statusCode: 404, message: 'Order not found' })
        }

        return { order }
    } catch (error) {
        console.error('Error fetching order:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch order details',
            data: error instanceof Error ? error.message : error
        })
    }
})