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
    // pageTransition: {
    //   name: 'page',
    //   mode: 'out-in'
    // },
    layoutTransition: false,
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
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    mongoUri: process.env.MONGO_URI,
    imgbbApiKey: process.env.IMGBB_API_KEY,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    },
  },
  modules: ['@pinia/nuxt'],
  components: true,
  build: {
    transpile: ['@iconify/vue','vue3-toastify','sweetalert2'],
  },
  nitro: {
    preset: "cloudflare_pages", 
    prerender: {
      autoSubfolderIndex: false,
    },
    plugins: ['~/server/plugins/mongodb.ts','~/server/plugins/rateLimit.ts'],
    storage: {
      'rate-limits': {
        driver: 'redis',
        url: process.env.REDIS_URL || 'redis://default:mMISvW9MfADr1OoKzLAYiPAHui08OP7Q@redis-16157.c14.us-east-1-3.ec2.redns.redis-cloud.com:16157'
      }
    },
  }
})