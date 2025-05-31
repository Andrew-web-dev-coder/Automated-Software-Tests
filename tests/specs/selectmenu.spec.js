const { test, expect } = require('@playwright/test');
const SelectMenuPage = require('../pages/SelectMenuPage');

test.describe('DemoQA Select Menu Tests', () => {
    let selectMenuPage;

    test.beforeEach(async ({ page }) => {
        selectMenuPage = new SelectMenuPage(page);
        await selectMenuPage.navigate();
    });

    test('should select all required options @smoke', async () => {
        await test.step('Perform all selections', async () => {
            await selectMenuPage.performAllSelections();
        });
    });

    test('should select value option', async () => {
        await selectMenuPage.selectValueOption();
    });

    test('should select one option', async () => {
        await selectMenuPage.selectOneOption();
    });

    test('should select old style color', async () => {
        await selectMenuPage.selectOldStyleColor();
    });

    test('should select multiple colors', async () => {
        await selectMenuPage.selectMultiColors();
    });
});