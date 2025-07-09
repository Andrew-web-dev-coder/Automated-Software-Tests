const { expect } = require('@playwright/test');

class ToolTipsPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://demoqa.com/tool-tips';
        this.hoverButton = page.locator('#toolTipButton');
        this.hoverTextField = page.locator('#toolTipTextField');
        this.tooltip = page.locator('.tooltip-inner');
    }

    async navigate() {
        await this.page.goto(this.url, { 
            timeout: 90000,
            waitUntil: 'domcontentloaded'
        });
        await expect(this.hoverButton).toBeVisible({ timeout: 40000 });
    }

    async verifyButtonTooltip() {
        await this.page.mouse.move(0, 0);
        await this.hoverButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        
        // Двойное наведение для стабильности в Firefox
        await this.hoverButton.hover();
        await this.page.waitForTimeout(300);
        await this.hoverButton.hover({ force: true });
        
        // Комбинированная проверка
        await expect(this.tooltip).toBeVisible({ timeout: 25000 });
        await expect(this.tooltip).toContainText('You hovered over the Button');
    }

    async verifyTextFieldTooltip() {
        await this.page.mouse.move(0, 0);
        await this.hoverTextField.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        
        // Точное наведение с проверкой hover состояния
        await this.hoverTextField.hover();
        await this.page.waitForTimeout(300);
        await this.hoverTextField.hover({ force: true });
        
        // Усиленная проверка для Firefox
        await this.page.waitForFunction(() => {
            const element = document.querySelector('#toolTipTextField');
            return element && element.matches(':hover');
        }, { timeout: 15000 });
        
        await expect(this.tooltip).toBeVisible({ timeout: 25000 });
        await expect(this.tooltip).toContainText('You hovered over the text field');
    }
}

module.exports = ToolTipsPage;