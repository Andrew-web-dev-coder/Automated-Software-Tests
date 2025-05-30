# Automated Tests for DemoQA

## How to run
1. Install dependencies:
```bash
npm install
npx playwright install
```

2. Run tests:
```bash
npx playwright test --project=chromium --project=firefox
```

## CI/CD
Tests run automatically:
- On every push to `main` branch
- Daily at midnight (cron: '0 0 * * *')

## Reports
HTML report: `playwright-report/index.html`
Allure report: `allure-report/index.html` 
