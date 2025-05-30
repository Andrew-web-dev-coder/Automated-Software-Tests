const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  timeout: 90000, 
  expect: {
    timeout: 15000 
  },
  
  fullyParallel: false, 
  retries: process.env.CI ? 2 : 1, 
  workers: process.env.CI ? 1 : 4, 
  
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['github'] 
  ],
  
  use: {
    actionTimeout: 20000, 
    navigationTimeout: 45000, 
    trace: 'retain-on-failure', 
    screenshot: 'only-on-failure',
    video: 'off',
    
    
    launchOptions: {
      firefoxUserPrefs: {
        'dom.select_events.enabled': true,
        'dom.webnotifications.enabled': false,
        'browser.tabs.remote.autostart': false
      },
      args: ['--width=1280', '--height=720']
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
        viewport: { width: 1280, height: 720 },
        
        launchOptions: {
          headless: true,
          slowMo: 100, 
          firefoxUserPrefs: {
            'dom.webdriver.enabled': false,
            'dom.input_events.enabled': true
          }
        }
      },
    }
  ]
});