# Test info

- Name: DemoQA Tool Tips Tests >> Verify text field tooltip
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:16:5

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toBeVisible()

Locator: locator('.tooltip-inner')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for locator('.tooltip-inner')

    at ToolTipsPage.verifyTextFieldTooltip (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\ToolTipsPage.js:30:36)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\tooltips.spec.js:17:9
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
   4 |     constructor(page) {
   5 |         this.page = page;
   6 |         this.url = 'https://demoqa.com/tool-tips';
   7 |         
   8 |         // Корректные локаторы
   9 |         this.hoverButton = page.locator('#toolTipButton');
  10 |         this.hoverTextField = page.locator('#toolTipTextField');
  11 |         this.tooltip = page.locator('.tooltip-inner');
  12 |     }
  13 |
  14 |     async navigate() {
  15 |         await this.page.goto(this.url);
  16 |         await this.page.waitForSelector('#toolTipButton', { 
  17 |             state: 'visible', 
  18 |             timeout: 15000 
  19 |         });
  20 |     }
  21 |
  22 |     async verifyButtonTooltip() {
  23 |         await this.hoverButton.hover();
  24 |         await expect(this.tooltip).toBeVisible({ timeout: 10000 });
  25 |         await expect(this.tooltip).toHaveText('You hovered over the Button');
  26 |     }
  27 |
  28 |     async verifyTextFieldTooltip() {
  29 |         await this.hoverTextField.hover();
> 30 |         await expect(this.tooltip).toBeVisible({ timeout: 10000 });
     |                                    ^ Error: Timed out 10000ms waiting for expect(locator).toBeVisible()
  31 |         await expect(this.tooltip).toHaveText('You hovered over the text field');
  32 |     }
  33 | }
  34 |
  35 | module.exports = ToolTipsPage;
```