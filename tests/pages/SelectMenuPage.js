const { expect } = require('@playwright/test');

class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/select-menu';

        
        this.selectValueDropdown = page.locator('div[id="withOptGroup"]');
        this.selectOneDropdown = page.locator('div[id="selectOne"]');
        this.oldStyleSelect = page.locator('select[id="oldSelectMenu"]');
        this.multiSelectDropdown = page.locator('select[id="cars"]');

        
        this.selectedGroupValue = page.locator('//div[@id="withOptGroup"]//div[contains(@class, "-singleValue")]');
        this.selectedOneValue = page.locator('//div[@id="selectOne"]//div[contains(@class, "-singleValue")]');
        
        
        this.groupOption = page.locator('div[id="react-select-2-option-1-0"]');
        this.otherOption = page.locator('div[id="react-select-3-option-0-5"]');
    }

    async navigate() {
        await this.page.goto(this.url, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        await expect(this.oldStyleSelect).toBeVisible({ timeout: 15000 });
    }

    async selectGroupOption() {
        await this.selectValueDropdown.click();
        await expect(this.groupOption).toBeVisible();
        await this.groupOption.click();
        await expect(this.selectedGroupValue).toHaveText('Group 2, option 1');
    }

    async selectOtherOption() {
        await this.selectOneDropdown.click();
        await expect(this.otherOption).toBeVisible();
        await this.otherOption.click();
        await expect(this.selectedOneValue).toHaveText('Other');
    }

    async selectOldStyleColor() {
        await this.oldStyleSelect.selectOption('Green');
        const value = await this.oldStyleSelect.inputValue();
        expect(value).toBe('2'); 
    }

    async selectMultiColors() {
        await this.multiSelectDropdown.selectOption(['volvo', 'opel']);
        const options = await this.multiSelectDropdown.evaluate(select => 
            Array.from(select.selectedOptions).map(o => o.value)
        );
        expect(options.sort()).toEqual(['opel', 'volvo'].sort());
    }
}

module.exports = SelectMenuPage;