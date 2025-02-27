// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/styles/tailwind.css','~/assets/styles/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'كُتُبِي - متجر الكتب العربية الأول، نوفر لك أحدث الكتب والمراجع بأفضل الأسعار، مع توصيل سريع.' },
        { name: 'keywords', content: 'كتب, متجر كتب, كتب, شراء كتب, كتب دراسية, كتب إلكترونية' },
        { name: 'author', content: 'Yousseif Muhammed / Telegram: @YousseifMuhammed' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_ADMIN_ID,
  },
  components: true,
  build: {
    transpile: ['@iconify/vue','vue3-toastify'],
  },
})
