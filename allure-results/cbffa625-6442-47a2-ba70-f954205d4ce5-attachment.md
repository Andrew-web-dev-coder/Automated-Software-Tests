# Test info

- Name: DemoQA Alerts Tests >> Simple alert appears
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\alerts.spec.js:12:3

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#alertButton')

    at AlertsPage.clickAlertButton (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\AlertsPage.js:15:28)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\alerts.spec.js:18:22
```

# Page snapshot

```yaml
- heading "502 Bad Gateway" [level=1]
- separator
- text: nginx/1.17.10 (Ubuntu)
```

# Test source

```ts
   1 | const { expect } = require('@playwright/test');
   2 |
   3 | class AlertsPage {
   4 |   constructor(page) {
   5 |     this.page = page;
   6 |     this.url = 'https://demoqa.com/alerts';
   7 |     this.alertButton = page.locator('#alertButton');
   8 |   }
   9 |
  10 |   async navigate() {
  11 |     await this.page.goto(this.url);
  12 |   }
  13 |
  14 |   async clickAlertButton() {
> 15 |     await this.alertButton.click();
     |                            ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  16 |   }
  17 | }
  18 |
  19 | module.exports = AlertsPage;
```