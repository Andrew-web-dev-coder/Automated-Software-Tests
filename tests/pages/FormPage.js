const { expect } = require('@playwright/test');

class FormPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/automation-practice-form';
  }

  
  get firstName() {
    return this.page.locator('#firstName');
  }

  get lastName() {
    return this.page.locator('#lastName');
  }

  get email() {
    return this.page.locator('#userEmail');
  }

  get mobile() {
    return this.page.locator('#userNumber');
  }

  get genderOptions() {
    return {
      male: this.page.locator('label[for="gender-radio-1"]'),
      female: this.page.locator('label[for="gender-radio-2"]'),
      other: this.page.locator('label[for="gender-radio-3"]')
    };
  }

  get submitButton() {
    return this.page.locator('#submit');
  }

  get modal() {
    return this.page.locator('.modal-content');
  }

  get resultTable() {
    return this.page.locator('.table-responsive');
  }

  async navigate() {
    await this.page.goto(this.url, {
      waitUntil: 'commit',
      timeout: 60000
    });

    await Promise.race([
      this.firstName.waitFor({ state: 'visible', timeout: 30000 }),
      this.lastName.waitFor({ state: 'visible', timeout: 30000 })
    ]);
  }

  async fillForm(data) {
    const fieldsToFill = [
      { field: this.firstName, value: data.firstName },
      { field: this.lastName, value: data.lastName },
      { field: this.email, value: data.email },
      { field: this.mobile, value: data.mobile }
    ];

    for (const { field, value } of fieldsToFill) {
      if (value) {
        await field.fill(value);
        await this.page.waitForTimeout(200);
      }
    }

    const gender = data.gender || 'male';
    await this.genderOptions[gender].click();
  }

  async submitForm() {
    await this.submitButton.click();
    await this.modal.waitFor({ state: 'visible', timeout: 20000 });
  }

  async verifySubmittedData(data) {
    const results = await this.resultTable.textContent();

    const expectedValues = {
      'First Name': data.firstName,
      'Last Name': data.lastName,
      'Email': data.email,
      'Mobile': data.mobile,
      'Gender': data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : 'Male'
    };

    for (const [field, value] of Object.entries(expectedValues)) {
      if (value) {
        expect(results).toContain(value);
      }
    }
  }
}

module.exports = FormPage;
