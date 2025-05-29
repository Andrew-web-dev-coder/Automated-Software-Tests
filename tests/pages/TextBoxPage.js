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
    await this.page.goto(this.url);
    await expect(this.fullNameInput).toBeVisible({ timeout: 30000 });
  }

  async fillForm(data) {
    // Заполняем поля с ожиданием после каждого действия
    await this.fullNameInput.fill(data.fullName);
    await this.page.waitForTimeout(500);
    await this.emailInput.fill(data.email);
    await this.page.waitForTimeout(500);
    await this.currentAddressInput.fill(data.currentAddress);
    await this.page.waitForTimeout(500);
    await this.permanentAddressInput.fill(data.permanentAddress);
    await this.page.waitForTimeout(1000);
  }

  async submitForm() {
    await this.submitButton.click();
    // Комбинированное ожидание - сначала пауза, потом проверка видимости
    await this.page.waitForTimeout(2000);
    await expect(this.output).toBeVisible({ timeout: 30000 });
  }

  async verifyOutput(data) {
    const outputText = await this.output.textContent();
    // Мягкие проверки с contains вместо точного соответствия
    if (data.fullName) expect(outputText).toContain(data.fullName.trim());
    if (data.email) expect(outputText).toContain(data.email.trim());
    if (data.currentAddress) expect(outputText).toContain(data.currentAddress.trim());
    if (data.permanentAddress) expect(outputText).toContain(data.permanentAddress.trim());
  }
}

module.exports = TextBoxPage;