const { expect } = require('@playwright/test');

class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/select-menu';
        
        // Локаторы с улучшенными селекторами
        this.pageTitle = page.locator('.main-header');
        this.selectValueDropdown = page.locator('div#withOptGroup');
        this.selectOneDropdown = page.locator('div#selectOne');
        this.oldStyleSelect = page.locator('#oldSelectMenu');
        this.multiSelectDropdown = page.locator('#cars');
        this.selectedGroupValue = page.locator('div#withOptGroup .css-1uccc91-singleValue');
        this.selectedOneValue = page.locator('div#selectOne .css-1uccc91-singleValue');
    }

    async navigate() {
        await this.page.goto(this.url, {
            waitUntil: 'networkidle',
            timeout: 60000
        });
        await this.verifyPageLoaded();
    }

    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(this.url);
        await expect(this.pageTitle).toHaveText('Select Menu');
        await expect(this.oldStyleSelect).toBeVisible();
    }

    async selectValueOption() {
        await this.selectValueDropdown.click();
        await this.page.locator('div#react-select-2-option-1-0').click();
        await expect(this.selectedGroupValue).toHaveText('Group 2, option 1');
    }

    async selectOneOption() {
        await this.selectOneDropdown.click();
        await this.page.locator('div#react-select-3-option-0-5').click();
        await expect(this.selectedOneValue).toHaveText('Other');
    }

    async selectOldStyleColor() {
        await this.oldStyleSelect.selectOption('Green');
        await expect(this.oldStyleSelect).toHaveValue('2');
    }

    async selectMultiColors() {
        await this.multiSelectDropdown.selectOption(['volvo', 'opel', 'audi']);
        const selectedOptions = await this.multiSelectDropdown.evaluate(select => 
            Array.from(select.selectedOptions).map(option => option.value)
        );
        expect(selectedOptions.sort()).toEqual(['audi', 'opel', 'volvo'].sort());
    }

    async performAllSelections() {
        await this.selectValueOption();
        await this.selectOneOption();
        await this.selectOldStyleColor();
        await this.selectMultiColors();
    }
}

module.exports = SelectMenuPage;