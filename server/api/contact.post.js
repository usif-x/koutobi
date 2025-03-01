import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const body = await readBody(event)
        const { name, phone, email, subject, message } = body

        // Get Egypt timezone date
        const egyptDate = new Date().toLocaleString('ar-EG', {
            timeZone: 'Africa/Cairo',
            dateStyle: 'full',
            timeStyle: 'medium'
        });

        const escapeMarkdownV2 = (text) => {
            return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
        };

        const formattedMessage = `
🔔 *طلب تواصل جديد*

👤 *معلومات المرسل:*
• الاسم: ${escapeMarkdownV2(name)}
• الهاتف: \`${escapeMarkdownV2(phone)}\`
• البريد: \`${escapeMarkdownV2(email)}\`

📝 *تفاصيل الرسالة:*
• الموضوع: ${escapeMarkdownV2(subject)}

💬 *نص الرسالة:*
||${escapeMarkdownV2(message)}||

⏰ *وقت الإرسال:* 
${escapeMarkdownV2(egyptDate)}

👁️ *اضغط علي الرساله لرئِيتها*
`;


        const telegramResponse = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: config.TELEGRAM_CHAT_ID,
                text: formattedMessage,
                parse_mode: 'MarkdownV2'
            })
        });


        if (!telegramResponse.ok) {
            console.error('Telegram API Error:', await telegramResponse.text())
            throw new Error('فشل في إرسال الرسالة إلى النظام')
        }

        return {
            success: true,
            message: 'تم إرسال رسالتك بنجاح'
        }

    } catch (error) {
        console.error('Contact API Error:', error)
        return {
            success: false,
            message: error.message || 'حدث خطأ أثناء إرسال الرسالة'
        }
    }
})