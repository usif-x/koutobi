<template>
<div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</div>
</template>
<script setup>
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
});
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
