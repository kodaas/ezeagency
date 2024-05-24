// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxtjs/device"
  ],
  
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/auth/signup', '/auth/forgot-password'],
      cookieRedirect: false,
    }  
  }
});