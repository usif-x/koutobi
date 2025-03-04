import { Order } from '~/server/models/order.model'
import { User } from '~/server/models/user.model'
import { Product } from '~/server/models/product.model'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const body = await readBody(event)
        const order = await Order.findById(body.orderId)
            .populate('user')
            .populate('items.product')

        if (!order) {
            throw new Error('Order not found')
        }

        const user = order.user as typeof User
        const egyptDate = new Date().toLocaleString('ar-EG', {
            timeZone: 'Africa/Cairo',
            dateStyle: 'full',
            timeStyle: 'medium'
        })

        const escapeMarkdownV2 = (text: string) => {
            return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1')
        }

        // Format products list
        let productsText = ''
        order.items.forEach((item: any, index: number) => {
            productsText += `
📦 *المنتج ${index + 1}:*
   ➖ الاسم: ${escapeMarkdownV2(item.product.name)}
   ➖ الكمية: ${item.quantity}
   ➖ السعر: ${item.price.toFixed(2)} جنيه
   ➖ المجموع: ${(item.quantity * item.price).toFixed(2)} جنيه\n
`
        })

        const formattedMessage = `
🛎️ طلب جديد تم استلامه

👤 *معلومات العميل:*
   ➖ الاسم: ${user.firstName + ' ' + user.lastName}
   ➖ الهاتف: ${user.primaryPhone}
   ➖ البريد: ${user.email}

📦 *تفاصيل الطلب:*
   ➖ رقم الطلب: #${order._id.toString().slice(-6).toUpperCase()}
   ➖ الإجمالي: ${order.total.toFixed(2)} جنيه
   ➖ حالة الطلب: ${order.status}

📝 *المنتجات المطلوبة:*
${productsText}

⏰ *وقت الطلب:*
${egyptDate}

👉 *تفاصيل كاملة:* 
\`\`\`
${JSON.stringify(order.toObject(), null, 2)}
\`\`\`
`

        const telegramResponse = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: config.TELEGRAM_CHAT_ID,
                text: formattedMessage,
                parse_mode: 'Markdown'
            })
        })

        if (!telegramResponse.ok) {
            console.error('Telegram API Error:', await telegramResponse.text())
        }

        return { success: true }

    } catch (error) {
        console.error('Order notification error:', error)
        return { success: false }
    }
})