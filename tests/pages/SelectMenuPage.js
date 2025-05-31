const { expect } = require('@playwright/test');

class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/select-menu';
        
        // Основные элементы
        this.selectValueDropdown = page.locator('div#withOptGroup');
        this.selectOneDropdown = page.locator('div#selectOne');
        this.oldStyleSelect = page.locator('#oldSelectMenu');
        this.multiSelectDropdown = page.locator('#cars');
        
        // Результаты выбора
        this.selectedGroupValue = page.locator('div#withOptGroup div.css-1uccc91-singleValue');
        this.selectedOneValue = page.locator('div#selectOne div.css-1uccc91-singleValue');
        
        // Элементы для ожидания
        this.pageTitle = page.locator('.main-header');
    }

    async navigate() {
        await this.page.goto(this.url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        
        // Ожидаем загрузки ключевых элементов
        await expect(this.pageTitle).toHaveText('Select Menu', { timeout: 45000 });
        await expect(this.oldStyleSelect).toBeVisible({ timeout: 45000 });
    }

    async selectGroupOption() {
        await this.selectValueDropdown.click();
        const option = this.page.locator('div#react-select-2-option-1-0');
        await expect(option).toBeVisible({ timeout: 30000 });
        await option.click();
        await expect(this.selectedGroupValue).toHaveText('Group 2, option 1', { timeout: 30000 });
    }

    async selectOtherOption() {
        await this.selectOneDropdown.click();
        const option = this.page.locator('div#react-select-3-option-0-5');
        await expect(option).toBeVisible({ timeout: 30000 });
        await option.click();
        await expect(this.selectedOneValue).toHaveText('Other', { timeout: 30000 });
    }

    async selectOldStyleColor() {
        await this.oldStyleSelect.selectOption('Green');
        await expect(this.oldStyleSelect).toHaveValue('2', { timeout: 30000 });
    }

    async selectMultiColors() {
        await this.multiSelectDropdown.selectOption(['volvo', 'opel']);
        await expect(this.multiSelectDropdown.locator('option[value="volvo"]')).toBeSelected();
        await expect(this.multiSelectDropdown.locator('option[value="opel"]')).toBeSelected();
    }
}

module.exports = SelectMenuPage;