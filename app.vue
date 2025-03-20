<template>
  <div>
    <NuxtLoadingIndicator />
    <Notifications />
    <Analytics />
    <NuxtLayout>
      <div class="page-wrapper">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useHead } from '#imports'
import { useAuth } from '~/composables/useAuth'
import Notifications from '~/components/ui/Notifications.vue'
import { useAlerts } from '~/composables/useAlerts'
import { Analytics } from '@vercel/analytics/nuxt'
const { isAuthenticated } = useAuth()
const { normalToast } = useAlerts()

onMounted(() => {
  if (!isAuthenticated.value) {
    normalToast('يفضل تسجيل الدخول لتتمكن من الاستفادة من كل خدمات الموقع')
  }
})

useHead({
  script: [{
    innerHTML: `
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "568ba1de-fe8c-41c9-a668-aedf9737dcd6";
    `,
    type: 'text/javascript'
  }, {
    src: 'https://client.crisp.chat/l.js',
    async: true
  }]
})
</script>

<style>
/* Page Transition */
.page-wrapper {
  position: relative;
}

/* Loading bar customization */
.nuxt-loading-indicator {
  background: repeating-linear-gradient(
    to right,
    #4f46e5 0%,
    #818cf8 50%,
    #4f46e5 100%
  ) !important;
}
</style>