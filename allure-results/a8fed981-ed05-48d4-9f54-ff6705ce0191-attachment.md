# Test info

- Name: DemoQA Select Menu Tests >> should select multi colors
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:31:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)

Locator: locator('#react-select-4-multi-value')
Expected: 2
Received: 0
Call log:
  - expect.toHaveCount with timeout 5000ms
  - waiting for locator('#react-select-4-multi-value')
    9 × locator resolved to 0 elements
      - unexpected value "0"

    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:33:67
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
- heading "Select Menu" [level=1]
- text: Select Value Select Option
- textbox
- text: Select One Select Title
- textbox
- text: Old Style Select Menu
- combobox:
  - option "Red" [selected]
  - option "Blue"
  - option "Green"
  - option "Yellow"
  - option "Purple"
  - option "Black"
  - option "White"
  - option "Voilet"
  - option "Indigo"
  - option "Magenta"
  - option "Aqua"
- paragraph: Multiselect drop down
- paragraph
- paragraph: 0 results available for search term opel. Select is focused ,type to refine list, press Down to open the menu, press left to focus selected values
- textbox: opel
- text: No options
- paragraph: Standard multi select
- listbox:
  - option "Volvo"
  - option "Saab"
  - option "Opel"
  - option "Audi"
- iframe
- img "Build PlayWright tests with AI"
- iframe
- iframe
- contentinfo: © 2013-2020 TOOLSQA.COM | ALL RIGHTS RESERVED.
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const SelectMenuPage = require('../pages/SelectMenuPage');
   3 |
   4 | test.describe('DemoQA Select Menu Tests', () => {
   5 |     let selectMenuPage;
   6 |
   7 |     test.beforeEach(async ({ page }) => {
   8 |         selectMenuPage = new SelectMenuPage(page);
   9 |         await selectMenuPage.navigate();
  10 |     });
  11 |
  12 |     test('should select group option', async () => {
  13 |         await selectMenuPage.selectGroupOption();
  14 |         const selectedText = await selectMenuPage.selectedValueText.first().textContent();
  15 |         expect(selectedText).toContain('Group 2, option 1');
  16 |     });
  17 |
  18 |     test('should select other option', async ({ page }) => {
  19 |         await selectMenuPage.selectOtherOption();
  20 |         await page.waitForTimeout(1000); 
  21 |         const selectedText = await selectMenuPage.selectedValueText.nth(1).textContent();
  22 |         expect(selectedText.trim()).toBe('Other');
  23 |     });
  24 |
  25 |     test('should select old style color', async () => {
  26 |         await selectMenuPage.selectOldStyleColor('Green');
  27 |         const selectedValue = await selectMenuPage.oldStyleSelect.inputValue();
  28 |         expect(selectedValue).toBe('2'); 
  29 |     });
  30 |
  31 |     test('should select multi colors', async ({ page }) => {
  32 |         await selectMenuPage.selectMultiColors();
> 33 |         await expect(page.locator('#react-select-4-multi-value')).toHaveCount(2);
     |                                                                   ^ Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)
  34 |     });
  35 | });
```