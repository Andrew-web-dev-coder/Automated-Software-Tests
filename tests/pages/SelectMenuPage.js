const { expect } = require('@playwright/test');

class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/select-menu';
        
        this.pageTitle = page.locator('.main-header');
        this.selectValueDropdown = page.locator('div#withOptGroup');
        this.selectOneDropdown = page.locator('div#selectOne');
        this.oldStyleSelect = page.locator('#oldSelectMenu');
        this.multiSelectDropdown = page.locator('#cars');
        
        this.selectedGroupValue = page.locator('div#withOptGroup div.css-1uccc91-singleValue');
        this.selectedOneValue = page.locator('div#selectOne div.css-1uccc91-singleValue');
    }

    async navigate(maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.page.goto(this.url, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                });
                
                await expect(this.pageTitle).toHaveText('Select Menu', { timeout: 15000 });
                await expect(this.oldStyleSelect).toBeVisible({ timeout: 15000 });
                return;
            } catch (error) {
                if (attempt === maxRetries) throw error;
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async selectGroupOption() {
        await test.step('Select group option', async () => {
            await this.selectValueDropdown.click();
            const option = this.page.locator('div#react-select-2-option-1-0');
            await expect(option).toBeVisible({ timeout: 10000 });
            await option.click();
            await expect(this.selectedGroupValue).toHaveText('Group 2, option 1');
        });
    }

    async selectOtherOption() {
        await test.step('Select other option', async () => {
            await this.selectOneDropdown.click();
            const option = this.page.locator('div#react-select-3-option-0-5');
            await expect(option).toBeVisible({ timeout: 10000 });
            await option.click();
            await expect(this.selectedOneValue).toHaveText('Other');
        });
    }

    async selectOldStyleColor() {
        await test.step('Select old style color', async () => {
            await this.oldStyleSelect.selectOption('Green');
            await expect(this.oldStyleSelect).toHaveValue('2');
        });
    }

    async selectMultiColors() {
        await test.step('Select multiple colors', async () => {
            await this.multiSelectDropdown.selectOption(['volvo', 'opel', 'audi']);
            await expect(this.multiSelectDropdown.locator('option[value="volvo"]')).toBeSelected();
            await expect(this.multiSelectDropdown.locator('option[value="opel"]')).toBeSelected();
        });
    }
}

module.exports = SelectMenuPage;