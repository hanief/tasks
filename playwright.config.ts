import { defineConfig, devices } from "@playwright/test";

require('dotenv').config();

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.e2e.test.{ts,tsx}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: 'http://localhost:3000',
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
  webServer: [
    {
      command: 'yarn dev',
      port: 3000,
      timeout: 100000,
      reuseExistingServer: !process.env.CI,
    }
  ],
});
