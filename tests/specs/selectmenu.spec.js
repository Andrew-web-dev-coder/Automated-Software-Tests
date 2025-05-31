const { test, expect } = require('@playwright/test');
const SelectMenuPage = require('../pages/SelectMenuPage');

test.describe.configure({ mode: 'serial' }); // Последовательное выполнение тестов

test.describe('DemoQA Select Menu Tests', () => {
    let selectMenuPage;
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        selectMenuPage = new SelectMenuPage(page);
        await selectMenuPage.navigate();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('should select group option', async () => {
        await test.step('Select group option', async () => {
            await selectMenuPage.selectGroupOption();
        });
        await test.step('Verify selection', async () => {
            await expect(selectMenuPage.selectedGroupValue).toHaveText('Group 2, option 1');
        });
    });

    test('should select other option', async () => {
        await test.step('Select other option', async () => {
            await selectMenuPage.selectOtherOption();
        });
        await test.step('Verify selection', async () => {
            await expect(selectMenuPage.selectedOneValue).toHaveText('Other');
        });
    });

    test('should select old style color', async () => {
        await test.step('Select color', async () => {
            await selectMenuPage.selectOldStyleColor();
        });
        await test.step('Verify selection', async () => {
            await expect(selectMenuPage.oldStyleSelect).toHaveValue('2');
        });
    });

    test('should select multi colors', async () => {
        await test.step('Select multiple colors', async () => {
            await selectMenuPage.selectMultiColors();
        });
        await test.step('Verify selections', async () => {
            await expect(selectMenuPage.multiSelectDropdown.locator('option[value="volvo"]')).toBeSelected();
            await expect(selectMenuPage.multiSelectDropdown.locator('option[value="opel"]')).toBeSelected();
        });
    });
});