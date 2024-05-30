export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (
    to.fullPath.includes("/admin") &&
    user.value?.user_metadata.role === "user"
  ) {
    return navigateTo("/");
  }

  if (
    !to.fullPath.includes("/admin") &&
    user.value?.user_metadata.role === "admin"
  ) {
    return navigateTo("/admin");
  }
});
