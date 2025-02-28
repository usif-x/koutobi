export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user')
    
    if (user) {
      // Update last activity timestamp
      localStorage.setItem('lastActivity', new Date().getTime().toString())
      
      // Store current UTC time for logging
      const now = new Date()
      const utcTimestamp = now.toISOString().replace('T', ' ').slice(0, 19)
      localStorage.setItem('lastActivityUTC', utcTimestamp)
      
      // Log activity for debugging
      console.log(`User activity: ${JSON.parse(user).username} at ${utcTimestamp}`)
    }
  }
})