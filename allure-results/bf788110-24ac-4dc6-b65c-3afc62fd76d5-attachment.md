# Test info

- Name: DemoQA Select Menu Tests >> should select group option
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:12:5

# Error details

```
TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#oldSelectMenu') to be visible

    at SelectMenuPage.navigate (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\SelectMenuPage.js:20:25)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\selectmenu.spec.js:9:9
```

# Page snapshot

```yaml
- heading "502 Bad Gateway" [level=1]
- separator
- text: nginx/1.17.10 (Ubuntu)
```

# Test source

```ts
   1 | class SelectMenuPage {
   2 |     constructor(page) {
   3 |         this.page = page;
   4 |         this.url = 'https://demoqa.com/select-menu';
   5 |         
   6 |         // Основные элементы
   7 |         this.selectValueDropdown = page.locator('div#withOptGroup');
   8 |         this.selectOneDropdown = page.locator('div#selectOne');
   9 |         this.oldStyleSelect = page.locator('#oldSelectMenu');
  10 |         this.multiSelectDropdown = page.locator('#cars');
  11 |         
  12 |         // Выбранные значения
  13 |         this.selectedGroupValue = page.locator('div#withOptGroup div.css-1uccc91-singleValue');
  14 |         this.selectedOneValue = page.locator('div#selectOne div.css-1uccc91-singleValue');
  15 |     }
  16 |
  17 |     async navigate() {
  18 |         await this.page.goto(this.url);
  19 |         // Ждем загрузки ключевого элемента вместо networkidle
> 20 |         await this.page.waitForSelector('#oldSelectMenu', { state: 'visible', timeout: 15000 });
     |                         ^ TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
  21 |     }
  22 |
  23 |     async selectGroupOption() {
  24 |         await this.selectValueDropdown.click();
  25 |         await this.page.locator('div#react-select-2-option-1-0').waitFor();
  26 |         await this.page.locator('div#react-select-2-option-1-0').click();
  27 |     }
  28 |
  29 |     async selectOtherOption() {
  30 |         await this.selectOneDropdown.click();
  31 |         await this.page.locator('div#react-select-3-option-0-5').waitFor();
  32 |         await this.page.locator('div#react-select-3-option-0-5').click();
  33 |     }
  34 |
  35 |     async selectOldStyleColor() {
  36 |         await this.oldStyleSelect.selectOption('Green');
  37 |         // Дополнительное ожидание после выбора
  38 |         await this.page.waitForTimeout(500);
  39 |     }
  40 |
  41 |     async selectMultiColors() {
  42 |         await this.multiSelectDropdown.selectOption(['volvo', 'opel']);
  43 |         // Дополнительное ожидание после выбора
  44 |         await this.page.waitForTimeout(500);
  45 |     }
  46 | }
  47 |
  48 | module.exports = SelectMenuPage;
```