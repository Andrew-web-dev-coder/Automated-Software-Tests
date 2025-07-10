const { expect } = require('@playwright/test');

class TextBoxPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/text-box';
    }

    
    get fullNameInput() {
        return this.page.locator('#userName');
    }

    get emailInput() {
        return this.page.locator('#userEmail');
    }

    get currentAddressInput() {
        return this.page.locator('#currentAddress');
    }

    get permanentAddressInput() {
        return this.page.locator('#permanentAddress');
    }

    get submitButton() {
        return this.page.locator('#submit');
    }

    get output() {
        return this.page.locator('#output');
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
        
        if (data.currentAddress) {
            await this.currentAddressInput.fill(data.currentAddress);
        }
        if (data.permanentAddress) {
            await this.permanentAddressInput.fill(data.permanentAddress);
        }
    }

    async submitForm() {
        await this.submitButton.click();
        
        await this.page.waitForFunction(() => {
            const output = document.getElementById('output');
            return output && output.children.length > 0 && output.offsetHeight > 0;
        }, { timeout: 40000 });
    }

    async verifyOutput(data) {
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
