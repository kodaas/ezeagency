export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  if (!user.value && !to.fullPath.includes("/auth")) {
    return navigateTo("/auth");
  }

  if (user.value) {
    const { data: metaData } = await supabase
      .from("User")
      .select("*")
      .eq("id", user.value?.id!)
      .single();

    if (!metaData) {
      await supabase.auth.signOut();
      return
      // return navigateTo("/auth/login");
    }

    // @ts-ignore
    if (!metaData.is_active && !to.fullPath.includes("/pending-approval"))
      return navigateTo("/pending-approval");

    // @ts-ignore
    if (metaData.is_active && to.fullPath.includes("/pending-approval"))
      return navigateTo("/");

    if (user.value && to.fullPath.includes("/auth")) {
      return navigateTo("/");
    }

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
  }
});
