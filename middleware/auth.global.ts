export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value && to.fullPath.includes("/auth")) {
    return navigateTo("/");
  }

  console.log(user.value?.user_metadata.role);

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

  if (!user.value && !to.fullPath.includes("/auth")) {
    return navigateTo("/auth");
  }
});
