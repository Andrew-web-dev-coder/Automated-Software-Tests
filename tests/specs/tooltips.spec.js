const { test } = require('@playwright/test');
const ToolTipsPage = require('../pages/ToolTipsPage');

test.describe('DemoQA Tool Tips Tests', () => {
    let toolTipsPage;

    test.beforeEach(async ({ page }) => {
        toolTipsPage = new ToolTipsPage(page);
        await toolTipsPage.navigate();
    });

    test('Verify button tooltip', async () => {
        await toolTipsPage.verifyButtonTooltip();
    });

    test('Verify text field tooltip', async () => {
        await toolTipsPage.verifyTextFieldTooltip();
    });
});