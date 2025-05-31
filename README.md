# Automated Tests for DemoQA

## How to run
1. Install dependencies: `npm ci`
2. Install browsers: `npx playwright install`
3. Run tests: `npx playwright test`

## CI/CD
Tests run automatically:
- On every push to `main` branch
- On every pull request
- Daily at midnight UTC

## Reports
HTML reports available in `playwright-report/`