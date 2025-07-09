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
            timeout: 90000,
            waitUntil: 'domcontentloaded'
        });
        await expect(this.fullNameInput).toBeVisible({ timeout: 40000 });
    }

    async fillForm(data) {
        if (data.fullName) {
            await this.fullNameInput.clear();
            await this.fullNameInput.fill(data.fullName);
        }
        if (data.email) {
            await this.emailInput.clear();
            await this.emailInput.fill(data.email);
        }
    }

    async submitForm() {
        await this.submitButton.click();
        
        // Улучшенное ожидание для Firefox
        await this.page.waitForFunction(() => {
            const output = document.getElementById('output');
            return output && output.children.length > 0 && output.offsetHeight > 0;
        }, { timeout: 40000 });
    }

    async verifyOutput(data) {
        // Дополнительная проверка видимости
        await expect(this.output).toBeVisible();
        
        const outputText = await this.output.innerText({ timeout: 15000 });
        if (data.fullName) {
            await expect(this.output).toContainText(data.fullName, { timeout: 15000 });
        }
        if (data.email) {
            await expect(this.output).toContainText(data.email, { timeout: 15000 });
        }
    }
}

module.exports = TextBoxPage;