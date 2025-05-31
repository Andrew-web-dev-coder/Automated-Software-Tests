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
            waitUntil: 'commit',
            timeout: 60000 
        });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyButtonTooltip() {
        await this.hoverButton.hover();
        await this.page.waitForFunction(() => {
            const tooltip = document.querySelector('.tooltip-inner');
            return tooltip && tooltip.textContent.includes('You hovered over the Button');
        }, { timeout: 15000 });
    }

    async verifyTextFieldTooltip() {
        await this.hoverTextField.hover();
        await this.page.waitForFunction(() => {
            const tooltip = document.querySelector('.tooltip-inner');
            return tooltip && tooltip.textContent.includes('You hovered over the text field');
        }, { timeout: 15000 });
    }
}

module.exports = ToolTipsPage;