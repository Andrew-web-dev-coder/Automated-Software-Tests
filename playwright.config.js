const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  
  testDir: './tests/specs',
  timeout: 120000, 
  retries: 1,      
  workers: 4,      
  
 
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],

  
  use: {
    
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    
    
    actionTimeout: 20000,    
    navigationTimeout: 60000 
  },

  
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1366, height: 768 }
      },
    }
  ]
});