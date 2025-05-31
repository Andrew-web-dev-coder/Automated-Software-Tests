# Test info

- Name: DemoQA Select Menu Tests >> Select Group 2, option 1
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:13:3

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://demoqa.com/select-menu", waiting until "load"

    at SelectMenuPage.navigate (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\SelectMenuPage.js:17:21)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:9:26
```

# Test source

```ts
   1 | const { expect } = require('@playwright/test');
   2 |
   3 | class SelectMenuPage {
   4 |   constructor(page) {
   5 |     this.page = page;
   6 |     this.url = 'https://demoqa.com/select-menu';
   7 |     
   8 |     // Новые локаторы (актуальные на 2023 год)
   9 |     this.selectValueInput = page.locator('#react-select-2-input');
  10 |     this.selectOneInput = page.locator('#react-select-3-input');
  11 |     this.oldStyleSelect = page.locator('#oldSelectMenu');
  12 |     this.multiSelectInput = page.locator('#react-select-4-input');
  13 |     this.selectedValue = page.locator('.css-1uccc91-singleValue');
  14 |   }
  15 |
  16 |   async navigate() {
> 17 |     await this.page.goto(this.url);
     |                     ^ Error: page.goto: Target page, context or browser has been closed
  18 |     await this.page.waitForSelector('#oldSelectMenu', { state: 'visible' });
  19 |   }
  20 |
  21 |   async selectGroupOption() {
  22 |     await this.selectValueInput.click();
  23 |     await this.selectValueInput.fill('Group 2');
  24 |     await this.page.keyboard.press('Enter');
  25 |     await this.page.keyboard.press('Tab');
  26 |   }
  27 |
  28 |   async selectOtherOption() {
  29 |     await this.selectOneInput.click();
  30 |     await this.selectOneInput.fill('Other');
  31 |     await this.page.keyboard.press('Enter');
  32 |   }
  33 |
  34 |   async selectOldStyleColor() {
  35 |     await this.oldStyleSelect.selectOption('Green');
  36 |   }
  37 |
  38 |   async selectMultiColors() {
  39 |     await this.multiSelectInput.click();
  40 |     await this.multiSelectInput.fill('Blue');
  41 |     await this.page.keyboard.press('Enter');
  42 |     await this.multiSelectInput.fill('Black');
  43 |     await this.page.keyboard.press('Enter');
  44 |   }
  45 | }
  46 |
  47 | module.exports = SelectMenuPage;
```