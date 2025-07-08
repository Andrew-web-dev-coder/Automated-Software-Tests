const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  timeout: 120000, 
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
  actionTimeout: 30000,
  navigationTimeout: 60000,
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',

  launchOptions: {
    args: ['--disable-dev-shm-usage']
  }
},
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 }
      },
    }
  ]
});