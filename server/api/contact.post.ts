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

    const formattedMessage = `
🔔 *طلب تواصل جديد*

👤 *معلومات المرسل:*
• الاسم: \`${name}\`
• الهاتف: \`${phone}\`
• البريد: \`${email}\`

📝 *تفاصيل الرسالة:*
• الموضوع: \`${subject}\`

💬 *نص الرسالة:*
${message}

⏰ *وقت الإرسال:* 
${egyptDate}

`

    // Send to Telegram
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