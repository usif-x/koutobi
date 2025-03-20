export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path.includes('/books') && !to.path.includes('/books')) {
    // Add a small delay when transitioning from books page
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 100)
    })
  }
}) 