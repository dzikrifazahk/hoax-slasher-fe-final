// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('accessToken');
  const protectedRoutes = ['/', '/news'];

  if (process.client) {
    if (!token.value) {
      if (protectedRoutes.includes(to.path)) {
        return navigateTo('/landing/community');
      }
    } else {
      if (to.path === '/landing/community') {
        return navigateTo('/');
      }
    }
  }
});
