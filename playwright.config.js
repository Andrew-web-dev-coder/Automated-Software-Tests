const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  timeout: 180000, // Увеличенный общий таймаут
  expect: {
    timeout: 40000 // Увеличенный таймаут для expect
  },
  fullyParallel: true,
  retries: process.env.CI ? 3 : 2, // Больше попыток для CI
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { 
      open: 'never',
      outputFolder: 'playwright-report' 
    }],
    ['list'],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    actionTimeout: 45000, // Увеличенный таймаут для действий
    navigationTimeout: 90000, // Увеличенный таймаут навигации
    trace: 'retain-on-failure', // Сохранять trace при падении
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', // Сохранять видео при падении
    launchOptions: {
      slowMo: process.env.CI ? 50 : 100, // Меньшая задержка для CI
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    },
    // Специфичные настройки для Firefox
    firefoxUserPrefs: {
      'dom.disable_beforeunload': true,
      'dom.webnotifications.enabled': false,
      'javascript.options.showInConsole': false
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 }, // Стандартное разрешение
        ignoreHTTPSErrors: true
      }
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1366, height: 768 },
        ignoreHTTPSErrors: true,
        // Дополнительные настройки для Firefox
        launchOptions: {
          firefoxUserPrefs: {
            'layout.css.devPixelsPerPx': '1',
            'media.ffmpeg.low-latency.enabled': true
          }
        }
      }
    }
  ]
});