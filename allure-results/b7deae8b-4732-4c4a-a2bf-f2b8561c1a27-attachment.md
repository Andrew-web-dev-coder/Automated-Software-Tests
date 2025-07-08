# Test info

- Name: DemoQA Tool Tips Tests >> Verify text field tooltip
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:16:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://demoqa.com/tool-tips", waiting until "load"

    at ToolTipsPage.navigate (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\ToolTipsPage.js:15:25)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:9:28
```

# Test source

```ts
   1 | const { expect } = require('@playwright/test');
   2 |
   3 | class ToolTipsPage {
   4 |     constructor(page) {
   5 |         this.page = page;
   6 |         this.url = 'https://demoqa.com/tool-tips';
   7 |         
   8 |         // Упрощенные локаторы
   9 |         this.hoverButton = page.locator('#toolTipButton');
  10 |         this.hoverTextField = page.locator('#toolTipTextField');
  11 |     }
  12 |
  13 |     async navigate() {
  14 |         // Максимально простая навигация без сложных ожиданий
> 15 |         await this.page.goto(this.url, { timeout: 60000 });
     |                         ^ Error: page.goto: Target page, context or browser has been closed
  16 |         
  17 |         // Базовая проверка загрузки страницы
  18 |         await this.page.waitForSelector('#toolTipButton', { 
  19 |             state: 'visible',
  20 |             timeout: 20000 
  21 |         });
  22 |     }
  23 |
  24 |     async verifyButtonTooltip() {
  25 |         // Простой и надежный способ проверки тултипа
  26 |         await this.hoverButton.hover();
  27 |         
  28 |         // Ждем появления текста тултипа
  29 |         await expect(this.page.locator('.tooltip-inner'))
  30 |             .toHaveText('You hovered over the Button', { timeout: 10000 });
  31 |     }
  32 |
  33 |     async verifyTextFieldTooltip() {
  34 |         await this.hoverTextField.hover();
  35 |         await expect(this.page.locator('.tooltip-inner'))
  36 |             .toHaveText('You hovered over the text field', { timeout: 10000 });
  37 |     }
  38 | }
  39 |
  40 | module.exports = ToolTipsPage;
```