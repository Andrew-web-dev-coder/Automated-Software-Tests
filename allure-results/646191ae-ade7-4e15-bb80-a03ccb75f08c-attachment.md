# Test info

- Name: DemoQA Tool Tips Tests >> Verify button tooltip
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:12:5

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toHaveText(expected)

Locator: locator('.tooltip-inner')
Expected string: "You hovered over the Button"
Received: <element(s) not found>
Call log:
  - expect.toHaveText with timeout 10000ms
  - waiting for locator('.tooltip-inner')

    at ToolTipsPage.verifyButtonTooltip (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\ToolTipsPage.js:30:14)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:13:9
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
- iframe
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
   8 |         // Упрощенные локаторы
   9 |         this.hoverButton = page.locator('#toolTipButton');
  10 |         this.hoverTextField = page.locator('#toolTipTextField');
  11 |     }
  12 |
  13 |     async navigate() {
  14 |         // Максимально простая навигация без сложных ожиданий
  15 |         await this.page.goto(this.url, { timeout: 60000 });
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
> 30 |             .toHaveText('You hovered over the Button', { timeout: 10000 });
     |              ^ Error: Timed out 10000ms waiting for expect(locator).toHaveText(expected)
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