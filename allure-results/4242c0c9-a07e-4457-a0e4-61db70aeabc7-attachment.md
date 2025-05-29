# Test info

- Name: DemoQA Select Menu Tests >> should select group option
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:12:5

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#react-select-2-input')
    - locator resolved to <input value="" type="text" tabindex="0" autocorrect="off" autocomplete="off" spellcheck="false" autocapitalize="none" aria-autocomplete="list" id="react-select-2-input"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class=" css-1wa3eu0-placeholder">Select Option</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class=" css-1wa3eu0-placeholder">Select Option</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    18 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class=" css-1wa3eu0-placeholder">Select Option</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

    at SelectMenuPage.selectGroupOption (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\SelectMenuPage.js:20:37)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:13:30
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
- iframe
- img "Build PlayWright tests with AI"
- iframe
- iframe
- contentinfo: © 2013-2020 TOOLSQA.COM | ALL RIGHTS RESERVED.
```

# Test source

```ts
   1 | class SelectMenuPage {
   2 |     constructor(page) {
   3 |         this.page = page;
   4 |         this.url = 'https://demoqa.com/select-menu';
   5 |         
   6 |         
   7 |         this.selectValueInput = page.locator('#react-select-2-input');
   8 |         this.selectOneInput = page.locator('#react-select-3-input');
   9 |         this.oldStyleSelect = page.locator('#oldSelectMenu');
  10 |         this.multiSelectInput = page.locator('#react-select-4-input');
  11 |         this.selectedValueText = page.locator('div[class*="-singleValue"]');
  12 |     }
  13 |
  14 |     async navigate() {
  15 |         await this.page.goto(this.url);
  16 |         await this.page.waitForSelector('#oldSelectMenu');
  17 |     }
  18 |
  19 |     async selectGroupOption() {
> 20 |         await this.selectValueInput.click();
     |                                     ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  21 |         await this.selectValueInput.fill('Group 2, option 1');
  22 |         await this.page.keyboard.press('Enter');
  23 |     }
  24 |
  25 |     async selectOtherOption() {
  26 |         await this.selectOneInput.click();
  27 |         await this.selectOneInput.fill('Other');
  28 |         await this.page.keyboard.press('Enter');
  29 |     }
  30 |
  31 |     async selectOldStyleColor(color = 'Green') {
  32 |         await this.oldStyleSelect.selectOption(color);
  33 |     }
  34 |
  35 |     async selectMultiColors(options = ['volvo', 'opel']) {
  36 |         for (const option of options) {
  37 |             await this.multiSelectInput.fill(option);
  38 |             await this.page.keyboard.press('Enter');
  39 |         }
  40 |     }
  41 | }
  42 |
  43 | module.exports = SelectMenuPage;
```