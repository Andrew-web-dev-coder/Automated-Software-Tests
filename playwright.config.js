const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 2 : 4,
  
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off'
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