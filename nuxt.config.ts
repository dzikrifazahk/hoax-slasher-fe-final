// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false
  },
  build: {
    transpile: ["vuetify"],
  },
  plugins: [
    '~/plugins/vuetify.ts',
  ],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {
  },
  modules: [
    // '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_API_URL || "http://localhost:3000",
      baseImageUrl: process.env.BASE_IMAGE_URL,
    },
  },
  // axios: {
  //   baseURL: 'https://reqres.in/api/',
  // }
})


