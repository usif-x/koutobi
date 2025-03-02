export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  // If route requires auth and user is not authenticated
  if (to.meta.auth && !isAuthenticated()) {
    return navigateTo('/login');
  }

  // If user is authenticated and trying to access login/signup
  if (isAuthenticated() && ['/login', '/signup'].includes(to.path)) {
    return navigateTo('/');
  }
});