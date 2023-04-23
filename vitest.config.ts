import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite"

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        "vue",
        "pinia"
      ],
      dirs: [
        "./utils",
        "./composables",
      ]
    })
  ],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["tests/{unit,component}/*.unit.test.{ts,tsx}"],
    setupFiles: ["./setupTest.js"],
    root: ".",
    alias: {
      "~": '.',
    },
  },
});
