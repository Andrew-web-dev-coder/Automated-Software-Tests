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
        await expect(selectMenuPage.selectedGroupValue).toHaveText('Group 2, option 1', { timeout: 10000 });
    });

    test('should select other option', async () => {
        await selectMenuPage.selectOtherOption();
        await expect(selectMenuPage.selectedOneValue).toHaveText('Other', { timeout: 10000 });
    });

    test('should select old style color', async () => {
        await selectMenuPage.selectOldStyleColor();
        const value = await selectMenuPage.oldStyleSelect.inputValue();
        expect(value).toBe('2'); 
    });

    test('should select multi colors', async () => {
        await selectMenuPage.selectMultiColors();
        const options = await selectMenuPage.multiSelectDropdown.evaluate(select => 
            Array.from(select.selectedOptions).map(o => o.value)
        );
        expect(options.sort()).toEqual(['opel', 'volvo'].sort());
    });
});