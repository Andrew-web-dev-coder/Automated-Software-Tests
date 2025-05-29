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
        await this.page.goto(this.url);
        await this.page.waitForSelector('#toolTipButton', { 
            state: 'visible', 
            timeout: 15000 
        });
    }

    async verifyButtonTooltip() {
        await this.hoverButton.hover();
        await expect(this.tooltip).toBeVisible({ timeout: 15000 });
        await expect(this.tooltip).toHaveText('You hovered over the Button');
    }

    async verifyTextFieldTooltip() {
        await this.hoverTextField.hover();
        await expect(this.tooltip).toBeVisible({ timeout: 15000 });
        await expect(this.tooltip).toHaveText('You hovered over the text field');
    }
}

module.exports = ToolTipsPage;