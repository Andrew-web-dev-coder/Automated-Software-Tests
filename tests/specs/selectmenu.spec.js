const { test, expect } = require('@playwright/test');
const SelectMenuPage = require('../pages/SelectMenuPage');

test.describe('DemoQA Select Menu Tests', () => {
    let selectMenuPage;

    test.beforeEach(async ({ page }) => {
        selectMenuPage = new SelectMenuPage(page);
        await selectMenuPage.navigate();
        await page.waitForLoadState('networkidle'); 
    });

    test('should select group option', async ({ page }) => {
        await selectMenuPage.selectGroupOption();
        await expect(selectMenuPage.selectedGroupValue).toHaveText('Group 2, option 1');
    });

    test('should select other option', async ({ page }) => {
        await selectMenuPage.selectOtherOption();
        await expect(selectMenuPage.selectedOneValue).toHaveText('Other');
    });

    test('should select old style color', async ({ page }) => {
        await selectMenuPage.selectOldStyleColor();
        await expect(page.locator('#oldSelectMenu')).toHaveValue('2');
    });

    test('should select multi colors', async ({ page }) => {
        await selectMenuPage.selectMultiColors();
        await expect(page.locator('#cars option[value="volvo"]')).toBeSelected();
        await expect(page.locator('#cars option[value="opel"]')).toBeSelected();
    });
});