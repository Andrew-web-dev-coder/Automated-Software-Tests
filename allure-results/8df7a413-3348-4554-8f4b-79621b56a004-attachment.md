# Test info

- Name: DemoQA Tool Tips Tests >> Verify text field tooltip
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:16:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.tooltip-inner') to be visible

    at ToolTipsPage.verifyTextFieldTooltip (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\ToolTipsPage.js:25:21)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:17:5
```

# Page snapshot

```yaml
- img "adplus-dvertising"
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
   4 |   constructor(page) {
   5 |     this.page = page;
   6 |     this.url = 'https://demoqa.com/tool-tips';
   7 |     this.hoverButton = page.locator('#toolTipButton');
   8 |     this.hoverTextField = page.locator('#toolTipTextField');
   9 |     this.tooltip = page.locator('.tooltip-inner');
  10 |   }
  11 |
  12 |   async navigate() {
  13 |     await this.page.goto(this.url);
  14 |     await this.page.waitForSelector('#toolTipButton', { state: 'visible' });
  15 |   }
  16 |
  17 |   async verifyButtonTooltip() {
  18 |     await this.hoverButton.hover();
  19 |     await this.page.waitForSelector('.tooltip-inner', { state: 'visible' });
  20 |     await expect(this.tooltip).toHaveText('You hovered over the Button');
  21 |   }
  22 |
  23 |   async verifyTextFieldTooltip() {
  24 |     await this.hoverTextField.hover();
> 25 |     await this.page.waitForSelector('.tooltip-inner', { state: 'visible' });
     |                     ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  26 |     await expect(this.tooltip).toHaveText('You hovered over the text field');
  27 |   }
  28 | }
  29 |
  30 | module.exports = ToolTipsPage;
```