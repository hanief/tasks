export default defineNuxtConfig({
  app: {
    head: {
      title: "Tasks",
      meta: [
        { name: 'description', content: 'Write it, do it' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      secret: "y7KjrBFOgLRz7mTPvwkue2CTCrUH4TJ20g55cVyWXvw",
      backend: "http://localhost:3001",
    },
  },
  css: ["~/assets/styles/main.css"],
  modules: [
    "@pinia/nuxt",
    "nuxt-vitest",
    '@sidebase/nuxt-auth'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  auth: {
    isEnabled: true
  }
});
