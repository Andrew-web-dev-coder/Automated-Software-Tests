# Test info

- Name: DemoQA Tool Tips Tests >> Verify text field tooltip
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:20:5

# Error details

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://demoqa.com/tool-tips", waiting until "networkidle"

    at ToolTipsPage.navigate (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\ToolTipsPage.js:18:25)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:9:28
```

# Page snapshot

```yaml
- img "adplus-dvertising"
- iframe
- banner:
  - link:
    - /url: https://demoqa.com
    - img
- img
- text: Elements
- img
- img
- text: Forms
- img
- img
- text: Alerts, Frame & Windows
- img
- img
- text: Widgets
- img
- list:
  - listitem:
    - img
    - text: Accordian
  - listitem:
    - img
    - text: Auto Complete
  - listitem:
    - img
    - text: Date Picker
  - listitem:
    - img
    - text: Slider
  - listitem:
    - img
    - text: Progress Bar
  - listitem:
    - img
    - text: Tabs
  - listitem:
    - img
    - text: Tool Tips
  - listitem:
    - img
    - text: Menu
  - listitem:
    - img
    - text: Select Menu
- img
- text: Interactions
- img
- img
- text: Book Store Application
- img
- iframe
- heading "Tool Tips" [level=1]
- paragraph: Practice Tool Tips
- button "Hover me to see"
- textbox "Hover me to see"
- link "Contrary":
  - /url: javascript:void(0)
- text: to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
- link "1.10.32":
  - /url: javascript:void(0)
- text: and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
- img "Build PlayWright tests with AI"
- iframe
- iframe
- contentinfo: © 2013-2020 TOOLSQA.COM | ALL RIGHTS RESERVED.
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
   8 |         // Основные элементы
   9 |         this.hoverButton = page.locator('#toolTipButton');
  10 |         this.hoverTextField = page.locator('#toolTipTextField');
  11 |         
  12 |         // Улучшенные локаторы для тултипов
  13 |         this.buttonTooltip = page.locator('#buttonToolTip .tooltip-inner');
  14 |         this.textFieldTooltip = page.locator('#textFieldToolTip .tooltip-inner');
  15 |     }
  16 |
  17 |     async navigate() {
> 18 |         await this.page.goto(this.url, { waitUntil: 'networkidle' });
     |                         ^ TimeoutError: page.goto: Timeout 60000ms exceeded.
  19 |         await this.page.waitForLoadState('domcontentloaded');
  20 |         await this.page.waitForSelector('#toolTipButton', { 
  21 |             state: 'visible', 
  22 |             timeout: 30000 
  23 |         });
  24 |     }
  25 |
  26 |     async verifyButtonTooltip() {
  27 |         // Добавляем проверку, что кнопка видима
  28 |         await expect(this.hoverButton).toBeVisible();
  29 |         
  30 |         // Делаем hover и ждем появления тултипа
  31 |         await this.hoverButton.hover();
  32 |         await this.page.waitForSelector('#buttonToolTip .tooltip-inner', { 
  33 |             state: 'visible', 
  34 |             timeout: 20000 
  35 |         });
  36 |         
  37 |         // Проверяем тултип
  38 |         await expect(this.buttonTooltip).toBeVisible();
  39 |         await expect(this.buttonTooltip).toHaveText('You hovered over the Button');
  40 |     }
  41 |
  42 |     async verifyTextFieldTooltip() {
  43 |         // Добавляем проверку, что поле видимо
  44 |         await expect(this.hoverTextField).toBeVisible();
  45 |         
  46 |         // Делаем hover и ждем появления тултипа
  47 |         await this.hoverTextField.hover();
  48 |         await this.page.waitForSelector('#textFieldToolTip .tooltip-inner', { 
  49 |             state: 'visible', 
  50 |             timeout: 20000 
  51 |         });
  52 |         
  53 |         // Проверяем тултип
  54 |         await expect(this.textFieldTooltip).toBeVisible();
  55 |         await expect(this.textFieldTooltip).toHaveText('You hovered over the text field');
  56 |     }
  57 | }
  58 |
  59 | module.exports = ToolTipsPage;
```