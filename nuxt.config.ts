// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  imports: {
    dirs: ["./services"],
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxtjs/device",
  ],

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/confirm",
      include: undefined,
      exclude: ["/auth/signup", "/auth/forgot-password", "/auth/reset-email"],
      cookieRedirect: false,
    },
  },
});
