# Test info

- Name: DemoQA TextBox Tests >> Fill text box with random data
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\textbox.spec.js:18:3

# Error details

```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#userName')

    at TextBoxPage.fillForm (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\TextBoxPage.js:20:25)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\textbox.spec.js:19:23
```

# Page snapshot

```yaml
- heading "502 Bad Gateway" [level=1]
- separator
- text: nginx/1.17.10 (Ubuntu)
```

# Test source

```ts
   1 | const { expect } = require('@playwright/test');
   2 |
   3 | class TextBoxPage {
   4 |   constructor(page) {
   5 |     this.page = page;
   6 |     this.url = 'https://demoqa.com/text-box';
   7 |     this.fullName = page.locator('#userName');
   8 |     this.email = page.locator('#userEmail');
   9 |     this.currentAddress = page.locator('#currentAddress');
  10 |     this.permanentAddress = page.locator('#permanentAddress');
  11 |     this.submitButton = page.locator('#submit');
  12 |     this.output = page.locator('#output');
  13 |   }
  14 |
  15 |   async navigate() {
  16 |     await this.page.goto(this.url);
  17 |   }
  18 |
  19 |   async fillForm(data) {
> 20 |     await this.fullName.fill(data.fullName);
     |                         ^ TimeoutError: locator.fill: Timeout 10000ms exceeded.
  21 |     await this.email.fill(data.email);
  22 |     await this.currentAddress.fill(data.currentAddress);
  23 |     await this.permanentAddress.fill(data.permanentAddress);
  24 |   }
  25 |
  26 |   async submit() {
  27 |     await this.submitButton.click();
  28 |   }
  29 |
  30 |   async verifyOutput(data) {
  31 |     await expect(this.output).toContainText(data.fullName);
  32 |     await expect(this.output).toContainText(data.email);
  33 |     await expect(this.output).toContainText(data.currentAddress);
  34 |     await expect(this.output).toContainText(data.permanentAddress);
  35 |   }
  36 | }
  37 |
  38 | module.exports = TextBoxPage;
```