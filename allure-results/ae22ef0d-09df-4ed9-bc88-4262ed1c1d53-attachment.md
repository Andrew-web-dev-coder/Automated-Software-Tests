# Test info

- Name: DemoQA Form Tests >> Submit form with valid data
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\form.spec.js:19:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#firstName') to be visible

    at FormPage.navigate (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\FormPage.js:20:21)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\form.spec.js:16:5
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
   3 | class FormPage {
   4 |   constructor(page) {
   5 |     this.page = page;
   6 |     this.url = 'https://demoqa.com/automation-practice-form';
   7 |     
   8 |     this.firstName = page.locator('#firstName');
   9 |     this.lastName = page.locator('#lastName');
  10 |     this.email = page.locator('#userEmail');
  11 |     this.genderMale = page.locator('label[for="gender-radio-1"]');
  12 |     this.mobile = page.locator('#userNumber');
  13 |     this.submitButton = page.locator('#submit');
  14 |     this.modal = page.locator('.modal-content');
  15 |     this.resultTable = page.locator('.table-responsive');
  16 |   }
  17 |
  18 |   async navigate() {
  19 |     await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
> 20 |     await this.page.waitForSelector('#firstName', { state: 'visible', timeout: 15000 });
     |                     ^ TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
  21 |   }
  22 |
  23 |   async fillForm(data) {
  24 |     await this.firstName.fill(data.firstName);
  25 |     await this.lastName.fill(data.lastName);
  26 |     await this.email.fill(data.email);
  27 |     await this.genderMale.click();
  28 |     await this.mobile.fill(data.mobile);
  29 |   }
  30 |
  31 |   async submitForm() {
  32 |     await this.submitButton.click();
  33 |     await this.page.waitForSelector('.modal-content', { state: 'visible', timeout: 15000 });
  34 |   }
  35 |
  36 |   async verifySubmittedData(data) {
  37 |     await expect(this.resultTable).toContainText(data.firstName);
  38 |     await expect(this.resultTable).toContainText(data.lastName);
  39 |     await expect(this.resultTable).toContainText(data.email);
  40 |     await expect(this.resultTable).toContainText('Male');
  41 |     await expect(this.resultTable).toContainText(data.mobile);
  42 |   }
  43 | }
  44 |
  45 | module.exports = FormPage;
```