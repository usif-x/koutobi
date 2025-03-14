<template>
<div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
<div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-float blur-2xl"></div>
        <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full mix-blend-multiply opacity-20 animate-float-delay blur-2xl"></div>
        <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mix-blend-multiply opacity-10 animate-float-slow blur-3xl"></div>
      </div>
  <NuxtLayout>
    <NuxtPage />
    <Notifications />
  </NuxtLayout>
</div>

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