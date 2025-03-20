<template>
  <Navbar />
  <div class="min-h-screen">
    <slot />
  </div>
  <Footer />
</template>

<script setup>
import Navbar from '~/components/default/navbar.vue';
import Footer from '~/components/default/footer.vue';
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>