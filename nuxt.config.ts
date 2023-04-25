export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "Multitask | Write and do your things",
      meta: [
        { name: 'description', content: 'Multitask | Write and do your things' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      secret: "y7KjrBFOgLRz7mTPvwkue2CTCrUH4TJ20g55cVyWXvw=",
      backend: "http://localhost:3001",
    },
  },
  css: ["~/assets/styles/main.css"],
  modules: [
    "@pinia/nuxt",
    "nuxt-vitest",
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  auth: {}
});
