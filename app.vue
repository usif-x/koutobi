<template>
  <NuxtLayout>
    <NuxtPage />
    <Notifications />
  </NuxtLayout>
</template>

<script setup>
import { useHead } from '#imports'
import { useAuth } from '~/composables/useAuth'
import Notifications from '~/components/ui/Notifications.vue'
import { useAlerts } from '~/composables/useAlerts'

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
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>