# Test info

- Name: DemoQA Form Tests >> Submit form with valid data
- Location: C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\form.spec.js:19:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('.table-responsive')
Expected string: "Norval"
Received: <element(s) not found>
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('.table-responsive')

    at FormPage.verifySubmittedData (C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\pages\FormPage.js:35:36)
    at C:\Users\aleksandr.shepilov\Desktop\Automated-Software-Tests\tests\specs\form.spec.js:22:20
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
- list:
  - listitem:
    - img
    - text: Practice Form
- img
- text: Alerts, Frame & Windows
- img
- img
- text: Widgets
- img
- img
- text: Interactions
- img
- img
- text: Book Store Application
- img
- iframe
- heading "Practice Form" [level=1]
- heading "Student Registration Form" [level=5]
- text: Name
- textbox "First Name": Norval
- textbox "Last Name": Hermann
- text: Email
- textbox "name@example.com": Winston_Okuneva@gmail.com
- text: Gender
- radio "Male" [checked]
- text: Male
- radio "Female"
- text: Female
- radio "Other"
- text: Other Mobile(10 Digits)
- textbox "Mobile Number": (986) 979-
- text: Date of Birth
- textbox: 28 May 2025
- text: Subjects
- textbox
- text: Hobbies
- checkbox "Sports"
- text: Sports
- checkbox "Reading"
- text: Reading
- checkbox "Music"
- text: Music Picture Select picture
- button "Select picture"
- text: Current Address
- textbox "Current Address"
- text: State and City Select State
- textbox
- text: Select City
- textbox [disabled]
- button "Submit"
- img "Build PlayWright tests with AI"
- iframe
- iframe
- contentinfo: © 2013-2020 TOOLSQA.COM | ALL RIGHTS RESERVED.
```

# Test source

```ts
   1 | const { expect } = require('@playwright/test');
   2 | const { faker } = require('@faker-js/faker'); 
   3 |
   4 | class FormPage {
   5 |   constructor(page) {
   6 |     this.page = page;
   7 |     this.url = 'https://demoqa.com/automation-practice-form';
   8 |     
   9 |     this.firstName = page.locator('#firstName');
  10 |     this.lastName = page.locator('#lastName');
  11 |     this.email = page.locator('#userEmail');
  12 |     this.genderMale = page.locator('label[for="gender-radio-1"]');
  13 |     this.mobile = page.locator('#userNumber');
  14 |     this.submitButton = page.locator('#submit');
  15 |     this.resultTable = page.locator('.table-responsive');
  16 |   }
  17 |
  18 |   async navigate() {
  19 |     await this.page.goto(this.url);
  20 |   }
  21 |
  22 |   async fillForm(data) {
  23 |     await this.firstName.fill(data.firstName);
  24 |     await this.lastName.fill(data.lastName);
  25 |     await this.email.fill(data.email);
  26 |     await this.genderMale.click();
  27 |     await this.mobile.fill(data.mobile); 
  28 |   }
  29 |
  30 |   async submitForm() {
  31 |     await this.submitButton.click();
  32 |   }
  33 |
  34 |   async verifySubmittedData(data) {
> 35 |     await expect(this.resultTable).toContainText(data.firstName);
     |                                    ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  36 |     await expect(this.resultTable).toContainText(data.lastName);
  37 |     await expect(this.resultTable).toContainText(data.email);
  38 |     await expect(this.resultTable).toContainText('Male');
  39 |     await expect(this.resultTable).toContainText(data.mobile);
  40 |   }
  41 | }
  42 |
  43 | module.exports = FormPage;
```