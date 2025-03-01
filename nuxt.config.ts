// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/styles/tailwind.css','~/assets/styles/main.css'],
  pages: true,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_ADMIN_ID,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  modules: ['@pinia/nuxt'],
  components: true,
  build: {
    transpile: ['@iconify/vue','vue3-toastify'],
  },
})
