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
        await expect(this.fullNameInput).toBeVisible({ timeout: 15000 });
    }

    async fillForm(data) {
        await this.fullNameInput.fill(data.fullName);
        await this.emailInput.fill(data.email);
        await this.currentAddressInput.fill(data.currentAddress);
        await this.permanentAddressInput.fill(data.permanentAddress);
    }

    async submitForm() {
        await this.submitButton.click();
        await expect(this.output).toBeVisible({ timeout: 10000 });
    }

    async verifyOutput(data) {
        const outputText = await this.output.textContent();
        expect(outputText).toContain(data.fullName);
        expect(outputText).toContain(data.email);
        expect(outputText).toContain(data.currentAddress);
        expect(outputText).toContain(data.permanentAddress);
    }
}

module.exports = TextBoxPage;