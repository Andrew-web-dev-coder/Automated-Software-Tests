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

    async navigate(maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.page.goto(this.url, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                await expect(this.fullNameInput).toBeVisible({ timeout: 15000 });
                return;
            } catch (error) {
                if (attempt === maxRetries) throw error;
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async fillForm(data) {
        await test.step('Fill text box form', async () => {
            if (data.fullName) {
                await this.fullNameInput.fill(data.fullName);
                await expect(this.fullNameInput).toHaveValue(data.fullName);
            }
            if (data.email) {
                await this.emailInput.fill(data.email);
                await expect(this.emailInput).toHaveValue(data.email);
            }
            if (data.currentAddress) {
                await this.currentAddressInput.fill(data.currentAddress);
                await expect(this.currentAddressInput).toHaveValue(data.currentAddress);
            }
            if (data.permanentAddress) {
                await this.permanentAddressInput.fill(data.permanentAddress);
                await expect(this.permanentAddressInput).toHaveValue(data.permanentAddress);
            }
        });
    }

    async submitForm() {
        await test.step('Submit form', async () => {
            await this.submitButton.click();
            await expect(this.output).toBeVisible({ timeout: 15000 });
        });
    }

    async verifyOutput(data) {
        await test.step('Verify output', async () => {
            const outputText = await this.output.textContent();
            if (data.fullName) expect(outputText).toContain(data.fullName.trim());
            if (data.email) expect(outputText).toContain(data.email.trim());
            if (data.currentAddress) expect(outputText).toContain(data.currentAddress.trim());
            if (data.permanentAddress) expect(outputText).toContain(data.permanentAddress.trim());
        });
    }
}

module.exports = TextBoxPage;