
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (user.value && to.fullPath.includes('/auth')) {
    return navigateTo('/')
  }

  if (!user.value && !to.fullPath.includes('/auth')) {
    return navigateTo('/auth')
  }
})
