const { expect } = require('@playwright/test');

class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/select-menu';
    }

    
    get selectValueDropdown() {
        return this.page.locator('div[id="withOptGroup"]');
    }

    get selectOneDropdown() {
        return this.page.locator('div[id="selectOne"]');
    }

    get oldStyleSelect() {
        return this.page.locator('select[id="oldSelectMenu"]');
    }

    get multiSelectDropdown() {
        return this.page.locator('select[id="cars"]');
    }

    get selectedGroupValue() {
        return this.page.locator('//div[@id="withOptGroup"]//div[contains(text(), "Group")]');
    }

    get selectedOneValue() {
        return this.page.locator('//div[@id="selectOne"]//div[contains(text(), "Other")]');
    }

    get groupOption() {
        return this.page.locator('//div[contains(@class, "option") and text()="Group 2, option 1"]');
    }

    get otherOption() {
        return this.page.locator('//div[contains(@class, "option") and text()="Other"]');
    }

    async navigate() {
        await this.page.goto(this.url, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        await expect(this.oldStyleSelect).toBeVisible({ timeout: 15000 });
    }

    async selectGroupOption() {
        await this.selectValueDropdown.waitFor();
        await this.selectValueDropdown.click();
        await this.groupOption.waitFor();
        await this.groupOption.click();
        await expect(this.selectedGroupValue).toHaveText('Group 2, option 1');
    }

    async selectOtherOption() {
        await this.selectOneDropdown.waitFor();
        await this.selectOneDropdown.click();
        await this.otherOption.waitFor();
        await this.otherOption.click();
        await expect(this.selectedOneValue).toHaveText('Other');
    }

    async selectOldStyleColor() {
        const GREEN_OPTION_VALUE = '2'; 
        await this.oldStyleSelect.selectOption('Green');
        const value = await this.oldStyleSelect.inputValue();
        expect(value).toBe(GREEN_OPTION_VALUE);
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
