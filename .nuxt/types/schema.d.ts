import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["shadcn"]?: typeof import("shadcn-nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["supabase"]?: typeof import("@nuxtjs/supabase").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["icon"]?: typeof import("nuxt-icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["device"]?: typeof import("@nuxtjs/device").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["shadcn-nuxt", Exclude<NuxtConfig["shadcn"], boolean>] | ["@nuxtjs/supabase", Exclude<NuxtConfig["supabase"], boolean>] | ["nuxt-icon", Exclude<NuxtConfig["icon"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxtjs/device", Exclude<NuxtConfig["device"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   supabase: {
      serviceKey: any,
   },
  }
  interface PublicRuntimeConfig {
   supabase: {
      url: string,

      key: string,

      redirect: boolean,

      redirectOptions: {
         login: string,

         callback: string,

         exclude: Array<string>,

         cookieRedirect: boolean,
      },

      cookieName: string,

      cookieOptions: {
         maxAge: number,

         sameSite: string,

         secure: boolean,
      },

      clientOptions: {
         auth: {
            flowType: string,

            detectSessionInUrl: boolean,

            persistSession: boolean,

            autoRefreshToken: boolean,
         },
      },
   },

   device: {
      enabled: boolean,

      defaultUserAgent: string,

      refreshOnResize: boolean,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }