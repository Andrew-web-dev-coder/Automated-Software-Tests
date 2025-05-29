const { expect } = require('@playwright/test');

class FormPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/automation-practice-form';
    
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.genderMale = page.locator('label[for="gender-radio-1"]');
    this.mobile = page.locator('#userNumber');
    this.submitButton = page.locator('#submit');
    this.modal = page.locator('.modal-content');
    this.resultTable = page.locator('.table-responsive');
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('#firstName', { state: 'visible', timeout: 15000 });
  }

  async fillForm(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.genderMale.click();
    await this.mobile.fill(data.mobile);
  }

  async submitForm() {
    await this.submitButton.click();
    await this.page.waitForSelector('.modal-content', { state: 'visible', timeout: 15000 });
  }

  async verifySubmittedData(data) {
    await expect(this.resultTable).toContainText(data.firstName);
    await expect(this.resultTable).toContainText(data.lastName);
    await expect(this.resultTable).toContainText(data.email);
    await expect(this.resultTable).toContainText('Male');
    await expect(this.resultTable).toContainText(data.mobile);
  }
}

module.exports = FormPage;