export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      backend: {
        baseURL: "http://localhost:3001",
      },
    },
  },
  css: ["~/assets/styles/main.css"],
  modules: [
    "@pinia/nuxt",
    "nuxt-vitest"
  ],
});
