const { test, expect } = require('@playwright/test');
const SelectMenuPage = require('../pages/SelectMenuPage');

test.describe('DemoQA Select Menu Tests', () => {
    let selectMenuPage;

    test.beforeEach(async ({ page }) => {
        selectMenuPage = new SelectMenuPage(page);
        await selectMenuPage.navigate();
    });

    test('should select group option', async () => {
        await selectMenuPage.selectGroupOption();
    });

    test('should select other option', async () => {
        await selectMenuPage.selectOtherOption();
    });

    test('should select old style color', async () => {
        await selectMenuPage.selectOldStyleColor();
    });

    test('should select multi colors', async () => {
        await selectMenuPage.selectMultiColors();
    });
});