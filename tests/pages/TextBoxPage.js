const { expect } = require('@playwright/test');

class TextBoxPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/text-box';
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.output = page.locator('#output');
  }

  async navigate() {
    await this.page.goto(this.url, { 
      timeout: 60000,
      waitUntil: 'domcontentloaded'
    });
    await expect(this.fullNameInput).toBeVisible({ timeout: 30000 });
  }

  async fillForm(data) {
    if (data.fullName) await this.fullNameInput.fill(data.fullName);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.currentAddress) await this.currentAddressInput.fill(data.currentAddress);
    if (data.permanentAddress) await this.permanentAddressInput.fill(data.permanentAddress);
  }

  async submitForm() {
    await this.submitButton.click();
    
    // Добавлено явное ожидание появления output
    await this.page.waitForSelector('#output', { 
      state: 'visible',
      timeout: 30000 
    });
    
    await expect(this.output).toBeVisible({ timeout: 30000 });
  }

  async verifyOutput(data) {
    const outputText = await this.output.textContent();
    if (data.fullName) expect(outputText).toContain(data.fullName.trim());
    if (data.email) expect(outputText).toContain(data.email.trim());
    if (data.currentAddress) expect(outputText).toContain(data.currentAddress.trim());
    if (data.permanentAddress) expect(outputText).toContain(data.permanentAddress.trim());
  }
}

module.exports = TextBoxPage;