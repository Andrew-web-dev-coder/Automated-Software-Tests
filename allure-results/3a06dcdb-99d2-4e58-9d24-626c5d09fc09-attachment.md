# Test info

- Name: DemoQA Select Menu Tests >> Select Group 2, option 1
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:12:3

# Error details

```
Error: locator.click: Error: strict mode violation: locator('#withOptGroup div') resolved to 8 elements:
    1) <div class=" css-yk16xz-control">…</div> aka locator('#withOptGroup div').filter({ hasText: 'Select Option' }).first()
    2) <div class=" css-1hwfws3">…</div> aka locator('#withOptGroup div').filter({ hasText: 'Select Option' }).nth(1)
    3) <div class=" css-1wa3eu0-placeholder">Select Option</div> aka getByText('Select Option')
    4) <div class="css-1g6gooi">…</div> aka locator('.css-1g6gooi').first()
    5) <div class="">…</div> aka locator('.css-1g6gooi > div').first()
    6) <div></div> aka locator('.css-1g6gooi > div > div').first()
    7) <div class=" css-1wy0on6">…</div> aka locator('.css-1wy0on6').first()
    8) <div aria-hidden="true" class=" css-tlfecz-indicatorContainer">…</div> aka locator('.css-tlfecz-indicatorContainer').first()

Call log:
  - waiting for locator('#withOptGroup div')

    at SelectMenuPage.selectGroupOption (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\SelectMenuPage.js:18:36)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:13:26
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
- text: Select...
- textbox
- paragraph: Standard multi select
- listbox:
  - option "Volvo"
  - option "Saab"
  - option "Opel"
  - option "Audi"
- img "Build PlayWright tests with AI"
- iframe
- iframe
- contentinfo: © 2013-2020 TOOLSQA.COM | ALL RIGHTS RESERVED.
```

# Test source

```ts
   1 | const { expect } = require('@playwright/test');
   2 |
   3 | class SelectMenuPage {
   4 |   constructor(page) {
   5 |     this.page = page;
   6 |     this.url = 'https://demoqa.com/select-menu';
   7 |     this.selectValueDropdown = page.locator('#withOptGroup div');
   8 |     this.selectOneDropdown = page.locator('#selectOne div');
   9 |     this.oldStyleSelect = page.locator('#oldSelectMenu');
  10 |     this.multiSelectDropdown = page.locator('#selectMenuContainer select');
  11 |   }
  12 |
  13 |   async navigate() {
  14 |     await this.page.goto(this.url);
  15 |   }
  16 |
  17 |   async selectGroupOption(group, option) {
> 18 |     await this.selectValueDropdown.click();
     |                                    ^ Error: locator.click: Error: strict mode violation: locator('#withOptGroup div') resolved to 8 elements:
  19 |     await this.page.locator(`div:text-is("${group}")`).click();
  20 |     await this.page.locator(`div:text-is("${option}")`).click();
  21 |   }
  22 |
  23 |   async selectOtherOption() {
  24 |     await this.selectOneDropdown.click();
  25 |     await this.page.locator('div:text-is("Other")').click();
  26 |   }
  27 |
  28 |   async selectOldStyleColor(color) {
  29 |     await this.oldStyleSelect.selectOption(color);
  30 |   }
  31 |
  32 |   async selectMultiColors(colors) {
  33 |     await this.multiSelectDropdown.selectOption(colors);
  34 |   }
  35 | }
  36 |
  37 | module.exports = SelectMenuPage;
```